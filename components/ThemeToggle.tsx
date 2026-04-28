'use client'

import { useTheme } from '@/contexts/ThemeContext'

type Variant = 'default' | 'topBar' | 'navDesktop'

const btnClass: Record<Variant, string> = {
  default:
    'rounded-full border border-zinc-300 bg-white p-2.5 text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-95 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700',
  topBar:
    'rounded-full border-2 border-zinc-300 bg-white p-2 text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-95 dark:border-zinc-500 dark:bg-zinc-900 dark:text-white',
  navDesktop:
    'rounded-full border-2 border-zinc-300 bg-white p-2.5 text-zinc-900 shadow-sm transition hover:bg-zinc-100 active:scale-95 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800',
}

export default function ThemeToggle({ variant = 'default' }: { variant?: Variant }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={btnClass[variant]}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  )
}
