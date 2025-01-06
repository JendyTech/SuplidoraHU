import { IProduct } from "@interfaces/Product";
import { mongoosePagination } from '@shared/functions/pagination'
import { PaginationDTO } from "@shared/dto/Pagination.dto";
import { FilterQuery } from 'mongoose'
import { CategoryModel } from "@database/category.db";
import { CreateCategories } from "@contracts/repositories/Category.repo";


export class CategoryRepository {
    static async getCategories(pagination: PaginationDTO) {
        const filters: FilterQuery<IProduct> = {}

        if (pagination.search) {
            filters.$or = [
                {
                    name: { $regex: new RegExp(pagination.search, 'i') }
                },
                {
                    _id: { $regex: new RegExp(pagination.search, 'i') }
                }
            ]
        }

        return mongoosePagination({
            ...pagination,
            Model: CategoryModel,
            filter: filters,
        })
    }

    static async createCategory(data: CreateCategories) {
        const newCategory = new CategoryModel(data)

        const result = await newCategory.save()

        return result.toObject()
    }

    static async getCategoryById(id: string) {
        const result = await CategoryModel.findById(id)

        if (!result) {
            return null
        }

        return result.toObject()
    }

    static async getCategoryByName(name: string) {
        const result = await CategoryModel.findOne({ name })

        if (!result) return null

        return result.toObject()

    }
}