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
      className={`inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-100/90 px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-ios backdrop-blur-sm transition hover:bg-zinc-200/90 active:scale-[0.98] dark:border-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-100 dark:hover:bg-zinc-700 ${className}`}
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






