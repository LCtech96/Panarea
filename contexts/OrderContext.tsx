'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  modifications?: string[]
  customIngredients?: string[]
}

interface OrderContextType {
  orders: OrderItem[]
  addToCart: (item: OrderItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderItem[]>([])

  // Carica ordini da localStorage al mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('panarea_orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Salva ordini in localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('panarea_orders', JSON.stringify(orders))
  }, [orders])

  const addToCart = (item: OrderItem) => {
    setOrders((prev) => {
      const existing = prev.find((o) => o.id === item.id)
      if (existing) {
        return prev.map((o) =>
          o.id === item.id
            ? { ...o, quantity: o.quantity + item.quantity }
            : o
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, quantity } : o))
    )
  }

  const clearCart = () => {
    setOrders([])
  }

  const getTotal = () => {
    return orders.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider')
  }
  return context
}

