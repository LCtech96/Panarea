/**
 * Example file showing how to use the Neon database
 * This file is for reference only - you can delete it or use it as a template
 */

import { query } from './neon'

// Example: Get all items from a table
export async function getAllItems() {
  try {
    const items = await query('SELECT * FROM items ORDER BY created_at DESC')
    return items
  } catch (error) {
    console.error('Error fetching items:', error)
    return []
  }
}

// Example: Get a single item by ID
export async function getItemById(id: number) {
  try {
    const result = await query('SELECT * FROM items WHERE id = $1', [id])
    return result[0] || null
  } catch (error) {
    console.error('Error fetching item:', error)
    return null
  }
}

// Example: Insert a new item
export async function createItem(name: string, description: string) {
  try {
    const result = await query(
      'INSERT INTO items (name, description, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [name, description]
    )
    return result[0]
  } catch (error) {
    console.error('Error creating item:', error)
    throw error
  }
}

// Example: Update an item
export async function updateItem(id: number, name: string, description: string) {
  try {
    const result = await query(
      'UPDATE items SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [name, description, id]
    )
    return result[0] || null
  } catch (error) {
    console.error('Error updating item:', error)
    throw error
  }
}

// Example: Delete an item
export async function deleteItem(id: number) {
  try {
    const result = await query('DELETE FROM items WHERE id = $1 RETURNING *', [id])
    return result[0] || null
  } catch (error) {
    console.error('Error deleting item:', error)
    throw error
  }
}





