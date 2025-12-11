import { NextRequest, NextResponse } from 'next/server'
import { getAllMenuItems, createMenuItem } from '@/lib/db/queries/menu'

// GET - Ottieni tutti i prodotti del menu
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const availableOnly = searchParams.get('available_only') !== 'false'

    const items = await getAllMenuItems(category, availableOnly)
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error('Error fetching menu items:', error)
    // Se il database non è configurato, restituisci un array vuoto invece di un errore
    if (error instanceof Error && error.message.includes('Database connection not configured')) {
      return NextResponse.json({ success: true, data: [] })
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

// POST - Crea un nuovo prodotto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const item = await createMenuItem(body)
    return NextResponse.json({ success: true, data: item }, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create menu item' },
      { status: 500 }
    )
  }
}

