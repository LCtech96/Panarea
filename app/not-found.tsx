'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t('notfound.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('notfound.text')}
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {t('notfound.home')}
        </Link>
      </div>
    </div>
  )
}






