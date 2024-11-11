export interface IUser {
  _id: string
  firstName: string
  lastName: string
  photo: string | null
  photoPublicId: string | null
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
