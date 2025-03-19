import cors from 'cors'
import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'
import { zodErrorHandler } from './infra/http/middlewares/zod-error-handler'
import { userRouter } from './infra/http/controllers/users/routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/users', userRouter)

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  zodErrorHandler(err, req, res, next)
})

export { app }
