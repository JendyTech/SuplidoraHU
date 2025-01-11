import { useClient } from "@/hooks/useClient"
import { getToken } from "@/utils/tokenClient"
import { Pagination, ParamsPaginationFilter } from "@contracts/API"
import { CatalogProduct } from "@interfaces/catalog/CatalogProduct"

export const getCatalog = async (params?: ParamsPaginationFilter, server: boolean = false) => {
    const token = await getToken(server)

    const { GET } = useClient(token)

    const query: Record<string, string | number> = {}

    query.max = 20

    if (params?.max) {
        query.max = params.max.toString()
    }

    if (params?.page) {
        query.page = params.page.toString()
    }


    if (params?.search) {
        query.search = params.search
    }

    if (params?.category) {
        query.category = params.category
    }

    if (params?.maxPrice) {
        query.maxPrice = params.maxPrice
    }
    if (params?.minPrice) {
        query.minPrice = params.minPrice
    }

    const response = await GET<Pagination<CatalogProduct>>({
        endpoint: "/catalog",
        query
    })

    
    return response
}