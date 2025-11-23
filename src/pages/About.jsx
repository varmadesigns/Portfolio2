import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const CountUp = ({ start, end, duration }) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)
      if (progress < 1) {
        setCount(Math.floor(start + (end - start) * progress))
        requestAnimationFrame(animateCount)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(animateCount)
  }, [])

  return <>{count}%</>
}

const About = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-screen min-h-screen bg-[#fff1ee] overflow-hidden">
      {isLoading && (
        <div className='fixed inset-0 bg-[#fff1ee] flex items-center justify-center z-50'>
          <div className='flex flex-col items-center gap-4'>
            <div className='text-6xl md:text-8xl font-calsans text-[#FF5900]'>
              <CountUp start={0} end={100} duration={1.5} />
            </div>
            <p className='text-lg font-montserrat text-[#FF5900]'>Loading...</p>
          </div>
        </div>
      )}
      <div className='flex flex-col items-center justify-start pt-20 px-6 md:px-20 pb-20'>
        {/* Header */}
        <div className='flex items-center justify-between w-full mb-16'>
          <h1 className='text-4xl md:text-6xl font-calsans text-[#FF5900]'>About Me</h1>
          <Link to="/" className='font-montserrat text-lg md:text-xl text-[#FF5900] hover:opacity-70 transition-opacity'>
            Back Home
          </Link>
        </div>

        {/* About Content */}
        <div className='w-full max-w-4xl flex flex-col gap-12'>
          {/* Introduction */}
          <div className='flex flex-col gap-4'>
            <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
              Hi! I'm <span className='font-bold'>Ajay Varma</span>, a passionate full-stack developer and UI/UX designer based in India. I love building beautiful, functional digital products that solve real problems and create meaningful user experiences.
            </p>
          </div>

          {/* Developer Section */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl md:text-4xl font-calsans text-[#FF5900]'>Development</h2>
            <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
              As a full-stack developer, I specialize in building complete digital products from the ground up. I have expertise in modern web technologies including React, Node.js, MongoDB, and more. I focus on writing clean, maintainable code and creating scalable solutions that perform well.
            </p>
            <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
              My development philosophy centers on user-focused design, performance optimization, and creating experiences that feel smooth and responsive. I believe in the power of full-stack development to bridge the gap between beautiful design and robust backend systems.
            </p>
          </div>

          {/* Design Section */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl md:text-4xl font-calsans text-[#FF5900]'>Design</h2>
            <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
              As a UI/UX designer, I craft intuitive interfaces that users love to interact with. I focus on clarity, detail, and user-centered design principles to create meaningful digital experiences. Every design decision is made with the end user in mind.
            </p>
            <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
              I believe great design is about more than aesthetics—it's about creating solutions that are functional, accessible, and delightful to use. I work with design tools like Figma to bring ideas to life and ensure every pixel serves a purpose.
            </p>
          </div>

          {/* What I Do */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl md:text-4xl font-calsans text-[#FF5900]'>What I Do</h2>
            <ul className='flex flex-col gap-3'>
              <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Full-stack web development with modern technologies</li>
              <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ UI/UX design for web and mobile applications</li>
              <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Design systems and component libraries</li>
              <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Web performance optimization</li>
              <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Responsive design implementation</li>
            </ul>
          </div>

          {/* CTA */}
          <div className='flex gap-4 pt-8'>
            <Link
              to="/projects"
              className='px-8 py-3 bg-[#FF5900] text-white rounded-lg font-montserrat text-lg font-bold hover:opacity-80 transition-opacity'
            >
              View My Projects
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
