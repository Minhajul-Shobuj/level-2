import { AcademicSemestarNameMapper } from './academicSemestar.constant'
import { TAcademicSemestar } from './academicSemestar.interface'
import { AcademicSemester } from './academicSemetar.model'

const createAcademicSemestarIntoDb = async (payload: TAcademicSemestar) => {
  if (AcademicSemestarNameMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semestar Code')
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

export const AcademicSemestarService = {
  createAcademicSemestarIntoDb,
  getAllAcademicSemestarFromDb,
  getSingleAcademicSemestarFromDb,
}
