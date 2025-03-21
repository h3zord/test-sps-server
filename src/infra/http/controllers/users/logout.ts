import { Request, Response } from 'express'

export async function logoutController(req: Request, res: Response) {
  res.clearCookie('accessToken', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  return res.status(204).end()
}
