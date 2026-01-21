import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [admin, setAdmin] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedAdmin = localStorage.getItem('admin');
    if (loggedAdmin) navigate('/admin-dashboard');
  }, []);

  function changeHandler(e) {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/admin-login`, admin);
      localStorage.setItem('admin', JSON.stringify(res.data));
      toast.success('Admin Logged In Successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className='w-50 mx-auto my-4'>
      <h2>Admin Login</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={changeHandler} required />
        </Form.Group>
        <Button type="submit" variant="success">Login</Button>
      </Form>
    </div>
  );
}

export default AdminLogin;
