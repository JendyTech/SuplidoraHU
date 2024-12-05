export const getToken = async (server: boolean | undefined = undefined) => {
  
	let token: string | undefined = undefined

	if (server) {
		const { readTokenServer } = await import("@/utils/session")

		const result = await readTokenServer()

		token = result.token
	}

  return token

} 