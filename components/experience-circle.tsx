import Image from 'next/image'

interface ExperienceCircleProps {
  title: string
  date: string
  description?: string
  logo?: string
  isActive?: boolean
  size?: 'sm' | 'lg'
  position?: number
  totalPositions?: number
  onClick?: () => void
}

export function ExperienceCircle({
  title,
  date,
  description,
  logo,
  isActive = false,
  size = 'sm',
  position = 0,
  totalPositions = 5,
  onClick
}: ExperienceCircleProps) {
  const angle = (position * (360 / totalPositions) - 90) * (Math.PI / 180)
  const radius = size === 'lg' ? 0 : 270 // Reduced radius for smaller layout
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  return (
    <div
      className={`
        absolute rounded-full flex flex-col items-center justify-center text-center 
        transition-all duration-500 cursor-pointer
        ${size === 'lg' 
          ? 'w-80 h-80 bg-zinc-900/90 p-6'  // Reduced size for large circle
          : 'w-40 h-40 hover:scale-105'      // Reduced size for small circles
        }
        ${size !== 'lg' && isActive
          ? 'bg-gradient-to-r from-blue-950 to-indigo-800'  // Active state
          : size === 'lg' ? 'bg-zinc-900/90' : 'bg-zinc-800/90'
        }
      `}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      onClick={onClick}
    >
      {size === 'lg' && logo && (
        <div className="mb-4 w-14 h-14 bg-white rounded-lg flex items-center justify-center">
          <img src={logo} alt={`${title} logo`} className="w-10 h-10" />
        </div>
      )}
      <h3 className={`font-semibold ${size === 'lg' ? 'text-xl mb-2' : 'text-md'} text-white`}>
        {title}
      </h3>
      <p className={`text-sm ${size === 'lg' ? 'text-gray-400' : 'text-gray-300'}`}>
        {date}
      </p>
      {size === 'lg' && description && (
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
