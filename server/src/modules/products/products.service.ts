import PRODUCT from '@messages/Product.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common'
import { CreateProductDto } from '@modules/products/dto/product.dto'
import { IUser } from '@interfaces/User'
import { ProductRepository } from '@repositories/Products.repo'
import { successResponse, errorResponse } from '@shared/functions/response'
import { HttpStatus } from '@nestjs/common'
import { PaginationDTO } from '@shared/dto/Pagination.dto'

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
    let found

    try {
      found = await ProductRepository.findByName(dto.name)
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
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
      }

      const newProduct = await ProductRepository.createProduct(productData)

      return successResponse({
        data: newProduct,
        message: PRODUCT.PRODUCT_CREATED,
      })
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async updatedProduct(dto: CreateProductDto, id: string, user: IUser) {
    let product

    try {
      product = await ProductRepository.findById(id)
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

    try {
      const productData = {
        ...dto,
        updatedBy: user._id,
        createdBy: user._id,
      }

      const updatedProduct = await ProductRepository.updatedProduct(
        id,
        productData,
      )

      if (!updatedProduct) {
        return errorResponse({
          message: GENERAL.ERROR_DATABASE_MESSAGE,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      }

      return successResponse({
        data: updatedProduct,
        message: PRODUCT.PRODUCT_UPDATED,
      })
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async deleteProduct(id: string) {
    let product

    try {
      product = await ProductRepository.findById(id)

      if (!product) {
        return errorResponse({
          message: PRODUCT.PRODUCT_NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        })
      }

      await ProductRepository.deleteProduct(id)

      return successResponse({
        message: PRODUCT.PRODUCT_DELETED,
      })
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      })
    }
  }

  async getProductById(id: string) {
    let product

    try {
      product = await ProductRepository.findById(id)
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
}
