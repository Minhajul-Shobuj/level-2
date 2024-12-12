import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'

import { AcademicFacultyValidation } from '../academicFaculty/academicFaculty.validation'
import { studentValidations } from '../student/student.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  UserControllers.createFaculty,
)

export const UserRoutes = router
