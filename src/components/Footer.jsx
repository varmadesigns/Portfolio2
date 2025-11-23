import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full bg-[#FF5900] text-white py-8 px-6 md:px-20 mt-16'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8'>
        {/* Contact Email */}
        <div className='flex flex-col items-center md:items-start gap-2'>
          <p className='font-montserrat text-sm text-white opacity-80'>Get In Touch</p>
          <a 
            href="mailto:ajaydesigns@gmail.com"
            className='font-montserrat relative group text-lg font-bold opacity-70 hover:opacity-100 transition-opacity'
          >
            ajaydesigns@gmail.com
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-in-out'></span>
          </a>
        </div>

        {/* Social Links */}
        <div className='flex flex-col items-center gap-2'>
          <p className='font-montserrat font-bold text-xl text-white'>Work Together? Write an email </p>
          <div className='flex flex-wrap justify-center md:justify-start gap-4'>
            <a 
              href="https://github.com/varmadesigns"
              target="_blank"
              rel="noopener noreferrer"
              className='font-montserrat relative group'
            >
              GitHub
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-in-out'></span>
            </a>
            <a 
              href="https://x.com/AJAYVARMA123629"
              target="_blank"
              rel="noopener noreferrer"
              className='font-montserrat relative group'
            >
              Twitter
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-in-out'></span>
            </a>
            <a 
              href="https://www.linkedin.com/in/ajay-varma-aaa71933b/"
              target="_blank"
              rel="noopener noreferrer"
              className='font-montserrat relative group'
            >
              LinkedIn
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-in-out'></span>
            </a>
            <a 
              href="https://www.instagram.com/varmadesignzz/"
              target="_blank"
              rel="noopener noreferrer"
              className='font-montserrat relative group'
            >
              Instagram
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-in-out'></span>
            </a>
            <a 
              href="https://www.behance.net/ajaydesigns"
              target="_blank"
              rel="noopener noreferrer"
              className='font-montserrat relative group'
            >
              Behance
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-in-out'></span>
            </a>
            <a 
              href="https://dribbble.com/AjayVarmadesignare"
              target="_blank"
              rel="noopener noreferrer"
              className='font-montserrat relative group'
            >
              Dribbble
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-in-out'></span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center md:text-right'>
          <p className='font-montserrat text-sm text-white/80'>
            © 2024 Ajay Varma
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
