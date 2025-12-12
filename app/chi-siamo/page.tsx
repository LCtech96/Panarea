'use client'

import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import BackButton from '@/components/BackButton'
import ClickableImage from '@/components/ClickableImage'

export default function ChiSiamoPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-16 md:pt-20 pb-20 md:pb-0">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Chi Siamo
          </h1>

          <div className="space-y-12">
            {/* Team Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Il Nostro Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Siamo un team appassionato di cibo e di qualità. Ogni membro del nostro staff
                      condivide la stessa visione: portare a Terrasini hamburger e panini preparati
                      con ingredienti freschi e selezionati, seguendo ricette che uniscono tradizione
                      e innovazione.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      La nostra passione per la cucina si riflette in ogni piatto che prepariamo.
                      Crediamo che il cibo non sia solo nutrimento, ma un&apos;esperienza che unisce
                      le persone e crea momenti indimenticabili.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Venite a trovarci e scoprite la differenza che fa la passione e l&apos;attenzione
                      ai dettagli in ogni nostro hamburger e panino.
                    </p>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <ClickableImage
                        src="/team.jpg"
                        alt="Il Team di Panarea Burgers"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <p className="text-white text-center px-4">
                          Aggiungi l&apos;immagine del team in /public/team.jpg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Locale Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Il Nostro Locale
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <ClickableImage
                        src="/locale.jpg"
                        alt="Il Locale di Panarea Burgers"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <p className="text-white text-center px-4">
                          Aggiungi l&apos;immagine del locale in /public/locale.jpg
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Il nostro locale si trova nel cuore di Terrasini, in Corso Vittorio Emanuele n 51.
                      Abbiamo creato uno spazio accogliente e moderno dove potete gustare i nostri
                      hamburger e panini in un ambiente confortevole.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      La nostra cucina è aperta e visibile, perché crediamo nella trasparenza e
                      vogliamo che vediate come prepariamo ogni piatto con cura e attenzione.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Sia che preferiate mangiare nel nostro locale o portare via, garantiamo sempre
                      la stessa qualità e freschezza in ogni ordine.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                La Nostra Mission
              </h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  La nostra missione è semplice ma ambiziosa: portare a Terrasini e ai suoi abitanti
                  hamburger e panini di qualità superiore, preparati con ingredienti freschi e
                  selezionati, in un ambiente accogliente e familiare.
                </p>
                <p>
                  Crediamo che ogni comunità meriti di avere accesso a cibo di qualità, preparato con
                  passione e rispetto per gli ingredienti. Per questo ogni giorno ci impegniamo a
                  offrire il meglio, dalla selezione delle materie prime alla preparazione finale.
                </p>
                <p>
                  Siamo orgogliosi di essere parte della comunità di Terrasini e di contribuire a
                  renderla un posto ancora migliore, un hamburger alla volta.
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



