import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API_BASE_URL from "../api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/user/reset-password/${token}`,
        { newPassword },
      );

      toast.success(res.data.msg);
      navigate("/user-login");
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Reset Password</h2>

        <form onSubmit={submitHandler}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-xl bg-gray-100 mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-xl bg-gray-100 mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="w-full bg-lime-400 py-3 rounded-xl font-bold">
            Reset Password
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
