import { model, Schema } from 'mongoose'
import {
  TCourse,
  TCoursefaculty,
  TPreRequisiteCourses,
} from './course.interface'

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
)

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
  },
  {
    timestamps: true,
  },
)

export const Course = model<TCourse>('Course', courseSchema)

const courseFacultySchema = new Schema<TCoursefaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
})

export const CourseFaculty = model<TCoursefaculty>(
  'CourseFaculty',
  courseFacultySchema,
)
