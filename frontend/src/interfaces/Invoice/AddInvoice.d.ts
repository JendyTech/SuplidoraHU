interface AddInvoiceModel {
    invoiceNumber?: string;
    ncfNumber : string
    rncNumber : string
    expirationDate : string
    clientName : string
    clientRnc : string
    paymentCondition : string
    supplierName : string
    items: AddInvoiceItemModel[]; 
}

interface AddInvoiceItemModel {
    productId : string
    quantity : number
    description : string
    unitPrice : number
    total : number
}