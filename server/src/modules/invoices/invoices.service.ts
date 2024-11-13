import INVOICE from '@messages/Invoice.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common'
import { successResponse, errorResponse } from '@shared/functions/response'
import { InvoicesRepository } from '@repositories/Invoices.repo';
import { ProductRepository } from '@repositories/Products.repo'
import { PaginationDTO } from '@shared/dto/Pagination.dto';
import { CreateInvoiceDto } from '@modules/invoices/dto/invoice.dto';
import { IUser } from '@interfaces/User';
import { CreateInvoiceItem } from '@contracts/repositories/Invoices.repo';

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

    async createInvoice(dto: CreateInvoiceDto, user: IUser) {
        let products

        const itemsMap: Record<string, { productId: string, quantity: number }> = {}
        const itemsInvoice: CreateInvoiceItem[] = []
        const ids: string[] = []
        const currentDate = new Date()
        const dateExpirationInvoice = new Date(dto.expirationDate)

        if (currentDate > dateExpirationInvoice) {
            return errorResponse({
                message: INVOICE.INVOICE_DATE_VALIDATION,
                status: HttpStatus.CONFLICT
            })
        }

        for (const item of dto.items) {
            ids.push(item.productId)
            itemsMap[item.productId] = item
        }


        try {
            products = await ProductRepository.getProductsByIds(ids)
        } catch (error) {
            console.log(error)

            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error
            })
        }


        if (products.length !== dto.items.length) {
            return errorResponse({
                message: INVOICE.INVOICE_ITEM_NOT_FOUND,
                status: HttpStatus.INTERNAL_SERVER_ERROR
            })
        }


        for (const product of products) {
            const id = product._id.toString()

            const { quantity } = itemsMap[id]

            itemsInvoice.push({
                productId: id,
                quantity,
                description: product.description,
                total:  product.price * quantity,
                unitPrice: product.unitsPerPack
            })
        }

        try {

            const newInvoice = await InvoicesRepository.createInvoice({
                ...dto,
                createdBy: user._id,
                expirationDate: dateExpirationInvoice,
                items: itemsInvoice
            })

            return successResponse({
                data: newInvoice,
                message: INVOICE.INVOICE_CREATED,
            })
        } catch (error) {
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error
            })
        }
    }
}
