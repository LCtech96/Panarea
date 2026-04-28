'use client'

import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import BackButton from '@/components/BackButton'
import ClickableImage from '@/components/ClickableImage'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ChiSiamoPage() {
  const { t } = useLanguage()
  return (
    <main className="site-shell pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-10">
      <Navbar />
      
      <div className="pb-10 pt-14 md:pb-12 md:pt-28">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="mb-8">
            <BackButton />
          </div>
          
          <h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            {t('chi.title')}
          </h1>

          <div className="space-y-10 md:space-y-12">
            {/* Team Section */}
            <div className="overflow-hidden ios-card-solid">
              <div className="p-6 md:p-10">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                  {t('chi.team.title')}
                </h2>
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  <div className="order-2 md:order-1">
                    <p className="mb-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {t('chi.team.p1')}
                    </p>
                    <p className="mb-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {t('chi.team.p2')}
                    </p>
                    <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {t('chi.team.p3')}
                    </p>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative h-[280px] w-full overflow-hidden rounded-[1.5rem] bg-zinc-200 shadow-ios ring-1 ring-black/5 dark:bg-zinc-700 dark:ring-white/10 md:h-[380px] md:rounded-[2rem]">
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
            <div className="overflow-hidden ios-card-solid">
              <div className="p-6 md:p-10">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                  {t('chi.place.title')}
                </h2>
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  <div>
                    <div className="relative h-[280px] w-full overflow-hidden rounded-[1.5rem] bg-zinc-200 shadow-ios ring-1 ring-black/5 dark:bg-zinc-700 dark:ring-white/10 md:h-[380px] md:rounded-[2rem]">
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
                    <p className="mb-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {t('chi.place.p1')}
                    </p>
                    <p className="mb-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {t('chi.place.p2')}
                    </p>
                    <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {t('chi.place.p3')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="ios-card-solid p-6 md:p-10">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                {t('chi.mission.title')}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
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






