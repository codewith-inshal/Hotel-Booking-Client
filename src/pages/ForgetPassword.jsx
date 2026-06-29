import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/forget-password",
        { email },
      );

      toast.success(res.data.msg);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
        <p className="text-gray-500 mb-6">
          Enter your email to receive reset link
        </p>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-3 rounded-xl bg-gray-100 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full bg-lime-400 py-3 rounded-xl font-bold">
            Send Reset Link
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;
