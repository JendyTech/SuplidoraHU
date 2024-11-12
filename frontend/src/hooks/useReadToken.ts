export const useReadToken = (token: string) => {
	if (!token) return null

	if (typeof token !== "string") return null

	try {
		const [, payload] = token?.split(".")
		const decodedPayload = atob(payload)
		const decodedPayloadUTF8 = decodeURIComponent(escape(decodedPayload))
		return JSON.parse(decodedPayloadUTF8)
	} catch (error) {
		console.error("Error reading token", error)
		return null
	}
}
