-- Schema del database per Panarea Burgers
-- Esegui questo script nel tuo database Neon per creare le tabelle

-- Tabella per le immagini
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  alt_text TEXT,
  category VARCHAR(100), -- 'banner', 'menu', 'gallery', 'product', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella per i contenuti dinamici
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL, -- 'home_description', 'menu_intro', etc.
  title VARCHAR(255),
  content TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'text', -- 'text', 'html', 'markdown'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella per i prodotti del menu
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL, -- 'burger', 'panino', 'contorno', 'bevanda', etc.
  image_id INTEGER REFERENCES images(id),
  available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  position INTEGER DEFAULT 0, -- per ordinare i prodotti
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella per le recensioni
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indici per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(available);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);

