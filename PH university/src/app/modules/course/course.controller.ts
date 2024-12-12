import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import { CourseService } from './course.service'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const course = req.body
  const result = await CourseService.createCourseIntoDb(course)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
  })
})

const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const result = await CourseService.getSingleCourseFromDb(courseId)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retive successfully',
  })
})

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const updateData = req.body
  const result = await CourseService.updateCourseInDb(courseId, updateData)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
  })
})

const assignCourseWithFaculties: RequestHandler = catchAsync(
  async (req, res) => {
    const { courseId } = req.params
    const data = req.body
    const result = await CourseService.assignCourseWithFacultiesIntoDb(
      courseId,
      data,
    )
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course with Faculties added successfully',
    })
  },
)
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const data = req.body
  const result = await CourseService.removeFacultiesFromCourseFromDb(
    courseId,
    data,
  )
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove Faculties successfully',
  })
})
export const CourseController = {
  createCourse,
  updateCourse,
  getSingleCourse,
  assignCourseWithFaculties,
  removeFacultiesFromCourse,
}
