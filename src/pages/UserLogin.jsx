import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/user/user-login`,
        user
      );

      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Login Successful!');

      // ✅ Redirect to rooms (NOT book-room)
      navigate('/rooms');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="w-50 mx-auto my-4">
      <h2>User Login</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Login
        </Button>

        <p className="mt-3">
          Don't have an account? <Link to="/user-register">Register</Link>
        </p>
      </Form>
    </div>
  );
}

export default UserLogin;
