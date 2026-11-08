import { Router } from 'express'
import { authenticate, authorize } from '../middleware/auth'
import { query } from '../db'

const router = Router()

// List employees (tenant-scoped)
router.get('/', authenticate, async (req, res) => {
  const { organizationId } = req.query
  const orgId = organizationId as string

  let result
  if (orgId) {
    result = await query(
      `SELECT e.id, e.employee_id, e.name, e.role, e.department, e.site, e.status, e.email,
              e.start_date, e.salary, e.hourly_rate, e.hours, e.pronouns, e.city, e.access,
              o.name as organization_name
       FROM employees e
       JOIN organizations o ON o.id = e.organization_id
       WHERE e.organization_id = $1
       ORDER BY e.name`,
      [orgId]
    )
  } else {
    result = await query(
      `SELECT e.id, e.employee_id, e.name, e.role, e.department, e.site, e.status, e.email,
              e.start_date, e.salary, e.hourly_rate, e.hours, e.pronouns, e.city, e.access,
              o.name as organization_name
       FROM employees e
       JOIN organizations o ON o.id = e.organization_id
       ORDER BY e.name`
    )
  }

  res.json({ employees: result.rows, count: result.rowCount })
})

// Get single employee
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params
  const result = await query(
    `SELECT e.*, o.name as organization_name
     FROM employees e
     JOIN organizations o ON o.id = e.organization_id
     WHERE e.id = $1`,
    [id]
  )
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'not_found', message: 'Employee not found' })
  }
  res.json({ employee: result.rows[0] })
})

export default router
