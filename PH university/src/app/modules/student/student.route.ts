import express from 'express'
import { StudentControllers } from './student.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../users/user.constant'

const router = express.Router()

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.student),
  StudentControllers.getAllStudents,
)

router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoute = router
