import { IInvoice, IInvoiceItem } from "@interfaces/Invoice";

export interface CreateInvoices extends Omit<
    IInvoice,
    '_id' | 'createdAt' | 'updatedAt'
> {
  items: CreateInvoiceItem[]
}

export interface CreateInvoiceItem {
    productId: string
    quantity: number
    description: string
    unitPrice: number
    total: number
}

export interface GetInvoiceByIdWithItemsResults extends IInvoice {
  items: IInvoiceItem[]
}