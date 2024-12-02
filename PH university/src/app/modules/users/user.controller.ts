import { RequestHandler } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utiles/sendResponse'
import catchAsync from '../../utiles/catchAsync'
import httpStatus from 'http-status'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await UserServices.createStudentIntoDb(password, studentData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
}
