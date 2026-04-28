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
        credentials: 'include',
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
      <div className="admin-surface min-h-screen flex items-center justify-center bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Caricamento...</p>
      </div>
    )
  }

  return (
    <div className="admin-surface min-h-screen bg-zinc-100 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Pannello Amministrazione</h1>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' })
                window.location.href = '/admin/login'
              }}
              className="rounded-lg border-2 border-zinc-400 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 hover:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-500"
            >
              Esci
            </button>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">Aspetto sito:</span>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold border-2 transition-colors ${
                theme === 'light'
                  ? 'border-orange-500 bg-orange-50 text-zinc-900 dark:bg-orange-950/80 dark:text-orange-100 dark:border-orange-400'
                  : 'border-zinc-400 bg-white text-zinc-800 hover:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500'
              }`}
            >
              Tema chiaro
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold border-2 transition-colors ${
                theme === 'dark'
                  ? 'border-orange-500 bg-orange-50 text-zinc-900 dark:bg-orange-950/80 dark:text-orange-100 dark:border-orange-400'
                  : 'border-zinc-400 bg-white text-zinc-800 hover:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500'
              }`}
            >
              Tema scuro
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b-2 border-zinc-300 dark:border-zinc-600">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('images')}
              className={`border-b-2 px-1 py-4 text-sm font-semibold ${
                activeTab === 'images'
                  ? 'border-orange-500 text-orange-700 dark:text-orange-400'
                  : 'border-transparent text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              Immagini
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`border-b-2 px-1 py-4 text-sm font-semibold ${
                activeTab === 'content'
                  ? 'border-orange-500 text-orange-700 dark:text-orange-400'
                  : 'border-transparent text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              Contenuti
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`border-b-2 px-1 py-4 text-sm font-semibold ${
                activeTab === 'menu'
                  ? 'border-orange-500 text-orange-700 dark:text-orange-400'
                  : 'border-transparent text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
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
              <div className="rounded-lg border-2 border-zinc-200 bg-white p-6 text-zinc-900 shadow-md dark:border-zinc-600 dark:bg-zinc-900">
                <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Carica Nuova Immagine</h2>
                <ImageUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={(error) => alert(`Errore: ${error}`)}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-lg border-2 border-zinc-200 bg-white p-6 text-zinc-900 shadow-md dark:border-zinc-600 dark:bg-zinc-900">
                <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
                  Immagini Caricate ({images.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
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
                      <p className="mt-2 truncate text-xs text-zinc-800 dark:text-zinc-300">
                        {image.original_filename}
                      </p>
                      {image.category && (
                        <span className="mt-1 inline-block rounded bg-orange-100 px-2 py-1 text-xs text-orange-800 dark:bg-orange-950 dark:text-orange-200">
                          {image.category}
                        </span>
                      )}
                    </div>
                  ))}
                  {images.length === 0 && (
                    <p className="col-span-full py-8 text-center font-medium text-zinc-700 dark:text-zinc-400">
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
          <div className="rounded-lg border-2 border-zinc-200 bg-white p-6 text-zinc-900 shadow-md dark:border-zinc-600 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Gestione Contenuti</h2>
            <p className="leading-relaxed text-zinc-800 dark:text-zinc-300">
              Funzionalità in arrivo. Potrai gestire i contenuti testuali del sito da qui.
            </p>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="rounded-lg border-2 border-zinc-200 bg-white p-6 text-zinc-900 shadow-md dark:border-zinc-600 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Gestione Menu</h2>
            <AdminMenuPanel />
          </div>
        )}
      </div>
    </div>
  )
}






