import { NextRequest, NextResponse } from 'next/server'
import { updateMenuItem, deleteMenuItem, getMenuItemById } from '@/lib/db/queries/menu'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })
    }

    const existing = await getMenuItemById(id)
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }

    const body = await request.json()
    const updated = await updateMenuItem(id, body)
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating menu item:', error)
    if (error instanceof Error && error.message.includes('Database connection not configured')) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 })
    }
    return NextResponse.json({ success: false, error: 'Failed to update menu item' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })
    }

    const deleted = await deleteMenuItem(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    if (error instanceof Error && error.message.includes('Database connection not configured')) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 })
    }
    return NextResponse.json({ success: false, error: 'Failed to delete menu item' }, { status: 500 })
  }
}
