import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { ProductModel } from '@database/products.db'
import { mongoosePagination } from '@shared/functions/pagination'
import { FilterQuery } from 'mongoose'
import { IProduct } from '@interfaces/Product'
import { MODELS_NAMES } from '@config/constants'

export class CatalogRepository {
  static async getCatalog(pagination: PaginationDTO) {
    const filters: FilterQuery<IProduct> = {}

    if (pagination.search) {
      filters.$or = [
        {
          name: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          code: { $regex: new RegExp(pagination.search, 'i') },
        },
      ]
    }

    const pricing = Number(pagination.search)

    if (!isNaN(pricing)) {
      filters.$or.push({
        price: pricing,
      })
    }

    return mongoosePagination({
      ...pagination,
      Model: ProductModel,
      filter: filters,
      pipeline: [
        {
          $lookup: {
            from: MODELS_NAMES.PRODUCTS_IMAGES,
            as: 'imageData',
            localField: '_id',
            foreignField: 'productId',
            pipeline: [
              {
                $limit: 1,
              },
            ],
          },
        },
        {
          $unwind: '$imageData',
        },
        {
          $project: {
            _id: 0,
            name: 1,
            slug: 1,
            description: 1,
            code: 1,
            price: 1,
            category: 1,
            categoryName: 1,
            image: '$imageData.url',
          },
        },
      ],
    })
  }

  static async getCatalogBySlug(slug: string) {
    const [result = null] = await ProductModel.aggregate([
      {
        $match: {
          slug: slug,
        },
      },
      {
        $lookup: {
          from: MODELS_NAMES.PRODUCTS_IMAGES,
          as: 'images',
          localField: '_id',
          foreignField: 'productId',
        },
      },
      {
        $limit: 1,
      },
    ])

    return result
  }
}
