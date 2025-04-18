import { makeEditUserUseCase } from '@/infra/factories/make-edit-user-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserPresenter } from '../../presenters/user-presenter'

export async function editUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const editUserParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const editUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    type: z.enum(['admin', 'user']).default('user'),
  })

  const edituserUseCase = makeEditUserUseCase()

  try {
    const { id } = editUserParamsSchema.parse(req.params)
    const { name, email, password, type } = editUserBodySchema.parse(req.body)

    const result = await edituserUseCase.execute({
      id,
      name,
      email,
      password,
      type,
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
