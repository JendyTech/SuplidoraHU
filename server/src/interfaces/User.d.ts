import { ObjectId } from 'mongoose'

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
