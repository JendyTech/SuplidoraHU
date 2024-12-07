import { IUser, IUserPhoto } from '@interfaces/User'

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


export type SaveImageUser = Pick<IUserPhoto, 'publicId' | 'uploadBy' | 'url' | 'userId'>;

export interface GetUsersByIdWithImagesResult extends IUser {
  photos: IUserPhoto[]
}
