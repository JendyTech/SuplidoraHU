import type { Model, FilterQuery, PipelineStage } from 'mongoose'

export interface PaginationOptions<T> {
  Model: Model<T>
  filter?: FilterQuery<T>
  max: number
  page: number
  sort?: boolean
  pipeline?: PipelineStage[]
  extract?: { [K in keyof T]?: boolean }
  startDate?: string
  endDate?: string
  searchBetweenDates?: boolean
}

export interface PaginationResult<T> {
  metadata: {
    total: number
    page: number
    max: number
    next: boolean
    previous: boolean
    totalPages: number
  }
  data: T[]
}
export const mongoosePagination = async <T>({
  Model,
  max,
  page,
  sort = true,
  filter = {},
  pipeline = [],
  extract = {},
  endDate,
  startDate,
  searchBetweenDates = false,
}: PaginationOptions<T>): Promise<PaginationResult<T>> => {
  const skip = (page - 1) * max

  // Add range date filter
  const dateFilter: FilterQuery<T> & {
    createdAt?: { $gte?: Date; $lte?: Date; $gt?: Date; $lt?: Date }
  } = {}

  if (startDate && endDate) {
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    if (searchBetweenDates) {
      dateFilter.createdAt = {
        $gt: startDateObj,
        $lt: new Date(endDateObj.getTime() + 24 * 60 * 60 * 1000),
      }
    } else {
      dateFilter.createdAt = { $gte: startDateObj, $lte: endDateObj }
    }
  } else if (startDate) {
    const startDateObj = new Date(startDate)
    dateFilter.createdAt = searchBetweenDates
      ? { $gt: startDateObj }
      : { $gte: startDateObj }
  } else if (endDate) {
    const endDateObj = new Date(endDate)
    dateFilter.createdAt = searchBetweenDates
      ? { $lt: endDateObj }
      : { $lte: endDateObj }
  }

  // Combine the filter with the date filter
  const combinedFilter = { ...filter, ...dateFilter }

  // Initial pipeline
  const initialPipeline: PipelineStage[] = [
    { $match: combinedFilter },
    ...pipeline,
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          ...(sort ? [{ $sort: { createdAt: -1 } }] : []),
          { $skip: skip },
          { $limit: max },
          ...(Object.keys(extract).length > 0 ? [{ $project: extract }] : []),
        ],
      },
    } as any,
    { $unwind: '$metadata' },
  ]

  const result = await Model.aggregate(initialPipeline)

  const metadataResult = result[0]?.metadata ?? { total: 0 }
  const dataResult = result[0]?.data ?? []

  const metadata = {
    total: metadataResult.total,
    page,
    max,
    next: metadataResult.total > skip + max,
    previous: page > 1,
    totalPages: Math.ceil(metadataResult.total / max),
  }

  return {
    metadata,
    data: dataResult,
  }
}
