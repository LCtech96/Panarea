/**
 * Combina descrizione IT, EN, lista ingredienti e metadati opzionali (nomi/descrizioni ES/FR/DE)
 * nel campo `description` del DB.
 *
 * Blocco opzionale in testa:
 * <<<EXTRA>>>
 * {"name":{"en":"..."},"desc":{"es":"..."}}
 * <<<END>>>
 */

import type { Locale } from '@/lib/translations'

export type MenuExtra = {
  name?: Partial<Record<'en' | 'es' | 'fr' | 'de', string>>
  desc?: Partial<Record<'es' | 'fr' | 'de', string>>
}

const EXTRA_OPEN = '<<<EXTRA>>>'
const EXTRA_CLOSE = '<<<END>>>'

function trimExtra(e: MenuExtra | undefined): MenuExtra | undefined {
  if (!e) return undefined
  const name: NonNullable<MenuExtra['name']> = {}
  const desc: NonNullable<MenuExtra['desc']> = {}
  for (const k of ['en', 'es', 'fr', 'de'] as const) {
    const nk = e.name?.[k]?.trim()
    if (nk) name[k] = nk
  }
  for (const k of ['es', 'fr', 'de'] as const) {
    const dk = e.desc?.[k]?.trim()
    if (dk) desc[k] = dk
  }
  const out: MenuExtra = {}
  if (Object.keys(name).length) out.name = name
  if (Object.keys(desc).length) out.desc = desc
  return Object.keys(out).length ? out : undefined
}

export function stripExtraBlock(raw: string): { extra: MenuExtra | null; body: string } {
  const s = raw ?? ''
  if (!s.startsWith(`${EXTRA_OPEN}\n`)) return { extra: null, body: s }
  const jsonStart = EXTRA_OPEN.length + 1
  const closeSeq = `\n${EXTRA_CLOSE}`
  const closeIdx = s.indexOf(closeSeq, jsonStart)
  if (closeIdx === -1) return { extra: null, body: s }
  const jsonStr = s.slice(jsonStart, closeIdx).trim()
  try {
    const extra = trimExtra(JSON.parse(jsonStr) as MenuExtra) ?? null
    let after = s.slice(closeIdx + closeSeq.length)
    if (after.startsWith('\n')) after = after.slice(1)
    return { extra, body: after }
  } catch {
    return { extra: null, body: s }
  }
}

/** Corpo IT / EN / ingredienti (senza blocco EXTRA). */
function parseBody(d: string): { it: string; en: string; ingredients: string[] } {
  if (!d) return { it: '', en: '', ingredients: [] }
  const sep = '\n\n---\n'
  const idx = d.indexOf(sep)
  let body = d
  let ingredients: string[] = []
  if (idx !== -1) {
    body = d.slice(0, idx)
    ingredients = d
      .slice(idx + sep.length)
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
  }
  const paras = body.split(/\n\n/)
  return {
    it: (paras[0] || '').trim(),
    en: (paras[1] || '').trim(),
    ingredients,
  }
}

export function parseMenuDescription(
  d: string | null | undefined
): { extra: MenuExtra | null; it: string; en: string; ingredients: string[] } {
  if (!d) return { extra: null, it: '', en: '', ingredients: [] }
  const { extra, body } = stripExtraBlock(d)
  const parsed = parseBody(body)
  return { extra, ...parsed }
}

export function encodeMenuDescription(
  it: string,
  en: string,
  ingredientsCsv: string,
  extra?: MenuExtra
): string {
  const itTrim = it.trim()
  const enTrim = en.trim()
  const parts = ingredientsCsv
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const ing = parts.join(', ')
  let s = itTrim
  if (enTrim) s += `\n\n${enTrim}`
  if (ing) s += `\n\n---\n${ing}`
  const cleanExtra = trimExtra(extra)
  if (!cleanExtra) return s || ''
  const prefix = `${EXTRA_OPEN}\n${JSON.stringify(cleanExtra)}\n${EXTRA_CLOSE}\n`
  return `${prefix}${s || ''}`
}

/** Nome da mostrare in base alla lingua (nome DB = italiano). */
export function pickMenuDisplayName(
  baseItName: string,
  extra: MenuExtra | null,
  locale: Locale
): string {
  const base = baseItName.trim()
  const n = extra?.name
  if (locale === 'it') return base
  if (locale === 'en') return n?.en?.trim() || base
  if (locale === 'es') return n?.es?.trim() || n?.en?.trim() || base
  if (locale === 'fr') return n?.fr?.trim() || n?.en?.trim() || base
  return n?.de?.trim() || n?.en?.trim() || base
}

/** Un solo paragrafo di descrizione per la lingua selezionata. */
export function pickMenuDescriptionText(
  extra: MenuExtra | null,
  it: string,
  en: string,
  locale: Locale
): string {
  const itT = it.trim()
  const enT = en.trim()
  const es = extra?.desc?.es?.trim()
  const fr = extra?.desc?.fr?.trim()
  const de = extra?.desc?.de?.trim()
  switch (locale) {
    case 'it':
      return itT || enT
    case 'en':
      return enT || itT
    case 'es':
      return es || enT || itT
    case 'fr':
      return fr || enT || itT
    case 'de':
      return de || enT || itT
    default:
      return itT
  }
}
