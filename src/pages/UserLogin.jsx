import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API_BASE_URL from "../api";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function UserLogin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // 👇 Password Toggle State
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/user/user-login`,
        user,
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login Successful!");

      navigate("/rooms");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#f8f0eb] via-white to-gray-100 px-4 py-10"
    >
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
              Welcome Back
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Luxury Stays
              <br />
              Await You
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Login to access your bookings, premium rooms, and unforgettable
              luxury experiences.
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
            {/* Heading */}
            <div className="mb-10">
              <p className="uppercase tracking-[0.3em] text-lime-500 text-sm mb-3">
                User Login
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mb-3">Sign In</h2>

              <p className="text-gray-500">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <Form onSubmit={submitHandler}>
              {/* EMAIL */}
              <Form.Group className="mb-5">
                <Form.Label className="text-gray-700 fw-semibold mb-2">
                  Email Address
                </Form.Label>

                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 
                    -translate-y-1/2 text-gray-400"
                  >
                    <FaEnvelope />
                  </span>

                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={changeHandler}
                    required
                    placeholder="Enter your email"
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
                  {/* Lock Icon */}
                  <span
                    className="absolute left-4 top-1/2 
                    -translate-y-1/2 text-gray-400 z-10"
                  >
                    <FaLock />
                  </span>

                  {/* Input */}
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                    required
                    placeholder="Enter your password"
                    className="ps-5 pe-5 py-3 rounded-4 border-0 bg-gray-100 shadow-none"
                  />

                  {/* Eye Icon */}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 
                    -translate-y-1/2 text-gray-500 cursor-pointer z-10"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>

              {/* FORGOT PASSWORD */}
              <div className="text-end mb-5">
                <Link
                  to="/forget-password"
                  className="text-sm text-lime-600 text-decoration-none fw-semibold"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* BUTTON */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Button
                  type="submit"
                  className="w-100 border-0 rounded-pill py-3 
                  bg-lime-400 text-black fw-bold 
                  shadow-lg hover:bg-lime-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    Login
                    <FaArrowRight />
                  </div>
                </Button>
              </motion.div>

              {/* REGISTER */}
              <p className="text-center text-gray-600 mt-5">
                Don&apos;t have an account?{" "}
                <Link
                  to="/user-register"
                  className="text-lime-600 fw-semibold text-decoration-none"
                >
                  Register
                </Link>
              </p>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserLogin;
