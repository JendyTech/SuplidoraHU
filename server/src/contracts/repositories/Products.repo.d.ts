import { IProduct } from '@interfaces/IProduct'

export type CreateProducts = Omit<
  IProduct,
  '_id' | 'createdAt' | 'updatedAt' | 'updatedBy'
>
