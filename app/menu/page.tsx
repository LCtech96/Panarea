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

// Lista di ingredienti aggiuntivi disponibili
const availableAddOns = [
  'Lattuga',
  'Pomodoro',
  'Cipolla',
  'Rucola',
  'Provola',
  'Mozzarella',
  'Gorgonzola',
  'Caciocavallo',
  'Primosale',
  'Leerdammer',
  'Stracciatella',
  'Scamorza',
  'Emmental',
  'Philadelphia',
  'Salsa tzatziki',
  'Patè di pomodoro secco',
  'Patè di olive nere',
  'Pesto di pistacchio',
  'Olio EVO',
  'Scaglie di grana',
  'Extra salsa',
  'Extra formaggio',
]

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Cotto di Te',
    description: 'Prosciutto cotto Ferrarini, a scelta tra (Provola, Mozzarella, Gorgonzola, Caciocavallo), Pomodoro',
    price: 6.50,
    category: 'panino',
    ingredients: ['Prosciutto cotto Ferrarini', 'Formaggio a scelta (Provola/Mozzarella/Gorgonzola/Caciocavallo)', 'Pomodoro'],
    allergens: ['Glutine', 'Latte'],
  },
  {
    id: '2',
    name: 'Bonito',
    description: 'Prosciutto crudo San Daniele, rucola, scaglie di grana, olio EVO',
    price: 7.50,
    category: 'panino',
    ingredients: ['Prosciutto crudo San Daniele', 'Rucola', 'Scaglie di grana', 'Olio EVO'],
    allergens: ['Glutine', 'Latte'],
    bestSeller: true,
  },
  {
    id: '3',
    name: 'Sicily',
    description: 'Salame dolce toscano, a scelta tra (Provola, Primosale, Leerdammer), Philadelphia',
    price: 6.50,
    category: 'panino',
    ingredients: ['Salame dolce toscano', 'Formaggio a scelta (Provola/Primosale/Leerdammer)', 'Philadelphia'],
    allergens: ['Glutine', 'Latte'],
  },
  {
    id: '4',
    name: 'Vulcano',
    description: 'Salame piccante, a scelta tra (Primosale, Caciotta affumicata, Scamorza), patè di pomodoro secco',
    price: 6.50,
    category: 'panino',
    ingredients: ['Salame piccante', 'Formaggio a scelta (Primosale/Caciotta affumicata/Scamorza)', 'Patè di pomodoro secco'],
    allergens: ['Glutine', 'Latte'],
  },
  {
    id: '5',
    name: 'Fantasy',
    description: 'Mortadella, a scelta tra (Stracciatella, Fettuccine al limone)',
    price: 5.50,
    category: 'panino',
    ingredients: ['Mortadella', 'A scelta (Stracciatella/Fettuccine al limone)'],
    allergens: ['Glutine', 'Latte'],
  },
  {
    id: '6',
    name: 'Nonna Piera',
    description: 'Melanzane fritte, lattuga, cipolla, salsa tzatziki',
    price: 7.50,
    category: 'panino',
    ingredients: ['Melanzane fritte', 'Lattuga', 'Cipolla', 'Salsa tzatziki'],
    allergens: ['Glutine', 'Latte'],
  },
  {
    id: '7',
    name: 'Tentazione',
    description: 'Porchetta artigianale, Emmental svizzero, patè di olive nere, lattuga',
    price: 8.00,
    category: 'panino',
    ingredients: ['Porchetta artigianale', 'Emmental svizzero', 'Patè di olive nere', 'Lattuga'],
    allergens: ['Glutine', 'Latte'],
    bestSeller: true,
  },
  {
    id: '8',
    name: 'Topazio',
    description: 'Speck, stracciatella, pesto di pistacchio',
    price: 7.50,
    category: 'panino',
    ingredients: ['Speck', 'Stracciatella', 'Pesto di pistacchio'],
    allergens: ['Glutine', 'Latte'],
  },
  {
    id: '9',
    name: 'Mordicchio Simply',
    description: 'Due ingredienti a scelta',
    price: 5.00,
    category: 'panino',
    ingredients: ['Due ingredienti a scelta'],
    allergens: ['Glutine'],
  },
  {
    id: '10',
    name: 'Sweet',
    description: 'Panino e Nutella',
    price: 3.00,
    category: 'panino',
    ingredients: ['Pane', 'Nutella'],
    allergens: ['Glutine', 'Latte'],
  },
]

export default function MenuPage() {
  const { addToCart } = useOrder()
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<Record<string, { 
    quantity: number
    removals: string[]
    additions: string[]
  }>>({})

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: Math.max(0, quantity),
        removals: prev[itemId]?.removals || [],
        additions: prev[itemId]?.additions || [],
      },
    }))
  }

  const toggleRemoval = (itemId: string, ingredient: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || { quantity: 1, removals: [], additions: [] }
      const removals = current.removals.includes(ingredient)
        ? current.removals.filter((r) => r !== ingredient)
        : [...current.removals, ingredient]
      return {
        ...prev,
        [itemId]: { ...current, removals },
      }
    })
  }

  const toggleAddition = (itemId: string, ingredient: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || { quantity: 1, removals: [], additions: [] }
      const additions = current.additions.includes(ingredient)
        ? current.additions.filter((a) => a !== ingredient)
        : [...current.additions, ingredient]
      return {
        ...prev,
        [itemId]: { ...current, additions },
      }
    })
  }

  const handleAddToCart = (item: MenuItem) => {
    const selection = selectedItems[item.id]
    if (!selection || selection.quantity === 0) {
      alert('Seleziona almeno una quantità')
      return
    }

    const modifications: string[] = []
    if (selection.removals.length > 0) {
      modifications.push(`Rimuovi: ${selection.removals.join(', ')}`)
    }
    if (selection.additions.length > 0) {
      modifications.push(`Aggiungi: ${selection.additions.join(', ')}`)
    }

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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Il Nostro Menù
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Panini Freddi e Piastrati
          </h2>
          
          <div className="space-y-6">
            {menuItems.map((item) => {
              const selection = selectedItems[item.id] || { quantity: 0, removals: [], additions: [] }
              
              // Filtra gli ingredienti rimovibili (solo quelli presenti nel panino)
              // Rimuove ingredienti generici come "Formaggio a scelta" o "A scelta"
              const removableIngredients = item.ingredients.filter(
                ing => !ing.toLowerCase().includes('scelta') && 
                       !ing.toLowerCase().includes('due ingredienti')
              )

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

                  {/* Sezione Rimozioni */}
                  {removableIngredients.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Rimuovi ingredienti (opzionale):
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {removableIngredients.map((ingredient) => (
                          <button
                            key={ingredient}
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

                  {/* Sezione Aggiunte */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Aggiungi ingredienti (opzionale):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableAddOns.map((addOn) => (
                        <button
                          key={addOn}
                          onClick={() => toggleAddition(item.id, addOn)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selection.additions.includes(addOn)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          + {addOn}
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