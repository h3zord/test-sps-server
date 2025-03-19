import { makeFetchUsersUseCase } from '@/infra/factories/make-fetch-users-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export async function fetchUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fetchUsersParamsSchema = z.object({
    page: z
      .string()
      .optional()
      .default('1')
      .transform(Number)
      .pipe(z.number().min(1)),

    limit: z
      .string()
      .optional()
      .default('20')
      .transform(Number)
      .pipe(z.number().min(1)),
  })

  const fetchusersUseCase = makeFetchUsersUseCase()

  try {
    const { page, limit } = fetchUsersParamsSchema.parse(req.query)

    const result = await fetchusersUseCase.execute({
      page,
      limit,
    })

    return res.status(200).json(result.value)
  } catch (error) {
    next(error)
  }
}
