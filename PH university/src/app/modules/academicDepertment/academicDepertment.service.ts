import { TAcademicDepertment } from './academicDepertment.interface'
import { AcademicDepertment } from './academicDepertment.model'

const createAcademicDepertmentIntoDb = async (payload: TAcademicDepertment) => {
  const result = await AcademicDepertment.create(payload)

  return result
}

const getAllAcademicDepertmentFromDb = async () => {
  const result = await AcademicDepertment.find().populate('academicFaculty')
  return result
}
export const AcademicDepertmentService = {
  createAcademicDepertmentIntoDb,
  getAllAcademicDepertmentFromDb,
}
