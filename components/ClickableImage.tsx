'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageModal from './ImageModal'

interface ClickableImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export default function ClickableImage({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
}: ClickableImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className={`relative cursor-pointer hover:opacity-90 transition-opacity ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        {fill ? (
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover rounded-full"
              priority={priority}
              sizes="(max-width: 768px) 128px, 160px"
              onError={(e) => {
                console.error('Image load error:', src)
              }}
            />
          </div>
        ) : (
          <div className="relative w-full" style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}>
            <Image
              src={src}
              alt={alt}
              width={width || 800}
              height={height || 600}
              className="w-full h-auto object-cover"
              priority={priority}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center pointer-events-none">
          <svg
            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>
      <ImageModal
        src={src}
        alt={alt}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

