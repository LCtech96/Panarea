'use client'

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { Locale, translations } from '@/lib/translations'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'gianago_locale'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('it')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved && translations[saved]) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo<LanguageContextType>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => translations[locale][key] || translations.it[key] || key,
    }),
    [locale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
