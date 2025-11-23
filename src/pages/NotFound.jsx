import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="relative w-screen h-screen bg-[#FFE7E2] overflow-hidden flex flex-col items-center justify-center">
      <div className='flex flex-col items-center justify-center gap-8'>
        <h1 className='text-6xl md:text-8xl font-calsans text-[#FF5900]'>404</h1>
        <h2 className='text-3xl md:text-4xl font-calsans text-[#FF5900]'>Page Not Found</h2>
        <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat text-center max-w-md'>
          Oops! The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link 
          to="/" 
          className='mt-6 px-8 py-3 bg-[#FF5900] text-white rounded-lg font-montserrat text-lg font-bold hover:opacity-80 transition-opacity'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
