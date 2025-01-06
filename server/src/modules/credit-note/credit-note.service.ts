import { CreateCreditNoteItem } from '@contracts/repositories/CreditNote.repo'
import { IUser } from '@interfaces/User'
import CREDIT_NOTE from '@messages/CreditNotes.json'
import GENERAL from '@messages/General.json'
import { CreateCreditNotesDto } from '@modules/credit-note/dto/creditnote.dto'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreditNoteRepository } from '@repositories/CreditNote.repo'
import { ProductRepository } from '@repositories/Products.repo'
import { InvoicesRepository } from '@repositories/Invoices.repo'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { errorResponse, successResponse } from '@shared/functions/response'

@Injectable()
export class CreditNoteService {
  async getCreditNotes(pagination: PaginationDTO) {
    try {

      const result = await CreditNoteRepository.getCreditNotes(pagination);

      return successResponse({
        data: result,
        message: CREDIT_NOTE.CREDIT_NOTES_FETCHED,
      });
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async getCreditNoteById(id: string, items: boolean = false) {
    let creditnote;

    try {

      creditnote = await (items
        ? CreditNoteRepository.getCreditNoteWithItems(id)
        : CreditNoteRepository.getCreditNotesById(id));
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }

    if (!creditnote) {
      return errorResponse({
        message: CREDIT_NOTE.CREDIT_NOTE_NOT_FOUND,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return successResponse({
      data: creditnote,
      message: CREDIT_NOTE.CREDIT_NOTES_FETCHED,
    });
  }

  async createCreditNote(dto: CreateCreditNotesDto, user: IUser) {
    let products, invoice;
    
    const itemsMap: Record<string, { productId: string; quantity: number }> = {};
    const itemsCreditNote: CreateCreditNoteItem[] = [];
    const ids: string[] = [];
    const currentDate = new Date();
  
    try {

      invoice = await InvoicesRepository.getInvoiceById(dto.invoiceId);
      if (!invoice) {
        return errorResponse({
          message: CREDIT_NOTE.CREDIT_NOTE_INVOICE_NOT_FOUND,
          status: HttpStatus.BAD_REQUEST,
        });
      }
  
      const invoiceExpirationDate = new Date(invoice.expirationDate);
      if (currentDate > invoiceExpirationDate) {
        return errorResponse({
          message: CREDIT_NOTE.CREDIT_NOTE_INVOICE_EXPIRED,
          status: HttpStatus.BAD_REQUEST,
        });
      }
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  
    const { 
      clientRnc, 
      paymentCondition, 
      supplierName, 
      expirationDate, 
      invoiceNumber, 
      ncfNumber 
    } = invoice;
  
    for (const item of dto.items) {
      ids.push(item.productId);
      itemsMap[item.productId] = item;
    }

    try {

      products = await ProductRepository.getProductsByIds(ids);
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  
    if (products.length !== dto.items.length) {
      return errorResponse({
        message: CREDIT_NOTE.CREDIT_NOTE_ITEM_NOT_FOUND,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  
    for (const product of products) {
      const id = product._id.toString();
      const { quantity } = itemsMap[id];
  
      itemsCreditNote.push({
        productId: id,
        quantity,
        description: product.description,
        unitPrice: product.price,
        total: product.price * quantity,
      });
    }
  
    let nextInvoiceNumber, nextNCF;
    try {

      const lastInvoiceNumber = await CreditNoteRepository.getLastCreditNoteNumber();
      const lastNCF = await CreditNoteRepository.getLastNCF();
  
      nextInvoiceNumber = lastInvoiceNumber
        ? `CN-${(parseInt(lastInvoiceNumber.replace(/\D/g, ''), 10) + 1)
            .toString()
            .padStart(6, '0')}`
        : 'CN-000001';
  
      nextNCF = lastNCF
        ? `B040${(parseInt(lastNCF.slice(-8), 10) + 1).toString().padStart(8, '0')}`
        : 'B04000000001';
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  
    try {
      const newCreditNote = await CreditNoteRepository.createCreditNotes({
        ...dto,
        invoiceNumber: invoiceNumber,
        ncfNumber: nextNCF, 
        affectedInvoice: ncfNumber,
        creditNoteNumber: nextInvoiceNumber,
        items: itemsCreditNote,
        createdBy: user._id,
        expirationDate: dto.expirationDate || expirationDate, 
        clientRnc, 
        paymentCondition,
        supplierName,
      });
  
      return successResponse({
        data: newCreditNote,
        message: CREDIT_NOTE.CREDIT_NOTE_CREATED,
      });
    } catch (error) {
      return errorResponse({
        message: GENERAL.ERROR_DATABASE_MESSAGE,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }
}