import { neon } from '@neondatabase/serverless'

// Neon Database connection
// The DATABASE_URL should be set in .env.local file
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.warn('DATABASE_URL is not set. Database functionality will be limited.')
}

// Create the Neon SQL client
export const sql = databaseUrl ? neon(databaseUrl) : null

// Helper function to execute queries
export async function query<T = any>(queryString: string, params?: any[]): Promise<T[]> {
  if (!sql) {
    console.warn('Database connection not configured. Please set DATABASE_URL in environment variables.')
    return [] as T[]
  }
  
  try {
    const result = await sql(queryString, params)
    return result as T[]
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Example usage:
// import { query } from '@/lib/db/neon'
// const users = await query('SELECT * FROM users WHERE id = $1', [userId])

