import { Types } from 'mongoose'

export type TAcademicFaculty = {
  user: Types.ObjectId
  id: string
  name: string
}
