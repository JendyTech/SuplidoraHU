import { ObjectId } from 'mongoose'

export interface IProduct {
  _id: string
  name: string
  slug: string
  price: number
  category: string | ObjectId
  categoryName: string
  description: string
  code: string
  unitsPerPack: number
  createdBy: ObjectId | string
  updatedBy: ObjectId | string | null
  createdAt: Date
  updatedAt: Date
}

export interface IProductPhoto {
  _id: string
  url: string
  productId: string | ObjectId
  publicId: string
  uploadBy: ObjectId | string
  createdAt: Date
  updatedAt: Date
}
