import { IUser } from '@interfaces/User'
import { model, Schema } from 'mongoose'
import { MODELS_NAMES } from '@config/constants'

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    photoPublicId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

export const UserModel = model<IUser>(MODELS_NAMES.USERS, UserSchema)
