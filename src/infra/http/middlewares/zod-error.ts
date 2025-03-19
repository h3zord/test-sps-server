/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    const formattedError = fromZodError(err)

    return res
      .status(400)
      .json({ message: 'Validation error', errors: formattedError })
  }

  console.error(err)

  res.status(500).json({ message: 'Internal server error' })
}
