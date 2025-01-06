
interface AddCreditNoteModel {
    creditNoteNumber?: string;
    invoiceId: string;
    invoiceNumber?: string;
    ncfNumber?: string 
    rncNumber?: string
    expirationDate?: string
    affectedInvoice?: string
    clientName?: string
    reason: string
    clientRnc?: string
    paymentCondition?: string
    supplierName?: string
    items: AddCreditNoteItemModel[]
}


interface  AddCreditNoteItemModel{
    creditNoteId: string
    productId: string 
    quantity: number
    description: string
    unitPrice: number
    total: number
}
