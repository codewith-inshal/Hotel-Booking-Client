import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function StaffRegister() {
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  function changeHandler(e) {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/staff/staff-register`, staff);
      toast.success("Staff Registered Successfully!");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
    }
  }

  return (
    <div className='w-50 mx-auto my-4'>
      <h2>Register as Staff</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={staff.firstName} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={staff.lastName} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={staff.email} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={staff.password} onChange={changeHandler} required />
        </Form.Group>
        <Button type='submit' variant='success'>Register</Button>
      </Form>
    </div>
  );
}

export default StaffRegister;
