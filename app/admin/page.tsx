'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'
import Image from 'next/image'
import AdminMenuPanel from '@/components/AdminMenuPanel'
import { useTheme } from '@/contexts/ThemeContext'

interface ImageData {
  id: number
  filename: string
  original_filename: string
  file_path: string
  alt_text: string | null
  category: string | null
}

export default function AdminPage() {
  const { theme, setTheme } = useTheme()
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'images' | 'content' | 'menu'>('images')

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images')
      const result = await response.json()
      if (result.success) {
        setImages(result.data)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSuccess = (image: ImageData) => {
    setImages([image, ...images])
    alert('Immagine caricata con successo!')
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Sei sicuro di voler eliminare questa immagine?')) return

    try {
      const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()
      if (result.success) {
        setImages(images.filter(img => img.id !== id))
        alert('Immagine eliminata con successo!')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Errore nell\'eliminazione dell\'immagine')
    }
  }

  if (loading) {
    return (
      <div className="admin-surface min-h-screen flex items-center justify-center bg-zinc-100 text-zinc-900 [color-scheme:light]">
        <p className="text-lg font-medium text-zinc-900">Caricamento...</p>
      </div>
    )
  }

  return (
    <div className="admin-surface min-h-screen bg-zinc-100 py-8 text-zinc-900 [color-scheme:light]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Pannello Amministrazione</h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-zinc-800">Aspetto sito:</span>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold border-2 transition-colors ${
                theme === 'light'
                  ? 'border-orange-500 bg-orange-50 text-zinc-900'
                  : 'border-zinc-400 bg-white text-zinc-800 hover:border-zinc-500'
              }`}
            >
              Tema chiaro
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold border-2 transition-colors ${
                theme === 'dark'
                  ? 'border-orange-500 bg-orange-50 text-zinc-900'
                  : 'border-zinc-400 bg-white text-zinc-800 hover:border-zinc-500'
              }`}
            >
              Tema scuro
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b-2 border-zinc-300 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('images')}
              className={`py-4 px-1 border-b-2 font-semibold text-sm ${
                activeTab === 'images'
                  ? 'border-orange-500 text-orange-700'
                  : 'border-transparent text-zinc-700 hover:text-zinc-900 hover:border-zinc-400'
              }`}
            >
              Immagini
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-1 border-b-2 font-semibold text-sm ${
                activeTab === 'content'
                  ? 'border-orange-500 text-orange-700'
                  : 'border-transparent text-zinc-700 hover:text-zinc-900 hover:border-zinc-400'
              }`}
            >
              Contenuti
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-4 px-1 border-b-2 font-semibold text-sm ${
                activeTab === 'menu'
                  ? 'border-orange-500 text-orange-700'
                  : 'border-transparent text-zinc-700 hover:text-zinc-900 hover:border-zinc-400'
              }`}
            >
              Menu
            </button>
          </nav>
        </div>

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border-2 border-zinc-200 shadow-md p-6 text-zinc-900">
                <h2 className="text-xl font-semibold mb-4 text-zinc-900">Carica Nuova Immagine</h2>
                <ImageUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={(error) => alert(`Errore: ${error}`)}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border-2 border-zinc-200 shadow-md p-6 text-zinc-900">
                <h2 className="text-xl font-semibold mb-4 text-zinc-900">Immagini Caricate ({images.length})</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={image.file_path}
                          alt={image.alt_text || image.original_filename}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => handleDelete(image.id)}
                            className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Elimina
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-zinc-800 truncate">
                        {image.original_filename}
                      </p>
                      {image.category && (
                        <span className="inline-block mt-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                          {image.category}
                        </span>
                      )}
                    </div>
                  ))}
                  {images.length === 0 && (
                    <p className="col-span-full text-center text-zinc-700 py-8 font-medium">
                      Nessuna immagine caricata
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-lg border-2 border-zinc-200 shadow-md p-6 text-zinc-900">
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">Gestione Contenuti</h2>
            <p className="text-zinc-800 leading-relaxed">
              Funzionalità in arrivo. Potrai gestire i contenuti testuali del sito da qui.
            </p>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-lg border-2 border-zinc-200 shadow-md p-6 text-zinc-900">
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">Gestione Menu</h2>
            <AdminMenuPanel />
          </div>
        )}
      </div>
    </div>
  )
}






