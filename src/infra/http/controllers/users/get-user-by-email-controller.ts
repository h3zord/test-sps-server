import { makeGetUserByEmailUseCase } from '@/infra/factories/make-get-user-by-email-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserPresenter } from '../../presenters/user-presenter'

export async function getUserByEmailController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const getUserByEmailQuerySchema = z.object({
    email: z.string().email(),
  })

  const getUserByEmailUseCase = makeGetUserByEmailUseCase()

  try {
    const { email } = getUserByEmailQuerySchema.parse(req.query)

    const result = await getUserByEmailUseCase.execute({
      email,
    })

    if (result.isLeft()) {
      return res.status(400).json({ error: result.value.message })
    }

    return res
      .status(200)
      .json({ user: UserPresenter.toHTTP(result.value.user) })
  } catch (error) {
    next(error)
  }
}
