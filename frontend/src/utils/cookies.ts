export const setCookie = async (name: string, value: string, days: number) => {
	return await fetch("/api/cookie", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			value,
			days,
		}),
	})
}
