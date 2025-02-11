import config from '../../config'
import AppError from '../../errors/AppError'
import { UserModel } from '../users/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByCustomId(payload?.id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Id is not valid')
  }
  if (await UserModel.isUserDeleted(payload?.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already Deleted')
  }
  if (await UserModel.checkUserStatus(payload?.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked')
  }
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessTokent = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    { expiresIn: '10d' },
  )
  const needPasswordChange = user?.needsPasswordChange
  return {
    accessTokent,
    needPasswordChange,
  }
}

const changePassword = async () => {}

export const AuthService = {
  loginUser,
  changePassword,
}
