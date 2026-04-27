'use client'

import Navbar from '@/components/Navbar'
import GoogleMaps from '@/components/GoogleMaps'
import ContactSection from '@/components/ContactSection'
import ClickableImage from '@/components/ClickableImage'
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      
      {/* Main content with padding for navbar */}
      <div className="pt-0 md:pt-20 pb-20 md:pb-0">
        {/* Facebook-style Profile Section */}
        <div className="bg-white dark:bg-gray-800">
          {/* Cover Photo (Banner) */}
          <div className="relative w-full h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-700">
            <ClickableImage
              src="/banner1.png"
              alt="GianAgo Risto-pub - Banner"
              fill
              className="w-full h-full"
              priority
              quality={100}
              sizes="100vw"
            />
            {/* Profile Picture - Overlay on Banner */}
            <div className="absolute bottom-0 left-4 md:left-8 transform translate-y-1/2 z-10">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-visible bg-white dark:bg-gray-800">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ClickableImage
                    src="/profilo.png"
                    alt="GianAgo Risto-pub - Profilo"
                    fill
                    className="rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">

              {/* Profile Info */}
              <div className="pt-20 md:pt-24 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  GianAgo Risto-pub
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Risto-Pub • Terrasini, Palermo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Allergie e Intolleranze Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Allergie e intolleranze</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed">
                    Amati clienti, gli ingredienti utilizzati da noi sono naturali e genuini, due qualita
                    e bonta date in massima resa ai prodotti tra questi ingredienti sono presenti prodotti
                    che tuttavia possono provocare intolleranze e allergie, pertanto e importante informare
                    il personale addetto al fine di scongiurare il rischio di possibili contaminazioni crociate.
                  </p>

                  <p className="leading-relaxed">
                    Dear customers, the ingredients we use are natural and genuine, where quality and
                    goodness give the products their best performance. These ingredients include products
                    that can, however, cause intolerances and allergies. Therefore, it is important to
                    inform our staff in order to avoid the risk of possible cross contamination.
                  </p>

                  <p className="leading-relaxed font-semibold">
                    Il menu puo variare in base alle disponibilita del giorno
                  </p>
                </div>
              </div>

              {/* Style Image */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <ClickableImage
                  src="/pani.png"
                  alt="GianAgo Risto-pub - Stile"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Informazioni</h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Indirizzo:</strong><br />
                    Via Vittorio Emanuele Orlando, n 123, Terrasini, PA (Sicily)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 md:pb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Dove Siamo
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Via Vittorio Emanuele Orlando, n 123, Terrasini, PA (Sicily)
              </p>
            </div>
            <GoogleMaps />
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Facevoice.ai Attribution */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Creato da{' '}
              <a
                href="https://facevoice.ai/ai-chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-500 transition-colors font-semibold"
              >
                Facevoice.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
