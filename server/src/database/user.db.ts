import { IUser, IUserPhoto } from '@interfaces/User'
import { model, Schema, Types } from 'mongoose'
import { MODELS_NAMES } from '@config/constants'

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Debe ser un email válido'],
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
    active: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: Types.ObjectId,
      default: null
    },
    updatedBy: {
      type: Types.ObjectId,
      default: null
    }
  },
  {
    timestamps: true,
  },
)

export const UserModel = model<IUser>(MODELS_NAMES.USERS, UserSchema)

const userPhotoSchema = new Schema<IUserPhoto>(
  {
    publicId: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadBy: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const UserPhotoModel = model<IUserPhoto>(
  MODELS_NAMES.USERS_IMAGES,
  userPhotoSchema,
)
