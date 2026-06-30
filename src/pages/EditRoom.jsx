import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API_BASE_URL from "../api";

function EditRoom() {
  const [roomData, setRoomData] = useState({});
  const [image, setImage] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  async function fetchRoom() {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/rooms/${params.id}`,
      );
      setRoomData(res.data);
    } catch (error) {
      toast.error("Failed to fetch room details");
    }
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  function changeHandler(e) {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", roomData.title);
    formData.append("desc", roomData.desc);
    formData.append("price", roomData.price);
    formData.append("rating", roomData.rating);
    formData.append("review", roomData.review);

    if (image) {
      formData.append("image", image);
    }

    await axios.patch(
      `${API_BASE_URL}/api/rooms/${params.id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    toast.success("Room Updated Successfully!");
    navigate("/admin-dashboard");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">
      {/* 🌟 LUMINOUS BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-lime-300 blur-[140px] rounded-full top-[-120px] left-[-120px] opacity-40"></div>
        <div className="absolute w-[400px] h-[400px] bg-emerald-300 blur-[140px] rounded-full bottom-[-120px] right-[-120px] opacity-40"></div>
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-6"
      >
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">
            Edit Room Details
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your luxury room information
          </p>
        </div>

        {/* CURRENT IMAGE */}
        {roomData.image && (
          <div className="flex justify-center mb-4">
            <img
              src={`${API_BASE_URL}/uploads/${roomData.image}`}
              alt="room"
              className="w-40 h-28 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <Form onSubmit={submitHandler} encType="multipart/form-data">
          {/* TITLE */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="title"
              value={roomData.title || ""}
              onChange={changeHandler}
              placeholder="Room Title"
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="desc"
              value={roomData.desc || ""}
              onChange={changeHandler}
              placeholder="Room Description"
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </Form.Group>

          {/* PRICE + RATING */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Form.Control
              type="number"
              name="price"
              value={roomData.price || ""}
              onChange={changeHandler}
              placeholder="Price"
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />

            <Form.Control
              type="number"
              name="rating"
              value={roomData.rating || ""}
              onChange={changeHandler}
              placeholder="Rating"
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </div>

          {/* REVIEW */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="review"
              value={roomData.review || ""}
              onChange={changeHandler}
              placeholder="Review"
              className="rounded-xl py-2 shadow-sm focus:ring-2 focus:ring-lime-300"
            />
          </Form.Group>

          {/* IMAGE */}
          <Form.Group className="mb-4">
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="rounded-xl py-2 shadow-sm"
            />
          </Form.Group>

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
            Update Room
          </motion.button>
        </Form>
      </motion.div>
    </div>
  );
}

export default EditRoom;
