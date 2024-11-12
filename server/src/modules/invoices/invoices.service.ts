import INVOICE from '@messages/Invoice.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common'
import { successResponse, errorResponse } from '@shared/functions/response'
import { InvoicesRepository } from '@repositories/Invoices.repo';
import { PaginationDTO } from '@shared/dto/Pagination.dto';

@Injectable()
export class InvoicesService {
    async getInvoices(pagination: PaginationDTO) {
        try {
            const result = await InvoicesRepository.getInvoices(pagination)

            return successResponse({
                data: result,
                message: INVOICE.INVOICES_FETCHED,
            })
        } catch (error) {
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }
    }
}
