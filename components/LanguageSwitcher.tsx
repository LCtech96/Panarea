'use client'

import { ChangeEvent } from 'react'
import { Locale } from '@/lib/translations'
import { useLanguage } from '@/contexts/LanguageContext'

type Variant = 'default' | 'topBar' | 'navDesktop'

export default function LanguageSwitcher({ variant = 'default' }: { variant?: Variant }) {
  const { locale, setLocale, t } = useLanguage()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as Locale)
  }

  const selectClass =
    variant === 'topBar'
      ? 'cursor-pointer rounded-full border-2 border-zinc-300 bg-white px-2.5 py-1 text-xs font-bold text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-zinc-500 dark:bg-zinc-900 dark:text-white'
      : variant === 'navDesktop'
        ? 'cursor-pointer rounded-full border-2 border-zinc-300 bg-white px-3 py-1.5 text-xs font-bold text-zinc-900 shadow-sm transition hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400/50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:hover:border-orange-400'
        : 'cursor-pointer rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-bold text-zinc-900 shadow-sm transition hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100'

  const labelWrap =
    variant === 'topBar'
      ? 'flex items-center'
      : variant === 'navDesktop'
        ? 'flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200'
        : 'flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300'

  return (
    <label className={labelWrap}>
      {variant === 'topBar' && <span className="sr-only">{t('lang.label')}</span>}
      {variant === 'default' && <span className="hidden md:inline">{t('lang.label')}</span>}
      {variant === 'navDesktop' && <span className="hidden lg:inline">{t('lang.label')}</span>}
      <select aria-label={t('lang.label')} value={locale} onChange={handleChange} className={selectClass}>
        <option value="it">IT</option>
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="fr">FR</option>
        <option value="de">DE</option>
      </select>
    </label>
  )
}
