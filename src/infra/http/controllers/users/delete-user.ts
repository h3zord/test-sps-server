import { makeDeleteUserUseCase } from '@/infra/factories/make-delete-user-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const deleteUserParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const deleteUserUseCase = makeDeleteUserUseCase()

  try {
    const { id } = deleteUserParamsSchema.parse(req.params)

    const result = await deleteUserUseCase.execute({
      id,
    })

    if (result.isLeft()) {
      return res.status(400).json({ error: result.value.message })
    }

    return res.status(204).end()
  } catch (error) {
    next(error)
  }
}
