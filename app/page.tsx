'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ProjectCard } from '@/components/project-card'
import { ExperiencesCarousel } from '@/components/experiences-carousel'
import { NavBar } from '@/components/nav-bar'
import { FaGithub, FaLinkedin, FaChevronDown, FaEnvelope } from 'react-icons/fa'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const experiencesRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ background: 'black' }}
      />
      
      <NavBar onNavigate={scrollToSection} />
      
      {/* Hero Section */}
      <section ref={homeRef} id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <nav className="mb-7">
          <ul className="flex items-center justify-center gap-8">
            <li>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('experiences')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Experiences
              </button>
            </li>
            <li>
              <a 
                href="https://drive.google.com/file/d/1C4orURZck2Jw-P1NLAgvLHEwm4zsgdnG/view?usp=sharing" 
                className="px-4 py-2 border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-8xl font-bold tracking-tight">
            Arpan Roy
          </h1>
          <div className="relative w-16 h-16">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
        </div>
        
        <div className="space-y-4 max-w-2xl">
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
            <a 
              href="https://github.com/arpanroy18" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/arpan-roy18/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a 
              href="mailto:arpan_roy46@outlook.com" 
              className="hover:text-white transition-colors"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>

        {/* Bouncing Arrow */}
        <div className="absolute bottom-8 animate-bounce cursor-pointer">
          <FaChevronDown
            className="h-8 w-8 text-white"
            onClick={() => scrollToSection('projects')}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-400 mb-12">
            My hobby projects are pretty random—just things that I am interested in him.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCard
              title="Neural Network Visualizer"
              description="Built an interactive neural network visualizer using HTML, CSS, and JavaScript to demonstrate key concepts like gradient descent and activation functions."
              imageUrl="./NN-visualizer-image.png"
              alt="Neural Network Visualization"
            />
            <ProjectCard
              title="Diabetes Prediction Model"
              description="Developed a prediction model using Python, Scikit-Learn, and Pandas to detect diabetes. Used existing data from PIMA Indian Diabetes Dataset to train the model."
              imageUrl="./diabetes-prediction.png"
              alt="Diabetes Prediction Model"
            />
            <ProjectCard
              title="Human Detection Image Classifier"
              description="Developed a machine learning-based image classifier for detecting human presence in images using computer vision techniques."
              imageUrl="./human-detection.png"
              alt="Human Detection Classifier"
            />
            <ProjectCard
              title="Flashcards Study App"
              description="Built a flashcards study app to enable users to efficiently learn and memorize information through spaced repetition."
              imageUrl="./flashy.png"
              alt="Flashcards Study App"
            />
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section ref={experiencesRef} id="experiences" className="min-h-screen px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center">Experiences</h1>
          <p className="text-gray-400 mb-24 text-center text-lg">
            Check out my experiences and see the hands-on knowledge I've gained.
          </p>
          
          <ExperiencesCarousel />
        </div>
      </section>
    </div>
  )
}
