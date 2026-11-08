import bcrypt from 'bcrypt'
import { pool, query } from './db'

async function main() {
  const password = 'password'
  const hash = await bcrypt.hash(password, 10)
  console.log('Generated hash:', hash)

  await query(
    `INSERT INTO users (id, email, password_hash, name, roles)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    ['user-E1001', 'priya@saltwick.com', hash, 'Priya Raman', '["Owner"]']
  )
  console.log('Seeded demo user: priya@saltwick.com / password')

  await pool.end()
  console.log('Seed complete')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
