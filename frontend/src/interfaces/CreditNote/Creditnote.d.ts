
export interface ICreditNote {
    _id: string
    creditNoteNumber: string;
    invoiceId: string;
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
    createdBy: string
    createdAt: Date
    updatedAt: Date
}


export interface ICreditNoteItem{
    _id: string
    creditNoteId: string
    productId: string 
    quantity: number
    description: string
    unitPrice: number
    total: number
}
