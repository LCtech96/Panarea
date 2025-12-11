import { NextRequest, NextResponse } from 'next/server'
import { getAllImages, createImage } from '@/lib/db/queries/images'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// GET - Ottieni tutte le immagini
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined

    const images = await getAllImages(category)
    return NextResponse.json({ success: true, data: images })
  } catch (error) {
    console.error('Error fetching images:', error)
    // Se il database non è configurato, restituisci un array vuoto invece di un errore
    if (error instanceof Error && error.message.includes('Database connection not configured')) {
      return NextResponse.json({ success: true, data: [] })
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

// POST - Carica una nuova immagine
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string | null
    const altText = formData.get('alt_text') as string | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Crea la directory uploads se non esiste
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Genera un nome file unico
    const timestamp = Date.now()
    const originalFilename = file.name
    const fileExtension = originalFilename.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    const filePath = `/uploads/${filename}`

    // Salva il file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePathOnDisk = join(uploadsDir, filename)
    await writeFile(filePathOnDisk, buffer)

    // Salva i metadati nel database
    const image = await createImage({
      filename,
      original_filename: originalFilename,
      file_path: filePath,
      file_size: file.size,
      mime_type: file.type,
      alt_text: altText || undefined,
      category: category || undefined,
    })

    return NextResponse.json({ success: true, data: image })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

