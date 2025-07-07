'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ExperiencesCarousel } from '@/components/experiences-carousel'
import { NavBar } from '@/components/nav-bar'
import { FaGithub, FaLinkedin, FaChevronDown, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { MobileExperienceList } from '@/components/mobile-experience-list'

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  className?: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const experiencesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 2
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const sectionRefs = {
      home: homeRef,
      projects: projectsRef,
      experiences: experiencesRef
    }
    
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs]
    ref?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          AR
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ background: 'black' }}
      />
      
      <NavBar onNavigate={scrollToSection} />
      
      {/* Hero Section */}
      <motion.section 
        ref={homeRef}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        id="home" 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative"
      >
        <nav className="mb-7 w-full px-4">
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Projects
              </button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => scrollToSection('experiences')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Experiences
              </button>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="./Arpan_Roy_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all"
              >
                Resume
              </a>
            </motion.li>
          </ul>
        </nav>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tight text-center text-white font-display hover:scale-110 duration-1000">
            Arpan Roy
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 max-w-2xl"
        >
          <p className="text-xl text-gray-300">
            Math @ University of Waterloo
          </p>
          <p className="text-gray-400 text-sm md:text-base px-4 md:px-0">
            I'm currently working on autonomy software for drones at{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Waterloo Aerial Robotics Group
            </a>
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-400">
            <motion.a 
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="https://github.com/arpanroy18" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="https://www.linkedin.com/in/arpan-roy18/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="mailto:arpan_roy46@outlook.com" 
              className="hover:text-white transition-colors"
            >
              <FaEnvelope size={24} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div 
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-8 cursor-pointer"
          onClick={() => scrollToSection('projects')}
        >
          <FaChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="min-h-screen px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h2>
            <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
               Take a look at some of my projects. I always try to make projects that I can use and hopefully others can use as well.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCard
              title="Neural Network Visualizer"
              description="Built an interactive neural network visualizer using HTML, CSS, and JavaScript to demonstrate key concepts like gradient descent and activation functions."
              imageUrl="./visualizer.png"
              alt="Neural Network Visualization"
              className="object-cover w-full h-full"
            />
            <ProjectCard
              title="Diabetes Prediction Model"
              description="Developed a prediction model using Python, Scikit-Learn, and Pandas to detect diabetes. Used existing data from PIMA Indian Diabetes Dataset to train the model."
              imageUrl="./diabetes.jpg"
              alt="Diabetes Prediction Model"
              className="object-cover w-full h-64"
            />
            <ProjectCard
              title="Human Detection Image Classifier"
              description="Developed a machine learning-based image classifier for detecting human presence in images using computer vision techniques."
              imageUrl="./human-detection.png"
              alt="Human Detection Classifier"
              className="object-cover w-full h-64"
            />
            <ProjectCard
              title="Flashcards Study App"
              description="Built a flashcards study app to enable users to efficiently learn and memorize information through spaced repetition."
              imageUrl="./flashy.png"
              alt="Flashcards Study App"
              className="object-cover w-full h-64"
            />
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section ref={experiencesRef} id="experiences" className="min-h-screen px-4 py-12 sm:py-24">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center">Experiences</h1>
            <p className="text-gray-400 mb-12 sm:mb-16 text-center text-base sm:text-lg px-4 sm:px-0">
              Check out my experiences and see the hands-on knowledge I've gained.
            </p>
          </motion.div>
          
          {/* Mobile Experience List (below md) / Desktop Carousel (md and above) */}
          <div className="block md:hidden">
            <MobileExperienceList experiences={[
              {
                title: "Waterloo Aerial Robotics Group",
                date: "Oct 2024 - Present",
                description: "Enhanced drone image processing and system reliability through bug resolution, pipeline optimization, and automation.",
                role: "Software Engineer"
              },
              {
                title: "CS Base",
                date: "Apr 2023 - Aug 2024",
                description: "Led programming instruction and curriculum development, introducing students to advanced programming concepts.",
                role: "Lead Programming Teacher"
              },
              {
                title: "First Robotics",
                date: "Nov 2022 - Mar 2023",
                description: "Taught Java programming, enabling team members to develop and enhance robot functionality.",
                role: "Programming Teacher"
              },
              {
                title: "Code 4 Tomorrow",
                date: "July 2023 - Mar 2024",
                description: "Supported organizational operations and documentation management for collaborative coding initiatives.",
                role: "Documentation Team"
              },
              {
                title: "Project Empower",
                date: "Feb 2023 - Mar 2024",
                description: "Facilitated community outreach by building partnerships and fostering collaboration with external organizations.",
                role: "Community Liaison"
              }
            ]} />
          </div>
          <div className="hidden md:block">
            <ExperiencesCarousel />
          </div>
        </div>
      </section>
    </motion.div>
  )
}

function ProjectCard({ title, description, imageUrl, alt }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl bg-gradient-to-b from-black to-black/50 border border-gray-800 flex flex-col h-full transform hover:shadow-xl"
    >
      {/* Adjusted aspect ratio and added relative positioning */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority // Added for better loading of visible images
        />
      </div>
      <div className="p-4 sm:p-6 bg-[#1e2761]/80 flex-1">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
