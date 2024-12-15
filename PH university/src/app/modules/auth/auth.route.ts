import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthVAlidation } from './auth.validation'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthVAlidation.loginValidationSchema),
  AuthController.loginUser,
)

export const AuthRoute = router
