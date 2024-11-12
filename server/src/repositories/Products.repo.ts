import { CreateProducts } from '@contracts/repositories/Products.repo'
import { ProductModel } from '@database/products.db'
import { mongoosePagination } from '@shared/functions/pagination'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { HttpException, HttpStatus } from '@nestjs/common'

export class ProductRepository {
  static async getProducts(pagination: PaginationDTO) {
    return mongoosePagination({
      ...pagination,
      Model: ProductModel,
    })
  }

  static async getProductById(id: string) {
    const result = await ProductModel.findById(id)
  }

  static async createProduct(data: CreateProducts) {
    const newProduct = new ProductModel(data)
    const result = await newProduct.save()
    return result.toObject()
  }

  static async updatedProduct(id: string, data: CreateProducts) {
    const result = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    })

    if (!result) {
      return null
    }

    return result.toObject()
  }

  static async deleteProduct(id: string) {
    const result = await ProductModel.findByIdAndDelete(id)

    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    return result.toObject()
  }

  static async findByName(name: string) {
    const result = await ProductModel.findOne({
      name,
    })

    if (!result) {
      return null
    }

    return result.toObject()
  }

  static async findById(id: string) {
    const product = await ProductModel.findById(id)

    if (!product) {
      return null
    }

    return product.toObject()
  }
}
