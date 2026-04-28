'use client'

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

const navBtn =
  'flex flex-col items-center justify-center rounded-2xl px-3 py-2 text-[11px] font-semibold tracking-wide text-zinc-600 transition-all active:scale-[0.96] dark:text-zinc-300 md:px-5 md:text-sm md:tracking-normal [&_svg]:opacity-90 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-500/15 dark:hover:text-orange-400'

export default function Navbar() {
  const { t } = useLanguage()
  const [showReviewModal, setShowReviewModal] = useState(false)

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 md:inset-x-auto md:bottom-auto md:left-1/2 md:right-auto md:top-5 md:w-[min(80rem,calc(100vw-2rem))] md:-translate-x-1/2
        rounded-t-[1.85rem] border border-white/70 bg-white/80 pb-[max(0.35rem,env(safe-area-inset-bottom))] shadow-[0_-12px_48px_-16px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-300 dark:border-white/10 dark:bg-zinc-950/82 dark:shadow-[0_-12px_48px_-16px_rgba(0,0,0,0.45)] md:rounded-[2rem] md:border md:shadow-ios-lg dark:md:shadow-black/40"
        aria-label="Navigazione principale"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="flex h-[4.25rem] items-center justify-around md:h-[4.5rem] md:justify-between md:gap-2 md:px-2">
            <Link href="/menu" className={navBtn}>
              <svg className="mb-0.5 h-7 w-7 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>{t('nav.menu')}</span>
            </Link>

            <Link href="/chi-siamo" className={navBtn}>
              <svg className="mb-0.5 h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{t('nav.about')}</span>
            </Link>

            <button type="button" onClick={() => setShowReviewModal(true)} className={navBtn}>
              <svg className="mb-0.5 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{t('nav.reviews')}</span>
            </button>

            <Link href="/asporto" className={navBtn}>
              <svg className="mb-0.5 h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{t('nav.takeaway')}</span>
            </Link>

            <div className="hidden items-center gap-2 md:flex md:pl-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="flex items-center md:hidden">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex justify-center pb-2 md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {showReviewModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] border border-white/25 bg-white/95 shadow-ios-lg backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-zinc-200/80 px-5 py-4 dark:border-zinc-700/80">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                {t('nav.leaveReview')}
              </h2>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                aria-label="Chiudi"
              >
                ×
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center space-y-5 overflow-hidden p-6">
              <p className="text-center text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                {t('nav.reviewPrompt')}
              </p>
              <a
                href="https://share.google/1syh5aJu6nf3sKz7g"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-ios transition hover:brightness-105 active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {t('nav.leaveReviewGoogle')}
              </a>
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">{t('nav.reviewNewWindow')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
