'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="site-shell flex min-h-screen items-center justify-center px-4 pb-24 pt-16">
      <div className="ios-card-solid max-w-md p-10 text-center">
        <h1 className="mb-3 text-7xl font-bold tabular-nums tracking-tight text-zinc-900 dark:text-white">
          404
        </h1>
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
          {t('notfound.title')}
        </h2>
        <p className="mb-8 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{t('notfound.text')}</p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-8 py-3 text-[15px] font-semibold text-white shadow-ios transition hover:brightness-105 active:scale-[0.99]"
        >
          {t('notfound.home')}
        </Link>
      </div>
    </div>
  )
}
