import { ValidationPipe } from '@nestjs/common'
import {
  HttpException,
  HttpStatus,
  type INestApplication,
} from '@nestjs/common'

export const validationsSetup = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors) {
        const errorsFormatted = errors.map((error) => {
          const constraints = error.constraints
          const keys = Object.keys(constraints)
          const key = keys[0]
          const message = constraints[key]

          return {
            field: error.property,
            value: error.value,
            message,
          }
        })

        throw new HttpException(
          {
            error: true,
            status: HttpStatus.BAD_REQUEST,
            messages: errorsFormatted,
          },
          HttpStatus.BAD_REQUEST,
        )
      },
    }),
  )
}
