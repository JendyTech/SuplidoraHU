import CATEGORY from '@messages/Category.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common'
import { catchError } from '@shared/utils/catchError'
import { HttpStatus } from '@nestjs/common'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { successResponse, errorResponse } from '@shared/functions/response'
import { CategoryRepository } from '@repositories/Category.repo'

@Injectable()
export class CategoryService {
  async getCategories(pagination: PaginationDTO) {
    const [error, result] = await catchError(async () => {
      return await CategoryRepository.getCategories(pagination)
    })

    if (error) {
      return errorResponse({
        error: error,
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }

    return successResponse({
      data: result,
      message: CATEGORY.CATEGORIES_FETCHED,
    })
  }

  async getCategoryById(id: string) {
    const [error, result] = await catchError(async () => {
      return await CategoryRepository.getCategoryById(id)
    })

    if (error) {
      return errorResponse({
        error: error,
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }

    if (!result) {
      return errorResponse({
        message: CATEGORY.CATEGORY_NOT_FOUND,
        status: HttpStatus.NOT_FOUND,
      })
    }

    return successResponse({
      data: result,
      message: CATEGORY.CATEGORIES_FETCHED,
    })
  }
}
