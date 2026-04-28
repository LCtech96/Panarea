'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useLanguage()
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">{t('error.title')}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t('error.subtitle')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error.message || t('error.fallback')}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t('error.retry')}
          </button>
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t('notfound.home')}
          </Link>
        </div>
      </div>
    </div>
  )
}






