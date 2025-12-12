'use client'

import { useEffect } from 'react'

export default function ServiceWorkerHandler() {
  useEffect(() => {
    // Rimuovi eventuali service worker registrati in precedenza
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().catch((error) => {
            console.log('Service worker unregistration error:', error)
          })
        }
      })

      // Gestisci eventuali errori di preload
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          // Ignora messaggi di skip waiting
        }
      })
    }
  }, [])

  return null
}


