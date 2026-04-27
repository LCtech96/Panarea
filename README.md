# GianAgo Risto-pub - Website

Sito web per GianAgo Risto-pub, un locale di hamburger e panini a Terrasini, Palermo.

## Tecnologie Utilizzate

- **Next.js 14** - Framework React
- **TypeScript** - Tipizzazione statica
- **Tailwind CSS** - Styling
- **pnpm** - Package manager

## Database Integration Ready

Il progetto è configurato per supportare l'integrazione futura con:
- **Supabase** - File: `lib/db/supabase.ts`
- **Neon** - File: `lib/db/neon.ts`
- **Convex** - File: `lib/db/convex.ts`

## Installazione

```bash
# Installa le dipendenze
pnpm install

# Avvia il server di sviluppo
pnpm dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Configurazione Database (Futura)

### Variabili d'ambiente
Vedi `.env.example` per l'elenco delle chiavi. Copia il file in `.env.local` e compila i valori (`.env.local` non va mai committato).

### Supabase (URL + anon + service role)
Usa `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` (solo server) come in `.env.example`.

### Postgres (query SQL via `lib/db/neon.ts`)
Imposta `DATABASE_URL` con la connection string del pooler Supabase (o Neon). Esegui lo schema SQL da `lib/db/schema.sql` nel progetto Supabase se usi quel database.

Per usare il database, importa la funzione `query` da `@/lib/db/neon`:
```typescript
import { query } from '@/lib/db/neon'

// Esempio di query
const results = await query('SELECT * FROM your_table WHERE id = $1', [id])
```

### Convex
Aggiungi al file `.env.local`:
```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

## Personalizzazione

- **Email**: Modifica `components/ContactSection.tsx` e `app/asporto/page.tsx`
- **WhatsApp**: Modifica il numero in `components/ContactSection.tsx` e `app/asporto/page.tsx`
- **Banner**: Aggiungi le immagini nella cartella `public/` e modifica `components/PhotoBanner.tsx`
- **Google Maps**: Il link è configurato per Via Vittorio Emanuele Orlando 123, Terrasini

## Database Setup

1. **Crea le tabelle nel database Neon:**
   - Accedi al tuo database Neon
   - Esegui lo script SQL in `lib/db/schema.sql` per creare le tabelle necessarie

2. **Il file `.env.local` è già configurato** con la connection string del database

## Sistema di Gestione Immagini e Contenuti

Il progetto include un sistema completo per gestire immagini e contenuti tramite il database Neon:

### API Endpoints Disponibili:

- **`GET /api/images`** - Ottieni tutte le immagini (opzionale: `?category=banner`)
- **POST /api/images** - Carica una nuova immagine
- **GET /api/images/[id]`** - Ottieni un'immagine specifica
- **PATCH /api/images/[id]`** - Aggiorna un'immagine
- **DELETE /api/images/[id]`** - Elimina un'immagine
- **GET /api/menu`** - Ottieni tutti i prodotti del menu
- **POST /api/menu`** - Crea un nuovo prodotto
- **GET /api/content`** - Ottieni contenuti (opzionale: `?key=home_description`)
- **POST /api/content`** - Crea o aggiorna contenuto

### Pagina Amministrazione

Visita `/admin` per accedere al pannello di amministrazione dove puoi:
- Caricare immagini
- Gestire le immagini esistenti
- (Prossimamente) Gestire contenuti e menu

### Struttura Database

Le immagini vengono salvate in `public/uploads/` e i metadati nel database Neon. Le tabelle includono:
- `images` - Metadati delle immagini
- `content` - Contenuti dinamici del sito
- `menu_items` - Prodotti del menu
- `reviews` - Recensioni clienti

## Build per Produzione

```bash
pnpm build
pnpm start
```

