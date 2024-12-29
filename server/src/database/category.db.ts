import { ICategory } from "@interfaces/Category";
import { model, Schema } from 'mongoose'
import { MODELS_NAMES } from '@config/constants'

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }
    }
)

export const CategoryModel = model<ICategory>(
    MODELS_NAMES.CATEGORIES,
    categorySchema,
)