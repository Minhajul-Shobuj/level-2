import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { UserModel } from '../modules/users/user.model'
import { TUserRole } from '../modules/users/user.interface'

const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // Verify the token synchronously
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload

      if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
      }

      const { role, userId, iat } = decoded
      // checking if the user is exist
      const user = await UserModel.isUserExistsByCustomId(userId)

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
      }
      // checking if the user is already deleted

      if (await UserModel.isUserDeleted(userId)) {
        throw new AppError(httpStatus.FORBIDDEN, 'User is already Deleted')
      }

      // checking if the user is blocked
      if (await UserModel.checkUserStatus(userId)) {
        throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked')
      }
      req.user = decoded as JwtPayload
      next()
    } catch (err) {
      next(err)
    }
  }
}

export default auth
