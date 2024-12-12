import mongoose from 'mongoose'
import { TCourse, TCoursefaculty } from './course.interface'
import { Course, CourseFaculty } from './course.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createCourseIntoDb = async (paylod: TCourse) => {
  const result = await Course.create(paylod)
  return result
}

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )
  return result
}

const updateCourseInDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload

  const checkCourseInDb = await Course.findById(id)
  if (!checkCourseInDb) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not Found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //step1: basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
    }

    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course)

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        el => el.course && !el.isDeleted,
      )

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
      }
    }

    await session.commitTransaction()
    await session.endSession()

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    )

    return result
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, `${err}`)
  }
}

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

const assignCourseWithFacultiesIntoDb = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      new: true,
      upsert: true,
    },
  )
  return result
}

const removeFacultiesFromCourseFromDb = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  )
  return result
}
export const CourseService = {
  createCourseIntoDb,
  updateCourseInDb,
  deleteCourseFromDB,
  getSingleCourseFromDb,
  assignCourseWithFacultiesIntoDb,
  removeFacultiesFromCourseFromDb,
}
