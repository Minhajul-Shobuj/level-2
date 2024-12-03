import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepertmentValidation } from './academicDepertment.validation'
import { AcademicDepertmentController } from './academicDepertment.controller'

const router = express.Router()

router.post(
  '/create-academic-depertment',
  validateRequest(
    AcademicDepertmentValidation.academicDepertmentValidationSchema,
  ),
  AcademicDepertmentController.createAcademicDepertment,
)

export const AcademicDepertmentRoute = router
