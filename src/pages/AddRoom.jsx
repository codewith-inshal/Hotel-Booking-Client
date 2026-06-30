import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import API_BASE_URL from "../api";

function AddRoom() {
  const [room, setRoom] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      setRoom({ ...room, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setRoom({ ...room, [name]: value });
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let key in room) formData.append(key, room[key]);

      await axios.post(`${API_BASE_URL}/api/rooms`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Room Added Successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error("Failed to add room");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">
      {/* 🌟 LUMINOUS BACKGROUND EFFECT */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-lime-300 blur-[140px] rounded-full top-[-100px] left-[-100px] opacity-40"></div>
        <div className="absolute w-[400px] h-[400px] bg-emerald-300 blur-[140px] rounded-full bottom-[-100px] right-[-100px] opacity-40"></div>
      </div>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-6"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add Room</h2>
          <p className="text-gray-500 text-sm mt-1">
            Create a premium stay experience for your guests
          </p>
        </div>

        <Form onSubmit={submitHandler}>
          {/* TITLE */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Room Title"
              name="title"
              value={room.title}
              onChange={changeHandler}
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Room Description"
              name="desc"
              value={room.desc}
              onChange={changeHandler}
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </Form.Group>

          {/* PRICE + RATING */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Form.Control
              type="number"
              placeholder="Price"
              name="price"
              value={room.price}
              onChange={changeHandler}
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />

            <Form.Control
              type="number"
              placeholder="Rating"
              name="rating"
              value={room.rating}
              onChange={changeHandler}
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </div>

          {/* REVIEW */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Review"
              name="review"
              value={room.review}
              onChange={changeHandler}
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </Form.Group>

          {/* IMAGE */}
          <Form.Group className="mb-4">
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={changeHandler}
              className="rounded-xl py-2 shadow-sm"
            />
          </Form.Group>

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="preview"
                className="w-full h-52 object-cover rounded-2xl shadow-md"
              />
            </div>
          )}

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 0px 25px rgba(163,230,53,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-lime-400 text-black font-bold py-3 rounded-xl transition"
          >
            Add Room
          </motion.button>
        </Form>
      </motion.div>
    </div>
  );
}

export default AddRoom;
