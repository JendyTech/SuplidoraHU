import { IUser } from '@interfaces/User'

export interface CreateUser
  extends Pick<IUser, 'email' | 'firstName' | 'password' | 'lastName'> {
  photo?: string
  photoId?: string
}
