import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function submitHandler(e) {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match')
    }

    try {
      const res = await axios.post(
        `https://hotel-booking-site-d1jr.onrender.com/reset-password/${token}`,
        { newPassword }
      )

      toast.success(res.data.msg || 'Password reset successful')
      navigate('/user-login')
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Invalid or expired link')
    }
  }

  return (
    <div className="w-50 mx-auto my-5">
      <h2 className="mb-4">Reset Password</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Reset Password
        </Button>
      </Form>
    </div>
  )
}

export default ResetPassword
