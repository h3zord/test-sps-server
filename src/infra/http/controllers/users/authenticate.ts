import { makeAuthenticateUseCase } from '@/infra/factories/make-authenticate-use-case'
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  })

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { email, password } = authenticateBodySchema.parse(req.body)

    const result = await authenticateUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      return res.status(400).json({ error: result.value.message })
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const { message } = fromZodError(error)

      return res.status(400).json({ error: message })
    }

    console.error(error)

    return res.status(500).json({ error: 'Internal server error' })
  }
}
