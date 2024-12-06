import AppError from '../../errors/AppError'
import { AcademicSemestarNameMapper } from './academicSemestar.constant'
import { TAcademicSemestar } from './academicSemestar.interface'
import { AcademicSemester } from './academicSemetar.model'
import httpStatus from 'http-status'

const createAcademicSemestarIntoDb = async (payload: TAcademicSemestar) => {
  if (AcademicSemestarNameMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semestar Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemestarFromDb = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSingleAcademicSemestarFromDb = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId)
  return result
}

const updateAcademicSemestarInDb = async (
  semesterId: string,
  payload: Partial<TAcademicSemestar>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemestarNameMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid semestar Code or Name')
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: semesterId },
    payload,
    { new: true },
  )
  return result
}

export const AcademicSemestarService = {
  createAcademicSemestarIntoDb,
  getAllAcademicSemestarFromDb,
  getSingleAcademicSemestarFromDb,
  updateAcademicSemestarInDb,
}
