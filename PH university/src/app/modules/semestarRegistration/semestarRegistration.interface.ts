import { Types } from 'mongoose'

export type TSemestarRegristration = {
  academicSemestar: Types.ObjectId
  status: 'UPCOMING' | 'ONGOING' | 'ENDED'
  startDate: Date
  endDate: Date
  minCredit: number
  maxCredit: number
}
