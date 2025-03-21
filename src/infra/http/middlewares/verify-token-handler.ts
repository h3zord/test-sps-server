import jwt from 'jsonwebtoken'
import { env } from '@/infra/env'
import { Request, Response, NextFunction } from 'express'

export function verifyTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies.accessToken

  if (!accessToken) {
    return res.status(401).json({ error: 'Token not found' })
  }

  try {
    jwt.verify(accessToken, env.SECRET_KEY)

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
