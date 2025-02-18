import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Contact from "../Components/Contact";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../firebase.config";
import FaucetManager from "../utils/faucetManager";
import toast from "react-hot-toast";

const FaucetDetail = () => {
  const { id } = useParams();
  const [blockchain, setBlockchain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchBlockchain = async () => {
      try {
        const docRef = doc(db, "blockchains", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlockchain(docSnap.data());
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blockchain:", error);
        setLoading(false);
      }
    };

    fetchBlockchain();
  }, [id]);

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsConnected(true);
      toast.success("Successfully connected with GitHub!");
    } catch (error) {
      console.error("GitHub auth error:", error);
      toast.error("Failed to connect with GitHub");
    }
  };

  const handleRequestTokens = async () => {
    if (!user || !walletAddress) return;

    setIsProcessing(true);
    try {
      if (!blockchain.rpcLinks || blockchain.rpcLinks.length === 0) {
        throw new Error("No RPC endpoints available");
      }

      const chainId = parseInt(blockchain.chainId) || 1516;

      const faucetManager = new FaucetManager(
        chainId,
        blockchain.rpcLinks[0].value,
        process.env.REACT_APP_FAUCET_PRIVATE_KEY || ""
      );

      await faucetManager.sendTransaction(walletAddress, user.uid);
      toast.success("Tokens sent successfully!");
    } catch (error) {
      console.error("Faucet error:", error);
      toast.error(error.message || "Failed to send tokens");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-morado2 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (!blockchain)
    return (
      <div className="min-h-screen bg-morado2 text-white flex items-center justify-center">
        Blockchain not found
      </div>
    );

  return (
    <div className="min-h-screen text-white flex flex-col">
      <div className="min-h-[89vh] p-8 text-white">
        <motion.img
          src="https://appbot.nyc3.digitaloceanspaces.com/Landing_Nodefleet/home-lan.png"
          alt="home"
          className="absolute top-0 left-0 w-full h-screen"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda - Formulario del Faucet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#222038D4] p-8 rounded-2xl"
          >
            <div className="mb-8">
              <h3 className="text-gray-400 text-sm mb-2">Network</h3>
              <h1 className="text-4xl font-bold mb-6">
                {blockchain.name} Faucet
              </h1>
            </div>

            <div className="space-y-6">
              {/* Paso 1 - Verificación */}
              <div className="border-l-2 border-[#3c7b97] pl-4 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#3c7b97] text-white flex items-center justify-center text-xs">
                  1
                </div>
                <h3 className="text-lg mb-2">Verify your user</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Connect to your Github and validate your identity
                </p>
                <button
                  onClick={handleGithubLogin}
                  disabled={isConnected}
                  className="flex items-center gap-2 bg-[#7a65d0] px-4 py-2 rounded-lg hover:bg-[#5538ce] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isConnected ? "Connected" : "Connect"}{" "}
                  <i className="fab fa-github"></i>
                </button>
              </div>

              {/* Paso 2 - Wallet */}
              <div className="border-l-2 border-[#3c7b97] pl-4 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#3c7b97] text-white flex items-center justify-center text-xs">
                  2
                </div>
                <h3 className="text-lg mb-2">Type your wallet address</h3>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-2 rounded-lg bg-[#3d4954] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7a65d0]"
                  disabled={!isConnected}
                />
              </div>

              {/* Paso 3 - Request Tokens */}
              <div className="border-l-2 border-[#3c7b97] pl-4 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#3c7b97] text-white flex items-center justify-center text-xs">
                  3
                </div>
                <button
                  onClick={handleRequestTokens}
                  disabled={!isConnected || !walletAddress || isProcessing}
                  className={`px-6 py-3 rounded-lg ${
                    isConnected && walletAddress && !isProcessing
                      ? "bg-[#7a65d0] hover:bg-[#5538ce]"
                      : "bg-gray-600 cursor-not-allowed"
                  } transition-colors`}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <i className="fas fa-spinner animate-spin"></i>{" "}
                      Processing...
                    </span>
                  ) : (
                    "Request tokens"
                  )}
                </button>
              </div>

              {/* Paso 4 - Share */}
              <div className="border-l-2 border-[#3c7b97] pl-4 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#3c7b97] text-white flex items-center justify-center text-xs">
                  4
                </div>
                <h3 className="text-lg mb-2">Share a tweet about us</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Help us to get rid of the web3 scam
                </p>
                <button className="flex items-center gap-2 bg-[#1DA1F2] px-4 py-2 rounded-lg hover:bg-[#1a8cd8] transition-colors">
                  Share <i className="fab fa-twitter"></i>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha - FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#222038D4] p-8 rounded-2xl"
          >
            <h2 className="text-4xl font-bold mb-8">FAQ</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg mb-2">How do I use the faucet?</h3>
                <p className="text-gray-400">
                  Connect your Github account, enter your wallet address, and
                  request tokens. It's that simple!
                </p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg mb-2">How does the faucet work?</h3>
                <p className="text-gray-400">
                  Our faucet distributes test tokens to developers for testing
                  purposes on the {blockchain.name} testnet.
                </p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg mb-2">
                  I'm having issues - how do I ask for help?
                </h3>
                <p className="text-gray-400">
                  Join our Discord community for support or contact us through
                  our website.
                </p>
              </div>
              <div className="pb-4">
                <h3 className="text-lg mb-2">
                  How long will it take for me to receive my tokens?
                </h3>
                <p className="text-gray-400">
                  Tokens are usually sent within a few minutes after your
                  request is processed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Contact isFaucets={true} />
      </motion.div>
    </div>
  );
};

export default FaucetDetail;
