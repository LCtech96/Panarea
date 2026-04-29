'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import BackButton from '@/components/BackButton'
import { useOrder } from '@/contexts/OrderContext'
import { useRouter } from 'next/navigation'
import {
  parseMenuDescription,
  pickMenuDescriptionText,
  pickMenuDisplayName,
} from '@/lib/menuDescriptionCodec'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  MENU_CATEGORY_ANTIPASTI,
  getDefaultAntipastiItemsForSeed,
} from '@/lib/menu-antipasti-defaults'

interface ApiMenuRow {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  available: boolean
  image_file_path?: string | null
}

interface DisplayMenuItem {
  id: string
  name: string
  price: number
  description: string
  position: number
  imageUrl?: string | null
}

function mapDefaultsToDisplay(): DisplayMenuItem[] {
  return getDefaultAntipastiItemsForSeed().map((row, i) => ({
    id: `default-${i}`,
    name: row.name,
    price: row.price,
    description: row.description,
    position: row.position,
    imageUrl: null,
  }))
}

function mapApiToDisplay(row: ApiMenuRow): DisplayMenuItem {
  return {
    id: String(row.id),
    name: row.name,
    price: Number(row.price),
    description: row.description || '',
    position: (row as ApiMenuRow & { position?: number }).position ?? 0,
    imageUrl: row.image_file_path ?? null,
  }
}

function sectionTranslationKey(position: number): string {
  if (position >= 330) return 'menu.sections.aperimeat'
  if (position >= 310) return 'menu.sections.aperifish'
  if (position >= 290) return 'menu.sections.dessert'
  if (position >= 280) return 'menu.sections.contorni'
  if (position >= 250) return 'menu.sections.secondiPesce'
  if (position >= 230) return 'menu.sections.secondiCarne'
  if (position >= 180) return 'menu.sections.primiPesce'
  if (position >= 140) return 'menu.sections.primi'
  if (position >= 90) return 'menu.sections.antipastiMare'
  return 'menu.sections.antipastiPinse'
}

