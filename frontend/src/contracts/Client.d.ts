import type { ErrorsResponseData } from "./API"

type Headers = "Content-Type" | "Authorization" | "Accept" | "Content-Type" | ""

export interface Client {
	endpoint: string
	body?: Record<string, any> | FormData
	headers?: Record<string, Headers | string>
	query?: Record<string, any>
}

export interface PaginationMetadata {
	total: number
	page: number
	max: number
	next: boolean
	previous: boolean
	totalPages: number
}

interface FinalResultSuccess<T> {
	result: T
	message: string
	ok: true
}

interface FinalResultError {
	details: any
	messages: ErrorsResponseData[]
	ok: false
	status: number
}

export type FinalResult<T> = FinalResultSuccess<T> | FinalResultError
