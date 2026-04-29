'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  encodeMenuDescription,
  parseMenuDescription,
  type MenuExtra,
} from '@/lib/menuDescriptionCodec'
import { MENU_CATEGORY_ANTIPASTI } from '@/lib/menu-antipasti-defaults'

interface ApiMenuRow {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  image_id: number | null
  image_file_path?: string | null
  available: boolean
  featured: boolean
  position: number
}

interface GalleryImage {
  id: number
  file_path: string
  original_filename: string
}

const emptyForm = () => ({
  name: '',
  nameEn: '',
  nameEs: '',
  nameFr: '',
  nameDe: '',
  price: '',
  category: MENU_CATEGORY_ANTIPASTI,
  available: true,
  position: '0',
  imageId: null as number | null,
  descIt: '',
  descEn: '',
  descEs: '',
  descFr: '',
  descDe: '',
  ingredientsCsv: '',
})

function menuExtraFromForm(f: ReturnType<typeof emptyForm>): MenuExtra | undefined {
  const name: MenuExtra['name'] = {}
  const desc: MenuExtra['desc'] = {}
  if (f.nameEn.trim()) name.en = f.nameEn.trim()
  if (f.nameEs.trim()) name.es = f.nameEs.trim()
  if (f.nameFr.trim()) name.fr = f.nameFr.trim()
  if (f.nameDe.trim()) name.de = f.nameDe.trim()
  if (f.descEs.trim()) desc.es = f.descEs.trim()
  if (f.descFr.trim()) desc.fr = f.descFr.trim()
  if (f.descDe.trim()) desc.de = f.descDe.trim()
  const extra: MenuExtra = {}
  if (Object.keys(name).length) extra.name = name
  if (Object.keys(desc).length) extra.desc = desc
  return Object.keys(extra).length ? extra : undefined
}

function groupItems(items: ApiMenuRow[]): { category: string; rows: ApiMenuRow[] }[] {
  const map = new Map<string, ApiMenuRow[]>()
  for (const row of items) {
    const cat = row.category?.trim() || 'senza-categoria'
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat)!.push(row)
  }
  for (const arr of map.values()) {
    arr.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
  }
  const entries = [...map.entries()].sort((a, b) => {
    const minA = Math.min(...a[1].map((x) => x.position ?? 9999))
    const minB = Math.min(...b[1].map((x) => x.position ?? 9999))
    return minA - minB
  })
  return entries.map(([category, rows]) => ({ category, rows }))
}

