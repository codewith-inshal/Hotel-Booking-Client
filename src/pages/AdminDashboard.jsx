import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem('admin'));
  const API_URL = import.meta.env.VITE_API_URL || 'https://hotel-booking-site-d1jr.onrender.com';

  // Fetch Rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rooms`);
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch rooms');
    }
  };

  // Fetch Pending Bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/bookings/pending`,
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch bookings');
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setRooms((prev) => prev.filter((r) => r._id !== id));
      toast.success('Room deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete room');
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API_URL}/api/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update booking');
    }
  };

  return (
    <div className="w-75 mx-auto my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Admin Dashboard</h1>
        <div className="d-flex gap-3">
          <Button onClick={() => navigate('/staff-register')}>
            Add Staff
          </Button>
          <Button onClick={() => navigate('/add-room')}>
            Add Room
          </Button>
        </div>
      </div>

      {/* Booking Requests */}
      <h3 className="mt-4">Pending Bookings</h3>
      {bookings.length === 0 && <p>No pending bookings</p>}

      <div className="d-flex gap-3 flex-wrap">
        {bookings.map((booking) => (
          <Card key={booking._id} style={{ width: '300px' }}>
            <Card.Body>
              <Card.Title>{booking.roomType}</Card.Title>
              <Card.Text>
                {booking.firstName} {booking.lastName}
              </Card.Text>
              <Card.Text>
                {new Date(booking.checkInDate).toDateString()} →{' '}
                {new Date(booking.checkOutDate).toDateString()}
              </Card.Text>

              <div className="d-flex justify-content-between">
                <Button
                  variant="success"
                  onClick={() =>
                    updateBookingStatus(booking._id, 'confirmed')
                  }
                >
                  Confirm
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    updateBookingStatus(booking._id, 'cancelled')
                  }
                >
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Rooms */}
      <h3 className="mt-5">All Rooms</h3>
      <div className="d-flex gap-4 mt-3 flex-wrap">
        {rooms.map((room) => (
          <Card key={room._id} style={{ width: '300px' }}>
            <Card.Img
              variant="top"
              src={
                room.image
                  ? `${API_URL}/uploads/${room.image}`
                  : 'https://via.placeholder.com/300x180'
              }
            />
            <Card.Body>
              <Card.Title>{room.title}</Card.Title>
              <Card.Text>{room.desc}</Card.Text>
              <Card.Text>Price: ${room.price}</Card.Text>

              <div className="d-flex justify-content-between">
                <MdDelete
                  className="fs-2 border p-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => deleteRoom(room._id)}
                />
                <MdEdit
                  className="fs-2 border p-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/edit-room/${room._id}`)}
                />
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
