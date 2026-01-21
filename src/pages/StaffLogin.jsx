import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function StaffLogin() {
  const [staff, setStaff] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'https://hotel-booking-site-d1jr.onrender.com';

  // If staff already logged in, redirect to dashboard
  useEffect(() => {
    const loggedStaff = localStorage.getItem('staff');
    if (loggedStaff) navigate('/staff-dashboard');
  }, [navigate]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/staff/staff-login`, staff);

      // Save both staff info and token in localStorage
      const staffData = { token: res.data.token, email: staff.email };
      localStorage.setItem('staff', JSON.stringify(staffData));

      toast.success('Staff Logged In Successfully!');
      navigate('/staff-dashboard'); // Redirect to staff dashboard
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className='w-50 mx-auto my-4'>
      <h2>Staff Login</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={changeHandler}
            value={staff.email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={changeHandler}
            value={staff.password}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default StaffLogin;
