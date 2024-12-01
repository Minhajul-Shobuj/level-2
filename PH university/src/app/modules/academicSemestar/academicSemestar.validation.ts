import { z } from 'zod'
import { Months, SemesterCode, SemesterName } from './academicSemestar.constant'

const academicValidationSchema = z.object({
  body: z.object({
    name: z.enum([...SemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...SemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
})

export const AcademicSemestarValidation = {
  academicValidationSchema,
}
