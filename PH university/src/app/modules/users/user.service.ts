import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'

//student data from student model

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.defaultPassword as string)
  userData.role = 'student'

  //if password not given
  //   if (!password) {
  //     password = 'set default password on .env file'
  //   }

  //manual generated id
  userData.id = '203010001'
  const newUser = await UserModel.create(userData)

  //create student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id
    studentData.user = newUser._id
    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDb,
}
