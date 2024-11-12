import { IProduct } from '@interfaces/Product'

export type CreateProducts = Omit<
  IProduct,
  '_id' | 'createdAt' | 'updatedAt' | 'updatedBy'
>
