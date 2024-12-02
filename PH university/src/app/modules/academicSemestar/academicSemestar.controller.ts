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

const getAllSemestar: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemestarService.getAllAcademicSemestarFromDb()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get all Semestar from database',
    data: result,
  })
})
const getSingleSemestar: RequestHandler = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result =
    await AcademicSemestarService.getSingleAcademicSemestarFromDb(semesterId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Semester is retrieved succesfully',
  })
})

export const AcademicSemestarController = {
  createAcademicSemestar,
  getAllSemestar,
  getSingleSemestar,
}
