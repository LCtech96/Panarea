import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/require-admin-api'
import { importMissingDefaultMenuItems } from '@/lib/db/queries/menu'

/** POST: importa nel DB tutti i piatti del menu predefinito ancora assenti (per category+position). */
export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdminSession(request)
    if (denied) return denied

    const result = await importMissingDefaultMenuItems()
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('menu import:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Import fallito',
      },
      { status: 500 }
    )
  }
}
