import React from 'react'
import { Link } from 'react-router-dom'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Project One',
      description: 'A modern web application built with React and Node.js',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Full-stack e-commerce platform with payment integration',
      tags: ['React', 'Express', 'Stripe'],
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Design system and component library',
      tags: ['React', 'Storybook', 'Tailwind'],
    },
  ]

  return (
    <div className="relative w-screen min-h-screen bg-[#FFE7E2] overflow-hidden">
      <div className='flex flex-col items-center justify-start pt-20 px-6 md:px-20 pb-20'>
        {/* Header */}
        <div className='flex items-center justify-between w-full mb-16'>
          <h1 className='text-4xl md:text-6xl font-calsans text-[#FF5900]'>Projects</h1>
          <Link to="/" className='font-montserrat text-lg md:text-xl text-[#FF5900] hover:opacity-70 transition-opacity'>
            Back Home
          </Link>
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
          {projects.map((project) => (
            <div
              key={project.id}
              className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'
            >
              <h2 className='text-2xl md:text-3xl font-montserrat font-bold text-[#FF5900]'>
                {project.title}
              </h2>
              <p className='text-lg text-[#FF5900]/70 font-montserrat'>
                {project.description}
              </p>
              <div className='flex flex-wrap gap-2 mt-auto'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-[#FF5900] text-white rounded-full text-sm font-montserrat'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom div */}
      <div id="bottom-div" className='h-30 md:h-50 w-full bg-[#FF5900] absolute bottom-0 left-0 right-0 z-0' />
    </div>
  )
}

export default Projects
