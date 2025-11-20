import React, { useEffect, useRef } from 'react'
import NoiseOverlay from './components/Noise'
import gsap from 'gsap'

function App() {
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const designerSvgRef = useRef(null)
  const developerSvgRef = useRef(null)
  const currentSectionRef = useRef(1) // 0 = developer, 1 = main, 2 = designer
  const isScrollingRef = useRef(false)

  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      if (isScrollingRef.current) return
      const container = containerRef.current
      if (!container) return

      const threshold = 50
      const diff = touchStartX - touchEndX

      if (Math.abs(diff) < threshold) return

      isScrollingRef.current = true
      const sectionWidth = window.innerWidth
      const isMobile = window.innerWidth < 768

      if (diff > 0) {
        // Swiped left -> go to designer section
        if (currentSectionRef.current < 2) {
          currentSectionRef.current++
        }
      } else {
        // Swiped right -> go to developer section
        if (currentSectionRef.current > 0) {
          currentSectionRef.current--
        }
      }

      // Animate image position based on section (only on md and larger screens)
      if (!isMobile && imgRef.current) {
        if (currentSectionRef.current === 0) {
          gsap.to(imgRef.current, {
            x: '35vw',
            duration: 0.8,
            ease: 'power2.inOut',
          })
        } else if (currentSectionRef.current === 2) {
          gsap.to(imgRef.current, {
            x: '-40vw',
            duration: 0.8,
            ease: 'power2.inOut',
          })
        } else {
          gsap.to(imgRef.current, {
            x: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          })
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
      container.addEventListener('touchstart', handleTouchStart, false)
      container.addEventListener('touchend', handleTouchEnd, false)
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [])

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
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden">
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
        <section id="developer" className="h-screen w-screen shrink-0 flex flex-col items-center justify-center bg-[#FFE7E2] relative">
          
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
          
          {/* Mobile version - top center */}
          <img 
            src="developer.svg" 
            alt="developer"
            className='md:hidden absolute top-8 left-1/2 -translate-x-1/2 w-1/2 h-auto z-10'
          />
        </section>

        {/* Main/Home Section - Center */}
        <section id="home" className="h-screen w-screen shrink-0 flex flex-col relative">
          <header className='m-8 flex justify-center md:justify-start items-center gap-4 animate-fadeInDown'>
            <img src="logo.svg" alt="logo" className='h-8'/>
            <p className='text-2xl font-calsans text-[#FF5900]'>Ajay Varma</p>
          </header>
          <div className='flex-1 flex flex-col'>
            <h1 className='text-[100px] md:text-[200px] font-calsans text-[#FF5900] flex justify-center -mt-2 md:-mt-8 animate-fadeInDown delay-200'>Hello!</h1>
            <div className='flex-1 m-10 flex flex-col md:flex-row gap-6 md:justify-between'>
              <div className='flex flex-col items-start md:items-center'>
                <p className='text-2xl md:text-3xl font-montserrat font-bold text-[#FF5900] md:text-center'>Interested in my <br />Developer Skills</p>
                <p className='text-xl hidden md:block text-[#FF5900]/50 font-montserrat font-normal' >scroll up</p>
                <p className='text-lg md:hidden text-[#FF5900]/50 font-montserrat font-normal' >swipe left</p>
              </div>
              <div className='flex flex-col items-end md:items-center'>
                <p className='text-2xl md:text-3xl font-montserrat font-bold text-[#FF5900] text-end md:text-center'>Interested in my <br />Designer Skills</p>
                <p className='text-xl hidden md:block text-[#FF5900]/50 font-montserrat font-normal' >scroll down</p>
                <p className='text-lg md:hidden text-[#FF5900]/50 font-montserrat font-normal' >swipe right</p>
              </div>
            </div>
          </div>
        </section>

        {/* Designer Section - Right */}
        <section id="designer" className="h-screen w-screen shrink-0 flex flex-col items-center justify-center bg-[#FFE7E2] relative">
          
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
        <NoiseOverlay size={0.5} density={100} color="rgba(0, 0, 0, 1)"/>
      </div>

      {/* Ajay photo - absolutely positioned and independent */}
      <img 
        ref={imgRef}
        src="ajay.png" 
        alt="myphoto" 
        className='absolute -bottom-10 object-scale-down scale-125 md:scale-100 z-10 left-1/2 pointer-events-none'
        style={{
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  )
}

export default App