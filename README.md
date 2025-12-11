# Panarea Burgers - Website

Sito web per Panarea Burgers, un locale di hamburger e panini a Terrasini, Palermo.

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

### Supabase
Aggiungi al file `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Neon
Il database Neon è già configurato nel file `.env.local`:
```
DATABASE_URL=postgresql://neondb_owner:npg_fduaq7vIs2mP@ep-royal-paper-ahdjmjcx-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

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
- **Google Maps**: Il link è già configurato per Civico 51, Terrasini

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

