export interface SubmitPromiseForm {
	message: `${string}.`
	notMessage?: boolean
	redirect?: `/${string}`
	redirectTimeout?: number
	notDisabledFields?: boolean
	redirectWindow?: boolean
	reload?: boolean
	replaceRedirect?: boolean
}

export interface SubmitHandler<T = any> {
	data: T
	form: HTMLFormElement
	reset: () => void
}

export interface Submit {
	message: string
	notMessage?: boolean
	redirect?: `/${string}`
	redirectTimeout?: number
	notDisabledFields?: boolean
	redirectWindow?: boolean
	replaceRedirect?: boolean
}

export interface Form<T = Record<string, any>> {
	data: T
	form: HTMLFormElement
	reset: () => void
}
declare function cleanForm(): void
declare function clearFieldByFieldName(fieldName: string): HTMLElement | null
type DataForm = Record<string, any>

export type Setter = [Event, DataForm, cleanForm, clearFieldByFieldName]
export type SubmitFunction = (params: SubmitHandler) => Promise<Partial<any>>
