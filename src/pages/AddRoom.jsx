import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddRoom() {
  const [room, setRoom] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
    image: null,
  });

  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, type, value, files } = e.target;
    setRoom({ ...room, [name]: type === "file" ? files[0] : value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in room) formData.append(key, room[key]);

      await axios.post("http://localhost:5000/api/rooms", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Room Added Successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add room");
    }
  }

  return (
    <div className="w-50 mx-auto my-4">
      <h2>Add Room</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Room Title"
            name="title"
            value={room.title}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Room Description"
            name="desc"
            value={room.desc}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            name="price"
            value={room.price}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Rating"
            name="rating"
            value={room.rating}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Review"
            name="review"
            value={room.review}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Room Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={changeHandler}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Add Room
        </Button>
      </Form>
    </div>
  );
}

export default AddRoom;
