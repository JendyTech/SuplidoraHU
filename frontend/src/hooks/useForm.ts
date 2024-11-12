import type { Submit, SubmitHandler } from "@contracts/Form"
import { type FormEvent } from "react"

export const useForm = (e: FormEvent) => {
	const form = e.target as HTMLFormElement
	e.preventDefault()

	return {
		getValues: () => {
			const data: any = {}
			const formData = new FormData(form)

			form.querySelectorAll("input, textarea, select").forEach((field: any) => {
				const key = field.name

				if (field.type === "checkbox") {
					data[key] = field.checked
				} else if (field.type === "select-multiple") {
					data[key] = Array.from(field.selectedOptions as Iterable<any>).map(
						(option: any) => option.value,
					)
				} else {
					const value = formData.get(key as string)

					if (
						Object.keys(data as Record<string, any>).includes(key as string)
					) {
						if (!Array.isArray(data[key])) {
							data[key] = [data[key]]
						}
						data[key].push(value)
					} else {
						data[key] = value
					}
				}
			})

			return data
		},
		resetForm: () => {
			form.reset()
		},
	}
}

interface IUseCreateSubmitData {
	form: HTMLFormElement
	reset: () => void
}

interface IUseCreateSubmit<T> {
	target: IUseCreateSubmitData
	data: T
	resolve: (value: Submit) => void
	reject: (value?: string) => void
}

export const useSubmit = <T = any>(
	callback: (params: IUseCreateSubmit<T>) => any,
) => {
	return async ({ data, ...target }: SubmitHandler<T>) => {
		return await new Promise<Submit>(async (resolve, reject) => {
			await callback({ data, target, resolve, reject })
		})
	}
}
