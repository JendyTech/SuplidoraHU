export const useShortFormatName = (name: string) => {
	const [firtName, lastName] = name.split(" ")

	const nameFormat = `${firtName} ${lastName ?? ""}`

	if (nameFormat.length > 30) {
		return `${nameFormat.slice(0, 30)}...`
	}

	return nameFormat
}
