import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaHotel, FaCalendarCheck, FaUsers, FaMoneyBill } from "react-icons/fa";

/* ---------------- STATUS BADGE ---------------- */
const StatusBadge = ({ status }) => {
  const colors = {
    confirmed: "bg-green-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
  };

  return (
    <span
      className={`text-white px-3 py-1 rounded-full text-xs ${colors[status] || "bg-yellow-500"}`}
    >
      {status || "pending"}
    </span>
  );
};

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const API_URL = "http://localhost:5000";

  /* ---------------- FETCH ROOMS ---------------- */
  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rooms`);
      setRooms(res.data);
    } catch (err) {
      toast.error("Failed to fetch rooms");
    }
  };

  /* ---------------- FETCH BOOKINGS ---------------- */
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/bookings/pending`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  /* ---------------- DELETE ROOM ---------------- */
  const deleteRoom = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setRooms((prev) => prev.filter((r) => r._id !== id));
      toast.success("Room deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ---------------- UPDATE BOOKING ---------------- */
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API_URL}/api/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        },
      );
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  /* ---------------- STATS ---------------- */
  const stats = [
    { title: "Rooms", value: rooms.length, icon: <FaHotel /> },
    { title: "Bookings", value: bookings.length, icon: <FaCalendarCheck /> },
    { title: "Users", value: "3.2K", icon: <FaUsers /> },
    { title: "Revenue", value: "$12K", icon: <FaMoneyBill /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f0eb] via-white to-gray-100 p-6">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3 mt-4 md:mt-0">
          <Button
            className="bg-lime-400 border-0 text-black fw-semibold rounded-pill px-4"
            onClick={() => navigate("/staff-register")}
          >
            Add Staff
          </Button>

          <Button
            className="bg-black border-0 text-white rounded-pill px-4"
            onClick={() => navigate("/add-room")}
          >
            Add Room
          </Button>
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition"
          >
            <div className="text-lime-500 text-2xl mb-2">{s.icon}</div>
            <h3 className="text-gray-500 text-sm">{s.title}</h3>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ---------------- BOOKINGS TABLE ---------------- */}
      <h2 className="text-2xl font-semibold mb-4">Pending Bookings</h2>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12">
        <table className="w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">User</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {b.firstName} {b.lastName}
                </td>

                <td>{b.roomType}</td>

                <td className="text-xs">
                  {new Date(b.checkInDate).toDateString()} →{" "}
                  {new Date(b.checkOutDate).toDateString()}
                </td>

                <td>
                  <StatusBadge status={b.status} />
                </td>

                <td className="flex gap-2 p-2">
                  <button
                    onClick={() => updateBookingStatus(b._id, "confirmed")}
                    className="bg-lime-500 px-3 py-1 rounded-full text-xs"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateBookingStatus(b._id, "cancelled")}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- ROOMS ---------------- */}
      <h2 className="text-2xl font-semibold mb-4">All Rooms</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <motion.div key={room._id} whileHover={{ y: -10 }}>
            <Card className="border-0 rounded-3xl overflow-hidden shadow-lg bg-white/80">
              <img
                src={
                  room.image
                    ? `${API_URL}/uploads/${room.image}`
                    : "https://via.placeholder.com/300"
                }
                className="h-[220px] w-full object-cover"
              />

              <Card.Body>
                <Card.Title className="fw-bold">{room.title}</Card.Title>

                <Card.Text>{room.desc}</Card.Text>

                <Card.Text className="text-lime-600 fw-semibold">
                  ${room.price}
                </Card.Text>

                <div className="flex justify-between mt-3">
                  <MdDelete
                    className="text-3xl text-red-500 cursor-pointer"
                    onClick={() => deleteRoom(room._id)}
                  />

                  <MdEdit
                    className="text-3xl text-blue-500 cursor-pointer"
                    onClick={() => navigate(`/edit-room/${room._id}`)}
                  />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
