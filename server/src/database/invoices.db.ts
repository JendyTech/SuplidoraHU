import { IInvoice, IInvoiceItem } from "@interfaces/Invoice"
import { model, Schema, Types } from 'mongoose';
import { MODELS_NAMES } from '@config/constants';

const invoiceSchema = new Schema<IInvoice>(
    {
        ncfNumber: {
            type: String,
            required: true,
            unique: true,
        },
        rncNumber: {
            type: String,
            required: true,
            unique: true,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        clientName: {
            type: String,
            required: true,
        },
        clientRnc: {
            type: String,
            required: true,
        },
        paymentCondition: {
            type: String,
            required: true,
        },
        supplierName: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const InvoiceModel = model<IInvoice>(
    MODELS_NAMES.INVOICES,
    invoiceSchema,
)

const invoiceItemSchema = new Schema<IInvoiceItem>(
    {
        invoiceId: {
            type: Types.ObjectId,
            required: true,
        },
        productId: {
            type: Types.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const InvoiceItemModel = model<IInvoiceItem>(
    MODELS_NAMES.INVOICE_ITEMS,
    invoiceItemSchema,
)
