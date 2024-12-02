import { TAcademicSemestar } from '../academicSemestar/academicSemestar.interface'
import { UserModel } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ updatedAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}
export const generateStudentId = async (payload: TAcademicSemestar) => {
  // first time 0000
  //0001  => 1
  const currentId = (await findLastStudentId()) || (0).toString()
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
