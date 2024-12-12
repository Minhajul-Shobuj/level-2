import { model, Schema } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  AcademicFacultySchema,
)
