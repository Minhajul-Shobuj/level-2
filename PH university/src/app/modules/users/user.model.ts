import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import { TUser, UserModels } from './user.interface'
import config from '../../config'
const userSchema = new Schema<TUser, UserModels>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserModel.findOne({ id })
}

userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await UserModel.findOne({ id })
  return user?.isDeleted
}
userSchema.statics.checkUserStatus = async function (id: string) {
  const user = await UserModel.findOne({ id })
  return user?.status === 'blocked'
}
userSchema.statics.isPasswordMatched = async function (
  plaintextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plaintextPassword, hashPassword)
}

export const UserModel = model<TUser, UserModels>('User', userSchema)
