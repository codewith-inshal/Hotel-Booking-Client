import React, { useState } from 'react';
import { Col, Form, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function BookRoom() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  // Get user info once from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser) {
    navigate('/user-login'); // redirect if not logged in
  }

  const user = storedUser;

  const API_URL = import.meta.env.VITE_API_URL || 'https://hotel-booking-site-d1jr.onrender.com';

  const [formData, setFormData] = useState({
    firstName: user?.user?.firstName || '',
    lastName: user?.user?.lastName || '',
    email: user?.user?.email || '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
    roomType: 'presidential',
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please login first');
      return;
    }

    if (!formData.terms) {
      setError('Please accept terms');
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API_URL}/api/bookings/book-room`,
        { ...formData, roomId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setSuccess('Booking successful 🎉');
      toast.success('Booking Request Sent successful!');

      setTimeout(() => {
        navigate('/bookings'); // Redirect to bookings after 1 second
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Booking failed');
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-50 mx-auto my-4">
      <h2>Book Your Stay</h2>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Check-In Date</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Check-Out Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Adults</Form.Label>
              <Form.Control
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min={1}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Children</Form.Label>
              <Form.Control
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min={0}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Room Type</Form.Label>
          <Form.Select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
          >
            <option value="presidential">Presidential</option>
            <option value="vip">VIP</option>
            <option value="executive">Executive</option>
            <option value="double">Double</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Accept terms & conditions"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
        </Form.Group>

        <button
          type="submit"
          disabled={loading}
          className="bg-lime-500 font-bold py-2 px-7 !rounded-lg"
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </Form>
    </div>
  );
}

export default BookRoom;
