import { model, Schema } from 'mongoose'
import { TAcademicSemestar } from './academicSemestar.interface'
import { Months, SemesterCode, SemesterName } from './academicSemestar.constant'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const AcademicSemesterSchema = new Schema<TAcademicSemestar>(
  {
    name: {
      type: String,
      required: [true, 'Semester name is required'],
      enum: {
        values: SemesterName,
        message: 'Semester name must be one of: Summer, Autumn, or Fall',
      },
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    code: {
      type: String,
      required: [true, 'Semester code is required'],
      enum: {
        values: SemesterCode,
        message: 'Semester code must be one of: 01, 02, or 03',
      },
    },
    startMonth: {
      type: String,
      required: [true, 'Start month is required'],
      enum: {
        values: Months,
        message:
          'End month must be a valid month name (e.g., January, February, etc.)',
      },
    },
    endMonth: {
      type: String,
      required: [true, 'End month is required'],
      enum: {
        values: Months,
        message:
          'End month must be a valid month name (e.g., January, February, etc.)',
      },
    },
  },
  { timestamps: true, versionKey: false },
)

//checking Existing semestar
AcademicSemesterSchema.pre('save', async function (next) {
  const isSemestarExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemestarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semestar is already exist')
  }
  next()
})

// Create the model
export const AcademicSemester = model<TAcademicSemestar>(
  'AcademicSemester',
  AcademicSemesterSchema,
)
