import { getRestaurantJsonLd } from '@/lib/business'

/** Schema.org Restaurant per motori di ricerca (non visibile come testo “spam”). */
export default function RestaurantJsonLd() {
  const json = getRestaurantJsonLd()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
