'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const MAP_QUERY =
  'Via Vittorio Emanuele Orlando 123, Terrasini, PA, Sicilia, Italia'

export default function GoogleMaps() {
  const { t } = useLanguage()
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`
  const openInMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`

  return (
    <div className="my-8 w-full">
      <div className="h-[min(52vh,28rem)] w-full overflow-hidden rounded-[1.25rem] shadow-ios ring-1 ring-black/5 md:h-[min(60vh,32rem)] dark:ring-white/10">
        <iframe
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
          title="Mappa: GianAgo Risto-pub"
        />
      </div>
      <div className="mt-5 text-center">
        <a
          href={openInMapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-orange-500/15 px-5 py-2 text-sm font-semibold text-orange-700 ring-1 ring-orange-500/25 transition hover:bg-orange-500/25 dark:text-orange-300 dark:ring-orange-400/30"
        >
          {t('map.open')}
        </a>
      </div>
    </div>
  )
}
