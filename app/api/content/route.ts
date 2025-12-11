import { NextRequest, NextResponse } from 'next/server'
import { getAllContent, upsertContent } from '@/lib/db/queries/content'

// GET - Ottieni tutto il contenuto
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key) {
      const { getContentByKey } = await import('@/lib/db/queries/content')
      const content = await getContentByKey(key)
      if (!content) {
        return NextResponse.json(
          { success: false, error: 'Content not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: content })
    }

    const content = await getAllContent()
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('Error fetching content:', error)
    // Se il database non è configurato, restituisci un array vuoto invece di un errore
    if (error instanceof Error && error.message.includes('Database connection not configured')) {
      return NextResponse.json({ success: true, data: [] })
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

// POST - Crea o aggiorna contenuto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const content = await upsertContent(body)
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('Error upserting content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save content' },
      { status: 500 }
    )
  }
}

