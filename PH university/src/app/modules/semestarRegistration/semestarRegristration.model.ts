import { model, Schema } from 'mongoose'
import { TSemestarRegristration } from './semestarRegistration.interface'
import { SemesterRegistrationStatus } from './semestarRegristration.const'

const semestarRegristrationSchema = new Schema<TSemestarRegristration>(
  {
    academicSemestar: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
)

export const SemestarRegistration = model<TSemestarRegristration>(
  'SemestarRegistration',
  semestarRegristrationSchema,
)
