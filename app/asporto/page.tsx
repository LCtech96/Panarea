'use client'

import { useOrder } from '@/contexts/OrderContext'
import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import BackButton from '@/components/BackButton'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AsportoPage() {
  const { t } = useLanguage()
  const { orders, removeFromCart, updateQuantity, clearCart, getTotal } = useOrder()

  const formatOrderForWhatsApp = () => {
    if (orders.length === 0) return ''

    let message = `🍔 *${t('cart.orderHeader')}*\n\n`
    
    orders.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   ${t('cart.quantity')}: ${item.quantity}\n`
      message += `   ${t('cart.price')}: €${(item.price * item.quantity).toFixed(2)}\n`
      if (item.modifications && item.modifications.length > 0) {
        message += `   ${item.modifications.join('\n   ')}\n`
      }
      message += '\n'
    })

    message += `💰 *TOTALE: €${getTotal().toFixed(2)}*\n\n`
    message += '📍 Via Vittorio Emanuele Orlando, n 123, Terrasini, PA (Sicily)'

    return encodeURIComponent(message)
  }

  const handleSendWhatsApp = () => {
    if (orders.length === 0) {
      alert(t('cart.empty'))
      return
    }

    const whatsappNumber = '393773899808'
    const message = formatOrderForWhatsApp()
    const url = `https://wa.me/${whatsappNumber}?text=${message}`
    
    window.open(url, '_blank')
  }

  return (
    <main className="site-shell pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:pb-10">
      <Navbar />
      
      <div className="pb-10 pt-16 md:pb-12 md:pt-28">
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="mb-8">
            <BackButton />
          </div>
          <h1 className="mb-10 text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            {t('cart.title')}
          </h1>
          
          {orders.length === 0 ? (
            <div className="ios-card-solid p-10 text-center">
              <p className="mb-3 text-lg text-zinc-600 dark:text-zinc-400">
                {t('cart.empty')}
              </p>
              <p className="text-zinc-500 dark:text-zinc-500">
                {t('cart.gotoMenu')}
              </p>
            </div>
          ) : (
            <div className="mb-6 space-y-4">
              {orders.map((item) => (
                <div key={item.id} className="ios-card-solid p-6 md:p-7">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="tabular-nums text-zinc-600 dark:text-zinc-400">
                        €{item.price.toFixed(2)} {t('cart.each')}
                      </p>
                      {item.modifications && item.modifications.length > 0 && (
                        <div className="mt-2">
                          {item.modifications.map((mod, idx) => (
                            <p key={idx} className="text-sm text-zinc-500 dark:text-zinc-500">
                              {mod}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-600 transition hover:bg-red-500/20 dark:text-red-400"
                      aria-label="Rimuovi"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200/90 bg-zinc-100/90 p-1 dark:border-zinc-600 dark:bg-zinc-800/90">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-zinc-700 transition hover:bg-white dark:text-zinc-200 dark:hover:bg-zinc-700"
                      >
                        −
                      </button>
                      <span className="min-w-[2.25rem] text-center text-[15px] font-semibold tabular-nums text-zinc-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-zinc-700 transition hover:bg-white dark:text-zinc-200 dark:hover:bg-zinc-700"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xl font-bold tabular-nums text-orange-600 dark:text-orange-400">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {orders.length > 0 && (
            <div className="ios-card-solid mb-6 p-6 md:p-7">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {t('cart.total')}
                </span>
                <span className="text-3xl font-bold tabular-nums text-orange-600 dark:text-orange-400">
                  €{getTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full border border-zinc-300 bg-zinc-100 px-6 py-3.5 text-[15px] font-semibold text-zinc-800 shadow-ios transition hover:bg-zinc-200 active:scale-[0.99] dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 sm:flex-1"
                >
                  {t('cart.clear')}
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-ios transition hover:brightness-105 active:scale-[0.99]"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {t('cart.sendWhatsapp')}
                </button>
              </div>
            </div>
          )}

          <div className="ios-card-solid mt-8 p-8 text-center">
            <p className="mb-4 text-lg text-zinc-700 dark:text-zinc-300">
              {t('cart.help1')}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t('cart.help2')}
            </p>
          </div>
        </section>
      </div>

      <ContactSection />
    </main>
  )
}
