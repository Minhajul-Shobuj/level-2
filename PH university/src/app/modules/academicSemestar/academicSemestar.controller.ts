import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import { AcademicSemestarService } from './academicSemestar.service'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'

const createAcademicSemestar: RequestHandler = catchAsync(async (req, res) => {
  const academicSemestar = req.body
  const result =
    await AcademicSemestarService.createAcademicSemestarIntoDb(academicSemestar)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created an Academic Semestar',
    data: result,
  })
})

export const AcademicSemestarController = {
  createAcademicSemestar,
}
