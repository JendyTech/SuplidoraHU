import { ICreditNote, ICreditNoteItem } from '@interfaces/CreditNote'
import { model, Schema, Types } from 'mongoose'
import { MODELS_NAMES } from '@config/constants'

const creditNoteSchema = new Schema<ICreditNote>({
  creditNoteNumber: {
    type: String,
    required: true,
  },
  invoiceId: {
    type: Types.ObjectId,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  ncfNumber: {
    type: String,
    required: true,
  },
  rncNumber: {
    type: String,
    required: false,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  affectedInvoice: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: false,
  },
  reason: {
    type: String,
    required: true,
  },
  clientRnc: {
    type: String,
    required: false, 
  },
  paymentCondition: {
    type: String,
    required: false, 
  },
  supplierName: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
},
{
    timestamps: true,
})


export const CreditNoteModel = model<ICreditNote>(
    MODELS_NAMES.CREDIT_NOTES,
    creditNoteSchema,
)

const creditNoteItemSchema = new Schema<ICreditNoteItem>({
  creditNoteId: {
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
  },
},
{
    timestamps: true,
})

export const CreditNoteItemModel = model<ICreditNoteItem>(
    MODELS_NAMES.CREDIT_NOTE_ITEMS,
    creditNoteItemSchema,
)
