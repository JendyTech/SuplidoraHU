import PRODUCT from '@messages/Product.json'
import CATEGORY from '@messages/Category.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common'
import { CreateProductDto, UpdateProductDto } from '@modules/products/dto/product.dto'
import { IUser } from '@interfaces/User'
import { generateSlug } from '@shared/utils/generateSlug'
import { ProductRepository } from '@repositories/Products.repo'
import { successResponse, errorResponse } from '@shared/functions/response'
import { HttpStatus } from '@nestjs/common'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { uploadBase64, deleteResource } from '@shared/functions/cloudinary'
import { CloudinaryResult } from '@contracts/Cloudinary'
import { CategoryRepository } from '@repositories/Category.repo'
import {
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
      product,
      category


    if (!dto.categoryId && !dto.categoryName) {
      return errorResponse({
        message: PRODUCT.REQUIRE_CATEGORY_NAME_OR_ID,
        status: HttpStatus.BAD_REQUEST,
      })
    }

    if (dto.categoryId && dto.categoryName) {
      return errorResponse({
        message: PRODUCT.ONLY_CATEGORY_NAME_OR_CATEGORY_ID,
        status: HttpStatus.BAD_REQUEST,
      })
    }


    if (dto.categoryId) {
      category = await CategoryRepository.getCategoryById(dto.categoryId)
    }

    if (dto.categoryName) {

      try {
        const foundName = CategoryRepository.getCategoryByName(dto.categoryName)

        if (foundName) {
          return errorResponse({
            message: CATEGORY.CATEGORIES_FOUND,
            status: HttpStatus.CONFLICT
          })
        }

        category = await CategoryRepository.createCategory({ name: dto.categoryName })

      } catch (error) {
        return errorResponse({
          error,
          message: GENERAL.ERROR_DATABASE_MESSAGE,
          status: HttpStatus.INTERNAL_SERVER_ERROR
        })
      }
    }

    if (!category) {
      return errorResponse({
        message: CATEGORY.CATEGORY_NOT_FOUND,
        status: HttpStatus.NOT_FOUND
      })
    }

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

    const slug = generateSlug(dto.name)

    try {
      const productData = {
        ...dto,
        slug,
        createdBy: user._id,
        imagesId: imagePublicId,
        images: imageUrl,
        category: category._id
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

  async updatedProduct(dto: UpdateProductDto, id: string, user: IUser) {
    let product, category
  
    try {
      product = await ProductRepository.findById(id);
    } catch (error) {
      console.error('[ERROR] Failed to fetch product:', error);
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  
    if (!product) {
      console.warn('[WARN] Product not found with ID:', id);
      return errorResponse({
        message: PRODUCT.PRODUCT_NOT_FOUND,
        status: HttpStatus.NOT_FOUND,
      });
    }

    if (!dto.categoryId && !dto.categoryName) {
      return errorResponse({
        message: PRODUCT.REQUIRE_CATEGORY_NAME_OR_ID,
        status: HttpStatus.BAD_REQUEST,
      })
    }

    if (dto.categoryId && dto.categoryName) {
      return errorResponse({
        message: PRODUCT.ONLY_CATEGORY_NAME_OR_CATEGORY_ID,
        status: HttpStatus.BAD_REQUEST,
      })
    }

    try {
      category = await CategoryRepository.getCategoryById(dto.categoryId);

      if (!category) {
        return errorResponse({
          message: CATEGORY.CATEGORY_NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
        });
      }

      if(dto.categoryName){
        const foundCategory = await CategoryRepository.getCategoryByName(dto.categoryName)

        if (foundCategory) {
          return errorResponse({
            message: CATEGORY.CATEGORIES_FOUND,
            status: HttpStatus.CONFLICT
          })
        }

        category = await CategoryRepository.createCategory({ name: dto.categoryName })
      }
    } catch (error) {
      
    }
  
    const { imagesToDelete = [], imagesToAdd = [] } = dto;
  
    if (imagesToDelete.length > 0) {
      try {
        await Promise.all(
          imagesToDelete.map(async (imageId) => {
            const image = await ProductRepository.findImageById(imageId);
            if (image) {
              await deleteResource(image.publicId);
              await ProductRepository.deleteImage(imageId);
            }
          })
        );
      } catch (error) {
        console.error('[ERROR] Failed to delete images:', error);
        return errorResponse({
          message: PRODUCT.ERROR_DELETE_IMAGE,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        });
      }
    }
  
    const newImages: UploadProductImage = [];
    if (imagesToAdd.length > 0) {
      try {
        await Promise.all(
          imagesToAdd.map(async (base64Image) => {
            const result = await uploadBase64(base64Image);
            newImages.push({
              productId: id,
              publicId: result.publicId,
              url: result.secureUrl,
              uploadBy: user._id,
            });
          })
        );
  
        await ProductRepository.saveProductImages(newImages);
      } catch (error) {
        console.error('[ERROR] Failed to upload new images:', error);
        return errorResponse({
          message: PRODUCT.ERROR_UPLOAD_IMAGE,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        });
      }
    }
  
    try {
      const updatedProductData = {
        ...dto,
        slug: product.slug,
        updatedBy: user._id,
        createdBy: product.createdBy,
        category: category._id
      };

      if (dto.name && dto.name !== product.name){
        updatedProductData.slug = generateSlug(dto.name);
      }

      const updatedProduct = await ProductRepository.updatedProduct(id, updatedProductData);
  
      if (!updatedProduct) {
        return errorResponse({
          message: GENERAL.ERROR_DATABASE_MESSAGE,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
  
      return successResponse({
        data: updatedProduct,
        message: PRODUCT.PRODUCT_UPDATED,
      });
    } catch (error) {
      console.error('[ERROR] Failed during product update:', error);
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
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
