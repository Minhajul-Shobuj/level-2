import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseController } from './course.controller'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(CourseValidation.courseValidationSchema),
  CourseController.createCourse,
)
router.get('/:courseId', CourseController.getSingleCourse)
router.patch(
  '/:courseId',
  validateRequest(CourseValidation.updateCourseValidation),
  CourseController.updateCourse,
)
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.assignCourseWithFaculties,
)
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
)

export const CourseRoute = router
