import type { Metadata } from 'next'
import { Permanent_Marker, Kalam, Great_Vibes } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import RestaurantJsonLd from '@/components/RestaurantJsonLd'

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
  description:
    'Risto-pub a Terrasini (Palermo): pesce fresco, cucina siciliana, drink e asporto. Vicino aeroporto e mare.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gianago.com'),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'GianAgo Risto-pub',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="it"
      className={`${permanentMarker.variable} ${kalam.variable} ${greatVibes.variable} bg-white antialiased`}
    >
      <body className="bg-white transition-colors dark:bg-zinc-950">
        <RestaurantJsonLd />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

