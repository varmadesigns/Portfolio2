import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NoiseOverlay from './components/Noise'
import gsap from 'gsap'
import SplitText from './components/SplitText'
import LoadingScreen from './components/LoadingScreen'
import Projects from './pages/Projects'

function Home() {
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const designerSvgRef = useRef(null)
  const developerSvgRef = useRef(null)
  const currentSectionRef = useRef(1) // 0 = developer, 1 = main, 2 = designer
  const isScrollingRef = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAnimations, setShowAnimations] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Show animations right when loading screen finishes (no delay needed)
    setShowAnimations(true)
  }

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrollingRef.current) return

      const container = containerRef.current
      if (!container) return

      e.preventDefault()
      isScrollingRef.current = true

      const sectionWidth = window.innerWidth

      if (e.deltaY > 0) {
        // Scroll down -> go to designer section
        if (currentSectionRef.current < 2) {
          currentSectionRef.current++
        }
      } else {
        // Scroll up -> go to developer section
        if (currentSectionRef.current > 0) {
          currentSectionRef.current--
        }
      }

      // Animate image position based on section (only on md and larger screens)
      const isMobile = window.innerWidth < 768
      if (!isMobile && imgRef.current) {
        if (currentSectionRef.current === 0) {
          // Developer section - image to right
          gsap.to(imgRef.current, {
            x: '35vw',
            duration: 0.8,
            ease: 'power2.inOut',
          })
        } else if (currentSectionRef.current === 2) {
          // Designer section - image to left
          gsap.to(imgRef.current, {
            x: '-40vw',
            duration: 0.8,
            ease: 'power2.inOut',
          })
        } else {
          // Main section - center image
          gsap.to(imgRef.current, {
            x: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          })
        }
      }

      // Animate designer SVG based on section
      if (designerSvgRef.current) {
        if (currentSectionRef.current === 2) {
          // Designer section - fade in and move from right
          if (!isMobile) {
            gsap.to(designerSvgRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.inOut',
              pointerEvents: 'auto',
            })
          }
        } else {
          // Other sections - hide and move to right
          if (!isMobile) {
            gsap.to(designerSvgRef.current, {
              opacity: 0,
              x: '100vw',
              duration: 0.8,
              ease: 'power2.inOut',
              pointerEvents: 'none',
            })
          }
        }
      }

      // Animate developer SVG based on section
      if (developerSvgRef.current) {
        if (currentSectionRef.current === 0) {
          // Developer section - fade in and move from left
          if (!isMobile) {
            gsap.to(developerSvgRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.inOut',
              pointerEvents: 'auto',
            })
          }
        } else {
          // Other sections - hide and move to left
          if (!isMobile) {
            gsap.to(developerSvgRef.current, {
              opacity: 0,
              x: '-100vw',
              duration: 0.8,
              ease: 'power2.inOut',
              pointerEvents: 'none',
            })
          }
        }
      }

      gsap.to(container, {
        scrollLeft: currentSectionRef.current * sectionWidth,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          isScrollingRef.current = false
        }
      })
    }

    const container = containerRef.current
    if (container) {
      // Scroll to main (center) section on mount
      setTimeout(() => {
        container.scrollLeft = window.innerWidth
      }, 0)

      window.addEventListener('wheel', handleWheel, { passive: false })

      // Animate developer and designer text elements
      gsap.fromTo('.dev-text',
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 3.5 }
      )

      gsap.fromTo('.designer-text',
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 3.5 }
      )
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {/* Main scroll container */}
      <div
        ref={containerRef}
        className="w-screen h-screen overflow-x-scroll overflow-y-hidden flex scroll-smooth"
        style={{
          scrollBehavior: 'auto',
          overscrollBehavior: 'contain',
        }}
      >
        {/* Developer Section - Left */}
        <section id="developer" className="h-screen w-screen shrink-0 flex flex-col items-center md:items-start justify-start pt-40 md:pt-70 bg-[#FFE7E2] relative">

          {/* Developer SVG - visible only on desktop, animated */}
          <img
            ref={developerSvgRef}
            src="developer.svg"
            alt="developer"
            className='hidden md:block absolute top-0 left-0 w-1/3 h-auto'
            style={{
              opacity: 0,
              x: '-100vw',
            }}
          />

          {/* Developer Content */}
          <div className='flex flex-col gap-6 items-center md:items-start md:pl-20 lg:pl-40 px-6 md:px-0'>
            <p className='font-montserrat font-bold text-2xl md:text-4xl lg:text-5xl text-[#FF5900] text-center md:text-left'>Hi, I'm Ajay Varma</p>
            <p className='font-montserrat text-lg md:text-xl lg:text-2xl text-[#FF5900] text-center md:text-left max-w-md md:max-w-xl'>I'm a <span className='font-bold'>full-stack developer</span> who builds complete, user-focused digital products—from smooth interfaces to reliable, scalable backend systems.</p>
            <p className='font-montserrat text-lg md:text-xl lg:text-2xl text-[#FF5900] text-center md:text-left max-w-md md:max-w-xl'>I focus on usability, performance, and creating experiences that feel modern and meaningful.</p>

            {/* Social Links */}
            <div className='flex gap-6 md:gap-8'>
              <a href="https://github.com/varmadesigns" target="_blank" rel="noopener noreferrer" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>GitHub</a>
              <a href="https://x.com/AJAYVARMA123629" target="_blank" rel="noopener noreferrer" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>X</a>
              <a href="https://www.linkedin.com/in/ajay-varma-aaa71933b/" target="_blank" rel="noopener noreferrer" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>LinkedIn</a>
            </div>
            {/* <a href="/projects" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>View Projects</a> */}
          </div>

          {/* Mobile version - top center */}
          <img
            src="developer.svg"
            alt="developer"
            className='md:hidden absolute top-8 left-1/2 -translate-x-1/2 w-1/2 h-auto z-10'
          />

          <div>
            
          </div>
        </section>

        {/* Main/Home Section - Center */}
        <section id="home" className="h-screen w-screen shrink-0 flex flex-col relative">
          <header className='m-8 flex justify-center md:justify-start items-center gap-4'>
            <img src="logo.svg" alt="logo" className='h-8 animate-fadeInDown' />
            <SplitText
              text="Ajay Varma"
              tag="p"
              className='text-2xl font-calsans text-[#FF5900]'
              delay={30}
              duration={1.5}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: -40 }}
              to={{ opacity: 1, y: 0 }}
              animationDelay={3.3}
            />
          </header>
          <div className='flex-1 flex flex-col'>
            <SplitText
              text="Hello!"
              tag="h1"
              className='text-[100px] md:text-[200px] font-calsans text-[#FF5900] flex justify-center -mt-2 md:-mt-8'
              delay={50}
              duration={1.5}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              animationDelay={3.3}
            />
            <div className='flex-1 mx-10 md:mx-15 lg:mx-30 flex flex-col md:flex-row gap-6 md:justify-between'>
              <div className='flex flex-col items-start md:items-center dev-text'>
                <p className='text-2xl md:text-3xl font-montserrat font-bold text-[#FF5900] md:text-center'>Interested in my <br />Developement Skills</p>
                <p className='text-xl hidden md:block text-[#FF5900]/50 font-montserrat font-normal' >scroll up</p>
                <p className='text-lg md:hidden text-[#FF5900]/50 font-montserrat font-normal' >swipe left</p>
              </div>
              <div className='flex flex-col items-end md:items-center designer-text'>
                <p className='text-2xl md:text-3xl font-montserrat font-bold text-[#FF5900] text-end md:text-center'>Interested in my <br />Design Skills</p>
                <p className='text-xl hidden md:block text-[#FF5900]/50 font-montserrat font-normal' >scroll down</p>
                <p className='text-lg md:hidden text-[#FF5900]/50 font-montserrat font-normal' >swipe right</p>
              </div>
            </div>
          </div>
        </section>

        {/* Designer Section - Right */}
        <section id="designer" className="h-screen w-screen shrink-0 flex flex-col items-center md:items-end justify-start pt-40 md:pt-70 bg-[#FFE7E2] relative">

          {/* Designer SVG - visible only on desktop, animated */}
          <img
            ref={designerSvgRef}
            src="designer.svg"
            alt="designer"
            className='hidden md:block absolute right-0 top-0 w-1/3 h-auto z-10'
            style={{
              opacity: 0,
              x: '100vw',
            }}
          />

          {/* <div className='flex flex-col gap-4 items-end -mt-50 md:-mt-20 mr-10 md:mr-20'>
            <p className='font-montserrat font-bold text-xl md:text-2xl lg:text-5xl text-[#FF5900]'>Hi, I'm Ajay Varma</p>
            <p className='font-montserrat text-lg md:text-xl lg:text-3xl text-[#FF5900] text-end'>a <em className='font-bold'>UI/UX designer</em> who loves crafting clean,<br /> modern interfaces with purpose</p>
            <p className='font-montserrat text-lg md:text-xl lg:text-3xl text-[#FF5900] text-end'>I focus on clarity, detail, and user-centered <br /> design that creates smooth, meaningful <br /> digital experiences.</p>
          </div> */}

          {/* Designer Content */}
          <div className='flex flex-col gap-6 items-center md:items-end md:pr-20 lg:pr-40 px-6 md:px-0'>
            <p className='font-montserrat font-bold text-2xl md:text-4xl lg:text-5xl text-[#FF5900] text-center md:text-right'>Hi, I'm Ajay Varma</p>
            <p className='font-montserrat text-lg md:text-xl lg:text-2xl text-[#FF5900] text-center md:text-right max-w-md md:max-w-xl'>a <span className='font-bold'>UI/UX designer</span> who loves crafting clean, modern interfaces with purpose</p>
            <p className='font-montserrat text-lg md:text-xl lg:text-2xl text-[#FF5900] text-center md:text-right max-w-md md:max-w-xl'>I focus on clarity, detail, and user-centered design that creates smooth, meaningful digital experiences.</p>

            {/* Social Links */}
            <div className='flex gap-6 md:gap-8'>
              <a href="https://www.instagram.com/varmadesignzz/" target="_blank" rel="noopener noreferrer" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>Instagram</a>
              <a href="https://www.behance.net/ajaydesigns" target="_blank" rel="noopener noreferrer" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>Behance</a>
              <a href="https://dribbble.com/AjayVarmadesignare" target="_blank" rel="noopener noreferrer" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>Dribbble</a>
            </div>
            {/* <a href="/projects" className='social-link font-montserrat text-base md:text-lg lg:text-xl text-[#FF5900] py-2 px-2'>View Projects</a> */}
          </div>

          {/* Mobile version - top center */}
          <img
            src="designer.svg"
            alt="designer"
            className='md:hidden absolute top-8 left-1/2 -translate-x-1/2 w-1/2 h-auto'
          />
        </section>
      </div>

      {/* Bottom div - absolutely positioned and independent */}
      <div id="bottom-div" className='h-30 md:h-50 w-full bg-[#FF5900] absolute bottom-0 left-0 right-0 z-0'>
        <NoiseOverlay size={0.5} density={100} color="rgba(0, 0, 0, 1)" />
      </div>

      {/* Ajay photo - absolutely positioned and independent */}
      <img
        ref={imgRef}
        src="ajay.png"
        alt="myphoto"
        className='hidden md:block absolute -bottom-10 z-10 left-1/2 pointer-events-none'
        style={{
          transform: 'translateX(-50%)'
        }}
      />
      <img
        src="ajay.png"
        alt="myphoto"
        className='block md:hidden absolute -bottom-10 z-10 min-w-75 max-h-130 pointer-events-none'
      />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/projects" element={<Projects />} /> */}
    </Routes>
  )
}

export default App