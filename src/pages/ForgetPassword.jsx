import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import toast from 'react-hot-toast'

function ForgetPassword() {
  const [email, setEmail] = useState('')

  async function submitHandler(e) {
    e.preventDefault()

    try {
      const res = await axios.post('https://hotel-booking-site-d1jr.onrender.com/forgot-password', {
        email
      })

      toast.success(res.data.msg || 'Password reset email sent')
      setEmail('')
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Something went wrong')
    }
  }

  return (
    <div className="w-50 mx-auto my-5">
      <h2 className="mb-4">Forgot Password</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Send Reset Link
        </Button>
      </Form>
    </div>
  )
}

export default ForgetPassword
