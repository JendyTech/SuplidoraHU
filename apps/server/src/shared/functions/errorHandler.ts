import { errorResponse, unknownErrorResponse } from '@shared/functions/response'
import type { HttpStatus } from '@nestjs/common'

interface IErrorHandleErrorListParams {
  message: string
  error: Omit<Error, 'message'>
  status: HttpStatus
}

export const handleError = (
  error: Error,
  options: IErrorHandleErrorListParams[],
) => {
  for (const option of options) {
    const {
      error: ErrorElement,
      message,
      status,
    } = option as { error: any; message: string; status: HttpStatus }
    if (error instanceof ErrorElement) {
      return errorResponse({
        message,
        status,
      })
    }
  }

  return unknownErrorResponse()
}
