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
  const [activeSection, setActiveSection] = useState('introduction')
  const [animatedSections, setAnimatedSections] = useState(new Set())
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')

  const projects = [
    {
      id: 1,
      title: 'Wibe.so',
      description: 'A website for wibe for creator:community platform, as startup co-founder i worked on web design and development',
      tools: ['T3Stack', 'supabase', 'shadcn', 'drizzle'],
      thumbnail: '/projects/wibeso.png',
      link: 'https://wibe.so',
      linkTitle: 'wibe.so'
    },
    {
      id: 2,
      title: 'Wibe for Creators',
      description: 'An app creators to create and flurish their community platform, as startup co-founder i worked on app design and development',
      tools: ['React Native', 'cloudflare', 'drizzle'],
      thumbnail: '/projects/wibeapp2.webp',
      link: 'https://play.google.com/store/apps/details?id=com.wibe.wibe&pcampaignid=web_share',
      linkTitle: 'wibe app'
    },
    {
      id: 3,
      title: 'Make My Pass',
      description: 'MakeMyPass is an event-tech platform that provides a digital solution for organizers to manage events from start to finish. worked as UI/UX Designer are delivered high fidelity design.',
      tools: ['Figma'],
      thumbnail: '/projects/makemypass.webp',
      link:'https://www.figma.com/design/A6LGheVuEciEVPv5hl5O9l/MakeMyPass?node-id=0-1&t=rCIYvl8Et69Otdki-1',
      linkTitle:'figma page'
    },
    {
      id: 4,
      title: 'IEDC Summit',
      description: "The IEDC Summit is an annual event organized by the Kerala Startup Mission for young innovators from Innovation and Entrepreneurship Development Centres (IEDCs) across the state. It's considered Asia's largest summit for aspiring entrepreneurs, featuring keynote sessions, workshops, and opportunities to showcase student projects and startups.",
      tools: ['React', 'OpenAI API', 'Express', 'MongoDB'],
      thumbnail: '/projects/iedc.png',
      link: 'https://iedcsummit.in',
      linkTitle: 'Website'
    },
    {
      id: 5,
      title: 'Sjcet Hall of Fame',
      description: "A simple college website to show off the skills of student's with their projects",
      tools: ['figma'],
      thumbnail: '/projects/sjcethalloffame.png'
    },
    {
      id: 6,
      title: 'Realism in Figma',
      description: 'A fun little Project of mine where i create realistic product designs in figma.',
      tools: ['figma'],
      thumbnail: '/projects/realisminfigma.png',
      link: 'https://www.figma.com/design/tianOKEaZqGlV7AquFgYP1/realism-in-figma?node-id=0-1&t=rBsa55SYpYcoxrcZ-1',
      linkTitle: 'figma page'
    },
    {
      id: 7,
      title: 'Asthra 10',
      description: "Asthra 10.0 is the annual, national-level technical festival of St. Joseph's College of Engineering and Technology (SJCET) Palai, which celebrates its 10th anniversary. I designed the website and developed the frontend, this time we also go the oppurtunity to collab with MakeMyPass",
      tools: ['figma','react','shadcn','tailwind css', 'supabase'],
      thumbnail: '/projects/asthra.png',
      link: 'https://asthra.sjcet.in/',
      linkTitle: 'website'
    }
  ]

  const tools = [
    // Web Dev Frameworks
    'React JS', 'Next JS', 'Svelte', 'TailwindCSS', 'Bootstrap', 'Vite', 'GSAP',
    // App Dev Frameworks
    'React Native', 'Java', 'GDScript', 'Godot',
    // Designer Tools
    'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Krita', 'Framer', 'Jitter', 'Webflow', 'Unreal Engine 5',
    // Backend Tools
    'Node.js', 'TypeScript', 'Python', 'MySQL', 'Docker', 'Expo', 'android studio', 'shadcn'
  ]

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields')
      return
    }

    // Here you would typically send the email using a service like EmailJS or a backend endpoint
    console.log('Form submitted:', formData)
    setFormStatus('Message sent successfully! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })

    // Clear status after 3 seconds
    setTimeout(() => setFormStatus(''), 3000)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'development', 'design', 'services', 'projects', 'tools', 'contact']
      const viewportMidpoint = window.innerHeight / 2

      // Find the section that's closest to the middle of screen
      let closestSection = 'introduction'
      let closestDistance = Infinity
      const visibleSections = new Set()

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Distance from section center to viewport midpoint
          const sectionCenter = (rect.top + rect.bottom) / 2
          const distance = Math.abs(sectionCenter - viewportMidpoint)

          if (distance < closestDistance) {
            closestDistance = distance
            closestSection = sectionId
          }

          // Only add to animated sections if in viewport and loading finished with delay
          if (rect.top < window.innerHeight && rect.bottom > 0 && !isLoading) {
            visibleSections.add(sectionId)
          }
        }
      }

      setAnimatedSections(visibleSections)
      setActiveSection(closestSection)
    }

    let scrollListener
    if (!isLoading) {
      // Add delay before starting to listen to scroll
      const timer = setTimeout(() => {
        window.addEventListener('scroll', handleScroll)
        handleScroll() // Call once after delay
        scrollListener = handleScroll
      }, 500)

      return () => {
        clearTimeout(timer)
        if (scrollListener) {
          window.removeEventListener('scroll', scrollListener)
        }
      }
    }

    return () => {
      if (scrollListener) {
        window.removeEventListener('scroll', scrollListener)
      }
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
          <h1 className='text-4xl md:text-6xl font-calsans text-[#FF5900]'>About Me</h1>
          <Link to="/" className='font-montserrat text-lg md:text-xl text-[#FF5900] hover:opacity-70 transition-opacity'>
            Back Home
          </Link>
        </div>

        {/* Timeline and Content Container */}
        <div className='w-full max-w-6xl flex gap-8 md:gap-12 relative'>
          {/* Timeline Sidebar */}
          <div className='hidden md:flex flex-col gap-6 w-48 fixed left-20 top-1/2 h-fit'>
            {[
              { id: 'introduction', label: 'Introduction' },
              { id: 'development', label: 'Development' },
              { id: 'design', label: 'Design' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'tools', label: 'Tools' },
              { id: 'contact', label: 'Contact' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  const element = document.getElementById(section.id)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`text-left font-montserrat transition-all duration-300 flex items-center gap-3 group ${activeSection === section.id
                  ? 'text-[#FF5900] font-bold text-lg'
                  : 'text-[#FF5900]/50 font-normal text-base hover:text-[#FF5900]'
                  }`}
              >
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id
                  ? 'bg-[#FF5900] w-3 h-3'
                  : 'bg-[#FF5900]/30 group-hover:bg-[#FF5900]/70'
                  }`}></span>
                {section.label}
              </button>
            ))}
          </div>

          {/* About Content */}
          <div className='w-full max-w-4xl flex flex-col gap-16 md:ml-56'>
            {/* Introduction */}
            <div id="introduction" className='flex flex-col gap-8'>
              <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
                Hi! I'm <span className='font-bold'>Ajay Varma</span>, a passionate full-stack developer and UI/UX designer based in India. I love building beautiful, functional digital products that solve real problems and create meaningful user experiences.
              </p>

              {/* Education and Experience Section */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                {/* Education */}
                <div className='flex flex-col gap-4'>
                  <h3 className='text-2xl font-calsans text-[#FF5900]'>Education</h3>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                      <p className='font-montserrat font-bold text-[#FF5900]'>B.Tech in Cyber Security</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>St. Joseph's College of Engineering and Technology (SJCET), Palai</p>
                      <p className='font-montserrat text-[#FF5900]/60 text-sm'>2022 - 2026</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className='flex flex-col gap-4 md:border-l-2 md:border-[#FF5900]/20 md:pl-8'>
                  <h3 className='text-2xl font-calsans text-[#FF5900]'>Experience</h3>
                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                      <p className='font-montserrat font-bold text-[#FF5900] text-sm'>Co-Founder & UI/UX Designer, Web & App Developer</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>Wibe for Creators (Community Platform)</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-montserrat font-bold text-[#FF5900] text-sm'>UI/UX Designer (App)</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>MakeMyPass</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-montserrat font-bold text-[#FF5900] text-sm'>UI/UX Designer & Web Developer Intern</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>Manolo Pvt Ltd</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-montserrat font-bold text-[#FF5900] text-sm'>Graphics Designer</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>IEDC SJCET</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-montserrat font-bold text-[#FF5900] text-sm'>Graphics Designer</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>IEEE SB SJCET</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-montserrat font-bold text-[#FF5900] text-sm'>Graphics Designer</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>IEEE Linked Kerala Section</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='font-montserrat font-bold text-[#FF5900] text-sm'>Design Lead</p>
                      <p className='font-montserrat text-[#FF5900]/70 text-sm'>The Nexus Project SJCET (Community)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className='border-[#FF5900]/20' />

            {/* Developer Section */}
            <div id="development" className='flex flex-col items-end gap-4 text-justify transition-opacity duration-500' style={{ animation: animatedSections.has('development') ? 'fadeInRight 0.8s ease-out forwards' : 'fadeOutRight 0.8s ease-out forwards', opacity: animatedSections.has('development') ? 1 : 0 }}>
              <h2 className='text-3xl md:text-5xl font-calsans text-[#FF5900]'>Development</h2>
              <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
                As a full-stack developer, I specialize in building complete digital products. I have expertise in modern web technologies including React, Node.js, MongoDB, and more.
              </p>
            </div>

            <hr className='border-[#FF5900]/20' />

            {/* Design Section */}
            <div id="design" className='flex flex-col gap-4 text-justify transition-opacity duration-500' style={{ animation: animatedSections.has('design') ? 'fadeInLeft 0.8s ease-out forwards' : 'fadeOutLeft 0.8s ease-out forwards', opacity: animatedSections.has('design') ? 1 : 0 }}>
              <h2 className='text-3xl md:text-5xl font-calsans text-[#FF5900]'>Design</h2>
              <p className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat leading-relaxed'>
                As a UI/UX designer, I craft intuitive interfaces that users love to interact with. I focus on clarity, detail, and user-centered design principles to create meaningful digital experiences.
              </p>
            </div>

            <hr className='border-[#FF5900]/20' />

            {/* What I Do */}
            <div id="services" className='flex flex-col gap-4'>
              <h2 className='text-3xl md:text-5xl font-calsans text-[#FF5900]'>What I Do</h2>
              <ul className='flex flex-col gap-3'>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Full-stack web development with modern technologies</li>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ UI/UX design for web and mobile applications</li>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Design systems and Prototyping</li>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Responsive design implementation</li>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Interactive Design</li>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Graphics Design</li>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Illustrations</li>
                <li className='text-lg md:text-xl text-[#FF5900]/70 font-montserrat'>✦ Logo Design and Branding</li>
              </ul>
            </div>

            <hr className='border-[#FF5900]/20' />

            {/* Projects Section */}
            <div id="projects" className='flex flex-col items-end gap-6 transition-opacity duration-500' style={{ animation: animatedSections.has('projects') ? 'fadeInLeft 0.8s ease-out forwards' : 'fadeOutLeft 0.8s ease-out forwards', opacity: animatedSections.has('projects') ? 1 : 0 }}>
              <h2 className='text-3xl md:text-5xl font-calsans text-[#FF5900] '>Experience</h2>
              <div className='columns-1 md:columns-2 gap-6'>
                {projects.map((project) => (
                  <div key={project.id} className='flex flex-col overflow-hidden rounded-2xl bg-white border-2 border-[#FF5900]/10 hover:border-[#FF5900]/40 hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6'>
                    {/* Thumbnail */}
                    <div className='w-full overflow-hidden bg-linear-to-br from-[#FFE7E2] to-[#FF5900]/20'>
                      <img src={project.thumbnail} alt={project.title} className='w-full h-auto object-cover hover:scale-105 transition-transform duration-500' />
                    </div>
                    {/* Content */}
                    <div className='flex flex-col gap-3 p-5'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-lg md:text-xl font-montserrat font-bold text-[#FF5900]'>{project.title}</h3>
                        {project.link && (
                          <a href={project.link} target='_blank' rel='noopener noreferrer' className='text-sm font-montserrat font-semibold text-[#FF5900] hover:text-[#FF5900]/70 transition-colors duration-300 underline'>
                            {project.linkTitle || project.link.replace('https://', '')}
                          </a>
                        )}
                      </div>
                      <p className='text-sm md:text-base text-[#FF5900]/70 font-montserrat leading-relaxed'>{project.description}</p>
                      {/* Tools Tags */}
                      <div className='flex flex-wrap gap-2 mt-2 pt-2 border-t border-[#FF5900]/10'>
                        {project.tools.filter(tool => tool).map((tool, idx) => (
                          <span key={idx} className='px-2.5 py-1 bg-[#FFE7E2] text-[#FF5900] text-xs font-montserrat font-semibold rounded-full border border-[#FF5900]/20'>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className='border-[#FF5900]/20' />

            {/* Tools Section */}
            <div id="tools" className='flex flex-col gap-6 transition-opacity duration-500' style={{ animation: animatedSections.has('tools') ? 'fadeInLeft 0.8s ease-out forwards' : 'fadeOutLeft 0.8s ease-out forwards', opacity: animatedSections.has('tools') ? 1 : 0 }}>
              <h2 className='text-3xl md:text-5xl font-calsans text-[#FF5900]'>Tools & Technologies</h2>
              <div className='flex flex-wrap gap-3'>
                {tools.map((tool, idx) => (
                  <div key={idx} className='px-4 py-2 bg-[#FF5900] text-white font-montserrat rounded-lg hover:scale-105 transition-transform duration-300 cursor-default'>
                    {tool}
                  </div>
                ))}
              </div>
            </div>

            <hr className='border-[#FF5900]/20' />

            {/* Contact Section */}
            <div id="contact" className='flex flex-col gap-6 transition-opacity duration-500' style={{ animation: animatedSections.has('contact') ? 'fadeInLeft 0.8s ease-out forwards' : 'fadeOutLeft 0.8s ease-out forwards', opacity: animatedSections.has('contact') ? 1 : 0 }}>
              <h2 className='text-3xl md:text-5xl font-calsans text-[#FF5900] mx-auto '>Get In Touch</h2>
              <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 w-full max-w-md mx-auto'>
                <div className='flex flex-col gap-2'>
                  <label className='text-lg font-montserrat font-bold text-[#FF5900]'>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className='px-4 py-3 bg-white border-2 border-[#FF5900]/20 rounded-full font-montserrat text-[#FF5900] focus:outline-none focus:border-[#FF5900] transition-all'
                    placeholder="Your name"
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-lg font-montserrat font-bold text-[#FF5900]'>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className='px-4 py-3 bg-white border-2 border-[#FF5900]/20 rounded-full font-montserrat text-[#FF5900] focus:outline-none focus:border-[#FF5900] transition-all'
                    placeholder="your@email.com"
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-lg font-montserrat font-bold text-[#FF5900]'>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    className='px-4 py-3 bg-white border-2 border-[#FF5900]/20 rounded-2xl font-montserrat text-[#FF5900] focus:outline-none focus:border-[#FF5900] transition-all resize-none'
                    placeholder="Your message here..."
                    rows="5"
                  />
                </div>
                <button
                  type="submit"
                  className='px-6 py-3 bg-[#FF5900] text-white font-montserrat font-bold rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer'
                >
                  Send Message
                </button>
                {formStatus && (
                  <p className={`text-center font-montserrat ${formStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {formStatus}
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
