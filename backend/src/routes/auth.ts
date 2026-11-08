import { Router } from 'express'
import { authenticate, authorize, signToken } from '../middleware/auth'
import { query } from '../db'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'bad_request', message: 'email and password are required' })
  }

  // Demo credentials for development (replace with real auth in production)
  if (email === 'priya@saltwick.com' && password === 'password') {
    const token = signToken({
      userId: 'E1001',
      organizationId: 'org-1',
      email,
      roles: ['Owner'],
    })
    return res.json({
      token,
      user: {
        id: 'E1001',
        name: 'Priya Raman',
        email,
        organizationId: 'org-1',
        roles: ['Owner'],
      },
    })
  }

  return res.status(401).json({ error: 'unauthorized', message: 'Invalid credentials' })
})

router.post('/logout', (_req, res) => {
  res.json({ ok: true })
})

router.get('/me', authenticate, async (req, res) => {
  const userId = req.user?.userId
  if (!userId) {
    return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' })
  }

  const result = await query(
    `SELECT e.id, e.name, e.email, e.role, e.department, e.organization_id, o.name as organization_name
     FROM employees e
     JOIN organizations o ON o.id = e.organization_id
     WHERE e.id = $1`,
    [userId]
  )

  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'not_found', message: 'User not found' })
  }

  res.json({ user: result.rows[0] })
})

export default router
