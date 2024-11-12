import { HttpStatus, HttpException } from '@nestjs/common'

interface IErrorResponseParams {
  message: string
  status: HttpStatus
  extra?: Record<string, any>
  error?: Error
}

export const errorResponse = (params: IErrorResponseParams) => {
  const { message, status, extra, error } = params

  if (error && error instanceof HttpException) {
    throw error
  }

  throw new HttpException(
    {
      error: true,
      status,
      messages: [
        {
          message,
          extra,
        },
      ],
    },
    status,
  )
}

interface ISuccessResponseParams {
  data?: Record<string, any>
  extra?: Record<string, any>
  message: string
}

export const successResponse = ({
  message,
  data,
  extra,
}: ISuccessResponseParams) => {
  return {
    error: false,
    message,
    result: data,
    extra,
  }
}

export const unknownErrorResponse = () => {
  return errorResponse({
    message: 'Ha ocurrido un error inesperado',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
}
