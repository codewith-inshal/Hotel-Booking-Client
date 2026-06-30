import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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

function UserRegister() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // 👇 Password Toggle
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
      await axios.post(`${API_BASE_URL}/api/user/user-register`, user);

      toast.success("User Registered Successfully!");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
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
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop')",
            }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/65"></div>

          {/* Content */}
          <div className="relative z-10 text-white">
            <p className="uppercase tracking-[0.3em] text-lime-400 text-sm mb-4">
              Join Deluxe Stays
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Create Your
              <br />
              Luxury Account
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Register now to book premium rooms, manage reservations, and enjoy
              unforgettable luxury experiences.
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
            {/* HEADING */}
            <div className="mb-10">
              <p className="uppercase tracking-[0.3em] text-lime-500 text-sm mb-3">
                User Registration
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Create Account
              </h2>

              <p className="text-gray-500">
                Fill in your details to get started
              </p>
            </div>

            {/* FORM */}
            <Form onSubmit={submitHandler}>
              {/* FIRST + LAST NAME */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* FIRST NAME */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-gray-700 fw-semibold mb-2">
                    First Name
                  </Form.Label>

                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 
                      -translate-y-1/2 text-gray-400 z-10"
                    >
                      <FaUser />
                    </span>

                    <Form.Control
                      name="firstName"
                      value={user.firstName}
                      onChange={changeHandler}
                      required
                      placeholder="First name"
                      className="ps-5 py-3 rounded-4 border-0 bg-gray-100 shadow-none"
                    />
                  </div>
                </Form.Group>

                {/* LAST NAME */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-gray-700 fw-semibold mb-2">
                    Last Name
                  </Form.Label>

                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 
                      -translate-y-1/2 text-gray-400 z-10"
                    >
                      <FaUser />
                    </span>

                    <Form.Control
                      name="lastName"
                      value={user.lastName}
                      onChange={changeHandler}
                      required
                      placeholder="Last name"
                      className="ps-5 py-3 rounded-4 border-0 bg-gray-100 shadow-none"
                    />
                  </div>
                </Form.Group>
              </div>

              {/* EMAIL */}
              <Form.Group className="mb-4">
                <Form.Label className="text-gray-700 fw-semibold mb-2">
                  Email Address
                </Form.Label>

                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 
                    -translate-y-1/2 text-gray-400 z-10"
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
              <Form.Group className="mb-5">
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
                    placeholder="Create password"
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
                    Register
                    <FaArrowRight />
                  </div>
                </Button>
              </motion.div>

              {/* LOGIN */}
              <p className="text-center text-gray-600 mt-5">
                Already have an account?{" "}
                <Link
                  to="/user-login"
                  className="text-lime-600 fw-semibold text-decoration-none"
                >
                  Login
                </Link>
              </p>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserRegister;
