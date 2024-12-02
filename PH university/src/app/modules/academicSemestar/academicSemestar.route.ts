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

router.get('/', AcademicSemestarController.getAllSemestar)
router.get('/:semesterId', AcademicSemestarController.getSingleSemestar)

export const AcademicSemestarRoute = router
