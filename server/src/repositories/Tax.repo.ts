import { TaxModel } from '@database/tax.db';
import { CreateTaxes } from '@contracts/repositories/Tax.repo';
import { mongoosePagination } from '@shared/functions/pagination'
import { PaginationDTO } from '@shared/dto/Pagination.dto';


export class TaxesRepository {
    static async getTaxes(pagination: PaginationDTO) {
        return mongoosePagination({
            ...pagination,
            Model: TaxModel,
        })
    }

    static async getTaxById(id: string) {
        const result = await TaxModel.findById(id)

        if (!result) return null

        return result.toObject()
    }

    static async getTaxByName(name: string) {
        const result = await TaxModel.findOne({ name })

        if (!result) return null

        return result.toObject()
    }

    static async createTax(data: CreateTaxes) {
        const newTax = new TaxModel(data)
        const result = await newTax.save()
        return result.toObject()
    }

    static async updateTax(id: string, data: CreateTaxes) {
        const result = await TaxModel.findByIdAndUpdate(id, data, {
            new: true,
        })

        if (!result) return null

        return result.toObject()
    }

    static async deleteTax(id: string) {
        const result = await TaxModel.findByIdAndDelete(id)

        if (!result) return null

        return result.toObject()
    }
}


