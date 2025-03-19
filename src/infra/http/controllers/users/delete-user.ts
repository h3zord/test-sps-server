import { makeDeleteUserUseCase } from '@/infra/factories/make-delete-user-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteUserParamsSchema = z.object({
    email: z.string().email(),
  })

  const deleteuserUseCase = makeDeleteUserUseCase()

  try {
    const { email } = deleteUserParamsSchema.parse(req.params)

    const result = await deleteuserUseCase.execute({
      email,
    })

    if (result.isLeft()) {
      return res.status(400).json({ error: result.value.message })
    }

    return res.status(204).end()
  } catch (error) {
    next(error)
  }
}
