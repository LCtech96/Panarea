import type { Metadata } from 'next'
import { Permanent_Marker, Kalam } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-permanent-marker',
  display: 'swap',
})

const kalam = Kalam({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
  display: 'swap',
})

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
    <html lang="it" className={`${permanentMarker.variable} ${kalam.variable} bg-white`}>
      <body className="bg-white dark:bg-gray-900 transition-colors">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

