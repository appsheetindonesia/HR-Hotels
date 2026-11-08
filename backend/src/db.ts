import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('connect', () => {
  console.log('DB: connected')
})

pool.on('error', (err) => {
  console.error('DB: idle client error', err.message, err.stack)
})

export async function query(text: string, params?: unknown[]) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('executed query', { text: text.substring(0, 100), duration, rows: res.rowCount })
  return res
}

export async function getClient() {
  return pool.connect()
}
