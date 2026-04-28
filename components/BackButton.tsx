'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface BackButtonProps {
  label?: string
  className?: string
}

export default function BackButton({ label = 'Indietro', className = '' }: BackButtonProps) {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <button
      onClick={() => router.back()}
      className={`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2 ${className}`}
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
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {label === 'Indietro' ? t('back.default') : label}
    </button>
  )
}






