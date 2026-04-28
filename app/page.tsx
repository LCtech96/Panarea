'use client'

import Navbar from '@/components/Navbar'
import GoogleMaps from '@/components/GoogleMaps'
import ContactSection from '@/components/ContactSection'
import ClickableImage from '@/components/ClickableImage'
import { useLanguage } from '@/contexts/LanguageContext'
export default function Home() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      
      {/* Main content with padding for navbar */}
      <div className="pt-0 md:pt-20 pb-20 md:pb-0">
        {/* Facebook-style Profile Section */}
        <div className="bg-white dark:bg-gray-800">
          {/* Cover Photo (Banner) */}
          <div className="relative w-full h-[300px] md:h-[400px] bg-stone-200 dark:bg-stone-800">
            <ClickableImage
              src="/gianago-brand.png"
              alt="GianAgo Food & Drink - Copertina"
              fill
              fit="contain"
              className="w-full h-full"
              priority
              quality={100}
              sizes="100vw"
            />
            {/* Stesso logo come avatar (stile profilo) */}
            <div className="absolute bottom-0 left-4 md:left-8 transform translate-y-1/2 z-10">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-visible bg-stone-100 dark:bg-stone-900">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ClickableImage
                    src="/gianago-brand.png"
                    alt="GianAgo Food & Drink - Logo"
                    fill
                    fit="contain"
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
                  {t('home.subtitle')}
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('home.allergy.title')}</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed">
                    {t('home.allergy.it')}
                  </p>

                  <p className="leading-relaxed">
                    {t('home.allergy.en')}
                  </p>

                  <p className="leading-relaxed font-semibold">
                    {t('home.menuNote')}
                  </p>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('home.info')}</h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>{t('home.addressLabel')}</strong><br />
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
                {t('home.where')}
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
              {t('home.createdBy')}{' '}
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
