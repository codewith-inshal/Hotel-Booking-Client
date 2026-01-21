import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  function changeHandler(e) {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/admin-register`, admin);
      toast.success("Admin Registered Successfully!");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
    }
  }

  return (
    <div className='w-50 mx-auto my-4'>
      <h2>Register as an Admin</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={admin.firstName} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={admin.lastName} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={admin.email} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={admin.password} onChange={changeHandler} required />
        </Form.Group>
        <Button type='submit' variant='success'>Register</Button>
      </Form>
    </div>
  );
}

export default AdminRegister;
