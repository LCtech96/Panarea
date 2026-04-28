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
    <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-200">
      <span className="hidden md:inline">{t('lang.label')}</span>
      <select
        aria-label={t('lang.label')}
        value={locale}
        onChange={handleChange}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-1 text-xs"
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
