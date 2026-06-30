import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Form, Button } from "react-bootstrap";
import API_BASE_URL from "../api";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

function AdminLogin() {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedAdmin = localStorage.getItem("admin");
    if (loggedAdmin) navigate("/admin-dashboard");
  }, [navigate]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/admin/admin-login`,
        admin,
      );

      localStorage.setItem("admin", JSON.stringify(res.data));

      toast.success("Admin Logged In Successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
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
          className="relative hidden lg:flex flex-col justify-center p-16"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')",
            }}
          ></div>

          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 text-white">
            <p className="uppercase tracking-[0.3em] text-lime-400 text-sm mb-4">
              Admin Panel
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Control
              <br />
              Everything
            </h2>

            <p className="text-gray-300 text-lg max-w-md">
              Manage rooms, bookings, staff and hotel operations from a single
              powerful dashboard.
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
                Admin Login
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Welcome Back
              </h2>

              <p className="text-gray-500">Access admin dashboard</p>
            </div>

            {/* FORM */}
            <Form onSubmit={submitHandler}>
              {/* EMAIL */}
              <Form.Group className="mb-5">
                <Form.Label className="text-gray-700 fw-semibold mb-2">
                  Email Address
                </Form.Label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </span>

                  <Form.Control
                    type="email"
                    name="email"
                    value={admin.email}
                    onChange={changeHandler}
                    required
                    placeholder="Enter email"
                    className="ps-5 py-3 rounded-4 border-0 bg-gray-100 shadow-none"
                  />
                </div>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-4">
                <Form.Label className="text-gray-700 fw-semibold mb-2">
                  Password
                </Form.Label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </span>

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={admin.password}
                    onChange={changeHandler}
                    required
                    placeholder="Enter password"
                    className="ps-5 pe-5 py-3 rounded-4 border-0 bg-gray-100 shadow-none"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <Link
                  to="/forget-password"
                  className="text-sm text-lime-600 text-decoration-none fw-semibold"
                >
                  Forgot Password?
                </Link>
              </Form.Group>

              {/* BUTTON */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="w-100 border-0 rounded-pill py-3 bg-lime-400 text-black fw-bold shadow-lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    Login
                    <FaArrowRight />
                  </div>
                </Button>
              </motion.div>

              {/* FOOTER */}
              <p className="text-center text-gray-600 mt-5">
                Back to{" "}
                <Link
                  to="/"
                  className="text-lime-600 fw-semibold text-decoration-none"
                >
                  Home
                </Link>
              </p>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminLogin;
