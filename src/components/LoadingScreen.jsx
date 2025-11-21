import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const LoadingScreen = ({ onLoadingComplete }) => {
  const counterRef = useRef(null)
  const screenRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Animate counter from 0 to 100
    gsap.to(counterRef.current, {
      textContent: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      snap: { textContent: 1 },
      onComplete: () => {
        setIsComplete(true)
        
        // After counter completes, animate the loading screen up (no fade)
        gsap.to(screenRef.current, {
          y: '-100vh',
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            onLoadingComplete()
          }
        })
      }
    })
  }, [onLoadingComplete])

  return (
    <div
      ref={screenRef}
      className='fixed inset-0 bg-[#FF5900] z-50 flex items-end justify-start p-8'
    >
      <div className='text-6xl md:text-8xl font-calsans text-white'>
        <span ref={counterRef}>0</span>%
      </div>
    </div>
  )
}

export default LoadingScreen
