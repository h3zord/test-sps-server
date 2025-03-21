import { NextFunction, Request, Response, Router } from 'express'
import { authenticateController } from './authenticate'
import { deleteUserController } from './delete-user'
import { editUserController } from './edit-user'
import { fetchUsersController } from './fetch-users'
import { getUserByEmailController } from './get-user-by-email-controller'
import { registerUserController } from './register-user'
import { verifyTokenHandler } from '../../middlewares/verify-token-handler'
import { logoutController } from './logout'

const userRouter = Router()

userRouter.post(
  '/authenticate',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateController(req, res, next)
  },
)

userRouter.get('/logout', (req: Request, res: Response) => {
  logoutController(req, res)
})

userRouter.use((req: Request, res: Response, next: NextFunction) => {
  verifyTokenHandler(req, res, next)
})

userRouter.post(
  '/register',
  (req: Request, res: Response, next: NextFunction) => {
    registerUserController(req, res, next)
  },
)

userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  fetchUsersController(req, res, next)
})

userRouter.get('/find', (req: Request, res: Response, next: NextFunction) => {
  getUserByEmailController(req, res, next)
})

userRouter.put(
  '/edit/:id',
  (req: Request, res: Response, next: NextFunction) => {
    editUserController(req, res, next)
  },
)

userRouter.delete(
  '/delete/:id',
  (req: Request, res: Response, next: NextFunction) => {
    deleteUserController(req, res, next)
  },
)

export { userRouter }
