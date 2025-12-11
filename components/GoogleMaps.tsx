'use client'

export default function GoogleMaps() {
  // Google Maps embed for Corso Vittorio Emanuele n 51, Terrasini, PA (Sicily)
  // You can get the embed URL from: https://www.google.com/maps?q=Corso+Vittorio+Emanuele+n+51+Terrasini+PA
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890!2d13.081944!3d38.145833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA4JzQ1LjAiTiAxM8KwMDQnNTUuMCJF!5e0!3m2!1sit!2sit!4v1234567890123!5m2!1sit!2sit"
  
  // Alternative: Direct link to the location
  const directLink = "https://maps.app.goo.gl/XpLBDAhPbr5Ug4qo7"
  
  return (
    <div className="w-full h-[400px] md:h-[500px] my-8">
      <iframe
        src={`https://www.google.com/maps?q=Corso+Vittorio+Emanuele+n+51,+Terrasini,+PA+(Sicily)&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-lg"
      />
      <div className="mt-4 text-center">
        <a
          href={directLink}
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

