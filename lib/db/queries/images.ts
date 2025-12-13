import { query } from '../neon'

export interface Image {
  id: number
  filename: string
  original_filename: string
  file_path: string
  file_size: number | null
  mime_type: string | null
  alt_text: string | null
  category: string | null
  created_at: Date
  updated_at: Date
}

// Ottieni tutte le immagini
export async function getAllImages(category?: string) {
  if (category) {
    return query<Image>(
      'SELECT * FROM images WHERE category = $1 ORDER BY created_at DESC',
      [category]
    )
  }
  return query<Image>('SELECT * FROM images ORDER BY created_at DESC')
}

// Ottieni un'immagine per ID
export async function getImageById(id: number) {
  const result = await query<Image>('SELECT * FROM images WHERE id = $1', [id])
  return result[0] || null
}

// Crea una nuova immagine
export async function createImage(data: {
  filename: string
  original_filename: string
  file_path: string
  file_size?: number
  mime_type?: string
  alt_text?: string
  category?: string
}) {
  const result = await query<Image>(
    `INSERT INTO images (filename, original_filename, file_path, file_size, mime_type, alt_text, category)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      data.filename,
      data.original_filename,
      data.file_path,
      data.file_size || null,
      data.mime_type || null,
      data.alt_text || null,
      data.category || null,
    ]
  )
  return result[0]
}

// Aggiorna un'immagine
export async function updateImage(id: number, data: Partial<Image>) {
  const updates: string[] = []
  const values: any[] = []
  let paramIndex = 1

  if (data.alt_text !== undefined) {
    updates.push(`alt_text = $${paramIndex++}`)
    values.push(data.alt_text)
  }
  if (data.category !== undefined) {
    updates.push(`category = $${paramIndex++}`)
    values.push(data.category)
  }
  if (updates.length > 0) {
    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)
    const result = await query<Image>(
      `UPDATE images SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    )
    return result[0] || null
  }
  return null
}

// Elimina un'immagine
export async function deleteImage(id: number) {
  const result = await query<Image>('DELETE FROM images WHERE id = $1 RETURNING *', [id])
  return result[0] || null
}





