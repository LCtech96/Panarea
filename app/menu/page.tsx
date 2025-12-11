'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import BackButton from '@/components/BackButton'
import { useOrder } from '@/contexts/OrderContext'
import { useRouter } from 'next/navigation'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  ingredients: string[]
  allergens?: string[]
  vegan?: boolean
  glutenFree?: boolean
  bestSeller?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Panarea Burger',
    description: 'Hamburger classico con ingredienti freschi',
    price: 8.50,
    category: 'burger',
    ingredients: ['Pane', 'Carne', 'Lattuga', 'Pomodoro', 'Cipolla', 'Salsa speciale'],
    allergens: ['Glutine', 'Latte'],
    bestSeller: true,
  },
  {
    id: '2',
    name: 'Panino Siciliano',
    description: 'Panino con ingredienti tipici siciliani',
    price: 7.50,
    category: 'panino',
    ingredients: ['Pane', 'Prosciutto', 'Formaggio', 'Melanzane', 'Peperoni'],
    allergens: ['Glutine', 'Latte'],
  },
  {
    id: '3',
    name: 'Veggie Burger',
    description: 'Hamburger vegetariano con verdure grigliate',
    price: 7.00,
    category: 'burger',
    ingredients: ['Pane', 'Verdure grigliate', 'Lattuga', 'Pomodoro', 'Salsa vegana'],
    allergens: ['Glutine'],
    vegan: true,
    glutenFree: false,
  },
  {
    id: '4',
    name: 'Gluten Free Burger',
    description: 'Hamburger senza glutine',
    price: 9.00,
    category: 'burger',
    ingredients: ['Pane senza glutine', 'Carne', 'Lattuga', 'Pomodoro'],
    allergens: ['Latte'],
    glutenFree: true,
  },
]

export default function MenuPage() {
  const { addToCart } = useOrder()
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<Record<string, { quantity: number; modifications: string[] }>>({})

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: Math.max(0, quantity),
        modifications: prev[itemId]?.modifications || [],
      },
    }))
  }

  const toggleModification = (itemId: string, modification: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || { quantity: 1, modifications: [] }
      const modifications = current.modifications.includes(modification)
        ? current.modifications.filter((m) => m !== modification)
        : [...current.modifications, modification]
      return {
        ...prev,
        [itemId]: { ...current, modifications },
      }
    })
  }

  const handleAddToCart = (item: MenuItem) => {
    const selection = selectedItems[item.id]
    if (!selection || selection.quantity === 0) {
      alert('Seleziona almeno una quantità')
      return
    }

    const modifications = selection.modifications.length > 0
      ? [`Modifiche: ${selection.modifications.join(', ')}`]
      : []

    addToCart({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: item.price,
      quantity: selection.quantity,
      modifications,
    })

    alert(`${selection.quantity}x ${item.name} aggiunto al carrello!`)
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Il Nostro Menù
          </h1>
          
          <div className="space-y-6">
            {menuItems.map((item) => {
              const selection = selectedItems[item.id] || { quantity: 0, modifications: [] }
              const availableModifications = ['Senza cipolla', 'Senza pomodoro', 'Extra formaggio', 'Extra salsa']

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {item.name}
                        </h2>
                        {item.bestSeller && (
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            ⭐ Best Seller
                          </span>
                        )}
                        {item.vegan && (
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                            🌱 Vegan
                          </span>
                        )}
                        {item.glutenFree && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            GF
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {item.description}
                      </p>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                        €{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Ingredienti: {item.ingredients.join(', ')}
                    </p>
                    {item.allergens && item.allergens.length > 0 && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        ⚠️ Allergeni: {item.allergens.join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Modifiche (opzionale):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableModifications.map((mod) => (
                        <button
                          key={mod}
                          onClick={() => toggleModification(item.id, mod)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selection.modifications.includes(mod)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {mod}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, selection.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                        {selection.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, selection.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Aggiungi al Carrello
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <ContactSection />
    </main>
  )
}
