'use client'

import { useState } from 'react'

interface Highlight {
  id: string
  label: string
  icon: string
  color: string
}

const highlights: Highlight[] = [
  {
    id: 'ingredients',
    label: 'Ingredienti',
    icon: '🥬',
    color: 'bg-green-500',
  },
  {
    id: 'allergens',
    label: 'Allergeni',
    icon: '⚠️',
    color: 'bg-red-500',
  },
  {
    id: 'bestseller',
    label: 'Best Seller',
    icon: '⭐',
    color: 'bg-yellow-500',
  },
  {
    id: 'vegan',
    label: 'Vegan/Gluten Free',
    icon: '🌱',
    color: 'bg-purple-500',
  },
]

export default function Highlights() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="bg-white dark:bg-gray-800 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-4 md:gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setSelected(selected === highlight.id ? null : highlight.id)}
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${highlight.color} flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform border-4 border-white dark:border-gray-800 ${
                  selected === highlight.id ? 'ring-4 ring-orange-500' : ''
                }`}
              >
                {highlight.icon}
              </div>
              <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {highlight.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



