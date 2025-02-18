import { ethers } from "ethers";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase.config";

class FaucetManager {
  constructor(chainId, rpcUrl, privateKey) {
    if (!rpcUrl) throw new Error("RPC URL is required");
    if (!privateKey) throw new Error("Private key is required");
    if (!chainId || isNaN(chainId)) throw new Error("Valid chainId is required");

    try {
      this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      this.signer = new ethers.Wallet(privateKey, this.provider);
      this.chainId = chainId;
    } catch (error) {
      console.error("Error initializing FaucetManager:", error);
      throw new Error("Failed to initialize faucet manager");
    }
  }

  async sendTransaction(address, uuid) {
    try {
      // Verificar balance del faucet
      const balance = await this.provider.getBalance(this.signer.address);
      const requiredAmount = ethers.utils.parseUnits("1.01", 18);

      if (balance.lt(requiredAmount)) {
        throw new Error("Insufficient funds in faucet wallet");
      }

      // Verificar formato de dirección
      if (!ethers.utils.isAddress(address)) {
        throw new Error("Invalid address format");
      }

      // Verificar límite de 24h
      const transactionsRef = collection(db, "transactions");
      const twentyFourHoursAgo = Timestamp.fromDate(
        new Date(Date.now() - 24 * 60 * 60 * 1000)
      );

      const q = query(
        transactionsRef,
        where("uuid", "==", uuid),
        where("timestamp", ">=", twentyFourHoursAgo)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error("24-hour limit reached");
      }

      // Enviar transacción
      const txData = {
        from: this.signer.address,
        to: address,
        value: ethers.utils.parseUnits("1", 18),
        gasLimit: ethers.BigNumber.from(21000),
        gasPrice: await this.signer.provider
          .getFeeData()
          .then((data) => data.gasPrice || ethers.utils.parseUnits("1", "gwei")),
        chainId: this.chainId,
      };

      const txResponse = await this.signer.sendTransaction(txData);
      const txReceipt = await txResponse.wait();

      // Guardar transacción en Firebase
      await addDoc(transactionsRef, {
        uuid,
        timestamp: Timestamp.now(),
        hash: txResponse.hash,
        value: 1,
        chainId: this.chainId,
      });

      return txReceipt;
    } catch (error) {
      console.error("Transaction error:", error);
      throw error;
    }
  }
}

export default FaucetManager; 