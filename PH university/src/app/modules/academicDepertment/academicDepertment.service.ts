import { TAcademicDepertment } from './academicDepertment.interface'
import { AcademicDepertment } from './academicDepertment.model'

const createAcademicDepertmentIntoDb = async (payload: TAcademicDepertment) => {
  const result = await AcademicDepertment.create(payload)

  return result
}
export const AcademicDepertmentService = {
  createAcademicDepertmentIntoDb,
}
