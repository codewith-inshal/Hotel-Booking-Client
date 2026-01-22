import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Badge, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch bookings');
    }
  };

  useEffect(() => {
    if (user?.token) fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="w-75 mx-auto my-4">
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet</p>}

      <div className="d-flex gap-3 flex-wrap">
        {bookings.map((booking) => (
          <Card key={booking._id} style={{ width: '320px' }}>
            <Card.Body>
              <Card.Title>{booking.roomType}</Card.Title>
              <Card.Text>
                {new Date(booking.checkInDate).toDateString()} →{' '}
                {new Date(booking.checkOutDate).toDateString()}
              </Card.Text>

              <Badge bg={booking.status === 'cancelled' ? 'danger' : 'success'}>
                {booking.status.toUpperCase()}
              </Badge>

              <div className="mt-3">
                <Button
                  variant="danger"
                  size="sm"
                  disabled={booking.status === 'cancelled'}
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
