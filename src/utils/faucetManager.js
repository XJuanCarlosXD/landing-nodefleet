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

      // Asegurar que el provider esté listo
      this.provider.ready.then(() => {
        // Verificar que el chainId del provider coincida
        this.provider.getNetwork().then(network => {
          if (network.chainId !== chainId) {
            console.warn(`ChainId mismatch: Provider is ${network.chainId}, but ${chainId} was provided`);
          }
        });
      });
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

      // Obtener el chainId actual de la red
      const network = await this.provider.getNetwork();
      const currentChainId = network.chainId;

      // Verificar límite de 24h
      const transactionsRef = collection(db, "transactions");
      const twentyFourHoursAgo = Timestamp.fromDate(
        new Date(Date.now() - 24 * 60 * 60 * 1000)
      );

      const q = query(
        transactionsRef,
        where("uuid", "==", uuid)
      );

      const querySnapshot = await getDocs(q);
      const recentTransactions = querySnapshot.docs.filter(doc =>
        doc.data().timestamp.toDate() >= twentyFourHoursAgo
      );

      if (recentTransactions.length > 0) {
        throw new Error("24-hour limit reached");
      }

      // Enviar transacción con el chainId correcto
      const txData = {
        to: address,
        value: ethers.utils.parseUnits("1", 18),
        gasLimit: ethers.BigNumber.from(21000),
        gasPrice: await this.provider.getGasPrice(),
        chainId: currentChainId, // Usar el chainId de la red actual
      };

      const txResponse = await this.signer.sendTransaction(txData);
      const txReceipt = await txResponse.wait();

      // Guardar transacción en Firebase
      await addDoc(transactionsRef, {
        uuid,
        timestamp: Timestamp.now(),
        hash: txResponse.hash,
        value: 1,
        chainId: currentChainId,
        address: address,
        status: 'completed'
      });

      return txReceipt;
    } catch (error) {
      console.error("Transaction error:", error);
      throw error;
    }
  }

  async checkUserTransactions(uuid) {
    try {
      const twentyFourHoursAgo = Timestamp.fromDate(
        new Date(Date.now() - 24 * 60 * 60 * 1000)
      );

      // Consulta simplificada usando solo uuid
      const q = query(
        collection(db, "transactions"),
        where("uuid", "==", uuid)
      );

      const querySnapshot = await getDocs(q);

      // Filtrar manualmente por timestamp
      const recentTransactions = querySnapshot.docs.filter(doc =>
        doc.data().timestamp.toDate() >= twentyFourHoursAgo
      );

      return recentTransactions.length > 0;
    } catch (error) {
      console.error("Error checking transactions:", error);
      throw new Error("Error checking transaction history");
    }
  }
}

export default FaucetManager; 