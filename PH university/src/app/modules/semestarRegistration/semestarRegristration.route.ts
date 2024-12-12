import express from 'express'
import { SemestarRegristrationController } from './semestarRegristration.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SemestarRegristrationValidation } from './semestarRegristration.validation'
const router = express.Router()

router.post(
  '/create',
  validateRequest(
    SemestarRegristrationValidation.semestarRegristrationValidationSchema,
  ),
  SemestarRegristrationController.createSemesterRegistration,
)
router.put('/id', SemestarRegristrationController.updateRegisteredSemetar)

export const SemestarRegistrationRoute = router
