import { makeEditUserUseCase } from '@/infra/factories/make-edit-user-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function editUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const editUserParamsSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    type: z.enum(['admin', 'user']),
  })

  const edituserUseCase = makeEditUserUseCase()

  try {
    const { id, name, email, password, type } = editUserParamsSchema.parse(
      req.body,
    )

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

    return res.status(200).json(result.value)
  } catch (error) {
    next(error)
  }
}
