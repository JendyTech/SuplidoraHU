import { IInvoice } from "@interfaces/Invoice";

export type CreateInvoices = Omit<
IInvoice,
'_id' | 'createdAt' | 'updatedAt'
>

