'use client'

import { useCallback, useEffect, useState } from 'react'
import { encodeMenuDescription, parseMenuDescription } from '@/lib/menuDescriptionCodec'
import { MENU_CATEGORY_ANTIPASTI } from '@/lib/menu-antipasti-defaults'

interface ApiMenuRow {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  available: boolean
  featured: boolean
  position: number
}

const emptyForm = () => ({
  name: '',
  price: '',
  category: MENU_CATEGORY_ANTIPASTI,
  available: true,
  position: '0',
  descIt: '',
  descEn: '',
  ingredientsCsv: '',
})

export default function AdminMenuPanel() {
  const [items, setItems] = useState<ApiMenuRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)

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
  }, [load])

  const startEdit = (row: ApiMenuRow) => {
    const { it, en, ingredients } = parseMenuDescription(row.description)
    setEditingId(row.id)
    setForm({
      name: row.name,
      price: String(row.price),
      category: row.category,
      available: row.available,
      position: String(row.position ?? 0),
      descIt: it,
      descEn: en,
      ingredientsCsv: ingredients.join(', '),
    })
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
        description: encodeMenuDescription(form.descIt, form.descEn, form.ingredientsCsv),
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
        description: encodeMenuDescription(form.descIt, form.descEn, form.ingredientsCsv),
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
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' })
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

  const fieldClass =
    'mt-1 w-full rounded-md border-2 border-zinc-400 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300'

  if (loading) {
    return <p className="text-base font-medium text-zinc-900">Caricamento menu...</p>
  }

  return (
    <div className="space-y-8 text-zinc-900">
      <p className="text-sm font-medium leading-relaxed text-zinc-800">
        Gestisci piatti salvati nel database. Per la sezione home/menu usa la categoria{' '}
        <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm font-semibold text-zinc-900">
          {MENU_CATEGORY_ANTIPASTI}
        </code>
        . Se il database non è configurato, le API restituiranno errore: configura{' '}
        <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm font-semibold text-zinc-900">
          DATABASE_URL
        </code>{' '}
        su Vercel.
      </p>

      <form
        onSubmit={editingId != null ? submitUpdate : submitCreate}
        className="space-y-4 rounded-lg border-2 border-zinc-300 bg-zinc-50 p-5 shadow-sm"
      >
        <h3 className="text-lg font-bold text-zinc-900">
          {editingId != null ? `Modifica piatto #${editingId}` : 'Aggiungi nuovo piatto'}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block text-sm font-semibold text-zinc-900">
            Nome
            <input className={fieldClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </label>
          <label className="block text-sm font-semibold text-zinc-900">
            Prezzo (€)
            <input className={fieldClass} value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
          </label>
          <label className="block text-sm font-semibold text-zinc-900">
            Categoria
            <input className={fieldClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
          </label>
          <label className="block text-sm font-semibold text-zinc-900">
            Ordine (position)
            <input
              type="number"
              className={fieldClass}
              value={form.position}
              onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
            />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-2 border-zinc-500 text-orange-600 focus:ring-orange-500"
            checked={form.available}
            onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
          />
          Disponibile
        </label>
        <label className="block text-sm font-semibold text-zinc-900">
          Descrizione (italiano)
          <textarea className={`${fieldClass} min-h-[88px]`} value={form.descIt} onChange={(e) => setForm((f) => ({ ...f, descIt: e.target.value }))} />
        </label>
        <label className="block text-sm font-semibold text-zinc-900">
          Descrizione (inglese, opzionale)
          <textarea className={`${fieldClass} min-h-[72px]`} value={form.descEn} onChange={(e) => setForm((f) => ({ ...f, descEn: e.target.value }))} />
        </label>
        <label className="block text-sm font-semibold text-zinc-900">
          Ingredienti (elenco separato da virgola, opzionale)
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
            className="rounded-lg bg-orange-600 px-4 py-2.5 font-bold text-white shadow hover:bg-orange-700 disabled:opacity-50"
          >
            {editingId != null ? 'Salva modifiche' : 'Aggiungi piatto'}
          </button>
          {editingId != null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border-2 border-zinc-500 bg-white px-4 py-2.5 font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              Annulla
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="mb-3 text-lg font-bold text-zinc-900">Piatti nel database ({items.length})</h3>
        <div className="overflow-x-auto rounded-lg border-2 border-zinc-300 bg-white shadow-sm">
          <table className="min-w-full text-sm text-zinc-900">
            <thead className="bg-zinc-200">
              <tr>
                <th className="p-3 text-left font-bold text-zinc-900">ID</th>
                <th className="p-3 text-left font-bold text-zinc-900">Nome</th>
                <th className="p-3 text-left font-bold text-zinc-900">€</th>
                <th className="p-3 text-left font-bold text-zinc-900">Categoria</th>
                <th className="p-3 text-left font-bold text-zinc-900">Disp.</th>
                <th className="p-3 text-right font-bold text-zinc-900">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-t-2 border-zinc-200 odd:bg-white even:bg-zinc-50">
                  <td className="p-3 font-medium">{row.id}</td>
                  <td className="p-3 font-semibold">{row.name}</td>
                  <td className="p-3 font-medium">{Number(row.price).toFixed(2)}</td>
                  <td className="p-3 text-zinc-800">{row.category}</td>
                  <td className="p-3 font-medium">{row.available ? 'Sì' : 'No'}</td>
                  <td className="space-x-3 p-3 text-right">
                    <button
                      type="button"
                      className="font-semibold text-orange-700 underline decoration-2 hover:text-orange-900"
                      onClick={() => startEdit(row)}
                    >
                      Modifica
                    </button>
                    <button
                      type="button"
                      className="font-semibold text-red-700 underline decoration-2 hover:text-red-900"
                      onClick={() => handleDelete(row.id)}
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <p className="p-6 text-center text-base font-medium text-zinc-800">Nessun piatto nel database.</p>
          )}
        </div>
      </div>
    </div>
  )
}
