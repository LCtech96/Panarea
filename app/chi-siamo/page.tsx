'use client'

import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import BackButton from '@/components/BackButton'
import ClickableImage from '@/components/ClickableImage'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ChiSiamoPage() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-16 md:pt-20 pb-20 md:pb-0">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('chi.title')}
          </h1>

          <div className="space-y-12">
            {/* Team Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('chi.team.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {t('chi.team.p1')}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {t('chi.team.p2')}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('chi.team.p3')}
                    </p>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <ClickableImage
                        src="/pana.png"
                        alt="Il Team di GianAgo Risto-pub"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Locale Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('chi.place.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <ClickableImage
                        src="/lo.png"
                        alt="Il Locale di GianAgo Risto-pub"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {t('chi.place.p1')}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {t('chi.place.p2')}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('chi.place.p3')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('chi.mission.title')}
              </h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  {t('chi.mission.p1')}
                </p>
                <p>
                  {t('chi.mission.p2')}
                </p>
                <p>
                  {t('chi.mission.p3')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ContactSection />
    </main>
  )
}






