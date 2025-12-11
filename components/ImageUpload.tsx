'use client'

import { useState } from 'react'

interface ImageUploadProps {
  category?: string
  onUploadSuccess?: (image: any) => void
  onUploadError?: (error: string) => void
}

export default function ImageUpload({ category, onUploadSuccess, onUploadError }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    if (!file) {
      onUploadError?.('Seleziona un file')
      return
    }

    setUploading(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      if (category) {
        uploadFormData.append('category', category)
      }
      const altText = formData.get('alt_text') as string
      if (altText) {
        uploadFormData.append('alt_text', altText)
      }

      const response = await fetch('/api/images', {
        method: 'POST',
        body: uploadFormData,
      })

      const result = await response.json()

      if (result.success) {
        setPreview(null)
        onUploadSuccess?.(result.data)
        e.currentTarget.reset()
      } else {
        onUploadError?.(result.error || 'Errore nel caricamento')
      }
    } catch (error) {
      console.error('Upload error:', error)
      onUploadError?.('Errore nel caricamento dell\'immagine')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
          Seleziona Immagine
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
        />
      </div>

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div>
        <label htmlFor="alt_text" className="block text-sm font-medium text-gray-700 mb-2">
          Testo Alternativo (opzionale)
        </label>
        <input
          type="text"
          id="alt_text"
          name="alt_text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {uploading ? 'Caricamento...' : 'Carica Immagine'}
      </button>
    </form>
  )
}

