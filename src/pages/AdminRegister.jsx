import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API_BASE_URL from "../api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function AdminRegister() {
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/admin/admin-register`, admin);

      toast.success("Admin Registered Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f0eb] via-white to-gray-100 px-4 py-10">
      <div className="grid lg:grid-cols-2 max-w-6xl w-full overflow-hidden rounded-[2rem] shadow-2xl">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:flex flex-col justify-center p-16 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop')",
            }}
          ></div>

          <div className="absolute inset-0 bg-black/65"></div>

          <div className="relative z-10 text-white">
            <p className="uppercase tracking-[0.3em] text-lime-400 text-sm mb-4">
              Admin Panel
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Manage Hotel
              <br />
              System
            </h2>

            <p className="text-gray-300 text-lg max-w-md">
              Create admin accounts to manage rooms, bookings, and staff
              efficiently.
            </p>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-14 flex items-center"
        >
          <div className="w-full">
            {/* HEADER */}
            <div className="mb-10">
              <p className="uppercase tracking-[0.3em] text-lime-500 text-sm mb-3">
                Admin Registration
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Create Admin
              </h2>

              <p className="text-gray-500">
                Setup system administrator account
              </p>
            </div>

            <Form onSubmit={submitHandler}>
              {/* NAME */}
              <div className="grid md:grid-cols-2 gap-4">
                <Form.Group className="mb-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaUser />
                    </span>
                    <Form.Control
                      name="firstName"
                      value={admin.firstName}
                      onChange={changeHandler}
                      placeholder="First Name"
                      className="ps-5 py-3 rounded-4 border-0 bg-gray-100"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaUser />
                    </span>
                    <Form.Control
                      name="lastName"
                      value={admin.lastName}
                      onChange={changeHandler}
                      placeholder="Last Name"
                      className="ps-5 py-3 rounded-4 border-0 bg-gray-100"
                    />
                  </div>
                </Form.Group>
              </div>

              {/* EMAIL */}
              <Form.Group className="mb-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </span>
                  <Form.Control
                    type="email"
                    name="email"
                    value={admin.email}
                    onChange={changeHandler}
                    placeholder="Email"
                    className="ps-5 py-3 rounded-4 border-0 bg-gray-100"
                  />
                </div>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-5">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </span>

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={admin.password}
                    onChange={changeHandler}
                    placeholder="Password"
                    className="ps-5 pe-5 py-3 rounded-4 border-0 bg-gray-100"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>

              {/* BUTTON */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="w-100 border-0 rounded-pill py-3 bg-lime-400 text-black fw-bold"
                >
                  <div className="flex justify-center items-center gap-2">
                    Register Admin <FaArrowRight />
                  </div>
                </Button>
              </motion.div>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminRegister;
