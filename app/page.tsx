'use client'

import Navbar from '@/components/Navbar'
import GoogleMaps from '@/components/GoogleMaps'
import ContactSection from '@/components/ContactSection'
import ClickableImage from '@/components/ClickableImage'
import Highlights from '@/components/Highlights'

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
              alt="Panarea Burgers - Banner"
              fill
              className="w-full h-full"
              priority
            />
          </div>

          {/* Profile Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Profile Picture */}
              <div className="absolute -top-20 md:-top-24 left-4 md:left-8">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                  <ClickableImage
                    src="/profilo.png"
                    alt="Panarea Burgers - Profilo"
                    fill
                    className="rounded-full"
                    priority
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-24 md:pt-28 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Panarea Burgers
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Panineria • Terrasini, Palermo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <Highlights />

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Chi Siamo</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed">
                    Benvenuti da <strong>Panarea Burgers</strong>, il nuovo punto di riferimento 
                    per gli amanti dei burger e dei panini a Terrasini, nella provincia di Palermo.
                  </p>
                  
                  <p className="leading-relaxed">
                    La nostra passione nasce dall&apos;amore per la buona cucina e il desiderio di 
                    portare a Terrasini qualcosa di speciale. Abbiamo deciso di aprire questo 
                    locale perché crediamo che ogni comunità meriti di avere accesso a cibo di 
                    qualità, preparato con ingredienti freschi e selezionati.
                  </p>
                  
                  <p className="leading-relaxed">
                    Ogni hamburger e ogni panino che prepariamo racconta la nostra storia: 
                    ingredienti locali quando possibile, carni selezionate, pane fresco e 
                    condimenti fatti in casa. Non siamo solo un locale, siamo un&apos;esperienza 
                    culinaria che unisce tradizione e innovazione.
                  </p>
                </div>
              </div>

              {/* Style Image */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <ClickableImage
                  src="/pani.png"
                  alt="Panarea Burgers - Stile"
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
                    Corso Vittorio Emanuele n 51, Terrasini, PA (Sicily)
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
                Corso Vittorio Emanuele n 51, Terrasini, PA (Sicily)
              </p>
            </div>
            <GoogleMaps />
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
