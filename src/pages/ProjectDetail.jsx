import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import projects from './projects.json'
import Footer from '../components/Footer'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const project = projects.find(p => p.id === parseInt(id))

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!project) {
    return (
      <div className="relative w-screen h-screen bg-[#fff1ee] overflow-hidden flex flex-col items-center justify-center">
        <div className='flex flex-col items-center justify-center gap-8'>
          <h1 className='text-6xl md:text-8xl font-calsans text-[#FF5900]'>404</h1>
          <h2 className='text-3xl md:text-4xl font-calsans text-[#FF5900]'>Project Not Found</h2>
          <Link 
            to="/projects" 
            className='mt-6 px-8 py-3 bg-[#FF5900] text-white rounded-lg font-montserrat text-lg font-bold hover:opacity-80 transition-opacity'
          >
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-screen min-h-screen bg-[#fff1ee] overflow-hidden">
      {isLoading && (
        <div className='fixed inset-0 bg-[#fff1ee] flex items-center justify-center z-50'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-12 h-12 border-4 border-[#FF5900]/20 border-t-[#FF5900] rounded-full animate-spin'></div>
            <p className='text-lg font-montserrat text-[#FF5900]'>Loading...</p>
          </div>
        </div>
      )}
      <div className='flex flex-col items-center justify-start pt-20 px-6 md:px-20 pb-20'>
        {/* Header */}
        <div className='flex items-center justify-between w-full mb-16'>
          <button 
            onClick={() => navigate(-1)}
            className='font-montserrat text-lg md:text-xl text-[#FF5900] hover:opacity-70 transition-opacity'
          >
            ← Back
          </button>
          <Link to="/" className='font-montserrat text-lg md:text-xl text-[#FF5900] hover:opacity-70 transition-opacity'>
            Home
          </Link>
        </div>

        {/* Project Detail */}
        <div className='w-full max-w-4xl'>
          <img
            src={project.thumbnail}
            alt={project.title}
            className='w-full h-auto rounded-lg shadow-lg mb-12'
          />
          
          <div className='flex flex-col gap-8'>
            <div>
              <h1 className='text-5xl md:text-6xl font-calsans text-[#FF5900] mb-4'>
                {project.title}
              </h1>
              <p className='text-xl md:text-2xl text-[#FF5900]/70 font-montserrat'>
                {project.description}
              </p>
            </div>

            <div>
              <h2 className='text-2xl md:text-3xl font-calsans text-[#FF5900] mb-4'>
                Technologies
              </h2>
              <div className='flex flex-wrap gap-3'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-4 py-2 bg-[#FF5900] text-white rounded-full text-lg font-montserrat'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className='flex gap-4 pt-8'>
              <button 
                onClick={() => navigate(-1)}
                className='px-8 py-3 bg-[#FF5900] text-white rounded-lg font-montserrat text-lg font-bold hover:opacity-80 transition-opacity'
              >
                ← Back to Projects
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProjectDetail
