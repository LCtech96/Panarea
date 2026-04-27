/**
 * Combina descrizione IT, EN e lista ingredienti in un unico campo `description` DB.
 * Ingredienti opzionali, separati da virgola nel blocco dopo ---.
 */
export function encodeMenuDescription(it: string, en: string, ingredientsCsv: string): string {
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
  return s || ''
}

export function parseMenuDescription(
  d: string | null | undefined
): { it: string; en: string; ingredients: string[] } {
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
      .map((s) => s.trim())
      .filter(Boolean)
  }
  const paras = body.split('\n\n')
  return {
    it: (paras[0] || '').trim(),
    en: (paras[1] || '').trim(),
    ingredients,
  }
}
