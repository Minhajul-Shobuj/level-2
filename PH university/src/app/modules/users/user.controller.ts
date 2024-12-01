import { RequestHandler } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utiles/sendResponse'
import catchAsync from '../../utiles/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await UserServices.createStudentIntoDb(password, studentData)
  res.status(200).json({
    success: true,
    message: 'Student is created succesfully',
    data: result,
  })

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
