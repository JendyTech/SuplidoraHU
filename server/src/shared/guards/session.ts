import AUTH from '@messages/Auth.json'
import { ERROR_DATABASE_MESSAGE } from '@messages/General.json'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '@config/constants'
import { verifyToken, isExpired } from '@shared/functions/jwt'
import { errorResponse } from '@shared/functions/response'
import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
} from '@nestjs/common'
import { UserRepository } from '@repositories/User.repo'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const request = context.switchToHttp().getRequest() as Request

    const { authorization } = request.headers

    if (!authorization) {
      return errorResponse({
        message: AUTH.AUTHORIZATION_HEADER_REQUIRED,
        status: HttpStatus.UNAUTHORIZED,
      })
    }

    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer' || !token) {
      return errorResponse({
        message: AUTH.INVALID_TOKEN,
        status: HttpStatus.UNAUTHORIZED,
      })
    }

    try {
      verifyToken(token)
    } catch {
      return errorResponse({
        message: AUTH.INVALID_TOKEN,
        status: HttpStatus.UNAUTHORIZED,
      })
    }

    const { expired, payload } = isExpired(token)
    if (expired || !payload || !payload.sub || !payload.id) {
      return errorResponse({
        message: AUTH.INVALID_TOKEN,
        status: HttpStatus.UNAUTHORIZED,
      })
    }

    try {
      const user = await UserRepository.findById(payload.id)

      if (!user) {
        return errorResponse({
          message: AUTH.INVALID_TOKEN,
          status: HttpStatus.UNAUTHORIZED,
        })
      }

      request.user = user
      request.token = token
    } catch (error) {
      return errorResponse({
        message: ERROR_DATABASE_MESSAGE,
        error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }

    return true
  }
}
