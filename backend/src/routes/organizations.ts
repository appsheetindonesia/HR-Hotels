import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { query } from '../db'

const router = Router()

// List organizations (tenant-scoped)
router.get('/', authenticate, async (_req, res) => {
  const result = await query(
    `SELECT id, name, short_name, town, rooms, currency, timezone, created_at
     FROM organizations
     ORDER BY name`
  )
  res.json({ organizations: result.rows })
})

// Get single organization
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params
  const result = await query(`SELECT * FROM organizations WHERE id = $1`, [id])
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'not_found', message: 'Organization not found' })
  }
  res.json({ organization: result.rows[0] })
})

export default router
