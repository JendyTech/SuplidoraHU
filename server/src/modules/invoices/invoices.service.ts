import INVOICE from '@messages/Invoice.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common'
import { TaxService } from '@modules/tax/tax.service'
import { TaxModule } from '@modules/tax/tax.module'
import { successResponse, errorResponse } from '@shared/functions/response'
import { InvoicesRepository } from '@repositories/Invoices.repo';
import { ProductRepository } from '@repositories/Products.repo'
import { PaginationDTO } from '@shared/dto/Pagination.dto';
import { CreateInvoiceDto } from '@modules/invoices/dto/invoice.dto';
import { IUser } from '@interfaces/User';
import { CreateInvoiceItem } from '@contracts/repositories/Invoices.repo';

@Injectable()
export class InvoicesService {
    constructor(
        private readonly taxService: TaxService,
    ) { }
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
        const dateExpirationInvoice = dto.expirationDate
            ? new Date(dto.expirationDate)
            : (() => {
                const date = new Date()
                date.setMonth(date.getMonth() + 1)
                return date
            })()

        if (currentDate > dateExpirationInvoice) {
            return errorResponse({
                message: INVOICE.INVOICE_DATE_VALIDATION,
                status: HttpStatus.BAD_REQUEST,
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
                total: product.price * quantity,
                unitPrice: product.unitsPerPack
            })
        }

        let nextInvoiceNumber: string;
        try {
            const lastInvoiceNumber = await InvoicesRepository.getLastInvoiceNumber();

            if (lastInvoiceNumber) {
                const numericPart = parseInt(lastInvoiceNumber.replace(/\D/g, ''), 10);
                nextInvoiceNumber = `FA-${(numericPart + 1).toString().padStart(6, '0')}`;
            } else {
                nextInvoiceNumber = 'FA-000001';
            }
        } catch (error) {
            console.log(error);

            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            });
        }

        try {

            const newInvoice = await InvoicesRepository.createInvoice({
                ...dto,
                invoiceNumber: nextInvoiceNumber,
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

    async getInvoiceById(id: string, items: boolean = false) {
        let invoice

        try {
            invoice = await (items ? InvoicesRepository.getInvoicesWithItems(id) : InvoicesRepository.getInvoiceById(id))
        } catch (error) {
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        if (!invoice) {
            return errorResponse({
                message: INVOICE.INVOICE_NOT_FOUND,
                status: HttpStatus.NOT_FOUND,
            })
        }

        return successResponse({
            data: invoice,
            message: INVOICE.INVOICES_FETCHED,
        })
    }
}
