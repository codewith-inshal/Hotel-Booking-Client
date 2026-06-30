import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBan, FaCheckCircle } from "react-icons/fa";
import API_BASE_URL from "../api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/bookings/my-bookings`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    if (user?.token) fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (err) {
      toast.error("Failed to cancel booking");
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
    <div className="min-h-screen bg-gradient-to-br from-[#f8f0eb] via-white to-gray-100 px-6 py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 mt-2">Manage your hotel reservations</p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 && (
        <div className="text-center text-gray-400 mt-20">No bookings yet</div>
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
          >
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-5 border border-gray-100">
              {/* TOP */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FaCalendarAlt className="text-lime-500" />
                  Trip Details
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full border ${statusStyle(
                    b.status,
                  )}`}
                >
                  {b.status?.toUpperCase()}
                </span>
              </div>

              {/* CONTENT */}
              <h2 className="text-xl font-bold text-gray-900">{b.roomType}</h2>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(b.checkInDate).toDateString()} →{" "}
                {new Date(b.checkOutDate).toDateString()}
              </p>

              {/* STATUS ICON */}
              <div className="mt-4 flex items-center gap-2 text-sm">
                {b.status === "confirmed" && (
                  <span className="text-green-500 flex items-center gap-1">
                    <FaCheckCircle /> Confirmed
                  </span>
                )}

                {b.status === "cancelled" && (
                  <span className="text-red-500 flex items-center gap-1">
                    <FaBan /> Cancelled
                  </span>
                )}

                {b.status === "pending" && (
                  <span className="text-yellow-500">Pending Approval</span>
                )}
              </div>

              {/* ACTION */}
              <button
                onClick={() => cancelBooking(b._id)}
                disabled={b.status === "cancelled"}
                className="mt-5 w-full py-2 rounded-xl bg-red-500 text-white font-semibold hover:scale-105 transition disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <FaBan />
                Cancel Booking
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
