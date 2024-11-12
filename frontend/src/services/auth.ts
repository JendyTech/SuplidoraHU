import { useClient } from "@/hooks/useClient"
import { ILoginUserParams, ILoginUserResponse } from "@contracts/services/Auth"

export const loginService = async (params: ILoginUserParams) => {
	const { POST } = useClient()

	const response = await POST<ILoginUserResponse>({
		endpoint: "/auth/sign-in",
		body: params,
	})

	return response
}