export default function MenuPage() {
  const { t, locale } = useLanguage()
  const { addToCart } = useOrder()
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<DisplayMenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<
    Record<
      string,
      {
        quantity: number
        removals: string[]
      }
    >
  >({})

  const loadMenu = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/menu?category=${encodeURIComponent(MENU_CATEGORY_ANTIPASTI)}&available_only=false`
      )
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        const rows = json.data.filter((r: ApiMenuRow) => r.available !== false)
        if (rows.length > 0) {
          setMenuItems(rows.map(mapApiToDisplay))
        } else {
          setMenuItems(mapDefaultsToDisplay())
        }
      } else {
        setMenuItems(mapDefaultsToDisplay())
      }
    } catch {
      setMenuItems(mapDefaultsToDisplay())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMenu()
  }, [loadMenu])

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: Math.max(0, quantity),
        removals: prev[itemId]?.removals || [],
      },
    }))
  }

  const toggleRemoval = (itemId: string, ingredient: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || { quantity: 1, removals: [] }
      const removals = current.removals.includes(ingredient)
        ? current.removals.filter((r) => r !== ingredient)
        : [...current.removals, ingredient]
      return { ...prev, [itemId]: { ...current, removals } }
    })
  }

  const handleAddToCart = (item: DisplayMenuItem) => {
    const selection = selectedItems[item.id]
    if (!selection || selection.quantity === 0) {
      alert(t('menu.selectQuantity'))
      return
    }
    const { extra, ingredients } = parseMenuDescription(item.description)
    const cartName = pickMenuDisplayName(item.name, extra, locale)
    const modifications: string[] = []
    if (selection.removals.length > 0) {
      modifications.push(`${t('menu.removedPrefix')}: ${selection.removals.join(', ')}`)
    }

    addToCart({
      id: `${item.id}-${Date.now()}`,
      name: cartName,
      price: item.price,
      quantity: selection.quantity,
      modifications,
    })

    alert(`${selection.quantity}x ${cartName} ${t('menu.addedAlert')}`)
    router.push('/asporto')
  }

  return (
    <main className="site-shell w-full min-w-0 max-w-[100dvw] pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-10">
      <Navbar />

      <div className="w-full min-w-0 pb-6 pt-14 md:pb-10 md:pt-28">
        <section className="mx-auto w-full min-w-0 max-w-4xl px-3 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="mb-8">
            <BackButton />
          </div>
          <h1 className="mb-3 break-words px-1 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
            {t('menu.title')}
          </h1>
          {loading ? (
            <div className="ios-card-solid p-12 text-center">
              <p className="text-[15px] text-zinc-600 dark:text-zinc-400">{t('menu.loading')}</p>
            </div>
          ) : (
            <div className="w-full min-w-0 space-y-6">
              {menuItems
                .slice()
                .sort((a, b) => a.position - b.position)
                .map((item, index, sortedItems) => {
                const sectionKey = sectionTranslationKey(item.position)
                const prevSectionKey =
                  index > 0 ? sectionTranslationKey(sortedItems[index - 1].position) : null
                const showSectionTitle = index === 0 || sectionKey !== prevSectionKey
                const selection = selectedItems[item.id] || {
                  quantity: 0,
                  removals: [],
                }
                const { extra, it, en, ingredients } = parseMenuDescription(item.description)
                const displayName = pickMenuDisplayName(item.name, extra, locale)
                const displayDesc = pickMenuDescriptionText(extra, it, en, locale)
                const removableIngredients = ingredients.filter(
                  (ing) =>
                    !ing.toLowerCase().includes('scelta') &&
                    !ing.toLowerCase().includes('due ingredienti')
                )
                const showIngredientMods = removableIngredients.length > 0

                return (
                  <div key={item.id} className="space-y-3">
                    {showSectionTitle && (
                      <h2 className="mx-auto mt-10 max-w-xl break-words px-2 text-center text-lg font-bold leading-snug tracking-tight text-green-800 dark:text-lime-300 sm:text-xl md:mt-12 md:text-2xl">
                        {t(sectionKey)}
                      </h2>
                    )}
                    <div className="ios-card-solid p-4 sm:p-6 md:p-7">
                      <div
                        className={`mb-3 flex w-full min-w-0 gap-3 sm:gap-4 ${item.imageUrl ? 'flex-col sm:flex-row sm:items-start' : ''}`}
                      >
                        {item.imageUrl ? (
                          <div className="relative mx-auto h-36 w-full max-w-sm shrink-0 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10 sm:mx-0 sm:h-28 sm:w-28">
                            <Image
                              src={item.imageUrl}
                              alt={displayName}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 112px"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0 w-full flex-1">
                      <div className="mb-3 flex w-full min-w-0 items-start justify-between gap-3">
                        <p className="min-w-0 flex-1 text-lg font-bold leading-snug tracking-tight text-zinc-900 [overflow-wrap:anywhere] dark:text-white sm:text-xl">
                          {displayName}
                        </p>
                        <span className="shrink-0 pt-0.5 text-lg font-bold tabular-nums text-lime-600 whitespace-nowrap dark:text-lime-400 sm:text-xl">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>

                      {displayDesc ? (
                        <p className="break-words leading-relaxed text-zinc-700 [overflow-wrap:anywhere] dark:text-zinc-300">
                          {displayDesc}
                        </p>
                      ) : null}

                      {showIngredientMods && (
                        <div className="mt-4">
                          <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            {t('menu.removeOptional')}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {removableIngredients.map((ingredient) => (
                              <button
                                key={ingredient}
                                type="button"
                                onClick={() => toggleRemoval(item.id, ingredient)}
                                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition active:scale-[0.98] ${
                                  selection.removals.includes(ingredient)
                                    ? 'border-red-400 bg-red-500 text-white shadow-ios'
                                    : 'border-zinc-200 bg-zinc-100 text-zinc-800 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200'
                                }`}
                              >
                                - {ingredient}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200/90 bg-zinc-100/90 p-1 dark:border-zinc-600 dark:bg-zinc-800/90">
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(item.id, selection.quantity - 1)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-zinc-700 transition hover:bg-white dark:text-zinc-200 dark:hover:bg-zinc-700"
                          >
                            −
                          </button>
                          <span className="min-w-[2.25rem] text-center text-[15px] font-semibold tabular-nums text-zinc-900 dark:text-white">
                            {selection.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(item.id, selection.quantity + 1)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-zinc-700 transition hover:bg-white dark:text-zinc-200 dark:hover:bg-zinc-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="min-h-[44px] flex-1 rounded-full bg-gradient-to-b from-yellow-300 via-lime-400 to-green-600 px-6 py-2.5 text-[15px] font-semibold text-zinc-900 shadow-ios transition hover:brightness-105 active:scale-[0.99] dark:from-lime-400 dark:via-lime-500 dark:to-green-700 dark:text-zinc-950"
                        >
                          {t('menu.addToCart')}
                        </button>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>

      <ContactSection />
    </main>
  )
}
