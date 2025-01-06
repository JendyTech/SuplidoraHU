import { ICreditNote, ICreditNoteItem } from '@interfaces/CreditNote'

export interface CreateCreditNotes
  extends Omit<ICreditNote, '_id' | 'createdAt' | 'updatedAt'> {
  items: CreateCreditNoteItem[]
}

export interface CreateCreditNoteItem {
    productId: string
    quantity: number
    description: string
    unitPrice: number
    total: number
}

export interface GetCreditNoteByIdWithItemsResults extends ICreditNote {
  items: ICreditNoteItem[]
}