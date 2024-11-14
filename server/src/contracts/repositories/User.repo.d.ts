import { IUser } from '@interfaces/User'

export interface CreateUser
  extends Pick<IUser, 'email' | 'firstName' | 'password' | 'lastName' | 'createdBy'> {
  photo?: string
  photoId?: string
}

export interface UpdateUser 
extends Pick<IUser, 'lastName' | 'firstName'>
{
  photo?: string
  photoId?: string
  updatedBy: string
}