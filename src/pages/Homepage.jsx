import React from 'react'
import HeroSection from '../components/HeroSection'
import Facility from '../components/Facility'
import StaticRooms from '../components/StaticRooms'

function Homepage() {
  return (
    <div>
      <HeroSection />
      <StaticRooms />
      <Facility />
    </div>
  )
}

export default Homepage
