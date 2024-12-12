import { z } from 'zod'

const semestarRegristrationValidationSchema = z.object({
  body: z.object({
    academicSemestar: z.string(),
    status: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
})

export const SemestarRegristrationValidation = {
  semestarRegristrationValidationSchema,
}
