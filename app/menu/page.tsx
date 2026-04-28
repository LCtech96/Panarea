'use client'

import { useCallback, useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import BackButton from '@/components/BackButton'
import { useOrder } from '@/contexts/OrderContext'
import { useRouter } from 'next/navigation'
import { parseMenuDescription } from '@/lib/menuDescriptionCodec'
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
}

interface DisplayMenuItem {
  id: string
  name: string
  price: number
  description: string
}

function mapDefaultsToDisplay(): DisplayMenuItem[] {
  return getDefaultAntipastiItemsForSeed().map((row, i) => ({
    id: `default-${i}`,
    name: row.name,
    price: row.price,
    description: row.description,
  }))
}

function mapApiToDisplay(row: ApiMenuRow): DisplayMenuItem {
  return {
    id: String(row.id),
    name: row.name,
    price: Number(row.price),
    description: row.description || '',
  }
}

export default function MenuPage() {
  const { t } = useLanguage()
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
    const { ingredients } = parseMenuDescription(item.description)
    const modifications: string[] = []
    if (selection.removals.length > 0) {
      modifications.push(`${t('menu.removedPrefix')}: ${selection.removals.join(', ')}`)
    }

    addToCart({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: item.price,
      quantity: selection.quantity,
      modifications,
    })

    alert(`${selection.quantity}x ${item.name} ${t('menu.addedAlert')}`)
    router.push('/asporto')
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="pt-16 md:pt-20 pb-20 md:pb-0">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-6">
            <BackButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t('menu.title')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-300 text-center mb-10">
            {t('menu.section')}
          </h2>

          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">{t('menu.loading')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {menuItems.map((item) => {
                const selection = selectedItems[item.id] || {
                  quantity: 0,
                  removals: [],
                }
                const { it, en, ingredients } = parseMenuDescription(item.description)
                const removableIngredients = ingredients.filter(
                  (ing) =>
                    !ing.toLowerCase().includes('scelta') &&
                    !ing.toLowerCase().includes('due ingredienti')
                )
                const showIngredientMods = removableIngredients.length > 0

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-baseline gap-2 w-full mb-3">
                      <span className="text-xl font-bold text-gray-900 dark:text-white shrink-0">
                        {item.name}
                      </span>
                      <span className="flex-1 border-b border-dotted border-gray-400 dark:border-gray-500 min-w-[1rem] mb-1.5" />
                      <span className="text-xl font-bold text-orange-600 dark:text-orange-400 shrink-0">
                        €{item.price.toFixed(2)}
                      </span>
                    </div>

                    {it ? (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{it}</p>
                    ) : null}
                    {en ? (
                      <p className="text-gray-600 dark:text-gray-400 italic mt-2 leading-relaxed">
                        {en}
                      </p>
                    ) : null}

                    {showIngredientMods && (
                      <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {t('menu.removeOptional')}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {removableIngredients.map((ingredient) => (
                            <button
                              key={ingredient}
                              type="button"
                              onClick={() => toggleRemoval(item.id, ingredient)}
                              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                selection.removals.includes(ingredient)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              - {ingredient}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, selection.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                          {selection.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, selection.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        {t('menu.addToCart')}
                      </button>
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
