'use client'

import { motion } from 'framer-motion'
import { FaCircle } from 'react-icons/fa'

interface Experience {
  title: string
  date: string
  description?: string
  role: string
}

interface MobileExperienceListProps {
  experiences: Experience[]
}

export function MobileExperienceList({ experiences }: MobileExperienceListProps) {
  return (
    <div className="relative w-full pl-8">
      {/* Timeline line */}
      <div className="absolute left-2 top-3 bottom-3 w-[2px] bg-gray-700" />

      {/* Experience blocks */}
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-8 relative"
        >
          {/* Timeline dot */}
          <div className="absolute -left-7 top-2">
            <FaCircle className="w-3 h-3 text-blue-500" />
          </div>

          {/* Experience content */}
          <div className="bg-zinc-900/50 rounded-lg p-4 border border-gray-800">
            <span className="text-sm text-gray-400 block mb-1">
              {experience.date}
            </span>
            <h3 className="text-lg font-bold text-white mb-1">
              {experience.role}
            </h3>
            <h4 className="text-base text-gray-300 mb-2">
              {experience.title}
            </h4>
            {experience.description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {experience.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
