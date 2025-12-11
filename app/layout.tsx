import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Panarea Burgers - Terrasini',
  description: 'Panarea Burgers - Hamburger e panini a Terrasini, Palermo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className="bg-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Kalam:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white dark:bg-gray-900 transition-colors">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

