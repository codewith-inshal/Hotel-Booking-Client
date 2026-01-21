import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

function Footer() {
  return (
    <div className='flex flex-col gap-12 px-16 py-16 bg-black text-white'>
      <div className='flex flex-col justify-between items-center text-center gap-6'>
        <div>
          <h2 className='font-bold text-2xl'>DELUXE <span className='text-lime-400'>STAYS</span></h2>
          <div className='flex justify-center gap-4 mt-3 text-white'>
            <FaFacebook className='text-3xl cursor-pointer hover:text-lime-500'/>
            <FaInstagram className='text-3xl cursor-pointer hover:text-lime-500'/>
            <FaYoutube className='text-3xl cursor-pointer hover:text-lime-500'/>
            <FaLinkedin className='text-3xl cursor-pointer hover:text-lime-500'/>
          </div>
        </div>

        <div>
          <ul className='flex gap-6 justify-center text-base font-medium'>
            <li className='cursor-pointer hover:text-lime-500'>HOME</li>
            <li className='cursor-pointer hover:text-lime-500'>BOOKINGS</li>
            <li className='cursor-pointer hover:text-lime-500'>ROOMS</li>
            <li className='cursor-pointer hover:text-lime-500'>CONTACT</li>
          </ul>
        </div>
      </div>
      <p className='text-center text-sm mt-4'>© 2026 DELUXE STAYS. All rights reserved.</p>
    </div>
  )
}

export default Footer
