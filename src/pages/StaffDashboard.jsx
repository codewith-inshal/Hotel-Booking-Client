import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

function StaffDashboard() {
  const [bookings, setBookings] = useState([]);

  const staff = JSON.parse(localStorage.getItem('staff'));
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/bookings/pending`,
        {
          headers: {
            Authorization: `Bearer ${staff.token}`,
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
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API_URL}/api/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${staff.token}`,
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
      <h2>Staff Dashboard</h2>

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
                  disabled={booking.status !== 'pending'}
                  onClick={() =>
                    updateStatus(booking._id, 'confirmed')
                  }
                >
                  Confirm
                </Button>
                <Button
                  variant="danger"
                  disabled={booking.status !== 'pending'}
                  onClick={() =>
                    updateStatus(booking._id, 'cancelled')
                  }
                >
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StaffDashboard;
