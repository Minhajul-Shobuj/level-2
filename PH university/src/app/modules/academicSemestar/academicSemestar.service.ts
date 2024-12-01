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

export const AcademicSemestarService = {
  createAcademicSemestarIntoDb,
}
