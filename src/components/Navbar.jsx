import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  // Get current logged-in role
  const user = JSON.parse(localStorage.getItem('user'))
  const staff = JSON.parse(localStorage.getItem('staff'))
  const admin = JSON.parse(localStorage.getItem('admin'))

  // Logout clears all roles
  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('staff')
    localStorage.removeItem('admin')
    navigate('/') // redirect to homepage
  }

  return (
    <nav className='flex justify-between items-center p-[2rem] bg-black text-white'>
      {/* Logo */}
      <div>
        <h2 className='font-bold text-2xl'>
          DELUXE <span className='text-lime-400'>STAYS</span>
        </h2>
      </div>

      {/* Navigation Links */}
      <ul className='flex justify-between gap-8'>
        <li className='font-bold text-lg cursor-pointer hover:text-lime-500' onClick={() => navigate('/')}>HOME</li>
        <li className='font-bold text-lg cursor-pointer hover:text-lime-500' onClick={() => navigate('/rooms')}>ROOMS</li>
        <li className='font-bold text-lg cursor-pointer hover:text-lime-500' onClick={() => navigate('/bookings')}>BOOKINGS</li>
        <li className='font-bold text-lg cursor-pointer hover:text-lime-500' onClick={() => navigate('/contact')}>CONTACT</li>
      </ul>

      {/* Role-based Buttons */}
      <div className='flex gap-2'>
        {/* Not logged in */}
        {!user && !staff && !admin && (
          <>
            <Link to='/user-login'>
              <button className='bg-lime-500 text-black font-bold py-2 px-7 !rounded-lg hover:bg-lime-600 transition'>
                User Login
              </button>
            </Link>
            <Link to='/staff-login'>
              <button className='bg-lime-500 text-black font-bold py-2 px-7 !rounded-lg hover:bg-lime-600 transition'>
                Staff Login
              </button>
            </Link>
           
          </>
        )}

        {/* User logged in */}
        {user && (
          <>
            <button
              className='bg-lime-500 text-black font-bold py-2 px-7 !rounded-lg hover:bg-lime-600 transition'
              onClick={() => navigate('/bookings')}
            >
              My Bookings
            </button>
            <button
              className='bg-red-600 text-white font-bold py-2 px-7 !rounded-lg hover:bg-red-700 transition'
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        {/* Staff logged in */}
        {staff && (
          <>
            <button
              className='bg-lime-500 text-black font-bold py-2 px-7 !rounded-lg hover:bg-lime-600 transition'
              onClick={() => navigate('/staff-dashboard')}
            >
              Dashboard
            </button>
            <button
              className='bg-red-600 text-white font-bold py-2 px-7 !rounded-lg hover:bg-red-700 transition'
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        {/* Admin logged in */}
        {admin && (
          <>
            <button
              className='bg-lime-500 text-black font-bold py-2 px-7 !rounded-lg hover:bg-lime-600 transition'
              onClick={() => navigate('/admin-dashboard')}
            >
              Admin Dashboard
            </button>
            <button
              className='bg-red-600 text-white font-bold py-2 px-7 !rounded-lg hover:bg-red-700 transition'
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
