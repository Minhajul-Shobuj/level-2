import catchAsync from '../../utiles/catchAsync'
import sendResponse from '../../utiles/sendResponse'
import { AuthService } from './auth.service'
import httpStatus from 'http-status'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body)

  sendResponse(res, {
    data: result,
    message: 'User Successfully Logged In',
    success: true,
    statusCode: httpStatus.OK,
  })
})
const changePassword = catchAsync(async (req, res) => {
  // const result = await AuthService.changePassword()

  sendResponse(res, {
    data: {},
    message: 'User Successfully Logged In',
    success: true,
    statusCode: httpStatus.OK,
  })
})

export const AuthController = {
  loginUser,
  changePassword,
}
