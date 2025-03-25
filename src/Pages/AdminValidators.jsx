import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";

const AdminValidators = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const validatorData = {
        name: data.name,
        logo: data.logo,
        network: data.network,
        stakeBalance: data.stakeBalance,
        validatorLink: data.validatorLink,
        sla: parseFloat(data.sla),
      };

      await addDoc(collection(db, "validators"), validatorData);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding validator:", error);
      alert("Error saving data");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b2f] to-[#2b4d64] p-8">
      <motion.div
        className="max-w-2xl mx-auto bg-[#1e1f35] rounded-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8">Add Validator</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Blockchain Name</label>
            <input
              {...register("name", { required: "This field is required" })}
              className="w-full p-3 rounded-lg bg-[#2a2c4a] text-white border border-[#3d4054] focus:outline-none"
              placeholder="e.g.: ETH"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Logo URL</label>
            <input
              {...register("logo", { required: "This field is required" })}
              className="w-full p-3 rounded-lg bg-[#2a2c4a] text-white border border-[#3d4054] focus:outline-none"
              placeholder="https://example.com/logo.png"
            />
            {errors.logo && (
              <span className="text-red-500 text-sm">
                {errors.logo.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Network</label>
            <select
              {...register("network", { required: "This field is required" })}
              className="w-full p-3 rounded-lg bg-[#2a2c4a] text-white border border-[#3d4054] focus:outline-none"
            >
              <option value="">Select network</option>
              <option value="Mainnet">Mainnet</option>
              <option value="Testnet">Testnet</option>
            </select>
            {errors.network && (
              <span className="text-red-500 text-sm">
                {errors.network.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Stake Balance</label>
            <input
              {...register("stakeBalance", {
                required: "This field is required",
              })}
              className="w-full p-3 rounded-lg bg-[#2a2c4a] text-white border border-[#3d4054] focus:outline-none"
              placeholder="32.00158 ETH"
            />
            {errors.stakeBalance && (
              <span className="text-red-500 text-sm">
                {errors.stakeBalance.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Validator Link</label>
            <input
              {...register("validatorLink", {
                required: "This field is required",
              })}
              className="w-full p-3 rounded-lg bg-[#2a2c4a] text-white border border-[#3d4054] focus:outline-none"
              placeholder="https://example.com/validator"
            />
            {errors.validatorLink && (
              <span className="text-red-500 text-sm">
                {errors.validatorLink.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">SLA (Uptime %)</label>
            <input
              type="number"
              step="0.01"
              {...register("sla", {
                required: "This field is required",
                min: { value: 0, message: "Must be between 0 and 100" },
                max: { value: 100, message: "Must be between 0 and 100" },
              })}
              className="w-full p-3 rounded-lg bg-[#2a2c4a] text-white border border-[#3d4054] focus:outline-none"
              placeholder="99.99"
            />
            {errors.sla && (
              <span className="text-red-500 text-sm">{errors.sla.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-4 rounded-lg bg-[#7a65d0] text-white font-semibold hover:bg-[#5538ce] transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Add Validator"}
          </button>

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-center mt-4"
            >
              Validator added successfully!
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AdminValidators;
