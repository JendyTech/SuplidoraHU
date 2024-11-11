import { IUser } from '@interfaces/User'

declare global {
  namespace Express {
    interface Request {
      token: string
      user: IUser
    }
  }
}
