import type { MetadataRoute } from 'next'

/** URL canonico del sito (produzione). Imposta NEXT_PUBLIC_SITE_URL su Vercel se cambia dominio. */
function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gianago.com').replace(/\/$/, '')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl()
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/menu`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/chi-siamo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/asporto`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]

  return routes
}
