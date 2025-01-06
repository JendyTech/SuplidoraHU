import { ObjectId } from "mongoose"

export interface ICreditNote {
    _id: string
    creditNoteNumber: string;
    invoiceId: string | ObjectId;
    invoiceNumber: string;
    ncfNumber: string 
    rncNumber: string
    expirationDate: Date
    affectedInvoice: string
    clientName: string
    reason: string
    clientRnc: string
    paymentCondition: string
    supplierName: string
    createdBy: ObjectId | string
    createdAt: Date
    updatedAt: Date
}


export interface ICreditNoteItem{
    _id: string
    creditNoteId: string | ObjectId
    productId: string | ObjectId
    quantity: number
    description: string
    unitPrice: number
    total: number
}
