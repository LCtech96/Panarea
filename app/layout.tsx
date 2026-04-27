import type { Metadata } from 'next'
import { Permanent_Marker, Kalam, Great_Vibes } from 'next/font/google'
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

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-title-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GianAgo Risto-pub - Terrasini',
  description: 'GianAgo Risto-pub - Hamburger e panini a Terrasini, Palermo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${permanentMarker.variable} ${kalam.variable} ${greatVibes.variable} bg-white`}>
      <body className="bg-white dark:bg-gray-900 transition-colors">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

