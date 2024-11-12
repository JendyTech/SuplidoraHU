import { STORAGES } from "@config/constants"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const readTokenServer = async () => {
	const cookiesManager = await cookies()

	const token = cookiesManager.get(STORAGES.TOKEN)

	if (!token) {
		return {
			success: false,
			message: "Invalid token",
			token: "",
			payload: {},
		}
	}

	try {
		const parts = token.value.split(".")
		if (parts.length !== 3) {
			throw new Error("Invalid token")
		}

		const header = JSON.parse(Buffer.from(parts[0], "base64url").toString())
		const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString())

		return {
			success: true,
			header,
			payload,
			token: token.value,
		}
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
			token: "",
			payload: {},
		}
	}
}

export const verifySession = async (
	{ notRedirect }: { notRedirect?: boolean } = { notRedirect: false },
) => {
	const now = Math.floor(Date.now() / 1000)

	const { get, delete: delelteCookie } = await cookies()

	const token = get(STORAGES.TOKEN)

	if (!token) {
		return notRedirect ? null : redirect("/auth")
	}

	const { success, payload } = await readTokenServer()

	if (!success) {
		delelteCookie(STORAGES.TOKEN)
		return notRedirect ? null : redirect("/auth")
	}

	const { exp } = payload

	if (exp < now) {
		delelteCookie(STORAGES.TOKEN)
		return notRedirect ? null : redirect("/auth")
	}

	return payload
}

export const redirectSession = async () => {
	const now = Math.floor(Date.now() / 1000)

	const { get } = await cookies()

	const token = get(STORAGES.TOKEN)

	if (!token) {
		return
	}

	const { success, payload } = await readTokenServer()

	if (!success) {
		return
	}

	const { exp } = payload

	if (exp < now) {
		return
	}

	return redirect("/")
}
