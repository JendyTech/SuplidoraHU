import { NextResponse } from "next/server"
import { STORAGES } from "@config/constants"
import { cookies } from "next/headers"

export const POST = async () => {
	const { delete: deleteCookie } = await cookies()

	try {
		deleteCookie(STORAGES.TOKEN)

		return new NextResponse(
			JSON.stringify({
				message: "User logout successfully",
			}),
			{ status: 200 },
		)
	} catch (error) {
		return new Response(
			JSON.stringify({
				messages: [
					{
						message: "Error logout",
					},
				],
			}),
			{ status: 400 },
		)
	}
}
