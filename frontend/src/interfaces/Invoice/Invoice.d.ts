export interface IInvoice {
    _id: string;
    invoiceNumber: string;
    ncfNumber: string;
    rncNumber: string;
    expirationDate: Date;
    clientName: string;
    clientRnc: string;
    paymentCondition: string;
    supplierName: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    items: IInvoiceItem[];
}

export interface IInvoiceItem {
    _id: string;
    invoiceId: string;
    productId: string;
    quantity: number;
    description: string;
    unitPrice: number;
    total: number;
}
