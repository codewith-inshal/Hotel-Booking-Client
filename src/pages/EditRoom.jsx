import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function EditRoom() {
  const [roomData, setRoomData] = useState({})
  const [image, setImage] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  async function fetchRoom() {
    const room = await axios.get(
  `https://hotel-booking-site-d1jr.onrender.com/api/rooms/${params.id}`
);
  }

  useEffect(() => {
    fetchRoom()
  }, [])

  function changeHandler(e) {
    const { name, value } = e.target
    setRoomData({ ...roomData, [name]: value })
  }

  async function submitHandler(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", roomData.title)
    formData.append("desc", roomData.desc)
    formData.append("price", roomData.price)
    formData.append("rating", roomData.rating)
    formData.append("review", roomData.review)

    if (image) {
      formData.append("image", image)
    }

   await axios.patch(
  `https://hotel-booking-site-d1jr.onrender.com/api/rooms/${params.id}`,
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);


    toast.success('Room Edited Successfully!')
    navigate("/admin-dashboard")
  }

  return (
    <div className='w-50 mx-auto my-4'>
      <h2>Edit Room</h2>

      {/* SHOW CURRENT IMAGE */}
      {roomData.image && (
  <div className="text-center mb-3">
    <img
      src={`https://hotel-booking-site-d1jr.onrender.com/uploads/${roomData.image}`}
      alt="room"
      width="120"
      style={{ borderRadius: "10px" }}
    />
  </div>
)}

      <Form onSubmit={submitHandler} encType="multipart/form-data">

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={roomData.title || ""}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="desc"
            value={roomData.desc || ""}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={roomData.price || ""}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            value={roomData.rating || ""}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control
            type="text"
            name="review"
            value={roomData.review || ""}
            onChange={changeHandler}
          />
        </Form.Group>

        {/* ✅ FILE INPUT */}
        <Form.Group className="mb-3">
          <Form.Label>Change Room Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button type='submit' variant='success'>Submit Edits</Button>
      </Form>
    </div>
  )
}

export default EditRoom
