import { makeAuthenticateUseCase } from '@/infra/factories/make-authenticate-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function authenticate(
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

    return res.status(200).json({ token: result.value })
  } catch (error) {
    next(error)
  }
}
