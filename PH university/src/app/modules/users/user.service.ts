/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemestar/academicSemetar.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { generateFacultyId, generateStudentId } from './user.utiles'
import httpStatus from 'http-status'
import { TAcademicFaculty } from '../academicFaculty/academicFaculty.interface'
import { AcademicFaculty } from '../academicFaculty/AcademicFaculty.model'

//student data from student model

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.defaultPassword as string)
  userData.role = 'student'
  const admissionSemester = await AcademicSemester.findById(
    payload.addmissionSemestar,
  )
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester not found')
  }
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    userData.id = await generateStudentId(admissionSemester)
    const newUser = await UserModel.create([userData], { session })

    //create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    //set id, _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id
    const newStudent = await Student.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createFacultyIntoDb = async (
  password: string,
  payload: TAcademicFaculty,
) => {
  // const facultyName = await AcademicFaculty.findOne({ payload })
  // if (facultyName) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     `${payload.name} is already exists !!`,
  //   )
  // }
  const userData: Partial<TUser> = {}
  userData.password = password || (config.defaultPassword as string)
  userData.role = 'faculty'
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    userData.id = await generateFacultyId()
    const newUser = await UserModel.create([userData], { session })
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id
    const newFaculty = await AcademicFaculty.create([payload], { session })
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    await session.commitTransaction()
    await session.endSession()
    return newFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const UserServices = {
  createStudentIntoDb,
  createFacultyIntoDb,
}
