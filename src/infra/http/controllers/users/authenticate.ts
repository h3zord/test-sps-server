import { makeAuthenticateUseCase } from '@/infra/factories/make-authenticate-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function authenticateController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  })

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { email, password } = authenticateBodySchema.parse(req.body)

    const result = await authenticateUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      return res.status(400).json({ error: result.value.message })
    }

    const acessToken = result.value.accessToken

    res.cookie('token', acessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000 * 24 * 7, // 7 dias
      sameSite: 'strict',
    })

    return res.status(204).end()
  } catch (error) {
    next(error)
  }
}
