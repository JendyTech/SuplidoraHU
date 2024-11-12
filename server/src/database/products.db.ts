import { IProduct, IProductPhoto } from '@interfaces/Product'
import { model, Schema, Types } from 'mongoose'
import { MODELS_NAMES } from '@config/constants'

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    unitsPerPack: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

export const ProductModel = model<IProduct>(
  MODELS_NAMES.PRODUCTS,
  productSchema,
)

const productPhotoSchema = new Schema<IProductPhoto>(
  {
    publicId: {
      type: String,
      required: true,
    },
    productId: {
      type: Types.ObjectId,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadBy: {
      type: Types.ObjectId,
      required: true,
    }
  },
  {
    timestamps: true,
  },
)

export const ProductPhotoModel = model<IProductPhoto>(
  MODELS_NAMES.PRODUCTS_IMAGES,
  productPhotoSchema,
)
