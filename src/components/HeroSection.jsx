import React from 'react'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div className='relative h-[100vh] w-full bg-cover bg-center bg-no-repeat' style={{backgroundImage: "url('/hero-bg.jpg')"}}>
      <div className='absolute inset-0 bg-gray-900 opacity-30 z-10'></div>
      <div className='relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4'>
        <h2 className='text-lg mb-4 tracking-widest uppercase'>Where Luxury Meets Diner</h2>
        <h1 className='text-4xl font-bold mb-6'>DELUXE STAYS</h1>
        <Link to={'/rooms'}><button className='bg-lime-500 text-black font-bold py-2.5 px-6 !rounded-lg hover:bg-lime-600 transition'>View Rooms</button></Link>
      </div>
    </div>
  )
}

export default HeroSection
