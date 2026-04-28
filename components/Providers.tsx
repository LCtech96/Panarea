'use client'

import { OrderProvider } from '@/contexts/OrderContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ServiceWorkerHandler from '@/components/ServiceWorkerHandler'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <OrderProvider>
          <ServiceWorkerHandler />
          {children}
        </OrderProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

