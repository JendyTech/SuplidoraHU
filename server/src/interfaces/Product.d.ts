import { ObjectId } from 'mongoose'

export interface IProduct {
  _id: string
  name: string
  price: number
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
  publicId: string
  createdAt: Date
  updatedAt: Date
}
