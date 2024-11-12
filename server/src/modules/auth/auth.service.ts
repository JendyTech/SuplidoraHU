import AUTH from '@messages/Auth.json'
import { ERROR_DATABASE_MESSAGE } from '@messages/General.json'
import { HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '@repositories/User.repo'
import { SESSION_TOKEN_TIME } from '@config/constants'
import { compareHash } from '@shared/functions/hash'
import { successResponse, errorResponse } from '@shared/functions/response'
import { createToken } from '@shared/functions/jwt'
import { SignInDTO } from '@modules/auth/dto/signIn.dto'
import { TOKEN_DESTINATION } from '@config/constants'
import { IUser } from '@interfaces/User'

@Injectable()
export class AuthService {
  async signIn({ email, password }: SignInDTO) {
    let user

    try {
      user = await UserRepository.findByEmail(email)

      if (!user) {
        return errorResponse({
          message: AUTH.LOGIN.INVALID_CREDENTIALS,
          status: HttpStatus.UNAUTHORIZED,
        })
      }
    } catch (error) {
      return errorResponse({
        message: ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    try {
      const isMatch = await compareHash({ hash: user.password, password })

      if (!isMatch) {
        return errorResponse({
          message: AUTH.LOGIN.INVALID_CREDENTIALS,
          status: HttpStatus.UNAUTHORIZED,
        })
      }
    } catch (error) {
      return errorResponse({
        message: AUTH.LOGIN.ERROR_COMPARE_PASSWORDS,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    const token = createToken({
      destination: TOKEN_DESTINATION.AUTH,
      payload: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
      },
      time: SESSION_TOKEN_TIME,
    })

    return successResponse({
      message: AUTH.LOGIN.SUCCESS_AUTH_LOGIN,
      data: {
        token,
      },
    })
  }
}
