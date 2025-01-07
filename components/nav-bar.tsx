'use client'

import { useEffect, useState } from 'react'

interface NavBarProps {
  onNavigate: (ref: string) => void
}

export function NavBar({ onNavigate }: NavBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home')
      if (homeSection) {
        const homeSectionBottom = homeSection.getBoundingClientRect().bottom
        const triggerOffset = 500
        setIsVisible(homeSectionBottom < triggerOffset)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full px-4 py-4"> {/* Changed from max-w-6xl mx-auto */}
        <div className="flex justify-end">
          <ul className="flex items-center gap-6">
            <li>
              <button 
                onClick={() => onNavigate('home')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('projects')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('experiences')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Experiences
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

