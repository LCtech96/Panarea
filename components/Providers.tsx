'use client'

import { OrderProvider } from '@/contexts/OrderContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ServiceWorkerHandler from '@/components/ServiceWorkerHandler'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <OrderProvider>
        <ServiceWorkerHandler />
        {children}
      </OrderProvider>
    </ThemeProvider>
  )
}

