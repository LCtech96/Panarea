import type { MetadataRoute } from 'next'

function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gianago.com').replace(/\/$/, '')
}

export default function robots(): MetadataRoute.Robots {
  const base = baseUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
