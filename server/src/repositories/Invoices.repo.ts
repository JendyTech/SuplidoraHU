import { CreateInvoices } from '@contracts/repositories/Invoices.repo'
import { InvoiceModel, InvoiceItemModel } from '@database/invoices.db'
import { mongoosePagination } from '@shared/functions/pagination'
import { PaginationDTO } from '@shared/dto/Pagination.dto'

export class InvoicesRepository {
    static async getInvoices(pagination: PaginationDTO) {
        return mongoosePagination({
            ...pagination,
            Model: InvoiceModel,
        })
    }

    static async getInvoiceById(id: string) {
        const result = await InvoiceModel.findById(id)

        if (!result) return null

        return result.toObject()
    }

    static async createInvoice(data: CreateInvoices) {
        const newInvoice = new InvoiceModel(data)

        const invoice = await newInvoice.save()

        const itemsData = data.items.map((item) => ({
            ...item,
            invoiceId: invoice.id
        }))

        const items = await InvoiceItemModel.insertMany(itemsData)

        return {
            ...invoice?.toObject(),
            items: items.map((item) => item.toObject())
        }
    }

    static async deleteInvoice(id: string) {
        const result = await InvoiceModel.findByIdAndDelete(id)

        if (!result) return null

        return result.toObject()
    }

    static async findById(id: string) {
        const result = await InvoiceModel.findById(id)

        if (!result) return null

        return result.toObject()
    }

    static async getInvoiceByRnc(rncNumber: string) {
        const result = await InvoiceModel.findOne({ rncNumber })

        if (!result) return null

        return result.toObject()
    }
}

