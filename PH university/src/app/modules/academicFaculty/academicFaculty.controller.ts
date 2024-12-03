import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import { AcademicFacultyService } from './academicFaculty.service'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'

const creareAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const academicFaculty = req.body
  const result =
    await AcademicFacultyService.createAcademicFacultyIntoDb(academicFaculty)
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully created academic Faculty',
    statusCode: httpStatus.OK,
  })
})

export const AcademicFacultyController = {
  creareAcademicFaculty,
}
