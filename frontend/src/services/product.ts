import { useClient } from "@/hooks/useClient"
import { ParamsPaginationFilter } from "@contracts/API"
import { getToken } from "@/utils/tokenClient"
import { Pagination } from "@/contracts/API"
import { IProduct } from "@interfaces/Product/Product"

export const getAllProducts = async (params?: ParamsPaginationFilter, server: boolean = false) => {
	const token = await getToken(server)


	const { GET } = useClient(token)

	const query: Record<string, string> = {}

	if (params?.max) {
		query.max = params.max.toString()
	}

	if (params?.page) {
		query.page = params.page.toString()
	}


	if (params?.search) {
		query.search = params.search
	}

	const response = await GET<Pagination<IProduct>>({
		endpoint: "/products",
		query
	})
    
	return response
}
