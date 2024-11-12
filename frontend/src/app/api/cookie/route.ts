import { cookies } from "next/headers"
import { NextResponse } from "next/server"

interface IBodyCreateCookie {
	days: number
	name: string
	value: string
}

export const POST = async (request: Request) => {
	const { set } = await cookies()

	let body: IBodyCreateCookie

	try {
		body = await request.json()
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				messages: [{ message: "Error to get body" }],
			}),
			{ status: 400 },
		)
	}

	const { days, name, value } = body

	if (!days || !name || !value) {
		return new NextResponse(
			JSON.stringify({
				messages: [{ message: "Missing parameters" }],
			}),
			{ status: 400 },
		)
	}

	const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000)

	set(name, value, {
		expires: date,
		sameSite: "strict",
		secure: true,
		value: value,
		httpOnly: true,
	})

	return new NextResponse(
		JSON.stringify({
			message: "Cookie created successfully",
		}),
		{ status: 200 },
	)
}
