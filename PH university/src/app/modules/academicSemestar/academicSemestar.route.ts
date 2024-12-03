import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemestarValidation } from './academicSemestar.validation'
import { AcademicSemestarController } from './academicSemestar.controller'

const router = express.Router()

router.post(
  '/create-academic-semestar',
  validateRequest(AcademicSemestarValidation.academicSemestarValidationSchema),
  AcademicSemestarController.createAcademicSemestar,
)

router.get('/', AcademicSemestarController.getAllSemestar)
router.get('/:semesterId', AcademicSemestarController.getSingleSemestar)
router.patch(
  '/:semesterId',
  validateRequest(AcademicSemestarValidation.academicSemestarUpdateValidation),
  AcademicSemestarController.updateAcademicSemestar,
)

export const AcademicSemestarRoute = router
