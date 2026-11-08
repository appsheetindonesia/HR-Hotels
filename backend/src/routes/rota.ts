import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { query } from '../db'

const router = Router()

// Get weekly rota
router.get('/weeks/:weekStart', authenticate, async (req, res) => {
  const { weekStart } = req.params
  const { organizationId, department } = req.query

  let params: any[] = [weekStart]
  let deptFilter = ''
  if (department) {
    params.push(department)
    deptFilter = `AND r.department = $${params.length}`
  }

  const result = await query(
    `SELECT r.id, r.employee_id, r.day, r.start_time, r.end_time, r.department, r.site, r.status,
              e.name as employee_name, e.role as employee_role
     FROM rota_shifts r
     LEFT JOIN employees e ON e.id = r.employee_id
     WHERE r.week_start = $1 ${deptFilter}
     ORDER BY r.day, r.start_time`,
    params
  )

  res.json({ weekStart, shifts: result.rows })
})

export default router
