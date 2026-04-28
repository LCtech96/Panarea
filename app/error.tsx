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
    <div className="site-shell flex min-h-screen items-center justify-center px-4 pb-24 pt-16">
      <div className="ios-card-solid max-w-lg p-10 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{t('error.title')}</h1>
        <h2 className="mb-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200">{t('error.subtitle')}</h2>
        <p className="mb-8 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {error.message || t('error.fallback')}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="min-h-[44px] rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-6 py-3 text-[15px] font-semibold text-white shadow-ios transition hover:brightness-105 active:scale-[0.99]"
          >
            {t('error.retry')}
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 px-6 py-3 text-[15px] font-semibold text-zinc-800 shadow-ios transition hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            {t('notfound.home')}
          </Link>
        </div>
      </div>
    </div>
  )
}
