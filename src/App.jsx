import React from 'react'
import NoiseOverlay from './components/Noise'

function App() {
  return (
    <>
      <section id="hero" className="h-full w-full">
        <header className='m-8 flex justify-center md:justify-start items-center gap-4'>
          <img src="logo.svg" alt="logo" className='h-8'/>
          <p className='text-2xl font-calsans text-[#FF5900]'>Ajay Varma</p>
        </header>
        <h1 className='text-[100px] md:text-[200px] font-calsans text-[#FF5900] flex justify-center'><NoiseOverlay size={0.5} density={100} color="rgba(0, 0, 0, 0.2)" />Hello!</h1>
        <div className='h-full m-10 flex flex-col md:flex-row gap-6 justify-between'>
          <div className='flex flex-col items-start md:items-center'>
            <p className='text-2xl md:text-3xl font-montserrat font-bold text-[#FF5900] md:text-center'>Interested in my <br />Technical Skills</p>
            <p className='text-lg md:text-xl text-[#FF5900]/50 font-montserrat font-normal' >scroll up</p>
          </div>
          <div className='flex flex-col items-end md:items-center'>
            <p className='text-2xl md:text-3xl font-montserrat font-bold text-[#FF5900] text-end md:text-center'>Interested in my <br />Technical Skills</p>
            <p className='text-xl hidden md:block text-[#FF5900]/50 font-montserrat font-normal' >scroll up</p>
            <p className='text-lg md:hidden text-[#FF5900]/50 font-montserrat font-normal' >scroll up</p>
          </div>
        </div>
        <div id="bottom-div" className='h-30 md:h-50 w-full bg-[#FF5900] fixed bottom-0'>
          <NoiseOverlay size={0.5} density={100} color="rgba(0, 0, 0, 1)"/>
        </div>
        <img src="ajay.png" alt="myphoto" className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -bottom-10 object-contain'/>
      </section>
    </>
  )
}

export default App