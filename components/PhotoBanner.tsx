'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function PhotoBanner() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden bg-gray-200">
      {/* Background Image */}
      <div className="relative w-full h-full z-0">
        {!imageError ? (
          <Image
            src="/banner1.jpg"
            alt="Panarea Burgers Banner"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
            <p className="text-white text-lg">Carica l&apos;immagine banner in /public/banner1.jpg</p>
          </div>
        )}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-4 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white panarea-title">
            Panarea Burgers
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4 text-base sm:text-lg md:text-2xl lg:text-3xl panarea-subtitle">
            <span className="font-bold italic">Panini artigianali</span>
            <span className="hidden md:inline">•</span>
            <span className="font-bold italic">Ingredienti di qualità</span>
            <span className="hidden md:inline">•</span>
            <span className="font-bold italic">Hamburger freschi</span>
          </div>
        </div>
      </div>
    </div>
  )
}

