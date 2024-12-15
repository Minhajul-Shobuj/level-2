import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import sendResponse from '../../utiles/sendResponse'
import { SemestarRegistrationService } from './semestarRegristration.service'
import httpStatus from 'http-status'

const createSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await SemestarRegistrationService.createSemestarRegristrationInToDb(
        req.body,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is updated successfully!',
      data: result,
    })
  },
)

const updateRegisteredSemetar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await SemestarRegistrationService.updateRegisteredSemetarInDb(
    id,
    updatedData,
  )
  console.log('from controller', result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully!',
    data: result,
  })
})

export const SemestarRegristrationController = {
  createSemesterRegistration,
  updateRegisteredSemetar,
}
