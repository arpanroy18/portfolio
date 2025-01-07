import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  alt: string
}

export function ProjectCard({ title, description, imageUrl, alt }: ProjectCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-black to-black/50 border border-gray-800 flex flex-col h-full">
      <div className="relative" style={{ aspectRatio: '16/7' }}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 bg-[#1e2761]/80 flex-1">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