export default function AdminMenuPanel() {
  const formRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<ApiMenuRow[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)

  const loadGallery = useCallback(async () => {
    setGalleryLoading(true)
    try {
      const res = await fetch('/api/images')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setGallery(json.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setGalleryLoading(false)
    }
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/menu?available_only=false')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setItems(json.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    loadGallery()
  }, [load, loadGallery])

  const grouped = useMemo(() => groupItems(items), [items])

  const fieldClass =
    'mt-1 w-full rounded-md border-2 border-zinc-400 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-orange-700'

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const startEdit = (row: ApiMenuRow) => {
    const { extra, it, en, ingredients } = parseMenuDescription(row.description)
    setEditingId(row.id)
    setForm({
      name: row.name,
      nameEn: extra?.name?.en ?? '',
      nameEs: extra?.name?.es ?? '',
      nameFr: extra?.name?.fr ?? '',
      nameDe: extra?.name?.de ?? '',
      price: String(row.price),
      category: row.category,
      available: row.available,
      position: String(row.position ?? 0),
      imageId: row.image_id ?? null,
      descIt: it,
      descEn: en,
      descEs: extra?.desc?.es ?? '',
      descFr: extra?.desc?.fr ?? '',
      descDe: extra?.desc?.de ?? '',
      ingredientsCsv: ingredients.join(', '),
    })
    scrollToForm()
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm())
  }

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const body = {
        name: form.name.trim(),
        price: Number.parseFloat(form.price.replace(',', '.')),
        category: form.category.trim() || MENU_CATEGORY_ANTIPASTI,
        description: encodeMenuDescription(form.descIt, form.descEn, form.ingredientsCsv, menuExtraFromForm(form)),
        image_id: form.imageId ?? undefined,
        available: form.available,
        featured: false,
        position: Number.parseInt(form.position, 10) || 0,
      }
      if (!body.name || Number.isNaN(body.price)) {
        alert('Nome e prezzo validi sono obbligatori')
        return
      }
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      })
      const json = await res.json()
      if (!json.success) {
        alert(json.error || 'Errore creazione')
        return
      }
      cancelEdit()
      await load()
    } finally {
      setSaving(false)
    }
  }

  const submitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId == null) return
    setSaving(true)
    try {
      const body = {
        name: form.name.trim(),
        price: Number.parseFloat(form.price.replace(',', '.')),
        category: form.category.trim(),
        description: encodeMenuDescription(form.descIt, form.descEn, form.ingredientsCsv, menuExtraFromForm(form)),
        image_id: form.imageId,
        available: form.available,
        position: Number.parseInt(form.position, 10) || 0,
      }
      if (!body.name || Number.isNaN(body.price)) {
        alert('Nome e prezzo validi sono obbligatori')
        return
      }
      const res = await fetch(`/api/menu/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      })
      const json = await res.json()
      if (!json.success) {
        alert(json.error || 'Errore aggiornamento (database configurato?)')
        return
      }
      cancelEdit()
      await load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Eliminare questo piatto dal menu?')) return
    setSaving(true)
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE', credentials: 'include' })
      const json = await res.json()
      if (!json.success) {
        alert(json.error || 'Errore eliminazione')
        return
      }
      if (editingId === id) cancelEdit()
      await load()
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">Caricamento menu...</p>
    )
  }

  return (
    <div className="space-y-10 text-zinc-900 dark:text-zinc-100">
      <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-300">
        Aggiungi piatti o modifica quelli già presenti. La{' '}
        <strong className="text-zinc-900 dark:text-white">foto del piatto</strong> è facoltativa: caricane una nella
        tab <strong className="text-zinc-900 dark:text-white">Immagini</strong>, poi sceglila qui dal menu a tendina.
        Ingredienti e prezzi si aggiornano dal modulo sotto.
      </p>

      <div
        ref={formRef}
        className="scroll-mt-24 space-y-4 rounded-xl border-2 border-orange-200 bg-orange-50/80 p-5 shadow-sm dark:border-orange-900/60 dark:bg-orange-950/30"
      >
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          {editingId != null ? `Modifica piatto #${editingId}` : 'Nuovo piatto'}
        </h3>
        <form onSubmit={editingId != null ? submitUpdate : submitCreate} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Nome
              <input
                className={fieldClass}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </label>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Prezzo (€)
              <input
                className={fieldClass}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                required
              />
            </label>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Categoria (slug)
              <input
                className={fieldClass}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
            </label>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Ordine (position)
              <input
                type="number"
                className={fieldClass}
                value={form.position}
                onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
              />
            </label>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white/90 p-4 dark:border-zinc-600 dark:bg-zinc-900/80">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Immagine del piatto</span>
              <button
                type="button"
                onClick={() => loadGallery()}
                disabled={galleryLoading}
                className="text-sm font-semibold text-orange-700 underline hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300"
              >
                {galleryLoading ? 'Aggiornamento…' : 'Aggiorna elenco foto'}
              </button>
            </div>
            <select
              className={fieldClass.replace('mt-1', 'mt-0')}
              value={form.imageId === null ? '' : String(form.imageId)}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  imageId: e.target.value === '' ? null : Number.parseInt(e.target.value, 10),
                }))
              }
            >
              <option value="">Nessuna immagine</option>
              {gallery.map((img) => (
                <option key={img.id} value={img.id}>
                  #{img.id} — {img.original_filename}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Carica file nella tab Immagini; poi seleziona qui. Per togliere la foto scegli «Nessuna immagine» e salva.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-2 border-zinc-500 text-orange-600 focus:ring-orange-500 dark:border-zinc-500"
              checked={form.available}
              onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
            />
            Disponibile sul menu pubblico
          </label>
          <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Descrizione (italiano)
            <textarea
              className={`${fieldClass} min-h-[88px]`}
              value={form.descIt}
              onChange={(e) => setForm((f) => ({ ...f, descIt: e.target.value }))}
            />
          </label>
          <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Descrizione (inglese, opzionale)
            <textarea
              className={`${fieldClass} min-h-[72px]`}
              value={form.descEn}
              onChange={(e) => setForm((f) => ({ ...f, descEn: e.target.value }))}
            />
          </label>
          <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/90 p-4 dark:border-zinc-600 dark:bg-zinc-900/50">
            <p className="mb-3 text-sm font-bold text-zinc-900 dark:text-white">Traduzioni sito (ES / FR / DE)</p>
            <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
              Nomi e descrizioni opzionali per le lingue del menu pubblico. Se mancano, si usa l&apos;inglese o l&apos;italiano.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Nome (EN)
                <input className={fieldClass} value={form.nameEn} onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))} />
              </label>
              <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Nome (ES)
                <input className={fieldClass} value={form.nameEs} onChange={(e) => setForm((f) => ({ ...f, nameEs: e.target.value }))} />
              </label>
              <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Nome (FR)
                <input className={fieldClass} value={form.nameFr} onChange={(e) => setForm((f) => ({ ...f, nameFr: e.target.value }))} />
              </label>
              <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Nome (DE)
                <input className={fieldClass} value={form.nameDe} onChange={(e) => setForm((f) => ({ ...f, nameDe: e.target.value }))} />
              </label>
              <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 md:col-span-2">
                Descrizione (ES)
                <textarea className={`${fieldClass} min-h-[56px]`} value={form.descEs} onChange={(e) => setForm((f) => ({ ...f, descEs: e.target.value }))} />
              </label>
              <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 md:col-span-2">
                Descrizione (FR)
                <textarea className={`${fieldClass} min-h-[56px]`} value={form.descFr} onChange={(e) => setForm((f) => ({ ...f, descFr: e.target.value }))} />
              </label>
              <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 md:col-span-2">
                Descrizione (DE)
                <textarea className={`${fieldClass} min-h-[56px]`} value={form.descDe} onChange={(e) => setForm((f) => ({ ...f, descDe: e.target.value }))} />
              </label>
            </div>
          </div>
          <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Ingredienti (separati da virgola)
            <textarea
              className={`${fieldClass} min-h-[56px]`}
              value={form.ingredientsCsv}
              onChange={(e) => setForm((f) => ({ ...f, ingredientsCsv: e.target.value }))}
              placeholder="es: mozzarella, pomodoro, basilico"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-orange-600 px-4 py-2.5 font-bold text-white shadow hover:bg-orange-700 disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              {editingId != null ? 'Salva modifiche' : 'Aggiungi piatto'}
            </button>
            {editingId != null && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border-2 border-zinc-500 bg-white px-4 py-2.5 font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Annulla
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            Piatti nel menu ({items.length})
          </h3>
          <button
            type="button"
            onClick={() => {
              cancelEdit()
              scrollToForm()
            }}
            className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
          >
            + Nuovo piatto (svuota modulo)
          </button>
        </div>

        {items.length === 0 ? (
          <p className="rounded-lg border-2 border-dashed border-zinc-300 p-8 text-center font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-400">
            Nessun piatto nel database. Compila il modulo qui sopra oppure verifica{' '}
            <code className="rounded bg-zinc-200 px-1 font-mono dark:bg-zinc-700">DATABASE_URL</code> su Vercel.
          </p>
        ) : (
          <div className="space-y-10">
            {grouped.map(({ category, rows }) => (
              <section key={category}>
                <h4 className="mb-3 border-b-2 border-orange-200 pb-2 text-lg font-bold uppercase tracking-wide text-orange-800 dark:border-orange-900 dark:text-orange-300">
                  {category}
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {rows.map((row) => {
                    const { ingredients } = parseMenuDescription(row.description)
                    const imgPath = row.image_file_path
                    return (
                      <article
                        key={row.id}
                        className="flex flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-md dark:border-zinc-600 dark:bg-zinc-900"
                      >
                        <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800">
                          {imgPath ? (
                            <Image src={imgPath} alt={row.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm font-medium text-zinc-400 dark:text-zinc-500">
                              Nessuna foto
                            </div>
                          )}
                          {!row.available && (
                            <span className="absolute right-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                              Non disponibile
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <h5 className="text-lg font-bold leading-tight text-zinc-900 dark:text-white">{row.name}</h5>
                            <span className="shrink-0 rounded-md bg-orange-100 px-2 py-1 text-lg font-bold text-orange-900 dark:bg-orange-950 dark:text-orange-200">
                              €{Number(row.price).toFixed(2)}
                            </span>
                          </div>
                          {ingredients.length > 0 && (
                            <p className="mb-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Ingredienti: </span>
                              {ingredients.join(', ')}
                            </p>
                          )}
                          <div className="mt-auto flex flex-wrap gap-2 pt-2">
                            <button
                              type="button"
                              className="flex-1 rounded-lg bg-orange-600 px-3 py-2 text-sm font-bold text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                              onClick={() => startEdit(row)}
                            >
                              Modifica
                            </button>
                            <button
                              type="button"
                              className="rounded-lg border-2 border-red-300 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
                              onClick={() => handleDelete(row.id)}
                            >
                              Elimina
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
