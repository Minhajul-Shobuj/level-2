import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import { AcademicDepertmentService } from './academicDepertment.service'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'

const createAcademicDepertment: RequestHandler = catchAsync(
  async (req, res) => {
    const academicDepertment = req.body
    const result =
      await AcademicDepertmentService.createAcademicDepertmentIntoDb(
        academicDepertment,
      )
    sendResponse(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
    })
  },
)

const getAllAcademicDepertment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepertmentService.getAllAcademicDepertmentFromDb()

    sendResponse(res, {
      data: result,
      success: true,
      message: 'successfully geting all Academic Depertment',
      statusCode: httpStatus.OK,
    })
  },
)

export const AcademicDepertmentController = {
  createAcademicDepertment,
  getAllAcademicDepertment,
}
