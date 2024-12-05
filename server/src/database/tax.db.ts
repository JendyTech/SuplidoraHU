import { ITax } from "@interfaces/Tax";
import { MODELS_NAMES } from "@config/constants";
import { model, Schema } from 'mongoose'

const taxSchema = new Schema<ITax>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        rate: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        isExempt: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export const TaxModel = model<ITax>(
    MODELS_NAMES.TAXES,
    taxSchema
)

