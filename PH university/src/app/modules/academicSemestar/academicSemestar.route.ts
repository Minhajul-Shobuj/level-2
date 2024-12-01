import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemestarValidation } from './academicSemestar.validation'
import { AcademicSemestarController } from './academicSemestar.controller'

const router = express.Router()

router.post(
  '/create-academic-semestar',
  validateRequest(AcademicSemestarValidation.academicValidationSchema),
  AcademicSemestarController.createAcademicSemestar,
)

export const AcademicSemestarRoute = router
