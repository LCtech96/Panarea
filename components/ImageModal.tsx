'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Indietro
        </button>
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            onClick={(e) => e.stopPropagation()}
            priority
            quality={100}
            sizes="100vw"
            unoptimized={src.startsWith('/') && (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg'))}
          />
        </div>
      </div>
    </div>
  )
}

