import { type Client, type FinalResult } from "@contracts/Client"
import { BASE_API_URL } from "@config/enviroments"
import { GLOBAL_TOKEN } from "@config/constants"

export const useClient = (initToken: string | null = null) => {
	const token = initToken ?? window[GLOBAL_TOKEN]

	const defaultHeaders = {
		accept: "application/json",
		authorization: token ? `Bearer ${token}` : undefined,
		"content-type": "application/json",
	}

	const getQuerys = (keys: Record<string, string>) => {
		const entries = Object.entries(keys)
		const keysFiltered = entries.filter(([, value]) => value)
		const queryParameters = new URLSearchParams(keysFiltered).toString()
		return queryParameters ? `?${queryParameters}` : ""
	}

	const finalResult = async <T>(request: Response): Promise<FinalResult<T>> => {
		const status = request.status
		try {
			const data = await request.json()
			if (!request.ok) {
				return {
					...data,
					details: data.details,
					messages: data.messages,
					status,
					ok: false,
				}
			}

			return {
				...data,
				data: data.data,
				message: data.message,
				status,
				ok: true,
				metadata: data?.metadata,
			}
		} catch (error) {
			return {
				details: null,
				messages: [
					{
						code: "unknown_error",
						expected: "application/json",
						extra: {},
						message: "Error desconocido",
						path: [],
						received: "text/html",
					},
				],
				ok: false,
				status,
			} as any
		}
	}

	const POST = async <T>(client: Client) => {
		const { endpoint, body = {}, headers = {}, query = {} } = client
		const joinHeaders = Object.assign({}, defaultHeaders, headers)

		if (body instanceof FormData) {
			joinHeaders["content-type"] = "multipart/form-data"
		}

		const url = `${BASE_API_URL}${endpoint}${getQuerys(query)}`

		const request = await fetch(url, {
			method: "POST",
			headers: joinHeaders,
			body: JSON.stringify(body),
		})

		return await finalResult<T>(request)
	}

	const GET = async <T>(client: Omit<Client, "body">) => {
		const { endpoint, headers = {}, query = {} } = client
		const joinHeaders = Object.assign({}, defaultHeaders, headers)
		const url = `${BASE_API_URL}${endpoint}${getQuerys(query)}`

		const request = await fetch(url, {
			method: "GET",
			headers: joinHeaders,
		})

		return await finalResult<T>(request)
	}

	const PUT = async <T>(client: Client) => {
		const { endpoint, body = {}, headers = {}, query = {} } = client
		const joinHeaders = Object.assign({}, defaultHeaders, headers)

		if (body instanceof FormData) {
			joinHeaders["content-type"] = "multipart/form-data"
		}

		const url = `${BASE_API_URL}${endpoint}${getQuerys(query)}`

		const request = await fetch(url, {
			method: "PUT",
			headers: joinHeaders,
			body: JSON.stringify(body),
		})

		return await finalResult<T>(request)
	}

	const DELETE = async <T>(client: Client) => {
		const { endpoint, headers = {}, query = {} } = client
		const joinHeaders = Object.assign({}, defaultHeaders, headers)
		const url = `${BASE_API_URL}${endpoint}${getQuerys(query)}`

		const request = await fetch(url, {
			method: "DELETE",
			headers: joinHeaders,
		})

		return await finalResult<T>(request)
	}

	const PATCH = async <T>(client: Client) => {
		const { endpoint, body = {}, headers = {}, query = {} } = client
		const joinHeaders = Object.assign({}, defaultHeaders, headers)

		if (body instanceof FormData) {
			joinHeaders["content-type"] = "multipart/form-data"
		}

		const url = `${BASE_API_URL}${endpoint}${getQuerys(query)}`

		const request = await fetch(url, {
			method: "PATCH",
			headers: joinHeaders,
			body: JSON.stringify(body),
		})

		return await finalResult<T>(request)
	}

	return {
		POST,
		GET,
		PUT,
		DELETE,
		PATCH,
	}
}
