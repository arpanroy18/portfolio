import React, { useRef, useEffect, useState } from 'react';

interface ExperienceCircleProps {
  title: string;
  date: string;
  description?: string;
  logo?: string;
  role?: string;
  isActive?: boolean;
  size?: 'sm' | 'lg';
  position?: number;
  totalPositions?: number;
  onClick?: () => void;
}

export function ExperienceCircle({
  title,
  date,
  description,
  logo,
  role,
  isActive = false,
  size = 'sm',
  position = 0,
  totalPositions = 5,
  onClick
}: ExperienceCircleProps) {
  const angle = (position * (360 / totalPositions) - 90) * (Math.PI / 180);
  const radius = size === 'lg' ? 0 : 270;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [descriptionWidth, setDescriptionWidth] = useState('max-w-xs');

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight);
      const lines = Math.ceil(descriptionRef.current.scrollHeight / lineHeight);
      if (lines > 3) {
        setDescriptionWidth('max-w-[19rem]');
      } else if (lines > 2) {
        setDescriptionWidth('max-w-[22rem]');
      } else {
        setDescriptionWidth('max-w-xs');
      }
    }
  }, [description]);

  return (
    <div
      className={`
        absolute rounded-full flex flex-col items-center justify-center text-center 
        transition-all duration-500 cursor-pointer
        ${size === 'lg' 
          ? 'w-80 h-80 bg-zinc-900/90 p-6 pt-8' // Added pt-8 for padding-top
          : `w-40 h-40 hover:scale-105`
        }
        ${size !== 'lg' && isActive
          ? 'bg-gradient-to-r from-blue-950 to-indigo-800' 
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
      {size === 'lg' && role && (
        <h3 className="font-extrabold text-2xl text-white">
          {role}
        </h3>
      )}
      <h4 className={`text-sm ${size === 'lg' ? 'text-gray-400 mb-1' : 'text-md'} text-white`}>
        {title}
      </h4>
      {size === 'lg' && description && (
        <p ref={descriptionRef} className={`mt-2 text-sm text-gray-400 leading-relaxed ${descriptionWidth} break-words`}>
          {description}
        </p>
      )}
      <p className={`text-sm ${size === 'lg' ? 'text-gray-400 mt-4' : 'text-gray-300'}`}>
        {date}
      </p>
    </div>
  );
}