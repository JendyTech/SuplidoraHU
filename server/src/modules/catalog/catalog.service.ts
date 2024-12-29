import CATALOG from '@messages/Catalog.json'
import GENERAL  from '@messages/General.json';
import { Injectable } from '@nestjs/common';
import { CatalogRepository } from '@repositories/Catalog.repo';
import { PaginationDTO } from '@shared/dto/Pagination.dto';
import { HttpStatus } from '@nestjs/common'
import { successResponse, errorResponse } from '@shared/functions/response'
import { catchError } from '@shared/utils/catchError';

@Injectable()
export class CatalogService {
    async getCatalog(pagination: PaginationDTO){

      const [error, result] = await catchError(async () => {
        return await CatalogRepository.getCatalog(pagination)
      })

      if (error) {
        return errorResponse({
            error: error,
            message: GENERAL.ERROR_DATABASE_MESSAGE,
            status: HttpStatus.INTERNAL_SERVER_ERROR
        })
      }

        return successResponse({
            data: result,
            message: CATALOG.CATALOGS_FETCHED
        })
    }

    async getCatalogBySlug(slug: string) {
        const [error, result] = await catchError(async () => {
            return await CatalogRepository.getCatalogBySlug(slug)
        })

        if (error) {
            return errorResponse({
                error: error,
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR
            })
        }

        if(!result){
            return errorResponse({
                message: CATALOG.CATALOG_NOT_FOUND,
                status: HttpStatus.NOT_FOUND
            })
        }

        return successResponse({
            data: result,
            message: CATALOG.CATALOGS_FETCHED
        })
    }
}
