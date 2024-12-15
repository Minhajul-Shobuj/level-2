import { z } from 'zod'
import { SemesterRegistrationStatus } from './semestarRegristration.const'

const semestarRegristrationValidationSchema = z.object({
  body: z.object({
    academicSemestar: z.string(),
    status: z.enum(SemesterRegistrationStatus),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
})
const semestarRegristrationUpdateValidationSchema = z.object({
  body: z.object({
    academicSemestar: z.string().optional(),
    status: z.enum(SemesterRegistrationStatus).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
})

export const SemestarRegristrationValidation = {
  semestarRegristrationValidationSchema,
  semestarRegristrationUpdateValidationSchema,
}
