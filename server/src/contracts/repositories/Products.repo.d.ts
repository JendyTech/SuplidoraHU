import { IProduct, IProductPhoto } from '@interfaces/Product'

export type CreateProducts = Omit<
  IProduct,
  '_id' | 'createdAt' | 'updatedAt' | 'updatedBy'
>

export type SaveImageProduct = Pick<IProductPhoto, 'publicId' | 'uploadBy' | 'url' | 'productId'>

export interface GetProductByIdWithImagesResult extends IProduct {
  images: IProductPhoto[]
}


