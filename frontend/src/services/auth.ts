import { useClient } from "@/hooks/useClient"
import { ILoginUserParams, ILoginUserResponse } from "@contracts/services/Auth"

export const loginService = async (params: ILoginUserParams) => {
	const { POST } = useClient()

	const response = await POST<ILoginUserResponse>({
		endpoint: "/auth/signin",
		body: params,
	})

	return response
}

export const logoutService = async () => {
	const response = await fetch('/api/logout', {method : 'POST'})
	return response
}
