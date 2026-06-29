import React, { useEffect, useState } from "react";
import { Col, Form, Row, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUserFriends, FaClipboardList } from "react-icons/fa";

function BookRoom() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) navigate("/user-login");

  const user = storedUser;

  const [formData, setFormData] = useState({
    firstName: user?.user?.firstName || "",
    lastName: user?.user?.lastName || "",
    email: user?.user?.email || "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    roomType: "presidential",
    terms: false,
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/my-bookings`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    if (user?.token) fetchMyBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      setError("Accept terms first");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/bookings/book-room`,
        { ...formData, roomId },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );

      toast.success("Booking sent!");
      fetchMyBookings();

      setTimeout(() => navigate("/bookings"), 1000);
    } catch (err) {
      setError("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Book Your Stay</h1>
        <p className="text-gray-500 mt-2">
          Fill details and confirm your reservation
        </p>
      </div>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* MAIN LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* FORM */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Label>Check-In</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Check-Out</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Adults</Form.Label>
                <Form.Control
                  type="number"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Children</Form.Label>
                <Form.Control
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Room Type</Form.Label>
              <Form.Select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
              >
                <option value="presidential">Presidential</option>
                <option value="vip">VIP</option>
                <option value="executive">Executive</option>
                <option value="double">Double</option>
              </Form.Select>
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Accept terms & conditions"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="mb-4"
            />

            {/* REAL BUTTON (FIXED ISSUE) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </Form>
        </motion.div>

        {/* SUMMARY */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-lg font-semibold mb-3">Live Booking Summary</h2>

          <p>
            <b>Room:</b> {formData.roomType}
          </p>
          <p>
            <b>Adults:</b> {formData.adults}
          </p>
          <p>
            <b>Children:</b> {formData.children}
          </p>
          <p>
            <b>Check-In:</b> {formData.checkInDate || "-"}
          </p>
          <p>
            <b>Check-Out:</b> {formData.checkOutDate || "-"}
          </p>
        </motion.div>
      </div>

      {/* 🔥 IMAGE BANNER SECTION */}
      <div className="mt-10 bg-black rounded-3xl overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          className="w-full h-[300px] object-cover opacity-60"
          alt="hotel"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <h2 className="text-3xl font-bold">Experience Premium Comfort</h2>
          <p className="text-gray-200 mt-2 max-w-xl">
            Every room is designed to give you a 5-star hotel experience with
            modern amenities and luxury interiors.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookRoom;
