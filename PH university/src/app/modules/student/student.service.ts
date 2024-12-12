/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { UserModel } from '../users/user.model'

const getAllStudentsFromDB = async () => {
  //query: Record<string, unknown>
  // let searchTerm = ''
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }
  // const result = Student.find({
  //   $or: ['email', 'name.firstName', 'presentAddress'].map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })
  const result = await Student.find()
    .populate([
      { path: 'addmissionSemestar' },
      { path: 'academicDepertment', populate: { path: 'academicFaculty' } },
    ])
    .lean()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const ObjectId = mongoose.Types.ObjectId
  const result = await Student.aggregate([
    { $match: { _id: new ObjectId(id) } },
  ])
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student')
    }
    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
