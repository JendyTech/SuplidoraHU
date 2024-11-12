import { CreateInvoices } from '@contracts/repositories/Invoices.repo'
import { InvoiceModel } from '@database/invoices.db'
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
        const result = await newInvoice.save()
        return result.toObject()
    }

    static async deleteInvoice(id: string) {
        const result = await InvoiceModel.findByIdAndDelete(id)

        if (!result) return null
        
        return result.toObject()
    }

    static async findById(id: string){
        const result = await InvoiceModel.findById(id)

        if (!result) return null

        return result.toObject()
    }
}

