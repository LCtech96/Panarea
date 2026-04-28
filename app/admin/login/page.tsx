'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Accesso negato')
        return
      }
      router.replace('/admin')
      router.refresh()
    } catch {
      setError('Errore di connessione')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-surface flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200 px-4 text-zinc-900 dark:from-zinc-950 dark:to-black dark:text-zinc-100">
      <div className="ios-card-solid w-full max-w-md border-2 p-8 dark:border-zinc-700">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Accesso amministrazione</h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">GianAgo Risto-pub — inserisci email e password.</p>

        {reason === 'config' && (
          <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Server senza variabili ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_AUTH_SECRET. Configura il progetto (es. su Vercel).
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-sm font-semibold text-zinc-800">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-2 border-zinc-200 bg-white px-3 py-2.5 text-zinc-900 outline-none transition focus:border-orange-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1 block text-sm font-semibold text-zinc-800">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-zinc-200 bg-white px-3 py-2.5 text-zinc-900 outline-none transition focus:border-orange-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          {error && (
            <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-b from-orange-400 to-orange-600 py-3 font-semibold text-white shadow-ios transition hover:brightness-105 disabled:opacity-60"
          >
            {loading ? 'Accesso…' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-surface flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
          Caricamento…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  )
}
