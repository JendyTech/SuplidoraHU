import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { ProductModel } from '@database/products.db'
import { mongoosePagination } from '@shared/functions/pagination'
import { FilterQuery, Types } from 'mongoose'
import { IProduct } from '@interfaces/Product'
import { MODELS_NAMES } from '@config/constants'
import { CatalogPaginationDTO } from '@shared/dto/CatalogPagination.dto'

export class CatalogRepository {
  static async getCatalog(pagination: CatalogPaginationDTO, minPrice?: number, maxPrice?: number) {
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

    if (pagination.minPrice !== undefined || pagination.maxPrice !== undefined) {
      filters.price = {};
      if (minPrice !== undefined) {
        filters.price.$gte = Number(minPrice); 
      }
      if (maxPrice !== undefined) {
        filters.price.$lte = Number(maxPrice); 
      }
    }

    if (pagination.category) {
      try {
        filters.category = new Types.ObjectId(pagination.category)
        console.log(filters)
      } catch (error) {
        console.error('Error al convertir la categoría a ObjectId:', error)
      }
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
