import { makeFetchUsersUseCase } from '@/infra/factories/make-fetch-users-use-case'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserPresenter } from '../../presenters/user-presenter'

export async function fetchUsersController(
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

    const users = result.value?.users

    return res.status(200).json({ users: users?.map(UserPresenter.toHTTP) })
  } catch (error) {
    next(error)
  }
}
