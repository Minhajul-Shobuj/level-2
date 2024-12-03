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
  return lastStudent?.id ? lastStudent.id : undefined
}
export const generateStudentId = async (payload: TAcademicSemestar) => {
  //id- 2020 01 0001
  let currentId = (0).toString()
  const lastStudentId = await findLastStudentId()
  const lastsemestarYear = lastStudentId?.substring(0, 4)
  const lastsemestarCode = lastStudentId?.substring(4, 6)
  const currentSemestarCode = payload.code
  const currentSemestarYear = payload.code
  if (
    lastStudentId &&
    lastsemestarCode === currentSemestarCode &&
    lastsemestarYear === currentSemestarYear
  ) {
    currentId = lastStudentId.substring(6)
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
