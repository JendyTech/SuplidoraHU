import { ObjectId } from "mongoose"

export interface IInvoice {
    _id: string
    invoiceNumber: string;
    ncfNumber: string 
    rncNumber: string
    expirationDate: Date
    clientName: string
    clientRnc: string
    paymentCondition: string
    supplierName: string
    createdBy: ObjectId | string
    createdAt: Date
    updatedAt: Date
}


export interface IInvoiceItem{
    _id: string
    invoiceId: string | ObjectId
    productId: string | ObjectId
    quantity: number
    description: string
    unitPrice: number
    total: number
}
