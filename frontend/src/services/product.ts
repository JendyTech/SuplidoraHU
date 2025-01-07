import { useClient } from "@/hooks/useClient"
import { ParamsPaginationFilter } from "@contracts/API"
import { getToken } from "@/utils/tokenClient"
import { Pagination } from "@/contracts/API"
import { IProduct } from "@interfaces/Product/Product"
import { GetProduct } from "@interfaces/Product/GetProduct"
import { Update } from "vite"
import { UpdateProduct } from "@interfaces/Product/UpdateProduct"

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


export const addNewProduct = async ( addProductData : AddProductModel ) => {
	const token = await getToken()
	const { POST } = useClient(token)

	const response = await POST<Pagination<IProduct>>({
		endpoint: "/products",
		body : addProductData
	})

	console.log(addProductData)
	console.log(response)
    
	return response
}

export const getProductById = async (id: string, server: boolean = false) => {
	const token = await getToken(server)
	const { GET } = useClient(token)

	console.log(id)
	const response = await GET<GetProduct>({
		endpoint: `/products/${id}?images=true`,	
	})
    
	return response
}

export const updateProduct = async (id: string, updateProductData : UpdateProduct) => {
	const token = await getToken()
	const { PATCH } = useClient(token)

	const response = await PATCH<IProduct>({
		endpoint: `/products/${id}`,
		body : updateProductData
	})

	console.log(response)
    
	return response
}

export const deleteProduct = async (id: string) => {
	const token = await getToken()
	const { DELETE } = useClient(token)

	const response = await DELETE<IProduct>({
		endpoint: `/products/${id}`
	})

	return response
}

export const getAllCategories = async () => {
	const token = await getToken()
	const { GET } = useClient(token)

	const response = await GET<Pagination<Category>>({
		endpoint: `/category`
	})

	return response
}

export const getCategoryNameById = async (id: string) => {
	
	const { GET } = useClient()

	const response = await GET<Category>({
		endpoint: `/category/${id}`,	
	})
    
	return response
}
