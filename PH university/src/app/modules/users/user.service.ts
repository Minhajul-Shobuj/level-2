import config from '../../config'
import { AcademicSemester } from '../academicSemestar/academicSemetar.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utiles'

//student data from student model

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.defaultPassword as string)
  userData.role = 'student'
  const admissionSemester = await AcademicSemester.findById(
    payload.addmissionSemestar,
  )
  if (!admissionSemester) {
    throw new Error('Semester not found')
  }

  userData.id = await generateStudentId(admissionSemester)
  const newUser = await UserModel.create(userData)

  //create student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id
    payload.user = newUser._id
    const newStudent = await Student.create(payload)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDb,
}
