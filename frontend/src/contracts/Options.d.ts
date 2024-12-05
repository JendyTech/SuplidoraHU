import { Icon123 } from "@tabler/icons-react"

interface IOptionsBase {
	text: string
	icon?: typeof Icon123
}

interface IOptionsButton<T> extends IOptionsBase {
	type: "button"
	handler: (data: T) => void
}

interface IOptionsLink extends IOptionsBase {
	type: "link"
	href: string
	newTab?: boolean
}

export type IOptions<T> = IOptionsButton<T> | IOptionsLink
