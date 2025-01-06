import {
  CreateCreditNotes,
  GetCreditNoteByIdWithItemsResults,
} from '@contracts/repositories/CreditNote.repo'
import { CreditNoteModel, CreditNoteItemModel } from '@database/creditnote.db'
import { mongoosePagination } from '@shared/functions/pagination'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { MODELS_NAMES } from '@config/constants'
import { FilterQuery, Types } from 'mongoose'
import { ICreditNote } from '@interfaces/CreditNote'

export class CreditNoteRepository {
  static async getCreditNotes(pagination: PaginationDTO) {
    const filters: FilterQuery<ICreditNote> = {}

    if (pagination.search) {
      filters.$or = [
        {
          creditNoteNumber: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          clientName: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          supplierName: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          reason: { $regex: new RegExp(pagination.search, 'i') },
        },
      ]
    }

    return mongoosePagination({
      ...pagination,
      Model: CreditNoteModel,
    })
  }

  static async getCreditNotesById(id: string) {
    const result = await CreditNoteModel.findById(id)

    if (!result) return null

    return result.toObject()
  }

  static async getCreditNoteWithItems(
    id: string,
  ): Promise<null | GetCreditNoteByIdWithItemsResults> {
    const [creditNote = null] = await CreditNoteModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: MODELS_NAMES.CREDIT_NOTE_ITEMS,
          as: 'items',
          localField: '_id',
          foreignField: 'creditNoteId',
        },
      },
      {
        $limit: 1,
      },
    ])
    return creditNote
  }

  static async findById(id: string) {
    const result = await CreditNoteModel.findById(id)

    if (!result) return null

    return result.toObject()
  }

  static async createCreditNotes(data: CreateCreditNotes) {
    const newCreditNote = new CreditNoteModel(data)

    const creditNote = await newCreditNote.save()

    const itemsData = data.items.map((item) => ({
      ...item,
      creditNoteId: creditNote.id,
    }))

    const items = await CreditNoteItemModel.insertMany(itemsData)

    return {
      ...creditNote?.toObject(),
      items: items.map((item) => item.toObject()),
    }
  }

      static async getLastCreditNoteNumber(): Promise<string | null> {
          const lastCreditNote = await CreditNoteModel.findOne({})
              .sort({ createdAt: -1 })
              .select('creditNoteNumber')
  
          return lastCreditNote?.creditNoteNumber || null
      }
  
      static async getLastNCF(): Promise<string | null> {
          const lastCreditNote = await CreditNoteModel.findOne({})
          .sort({ createdAt: -1 })
          .select('ncfNumber')
  
          return lastCreditNote?.ncfNumber || null
      }
}
