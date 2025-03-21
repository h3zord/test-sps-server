import { makeRegisterUserUseCase } from '@/infra/factories/make-register-user-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserPresenter } from '../../presenters/user-presenter'

export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerUserBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    type: z.enum(['admin', 'user']).default('user'),
  })

  const registerUserUseCase = makeRegisterUserUseCase()

  try {
    const { name, email, password, type } = registerUserBodySchema.parse(
      req.body,
    )

    const result = await registerUserUseCase.execute({
      name,
      email,
      password,
      type,
    })

    if (result.isLeft()) {
      return res.status(400).json({ error: result.value.message })
    }

    return res
      .status(201)
      .json({ user: UserPresenter.toHTTP(result.value.user) })
  } catch (error) {
    next(error)
  }
}
