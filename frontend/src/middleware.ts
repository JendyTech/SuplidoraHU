import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { readTokenServer } from "./utils/session"

export async function middleware(request: NextRequest) {
	const url = request.nextUrl.clone()
	const pathname = url.pathname
	const authUrl = new URL("/login", url.origin)
	const isFile = pathname.includes(".")

	if (!pathname.startsWith("/admin")) {
		return NextResponse.next()
	}

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/auth") ||
		pathname.startsWith("/api") ||
		isFile
	) {
		return NextResponse.next()
	}

	const { success, payload } = await readTokenServer()

	if (!success) {
		return NextResponse.redirect(authUrl)
	}

	const currentTime = Math.floor(Date.now() / 1000)

	if (payload.exp < currentTime) {
		return NextResponse.redirect(authUrl)
	}

	return NextResponse.next()
}
