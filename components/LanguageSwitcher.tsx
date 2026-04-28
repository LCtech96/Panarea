'use client'

import { ChangeEvent } from 'react'
import { Locale } from '@/lib/translations'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as Locale)
  }

  return (
    <label className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
      <span className="hidden md:inline">{t('lang.label')}</span>
      <select
        aria-label={t('lang.label')}
        value={locale}
        onChange={handleChange}
        className="cursor-pointer rounded-full border border-zinc-200/90 bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm transition hover:border-orange-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-100"
      >
        <option value="it">IT</option>
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="fr">FR</option>
        <option value="de">DE</option>
      </select>
    </label>
  )
}
