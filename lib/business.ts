/** Dati attività per SEO locale (schema.org) e coerenza NAP sul sito. */

export function getPublicSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gianago.com').replace(/\/$/, '')
}

export const BUSINESS_NAME = 'GianAgo Risto-pub'

/** Descrizione breve per meta tag e schema.org (ricerche tipo “gianago ristopub terrasini”) */
export const BUSINESS_SEO_DESCRIPTION =
  'GianAgo ristopub a Terrasini, Palermo: pesce fresco, cucina siciliana, drink e asporto. Vicino aeroporto e mare. Menu online e ordini.'

/** E.164 senza spazi */
export const BUSINESS_TELEPHONE_E164 = '+393773899808'

/** Solo visualizzazione umana */
export const BUSINESS_TELEPHONE_DISPLAY = '+39 377 389 9808'

export const BUSINESS_EMAIL = 'gianagoristopub@gmail.com'

/** Link Maps (posizione del locale) — aggiorna se cambia sede */
export const BUSINESS_MAPS_URL = 'https://maps.app.goo.gl/ZFEH8RBfKMF4YvkC6'

/** Coordinate approssimative del punto su Maps (Terrasini); affina se serve */
export const BUSINESS_GEO = {
  latitude: 38.1439,
  longitude: 13.0172,
} as const

export const BUSINESS_ADDRESS = {
  streetAddress: 'Via Vittorio Emanuele Orlando 123',
  addressLocality: 'Terrasini',
  addressRegion: 'PA',
  postalCode: '90049',
  addressCountry: 'IT',
} as const

/**
 * JSON-LD Restaurant per Google (non richiede keyword artificiali in pagina).
 * Quando crei la scheda Google Business Profile, aggiungi qui la proprietà
 * `sameAs: ['https://maps.google.com/...']` con l'URL pubblico della scheda.
 */
export function getRestaurantJsonLd(): Record<string, unknown> {
  const url = getPublicSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${url}/#restaurant`,
    name: BUSINESS_NAME,
    alternateName: ['Gianago Ristopub', 'GianAgo', 'Gianago Terrasini'],
    description: BUSINESS_SEO_DESCRIPTION,
    url,
    image: [`${url}/gianago-brand.png`],
    telephone: BUSINESS_TELEPHONE_E164,
    email: BUSINESS_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS.streetAddress,
      addressLocality: BUSINESS_ADDRESS.addressLocality,
      addressRegion: BUSINESS_ADDRESS.addressRegion,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    hasMap: BUSINESS_MAPS_URL,
    servesCuisine: ['Italian', 'Seafood', 'Sicilian'],
    priceRange: '€€',
    acceptsReservations: true,
  }
}
