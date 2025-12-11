'use client'

import { OrderProvider } from '@/contexts/OrderContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <OrderProvider>
        {children}
      </OrderProvider>
    </ThemeProvider>
  )
}

