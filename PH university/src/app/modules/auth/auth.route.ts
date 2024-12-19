import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthVAlidation } from './auth.validation'
import { AuthController } from './auth.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../users/user.constant'
const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthVAlidation.loginValidationSchema),
  AuthController.loginUser,
)
router.post(
  '/change-password',
  auth(USER_ROLE.student),
  validateRequest(AuthVAlidation.changePasswordValidationSchema),
  AuthController.changePassword,
)

export const AuthRoute = router
