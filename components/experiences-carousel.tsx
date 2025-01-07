'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ExperienceCircle } from './experience-circle'
import { Button } from '@/components/ui/button'

interface Experience {
  title: string
  date: string
  description?: string
  logo?: string
}

const experiences: Experience[] = [
  {
    title: "Waterloo Aerial Robotics Group",
    date: "Oct 2024 - Present",
    description: "Enhanced drone image processing and system reliability through bug resolution, pipeline optimization, and automation."
  },
  {
    title: "CS Base",
    date: "Apr 2023 - Aug 2024",
    description: "Led programming instruction and curriculum development, introducing students to advanced programming concepts."
  },
  {
    title: "First Robotics",
    date: "Nov 2022 - Mar 2023",
    description: "Taught Java programming, enabling team members to develop and enhance robot functionality."
  },
  {
    title: "Code 4 Tomorrow",
    date: "July 2023 - Mar 2024",
    description: "Supported organizational operations and documentation management for collaborative coding initiatives."
  },
  {
    title: "Project Empower",
    date: "Feb 2023 - Mar 2024",
    description: "Facilitated community outreach by building partnerships and fostering collaboration with external organizations."
  }
]

export function ExperiencesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const rotateLeft = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length)
  }

  const rotateRight = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center"> {/* Reduced height */}
      {/* Center experience - now with description */}
      <ExperienceCircle
        title={experiences[activeIndex].title}
        date={experiences[activeIndex].date}
        description={experiences[activeIndex].description} // Add this line
        size="lg"
        isActive
      />

      {/* Surrounding experiences */}
      {experiences.map((exp, i) => {
        const position = (i - activeIndex + experiences.length) % experiences.length
        const isActive = i === activeIndex // Mark the active circle
        return (
          <ExperienceCircle
            key={exp.title}
            title={exp.title}
            date={exp.date}
            position={position}
            totalPositions={experiences.length}
            isActive={isActive}
            onClick={() => setActiveIndex(i)}
          />
        )
      })}

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
        onClick={rotateLeft}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
        onClick={rotateRight}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
