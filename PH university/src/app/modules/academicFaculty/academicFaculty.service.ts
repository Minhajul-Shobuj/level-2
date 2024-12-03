import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './AcademicFaculty.model'

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

export const AcademicFacultyService = {
  createAcademicFacultyIntoDb,
}
