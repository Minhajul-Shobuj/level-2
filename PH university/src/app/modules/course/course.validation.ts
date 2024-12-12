import { z } from 'zod'

const preRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})
const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    code: z.number(),
    prefix: z.string(),
    credit: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(preRequisiteCourseSchema).optional(),
  }),
})
const updatePreRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})
const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.number().optional(),
    prefix: z.string().optional(),
    credit: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseSchema).optional(),
  }),
})
const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
})
export const CourseValidation = {
  courseValidationSchema,
  updateCourseValidation,
  facultiesWithCourseValidationSchema,
}
