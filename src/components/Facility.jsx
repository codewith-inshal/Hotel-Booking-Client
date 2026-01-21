import React from 'react'
import { FaBath, FaCar, FaCocktail, FaConciergeBell, FaShuttleVan, FaSwimmingPool } from 'react-icons/fa'


const services =[
    {
        icon: <FaShuttleVan size={32} />,
        title: 'Pick Up & Drop',
        desc: 'Convenient airport and city pick-up & drop services available on request.'
    },
    {
        icon: <FaCar size={32} />,
        title: 'Parking Space',
        desc: 'Secure and spacious on-site parking for all guests.'
    },
    {
        icon: <FaCocktail size={32} />,
        title: 'Welcome Drink',
        desc: 'Refreshing welcome drink served upon arrival'
    },
    {
        icon: <FaBath size={32} />,
        title: 'Hot & Cold Water',
        desc: '24/7 hot and cold water supply in all rooms.'
    },
    {
        icon: <FaConciergeBell size={32} />,
        title: 'Full Board',
        desc: 'Complete meal plan including breakfast, lunch, and dinner.'
    },
    {
        icon: <FaSwimmingPool size={32} />,
        title: 'Swimming Pool',
        desc: 'Clean and well-maintained swimming pool for relaxation and leisure.'
    },
]

function Facility() {
  return (
    <div className='bg-[#f8f0eb] py-16 px-4 md:px-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12'>
            <p className='text-sm tracking-widest uppercase text-gray-500'>Services</p>
            <h2 className='text-4xl font-serif font-semibold text-gray-800'>Facilities & Services</h2>
        </div>

        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-10'>
            {
                services.map((service, index) => (
                    <div key={index} className='flex flex-col items-start space-y-3'>
                        <div className='bg-lime-400 rounded-full p-4 text-black'>{service.icon} </div>
                        <h3 className='text-2xl font-semibold text-gray-800'>{service.title} </h3>
                        <p className='text-gray-500 max-w-xs text-sm'>{service.desc} </p>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Facility
