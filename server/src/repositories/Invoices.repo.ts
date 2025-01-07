import {
  CreateInvoices,
  GetInvoiceByIdWithItemsResults,
} from '@contracts/repositories/Invoices.repo'
import { InvoiceModel, InvoiceItemModel } from '@database/invoices.db'
import { mongoosePagination } from '@shared/functions/pagination'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { MODELS_NAMES } from '@config/constants'
import { FilterQuery, Types } from 'mongoose'
import { IInvoice } from '@interfaces/Invoice'

export class InvoicesRepository {
  static async getInvoices(pagination: PaginationDTO) {
    const filters: FilterQuery<IInvoice> = {}

    if (pagination.search) {
      filters.$or = [
        {
          invoiceNumber: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          rncNumber: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          clientName: { $regex: new RegExp(pagination.search, 'i') },
        },
      ]
    }

    return mongoosePagination({
      ...pagination,
      Model: InvoiceModel,
        filter: filters
    })
  }

  static async getInvoiceById(id: string) {
    const result = await InvoiceModel.findById(id)

    if (!result) return null

    return result.toObject()
  }

  static async createInvoice(data: CreateInvoices) {
    const newInvoice = new InvoiceModel(data)

    const invoice = await newInvoice.save()

    const itemsData = data.items.map((item) => ({
      ...item,
      invoiceId: invoice.id,
    }))

    const items = await InvoiceItemModel.insertMany(itemsData)

    return {
      ...invoice?.toObject(),
      items: items.map((item) => item.toObject()),
    }
  }

  static async getInvoicesWithItems(
    id: string,
  ): Promise<null | GetInvoiceByIdWithItemsResults> {
    const [invoice = null] = await InvoiceModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: MODELS_NAMES.INVOICE_ITEMS,
          as: 'items',
          localField: '_id',
          foreignField: 'invoiceId',
        },
      },
      {
        $limit: 1,
      },
    ])
    return invoice
  }

  static async findById(id: string) {
    const result = await InvoiceModel.findById(id)

    if (!result) return null

    return result.toObject()
  }

  static async getInvoiceByRnc(rncNumber: string) {
    const result = await InvoiceModel.findOne({ rncNumber })

    if (!result) return null

    return result.toObject()
  }

  static async getLastInvoiceNumber(): Promise<string | null> {
    const lastInvoice = await InvoiceModel.findOne({})
      .sort({ createdAt: -1 })
      .select('invoiceNumber')

    return lastInvoice?.invoiceNumber || null
  }

  static async getLastNCF(): Promise<string | null> {
    const lastInvoice = await InvoiceModel.findOne({})
      .sort({ createdAt: -1 })
      .select('ncfNumber')

    return lastInvoice?.ncfNumber || null
  }
}
