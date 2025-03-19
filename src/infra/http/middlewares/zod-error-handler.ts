/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export function zodErrorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    const formattedError = fromZodError(error)

    return res
      .status(400)
      .json({ message: 'Validation error', errors: formattedError })
  }

  console.error(error)

  res.status(500).json({ message: 'Internal server error' })
}
