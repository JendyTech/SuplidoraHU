export interface ErrorsResponseData {
	message: string
	extra: Record<string, any>
}
export interface Pagination<T> {
  data: T[]
  metadata: PaginationMetadata
}
interface PaginationMetadata {
  total: number
  page: number
  max: number
  next: boolean
  previous: boolean
  totalPages: number
  search?: string
}

export interface ParamsPaginationFilterOptions {
  max: number
  page: number
  search: string
  category: string
}

export type ParamsPaginationFilter = Partial<ParamsPaginationFilterOptions>
