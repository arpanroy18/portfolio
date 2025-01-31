'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ExperiencesCarousel } from '@/components/experiences-carousel'
import { NavBar } from '@/components/nav-bar'
import { FaGithub, FaLinkedin, FaChevronDown, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

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
        <nav className="mb-7">
          <ul className="flex items-center justify-center gap-8">
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
          className="flex items-center justify-center gap-8 mb-8"
        >
          <h1 className="text-8xl font-bold tracking-tight">
            Arpan Roy
          </h1>
          <div className="relative w-32 h-32">
            <Image
              src="./portfolio_image.png"
              alt="Avatar"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
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
          <p className="text-gray-400 whitespace-nowrap inline-block">
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
      <section ref={projectsRef} id="projects" className="min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Projects</h2>
            <p className="text-gray-400 mb-12">
              My hobby projects are pretty random—just things that I am interested in.
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
      <section ref={experiencesRef} id="experiences" className="min-h-screen px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 text-center">Experiences</h1>
            <p className="text-gray-400 mb-24 text-center text-lg">
              Check out my experiences and see the hands-on knowledge I've gained.
            </p>
          </motion.div>
          
          <ExperiencesCarousel />
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
      <div className="p-6 bg-[#1e2761]/80 flex-1"> {/* Increased padding */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}