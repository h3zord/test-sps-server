import jwt from 'jsonwebtoken'
import { env } from '@/infra/env'
import { Request, Response, NextFunction } from 'express'

export function verifyTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not found' })
  }

  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, env.SECRET_KEY)

    next()
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' })
  }
}
