import { CreateProducts, GetProductByIdWithImagesResult, SaveImageProduct, UpdateProducts } from '@contracts/repositories/Products.repo'
import { ProductModel, ProductPhotoModel } from '@database/products.db'
import { mongoosePagination } from '@shared/functions/pagination'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { HttpException, HttpStatus } from '@nestjs/common'
import { MODELS_NAMES } from '@config/constants'
import { Types } from 'mongoose'
import { IProductPhoto } from '@interfaces/Product'

export class ProductRepository {
  static async getProducts(pagination: PaginationDTO) {
    return mongoosePagination({
      ...pagination,
      Model: ProductModel,
    })
  }

  static async getProductById(id: string) {
    const result = await ProductModel.findById(id)

    if (!result) {
      return null
    }

    return result.toObject()
  }

  static async getProductByIdWithImages(id: string): Promise<null | GetProductByIdWithImagesResult> {
    const [product = null] = await ProductModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: MODELS_NAMES.PRODUCTS_IMAGES,
          as: 'images',
          localField: '_id',
          foreignField: 'productId',
        }
      },
      {
        $limit: 1
      }
    ])

    return product
  }

  static async saveProductImages(data: Array<Pick<IProductPhoto, 'productId'  | 'uploadBy' | 'url' | 'publicId'>>) {
    const result = await ProductPhotoModel.insertMany(data)

    return result.map((image) => image.toObject())
  }

  static async createProduct(data: CreateProducts) {
    const newProduct = new ProductModel(data)
    const result = await newProduct.save()
    return result.toObject()
  }

  static async updatedProduct(id: string, data: UpdateProducts) {
    const result = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    })

    if (!result) return null

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

    if (!result) return null

    return result.toObject()
  }

  static async addImage(image: SaveImageProduct) {
    const result = new ProductPhotoModel(image)

    await result.save()

    return result.toObject()
  }

  static async findImageById(id: string) {
    const image = await ProductPhotoModel.findById(id)

    if (!image) return null

    return image.toObject()
  }

  static async deleteImage(id: string) {
    const deletedImage = await ProductPhotoModel.findByIdAndDelete(id)

    if (!deletedImage) return null

    return deletedImage.toObject()
  }

  static async findById(id: string) {
    const product = await ProductModel.findById(id)

    if (!product) return null
    
    return product.toObject()
  }

  static async getProductsByIds (ids: string[]) {
    const result = await ProductModel.find({_id: { $in: ids } })
    return result.map((item) => item.toObject())
  }

}
