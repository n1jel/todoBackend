import { loginController } from 'controllers/login.controller'
import { registerController } from 'controllers/register.controller'
import { Router } from 'express'
import {
  doesUserExistMiddleware,
  isPasswordValidMiddleware,
  loginUserMiddleware,
  registerUserMiddleware,
  userAlreadyExistsMiddleware
} from 'middleware/auth.middleware'

export const authRoutes = Router()

authRoutes.post(
  '/register',
  registerUserMiddleware,
  userAlreadyExistsMiddleware,
  registerController
)

authRoutes.post(
  '/login',
  loginUserMiddleware,
  doesUserExistMiddleware,
  isPasswordValidMiddleware,
  loginController
)
