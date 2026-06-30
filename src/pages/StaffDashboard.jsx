import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaClipboardList } from "react-icons/fa";

function StaffDashboard() {
  const [bookings, setBookings] = useState([]);

  const staff = JSON.parse(localStorage.getItem("staff"));
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/bookings/pending`,
        {
          headers: {
            Authorization: `Bearer ${staff.token}`,
          },
        },
      );
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API_URL}/api/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${staff.token}`,
          },
        },
      );
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to update booking");
    }
  };

  const statusStyle = (status) => {
    if (status === "confirmed")
      return "bg-green-500/10 text-green-600 border-green-400";
    if (status === "cancelled")
      return "bg-red-500/10 text-red-600 border-red-400";
    return "bg-yellow-500/10 text-yellow-600 border-yellow-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f0eb] via-white to-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Staff Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage booking requests efficiently
        </p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No pending bookings found
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((b, index) => (
          <motion.div
            key={b._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="group"
          >
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-lime-400 via-transparent to-lime-400">
              {/* CARD */}
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-5">
                {/* TOP HEADER */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-800 font-semibold">
                    <FaClipboardList className="text-lime-500" />
                    Booking Request
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${statusStyle(
                      b.status,
                    )}`}
                  >
                    {b.status || "pending"}
                  </span>
                </div>

                {/* USER INFO */}
                <h2 className="text-xl font-bold text-gray-900">
                  {b.roomType}
                </h2>

                <p className="text-gray-600 mt-1">
                  {b.firstName} {b.lastName}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  {new Date(b.checkInDate).toDateString()} →{" "}
                  {new Date(b.checkOutDate).toDateString()}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-6">
                  {/* CONFIRM */}
                  <button
                    disabled={b.status !== "pending"}
                    onClick={() => updateStatus(b._id, "confirmed")}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-green-500 text-white font-semibold hover:scale-105 transition disabled:opacity-40"
                  >
                    <FaCheck />
                    Confirm
                  </button>

                  {/* CANCEL */}
                  <button
                    disabled={b.status !== "pending"}
                    onClick={() => updateStatus(b._id, "cancelled")}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500 text-white font-semibold hover:scale-105 transition disabled:opacity-40"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default StaffDashboard;
