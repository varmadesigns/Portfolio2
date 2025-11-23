import React, { useState, useEffect, useRef } from 'react'
import projects from './projects.json'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

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

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true)
  const projectRefs = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return

    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              end: 'top 10%',
              scrub: false,
              onEnter: () => {
                gsap.fromTo(
                  ref,
                  { opacity: 0, x: -100 },
                  { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
                )
              },
              onLeave: () => {
                gsap.to(ref, { opacity: 0, x: -100, duration: 0.8, ease: 'power3.in' })
              },
              onEnterBack: () => {
                gsap.to(ref, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
              },
              onLeaveBack: () => {
                gsap.to(ref, { opacity: 0, x: -100, duration: 0.8, ease: 'power3.in' })
              },
            },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isLoading])

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
          <h1 className='text-4xl md:text-6xl font-calsans text-[#FF5900]'>Projects</h1>
          <a href="/" className='font-montserrat text-lg md:text-xl text-[#FF5900] hover:opacity-70 transition-opacity'>
            Back Home
          </a>
        </div>

        {/* Projects List */}
        <div className='flex flex-col gap-4'>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className='group relative overflow-hidden w-screen -mx-6 md:-mx-20'
            >
              <a
                href={`/projects/${project.id}`}
                className='relative block text-4xl md:text-5xl font-montserrat font-bold text-[#FF5900] py-3 px-6 md:px-20 w-full opacity-75 group-hover:opacity-100 scale-75 group-hover:scale-100 origin-left transition-all'
                style={{ transitionDuration: '250ms', transitionTimingFunction: 'ease-in-out', transitionDelay: 'var(--hover-delay)' }}
              >
                {/* Background animation on hover */}
                <span className='absolute inset-0 bg-[#FF5900] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out' style={{ transitionDelay: 'var(--hover-delay)' }}></span>
                
                {/* Text and category container */}
                <span className='relative flex items-center justify-between gap-4'>
                  {/* Arrow that appears from left */}
                  <span className='text-[#FF5900] group-hover:text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out shrink-0' style={{ transitionDelay: 'var(--hover-delay)' }}>
                    →
                  </span>
                  
                  {/* Title */}
                  <span className='flex-1'>
                    <span className='group-hover:text-white transition-colors duration-500 ease-in-out' style={{ transitionDelay: 'var(--hover-delay)' }}>
                      {project.title}
                    </span>
                  </span>

                  {/* Category aligned to right */}
                  <span className='text-lg md:text-xl font-montserrat font-medium text-[#FF5900] group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out shrink-0' style={{ transitionDelay: 'var(--hover-delay)' }}>
                    {project.category}
                  </span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Projects
