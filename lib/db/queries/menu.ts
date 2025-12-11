import { query } from '../neon'

export interface MenuItem {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  image_id: number | null
  available: boolean
  featured: boolean
  position: number
  created_at: Date
  updated_at: Date
}

// Ottieni tutti i prodotti del menu
export async function getAllMenuItems(category?: string, availableOnly: boolean = true) {
  if (category && availableOnly) {
    return query<MenuItem>(
      'SELECT * FROM menu_items WHERE category = $1 AND available = true ORDER BY position, name',
      [category]
    )
  }
  if (category) {
    return query<MenuItem>(
      'SELECT * FROM menu_items WHERE category = $1 ORDER BY position, name',
      [category]
    )
  }
  if (availableOnly) {
    return query<MenuItem>(
      'SELECT * FROM menu_items WHERE available = true ORDER BY category, position, name'
    )
  }
  return query<MenuItem>('SELECT * FROM menu_items ORDER BY category, position, name')
}

// Ottieni un prodotto per ID
export async function getMenuItemById(id: number) {
  const result = await query<MenuItem>('SELECT * FROM menu_items WHERE id = $1', [id])
  return result[0] || null
}

// Ottieni prodotti in evidenza
export async function getFeaturedMenuItems() {
  return query<MenuItem>(
    'SELECT * FROM menu_items WHERE featured = true AND available = true ORDER BY position, name'
  )
}

// Crea un nuovo prodotto
export async function createMenuItem(data: {
  name: string
  description?: string
  price: number
  category: string
  image_id?: number
  available?: boolean
  featured?: boolean
  position?: number
}) {
  const result = await query<MenuItem>(
    `INSERT INTO menu_items (name, description, price, category, image_id, available, featured, position)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      data.name,
      data.description || null,
      data.price,
      data.category,
      data.image_id || null,
      data.available ?? true,
      data.featured ?? false,
      data.position || 0,
    ]
  )
  return result[0]
}

// Aggiorna un prodotto
export async function updateMenuItem(id: number, data: Partial<MenuItem>) {
  const updates: string[] = []
  const values: any[] = []
  let paramIndex = 1

  if (data.name !== undefined) {
    updates.push(`name = $${paramIndex++}`)
    values.push(data.name)
  }
  if (data.description !== undefined) {
    updates.push(`description = $${paramIndex++}`)
    values.push(data.description)
  }
  if (data.price !== undefined) {
    updates.push(`price = $${paramIndex++}`)
    values.push(data.price)
  }
  if (data.category !== undefined) {
    updates.push(`category = $${paramIndex++}`)
    values.push(data.category)
  }
  if (data.image_id !== undefined) {
    updates.push(`image_id = $${paramIndex++}`)
    values.push(data.image_id)
  }
  if (data.available !== undefined) {
    updates.push(`available = $${paramIndex++}`)
    values.push(data.available)
  }
  if (data.featured !== undefined) {
    updates.push(`featured = $${paramIndex++}`)
    values.push(data.featured)
  }
  if (data.position !== undefined) {
    updates.push(`position = $${paramIndex++}`)
    values.push(data.position)
  }

  if (updates.length > 0) {
    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)
    const result = await query<MenuItem>(
      `UPDATE menu_items SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    )
    return result[0] || null
  }
  return null
}

// Elimina un prodotto
export async function deleteMenuItem(id: number) {
  const result = await query<MenuItem>('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id])
  return result[0] || null
}

