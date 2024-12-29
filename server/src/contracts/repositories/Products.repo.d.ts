import { IProduct, IProductPhoto } from '@interfaces/Product'

export type CreateProducts = Omit<
  IProduct,
  '_id' | 'createdAt' | 'updatedAt' | 'updatedBy' 
> & {
  slug: string; 
}

export type UpdateProducts = Partial<
  Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>
> & {
  updatedBy: string;
  slug?: string;
};

export type UploadProductImage = Array<Pick<IProductPhoto, 'productId' | 'uploadBy' | 'url' | 'publicId'>>

export type SaveImageProduct = Pick<IProductPhoto, 'publicId' | 'uploadBy' | 'url' | 'productId'>

export interface GetProductByIdWithImagesResult extends IProduct {
  images: IProductPhoto[]
}


