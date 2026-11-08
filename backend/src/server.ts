import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.config()

import { pool } from './db'
import authRoutes from './routes/auth'
import orgRoutes from './routes/organizations'
import peopleRoutes from './routes/people'
import rotaRoutes from './routes/rota'

const app = express()
const PORT = process.env.PORT || 4000

app.use(helmet())
app.use(cors({ origin: process.env.APP_URL || 'http://localhost:5199', credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'rotela-api', time: new Date().toISOString() })
})

// API v1 routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/organizations', orgRoutes)
app.use('/api/v1/people', peopleRoutes)
app.use('/api/v1/rota', rotaRoutes)

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'not_found', message: 'Route not found' })
})

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({
    error: err.code || 'internal_error',
    message: err.message || 'Internal server error',
  })
})

async function start() {
  try {
    // Verify DB connection
    await pool.query('SELECT 1')
    console.log('Database connection verified')

    app.listen(PORT, () => {
      console.log(`Rotela API listening on :${PORT} (${process.env.NODE_ENV || 'development'})`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()

export default app
