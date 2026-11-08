import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

export interface AuthRequest extends Request {
  user?: {
    userId: string
    organizationId: string
    email: string
    roles: string[]
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: string
      organizationId: string
      email: string
      roles: string[]
    }
  }
}

const secret = JWT_SECRET as string

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized', message: 'Missing or invalid Authorization header' })
  }

  const token = auth.substring(7)
  try {
    const payload = jwt.verify(token, secret) as { userId: string; organizationId: string; email: string; roles: string[] }
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'unauthorized', message: 'Invalid or expired token' })
  }
}

export function authorize(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'unauthorized', message: 'Authentication required' })
    }
    if (!allowedRoles.some((r) => req.user!.roles.includes(r))) {
      return res.status(403).json({ error: 'forbidden', message: 'Insufficient permissions' })
    }
    next()
  }
}

export function signToken(payload: { userId: string; organizationId: string; email: string; roles: string[] }) {
  return jwt.sign(payload, secret, { expiresIn: '8h' })
}
