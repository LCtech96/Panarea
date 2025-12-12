import { NextRequest, NextResponse } from 'next/server'
import { getImageById, updateImage, deleteImage } from '@/lib/db/queries/images'
import { unlink } from 'fs/promises'
import { join } from 'path'

// GET - Ottieni un'immagine per ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const image = await getImageById(id)

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: image })
  } catch (error) {
    console.error('Error fetching image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch image' },
      { status: 500 }
    )
  }
}

// PATCH - Aggiorna un'immagine
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()

    const image = await updateImage(id, body)

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: image })
  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update image' },
      { status: 500 }
    )
  }
}

// DELETE - Elimina un'immagine
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const image = await getImageById(id)

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    // Elimina il file fisico
    try {
      const filePath = join(process.cwd(), 'public', image.file_path)
      await unlink(filePath)
    } catch (error) {
      console.warn('Error deleting file:', error)
      // Continua anche se il file non esiste
    }

    // Elimina dal database
    await deleteImage(id)

    return NextResponse.json({ success: true, message: 'Image deleted' })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}



