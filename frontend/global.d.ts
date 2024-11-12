import { GLOBAL_TOKEN } from "@config/constants"

declare global {
	interface Window {
		[GLOBAL_TOKEN]: string
	}
}
