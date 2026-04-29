import { MENU_CATEGORY_ANTIPASTI, getDefaultAntipastiItemsForSeed } from '@/lib/menu-antipasti-defaults'
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

/** Riga API con path immagine risolta (LEFT JOIN images). */
export type MenuItemWithImage = MenuItem & { image_file_path: string | null }

const MENU_FROM = `FROM menu_items m LEFT JOIN images i ON m.image_id = i.id`

// Ottieni tutti i prodotti del menu (con path immagine per anteprima)
export async function getAllMenuItems(category?: string, availableOnly: boolean = true) {
  const sel = `SELECT m.*, i.file_path AS image_file_path ${MENU_FROM}`
  if (category && availableOnly) {
    return query<MenuItemWithImage>(
      `${sel} WHERE m.category = $1 AND m.available = true ORDER BY m.position, m.name`,
      [category]
    )
  }
  if (category) {
    return query<MenuItemWithImage>(
      `${sel} WHERE m.category = $1 ORDER BY m.position, m.name`,
      [category]
    )
  }
  if (availableOnly) {
    return query<MenuItemWithImage>(
      `${sel} WHERE m.available = true ORDER BY m.category, m.position, m.name`
    )
  }
  return query<MenuItemWithImage>(`${sel} ORDER BY m.category, m.position, m.name`)
}

// Ottieni un prodotto per ID
export async function getMenuItemById(id: number) {
  const result = await query<MenuItemWithImage>(
    `SELECT m.*, i.file_path AS image_file_path ${MENU_FROM} WHERE m.id = $1`,
    [id]
  )
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

/**
 * Inserisce nel DB i piatti del menu predefinito che non esistono già
 * (stessa category + position). Non sovrascrive righe esistenti (così restano immagine/prezzo modificati).
 */
export async function importMissingDefaultMenuItems(): Promise<{
  inserted: number
  skipped: number
  total: number
}> {
  const defaults = getDefaultAntipastiItemsForSeed()
  const rows = await query<{ position: number }>(
    `SELECT position FROM menu_items WHERE category = $1`,
    [MENU_CATEGORY_ANTIPASTI]
  )
  const taken = new Set(rows.map((r) => r.position))
  let inserted = 0
  let skipped = 0

  for (const row of defaults) {
    if (taken.has(row.position)) {
      skipped++
      continue
    }
    await createMenuItem({
      name: row.name,
      description: row.description || undefined,
      price: row.price,
      category: MENU_CATEGORY_ANTIPASTI,
      position: row.position,
      available: true,
      featured: false,
    })
    inserted++
    taken.add(row.position)
  }

  return { inserted, skipped, total: defaults.length }
}






