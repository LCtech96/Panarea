import type { Metadata } from 'next'
import { Permanent_Marker, Kalam, Great_Vibes } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import RestaurantJsonLd from '@/components/RestaurantJsonLd'
import { BUSINESS_NAME, BUSINESS_SEO_DESCRIPTION, getPublicSiteUrl } from '@/lib/business'

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

const siteUrl = getPublicSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BUSINESS_NAME} Terrasini | Risto-pub Palermo — Menu & Asporto`,
    template: `%s | ${BUSINESS_NAME} Terrasini`,
  },
  description: BUSINESS_SEO_DESCRIPTION,
  keywords: [
    'GianAgo',
    'Gianago ristopub',
    'ristopub Terrasini',
    'ristopub Palermo',
    'ristorante Terrasini',
    'pub Terrasini',
    'asporto Terrasini',
    'pesce Terrasini',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} — Terrasini (Palermo)`,
    description: BUSINESS_SEO_DESCRIPTION,
    images: [
      {
        url: '/gianago-brand.png',
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} — Terrasini`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS_NAME} Terrasini`,
    description: BUSINESS_SEO_DESCRIPTION,
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
      className={`${permanentMarker.variable} ${kalam.variable} ${greatVibes.variable} max-w-[100dvw] overflow-x-clip bg-white antialiased`}
    >
      <body className="min-w-0 overflow-x-clip bg-white transition-colors dark:bg-zinc-950">
        <RestaurantJsonLd />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

