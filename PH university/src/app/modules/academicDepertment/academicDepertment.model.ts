import { model, Schema } from 'mongoose'
import { TAcademicDepertment } from './academicDepertment.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const academicDepertmentSchema = new Schema<TAcademicDepertment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

academicDepertmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepertment.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist! ')
  }

  next()
})
export const AcademicDepertment = model<TAcademicDepertment>(
  'AcademicDepertment',
  academicDepertmentSchema,
)
