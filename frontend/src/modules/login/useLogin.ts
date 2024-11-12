import { useSubmit } from "@/hooks/useForm"
import { setCookie } from "@/utils/cookies"
import { STORAGES } from "@config/constants"
import { loginService } from "@services/auth"

export const useLogin = () => {
	const submit = useSubmit(async ({ data, reject, resolve }) => {
		try {
			const response = await loginService(data)

			if (!response.ok) {
				return reject(response.messages[0].message)
			}

			await setCookie(STORAGES.TOKEN, response.result.token, 30)

			resolve({
				message: response.message,
				redirect: "/admin",
			})
		} catch (error) {
			return reject("An error occurred while trying to login")
		}
	})

	return {
		submit,
	}
}
