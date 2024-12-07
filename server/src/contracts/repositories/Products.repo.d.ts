import { IProduct, IProductPhoto } from '@interfaces/Product'

export type CreateProducts = Omit<
  IProduct,
  '_id' | 'createdAt' | 'updatedAt' | 'updatedBy'
>

export type UploadProductImage = Array<Pick<IProductPhoto, 'productId' | 'uploadBy' | 'url' | 'publicId'>>

export type SaveImageProduct = Pick<IProductPhoto, 'publicId' | 'uploadBy' | 'url' | 'productId'>

export interface GetProductByIdWithImagesResult extends IProduct {
  images: IProductPhoto[]
}


