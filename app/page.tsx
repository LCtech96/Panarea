'use client'

import Navbar from '@/components/Navbar'
import GoogleMaps from '@/components/GoogleMaps'
import ContactSection from '@/components/ContactSection'
import ClickableImage from '@/components/ClickableImage'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  return (
    <main className="site-shell pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-10">
      <Navbar />

      <div className="pt-12 md:pt-28">
        {/* Hero: copertina piena, avatar sotto (mai tagliato da overflow) */}
        <div className="bg-white/70 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 shadow-ios-lg ring-1 ring-black/5 dark:from-zinc-800 dark:to-zinc-900 dark:ring-white/10 md:rounded-[2rem]">
              <div className="relative aspect-[16/10] min-h-[200px] w-full md:aspect-[2.2/1] md:min-h-[260px]">
                <ClickableImage
                  src="/gianago-brand.png"
                  alt="GianAgo Food & Drink - Copertina"
                  fill
                  fit="contain"
                  className="bg-transparent object-contain p-5 md:p-10"
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-5 pb-2 md:mt-10 md:flex-row md:items-center md:gap-8 md:pb-4">
              <div className="relative h-[7.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-[1.75rem] bg-white shadow-ios-lg ring-4 ring-white dark:bg-zinc-900 dark:ring-zinc-950 md:h-36 md:w-36 md:rounded-[2rem] md:ring-[6px]">
                <ClickableImage
                  src="/gianago-brand.png"
                  alt="GianAgo Food & Drink - Logo"
                  fill
                  fit="contain"
                  className="object-contain p-3 md:p-4"
                  priority
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                  GianAgo Risto-pub
                </h1>
                <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">{t('home.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="space-y-6 lg:col-span-2">
              <section className="ios-card-solid p-7 md:p-8">
                <h2 className="mb-5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {t('home.allergy.title')}
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-base">
                  <p>{t('home.allergy.it')}</p>
                  <p>{t('home.allergy.en')}</p>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">{t('home.menuNote')}</p>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="ios-card-solid p-7">
                <h3 className="mb-4 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  {t('home.info')}
                </h3>
                <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{t('home.addressLabel')} </span>
                  Via Vittorio Emanuele Orlando, n 123, Terrasini, PA (Sicily)
                </p>
              </section>
            </aside>
          </div>
        </div>

        <section className="mx-auto max-w-6xl px-4 pb-16 pt-2 sm:px-6 md:pb-12 lg:px-8">
          <div className="ios-card-solid overflow-hidden p-6 md:p-10">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                {t('home.where')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Via Vittorio Emanuele Orlando, n 123, Terrasini, PA (Sicily)
              </p>
            </div>
            <GoogleMaps />
          </div>
        </section>
      </div>

      <ContactSection />

      <footer className="border-t border-white/10 bg-zinc-950/95 py-6 text-white backdrop-blur-xl dark:bg-black/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-400">
            {t('home.createdBy')}{' '}
            <a
              href="https://facevoice.ai/ai-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange-400 transition hover:text-orange-300"
            >
              Facevoice.ai
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
