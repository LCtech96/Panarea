'use client'

const MAP_QUERY =
  'Via Vittorio Emanuele Orlando 123, Terrasini, PA, Sicilia, Italia'

export default function GoogleMaps() {
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`
  const openInMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`

  return (
    <div className="w-full h-[400px] md:h-[500px] my-8">
      <iframe
        src={embedSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-lg"
        title="Mappa: GianAgo Risto-pub"
      />
      <div className="mt-4 text-center">
        <a
          href={openInMapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-700 underline text-sm"
        >
          Apri in Google Maps
        </a>
      </div>
    </div>
  )
}
