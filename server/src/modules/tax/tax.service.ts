import TAX from '@messages/Tax.json'
import GENERAL from '@messages/General.json'
import { HttpStatus, Injectable } from '@nestjs/common';
import { TaxesRepository } from '@repositories/Tax.repo';
import { PaginationDTO } from '@shared/dto/Pagination.dto';
import { errorResponse, successResponse } from '@shared/functions/response';
import { CreateTaxesDto } from '@modules/tax/dto/tax.dto';
import { IUser } from '@interfaces/User';

@Injectable()
export class TaxService {
    async getTaxes(pagination: PaginationDTO) {
        try {
            const result = await TaxesRepository.getTaxes(pagination)

            return successResponse({
                data: result,
                message: TAX.TAXES_FETCHED
            })
        } catch (error) {
            console.log(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }

    async getTaxById(id: string) {
        let tax

        try {
            tax = await TaxesRepository.getTaxById(id)
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        if (!tax) {
            return errorResponse({
                message: TAX.TAX_NOT_FOUND,
                status: HttpStatus.NOT_FOUND,
            })
        }

        return successResponse({
            data: tax,
            message: TAX.TAXES_FETCHED,
        })
    }

    async createTax(dto: CreateTaxesDto, user: IUser) {
        let found

        try {
            found = await TaxesRepository.getTaxByName(dto.name)
        } catch (error) {
            console.log(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        if (found) {
            return errorResponse({
                message: TAX.TAX_NAME_IN_USE,
                status: HttpStatus.CONFLICT,
            })
        }

        try {
            const taxData = {
                ...dto,
                createdBy: user._id,
            }

            const newTax = await TaxesRepository.createTax(taxData)

            return successResponse({
                data: newTax,
                message: TAX.TAX_CREATED
            })
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }

    async updateTax(dto: CreateTaxesDto, id: string, user: IUser) {
        let tax

        try {
            tax = await TaxesRepository.getTaxById(id)
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        if (!tax) {
            return errorResponse({
                message: TAX.TAX_NOT_FOUND,
                status: HttpStatus.NOT_FOUND,
            })
        }

        try {
            const taxData = {
                ...dto,
                updatedBy: user._id,
                createdBy: user._id,
            }

            const updatedTax = await TaxesRepository.updateTax(id, taxData)

            if (!updatedTax) {
                return errorResponse({
                    message: TAX.TAX_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                })
            }

            return successResponse({
                data: updatedTax,
                message: TAX.TAX_UPDATED,
            })
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }

    async deleteTax(id: string) {
        let tax

        try {
            tax = await TaxesRepository.getTaxById(id)

            if (!tax) {
                return errorResponse({
                    message: TAX.TAX_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                })
            }

            await TaxesRepository.deleteTax(id)

            return successResponse({
                message: TAX.TAX_DELETED,
            })
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }


}
