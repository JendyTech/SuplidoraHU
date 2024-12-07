interface AddInvoiceModel {
    invoiceNumber: string;
    ncfNumber : string
    rncNumber : string
    expirationDate : Date
    clientName : string
    clientRnc : string
    paymentCondition : string
    supplierName : string
}

interface AddInvoiceItemModel {
    invoiceId : string
    productId : string
    quantity : number
    description : string
    unitPrice : number
    total : number
}