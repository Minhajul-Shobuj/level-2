/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModels extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>
  isUserDeleted(id: string): Promise<TUser>
  checkUserStatus(id: string): Promise<TUser>
  isPasswordMatched(
    plaintextPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE
