import PRODUCT from '@messages/Product.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common'
import { CreateProductDto } from '@modules/products/dto/product.dto'
import { IUser } from '@interfaces/User'
import { ProductRepository } from '@repositories/Products.repo'
import { successResponse, errorResponse } from '@shared/functions/response'
import { HttpStatus } from '@nestjs/common'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { uploadBase64, deleteResource } from '@shared/functions/cloudinary'
import { CloudinaryResult } from '@contracts/Cloudinary'
import { IProductPhoto } from '@interfaces/Product'
import {
  SaveImageProduct,
  UploadProductImage,
} from '@contracts/repositories/Products.repo'

@Injectable()
export class ProductsService {
  async getProducts(pagination: PaginationDTO) {
    try {
      const result = await ProductRepository.getProducts(pagination)

      return successResponse({
        data: result,
        message: PRODUCT.PRODUCTS_FETCHED,
      })
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async createProduct(dto: CreateProductDto, user: IUser) {
    let found,
      imageUrl: string | null = null,
      imagePublicId: string | null = null,
      product

    try {
      found = await ProductRepository.findByName(dto.name)
    } catch (error) {
      console.error(
        'Error al verificar el nombre del producto en la base de datos:',
        error,
      )
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    if (found) {
      return errorResponse({
        message: PRODUCT.PRODUCT_NAME_IN_USE,
        status: HttpStatus.CONFLICT,
      })
    }

    try {
      const productData = {
        ...dto,
        createdBy: user._id,
        imagesId: imagePublicId,
        images: imageUrl,
      }

      product = await ProductRepository.createProduct(productData)
    } catch (error) {
      console.error('Error al crear el producto en la base de datos:', error)
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }

    const imagesResult: UploadProductImage = []

    if (dto.images) {
      await Promise.all(
        dto.images.map(async (image) => {
          try {
            const result = await uploadBase64(image)

            imagesResult.push({
              productId: product._id,
              publicId: result.publicId,
              url: result.secureUrl,
              uploadBy: user._id,
            })
          } catch {}
        }),
      )
    }

    try {
      await ProductRepository.saveProductImages(imagesResult)
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }

    return successResponse({
      data: product,
      message: PRODUCT.PRODUCT_CREATED,
    })
  }

  async updatedProduct(dto: CreateProductDto, id: string, user: IUser) {
    let product

    console.log('[START] Updating product')
    console.log('DTO received:', dto)
    console.log('Product ID:', id)
    console.log('User performing update:', user)

    try {
      console.log('[STEP 1] Fetching product by ID...')
      product = await ProductRepository.findById(id)
      console.log('[STEP 1] Product fetched:', product)
    } catch (error) {
      console.error('[ERROR] Failed to fetch product:', error)
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    if (!product) {
      console.warn('[WARN] Product not found with ID:', id)
      return errorResponse({
        message: PRODUCT.PRODUCT_NOT_FOUND,
        status: HttpStatus.NOT_FOUND,
      })
    }

    try {
      console.log('[STEP 2] Preparing product data for update...')
      const productData = {
        ...dto,
        updatedBy: user._id,
        createdBy: user._id,
      }
      console.log('[STEP 2] Product data prepared:', productData)

      console.log('[STEP 3] Updating product...')
      const updatedProduct = await ProductRepository.updatedProduct(
        id,
        productData,
      )
      console.log('[STEP 3] Product updated:', updatedProduct)

      if (!updatedProduct) {
        console.error('[ERROR] Failed to update product')
        return errorResponse({
          message: GENERAL.ERROR_DATABASE_MESSAGE,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      }

      console.log('[SUCCESS] Product updated successfully')
      return successResponse({
        data: updatedProduct,
        message: PRODUCT.PRODUCT_UPDATED,
      })
    } catch (error) {
      console.error('[ERROR] Failed during product update:', error)
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async deleteProduct(id: string) {
    let product

    try {
      product = await ProductRepository.getProductByIdWithImages(id)

      if (!product) {
        return errorResponse({
          message: PRODUCT.PRODUCT_NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        })
      }

      const images = product.images || []

      if (images.length > 0) {
        await Promise.all(
          images.map(async (image) => {
            try {
              await deleteResource(image.publicId)

              await ProductRepository.deleteImage(image._id)
            } catch (error) {
              console.error(
                `[ERROR] Failed to delete image with ID: ${image._id} and publicId: ${image.publicId}:`,
                error,
              )
            }
          }),
        )
      } else {
      }

      await ProductRepository.deleteProduct(id)

      return successResponse({
        message: PRODUCT.PRODUCT_DELETED,
      })
    } catch (error) {
      console.error(`[ERROR] Failed to delete product with ID: ${id}:`, error)
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }
  }

  async getProductById(productId: string, images: boolean = false) {
    let product

    try {
      product = await (images
        ? ProductRepository.getProductByIdWithImages(productId)
        : ProductRepository.findById(productId))
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    if (!product) {
      return errorResponse({
        message: PRODUCT.PRODUCT_NOT_FOUND,
        status: HttpStatus.NOT_FOUND,
      })
    }

    return successResponse({
      data: product,
      message: PRODUCT.PRODUCTS_FETCHED,
    })
  }

  async uploadImage(productId: string, image: string, user: IUser) {
    let result: CloudinaryResult, resultImageDatabase

    try {
      const product = await ProductRepository.findById(productId)

      if (!product) {
        return errorResponse({
          message: PRODUCT.PRODUCT_NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        })
      }
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    try {
      result = await uploadBase64(image)
    } catch (error) {
      return errorResponse({
        message: PRODUCT.ERROR_UPLOAD_IMAGE,
        error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }

    try {
      resultImageDatabase = await ProductRepository.addImage({
        productId,
        publicId: result.publicId,
        url: result.secureUrl,
        uploadBy: user._id,
      })
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    return successResponse({
      message: PRODUCT.SUCCESS_UPLOAD_IMAGE,
      data: resultImageDatabase,
    })
  }

  async deleteImage(imageId: string) {
    let image

    try {
      image = await ProductRepository.findImageById(imageId)

      if (!image) {
        return errorResponse({
          message: PRODUCT.PRODUCT_IMAGE_NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        })
      }
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    try {
      await deleteResource(image.publicId)
    } catch (error) {
      return errorResponse({
        message: PRODUCT.ERROR_DELETE_IMAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }

    try {
      const imageDeleted = await ProductRepository.deleteImage(imageId)

      return successResponse({
        message: PRODUCT.SUCCESS_DELETE_IMAGE,
        data: imageDeleted,
      })
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }
  }
}
