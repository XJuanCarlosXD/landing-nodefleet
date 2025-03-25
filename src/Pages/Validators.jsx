import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import Contact from "../Components/Contact";

const Validators = () => {
  const [validators, setValidators] = useState([]);
  const [filteredValidators, setFilteredValidators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    network: "all",
    search: "",
  });
  const [activeFilters, setActiveFilters] = useState({
    all: true,
    mainnet: false,
    testnet: false,
  });

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "validators"));
        const validatorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setValidators(validatorsData);
        setFilteredValidators(validatorsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching validators:", error);
        setLoading(false);
      }
    };

    fetchValidators();
  }, []);

  useEffect(() => {
    let result = [...validators];

    if (filters.network !== "all") {
      result = result.filter(
        (validator) => validator.network === filters.network
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((validator) =>
        validator.name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredValidators(result);
  }, [filters, validators]);

  const handleFilterClick = (filter) => {
    if (filter === "all") {
      setActiveFilters({
        all: true,
        mainnet: false,
        testnet: false,
      });
      setFilters({
        network: "all",
        search: "",
      });
    } else {
      setActiveFilters({
        ...activeFilters,
        all: false,
        [filter]: !activeFilters[filter],
      });

      setFilters((prev) => ({
        ...prev,
        network:
          filter === "mainnet"
            ? "Mainnet"
            : filter === "testnet"
            ? "Testnet"
            : "all",
      }));
    }
  };

  return (
    <div className="h-auto flex flex-col gap-0">
      <motion.div
        className="h-auto min-h-screen flex justify-start flex-col gap-4 items-start -mt-10 p-4 md:p-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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

        <motion.div
          className="relative z-10 text-white text-start flex flex-col gap-4 mt-24 md:mt-0"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-4xl mb-2">
            Node <b>validators</b>
          </h1>
          <hr className="w-10/12 h-1 bg-white" />
          <h2 className="text-2xl md:text-4xl">Active Validators</h2>
        </motion.div>

        <motion.div
          className="relative z-10 w-full h-full flex justify-start items-start flex-col bg-[#222038D4] p-4 md:p-8 mt-8 md:mt-12 rounded-2xl"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="w-full flex flex-col gap-4 mb-4 md:mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
              <h2 className="text-xl md:text-2xl text-white font-semibold">
                Validator list
              </h2>
              <div className="text-white">
                {filteredValidators.length} results
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center py-2 text-base md:text-lg">
              <div className="flex gap-0 items-center border rounded-lg border-white w-full md:w-auto">
                <button
                  onClick={() => handleFilterClick("all")}
                  className={`px-4 md:px-4 py-1.5 border-r rounded-l-lg border-white font-medium transition-colors flex-1 md:flex-none ${
                    activeFilters.all
                      ? "bg-[#7a65d0] text-white"
                      : "bg-[#222038D4] text-gray-300"
                  }`}
                >
                  <i className="fa-solid fa-check"></i> All
                </button>
                <button
                  onClick={() => handleFilterClick("mainnet")}
                  className={`px-4 md:px-4 py-1.5 border-r border-white font-medium transition-colors flex-1 md:flex-none ${
                    activeFilters.mainnet
                      ? "bg-[#3c7b97] text-white"
                      : "bg-[#222038D4] text-gray-300"
                  }`}
                >
                  Mainnet
                </button>
                <button
                  onClick={() => handleFilterClick("testnet")}
                  className={`px-4 md:px-4 py-1.5 font-medium rounded-r-lg transition-colors flex-1 md:flex-none ${
                    activeFilters.testnet
                      ? "bg-[#484c71] text-white"
                      : "bg-[#222038D4] text-gray-300"
                  }`}
                >
                  Testnet
                </button>
              </div>

              <div className="w-full md:w-8/12 relative">
                <input
                  type="text"
                  placeholder="Search validator..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="px-4 py-1.5 rounded-lg bg-[#222038D4] w-full border border-white text-white placeholder-gray-400 focus:outline-none text-base md:text-xl"
                />
                <i className="fa-solid fa-magnifying-glass text-white text-xl absolute right-4 top-1/2 -translate-y-1/2"></i>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-5 place-items-center gap-4 p-4 bg-morado3 rounded-t-xl text-gray-300 text-xl font-semibold">
              <div>Blockchain Node</div>
              <div>Network</div>
              <div>Stake Balance</div>
              <div>Address</div>
              <div>SLA (Uptime)</div>
            </div>

            <div className="space-y-2 mt-4 overflow-y-auto max-h-[70vh]">
              {loading ? (
                <div className="text-white text-center py-4">Loading...</div>
              ) : (
                filteredValidators.map((validator) => (
                  <motion.div
                    key={validator.id}
                    className="grid grid-cols-1 md:grid-cols-5 place-items-center gap-4 p-4 bg-morado4 rounded-xl text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center gap-3 w-full">
                      <img
                        src={validator.logo}
                        alt={validator.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <span className="text-white">{validator.name}</span>
                    </div>
                    <div>
                      <span
                        className={` px-3 py-3 rounded-lg w-full md:w-fit text-center ${
                          validator.network === "Mainnet"
                            ? "bg-[#3c7b97] text-white"
                            : "bg-[#484c71] text-white"
                        }`}
                      >
                        {validator.network}
                      </span>
                    </div>
                    <div className="text-white">{validator.stakeBalance}</div>
                    <div>
                      <a
                        href={validator.validatorLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-gray-300 bg-[#99dfaf]/20 rounded-lg px-4 py-2 justify-between"
                      >
                        Validator Link
                        <i className="fas fa-link bg-[#99dfaf] text-black rounded-lg  px-2 py-2"></i>
                      </a>
                    </div>
                    <div className="text-white">{validator.sla}%</div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

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

export default Validators;
