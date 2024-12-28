export interface PageParams {
	params: Promise<Record<string, string>>
	searchParams: Promise<Record<string, string>>
}

export interface ApiParams {
	params: Promise<Record<string, string>>
}
