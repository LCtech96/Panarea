import { query } from '../neon'

export interface Content {
  id: number
  key: string
  title: string | null
  content: string
  content_type: string
  created_at: Date
  updated_at: Date
}

// Ottieni tutto il contenuto
export async function getAllContent() {
  return query<Content>('SELECT * FROM content ORDER BY key')
}

// Ottieni contenuto per chiave
export async function getContentByKey(key: string) {
  const result = await query<Content>('SELECT * FROM content WHERE key = $1', [key])
  return result[0] || null
}

// Crea o aggiorna contenuto
export async function upsertContent(data: {
  key: string
  title?: string
  content: string
  content_type?: string
}) {
  const result = await query<Content>(
    `INSERT INTO content (key, title, content, content_type)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (key) 
     DO UPDATE SET 
       title = EXCLUDED.title,
       content = EXCLUDED.content,
       content_type = EXCLUDED.content_type,
       updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [
      data.key,
      data.title || null,
      data.content,
      data.content_type || 'text',
    ]
  )
  return result[0]
}

// Elimina contenuto
export async function deleteContent(key: string) {
  const result = await query<Content>('DELETE FROM content WHERE key = $1 RETURNING *', [key])
  return result[0] || null
}



