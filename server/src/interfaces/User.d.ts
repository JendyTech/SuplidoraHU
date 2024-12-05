import { ObjectId } from 'mongoose'
import { IUser } from '@interfaces/User';

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  photo: string | null
  photoPublicId: string | null
  email: string
  password: string
  active: boolean
  createdBy: string | ObjectId | null
  updatedBy: string | ObjectId | null
  createdAt: Date
  updatedAt: Date
}

export interface IUserPhoto {
  _id: string
  url: string
  userId: string | ObjectId
  publicId: string
  uploadBy: string | ObjectId
  createdAt: Date
  updatedAt: Date
}