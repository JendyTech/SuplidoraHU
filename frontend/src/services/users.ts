import { useClient } from "@/hooks/useClient";
import { readTokenServer } from "@/utils/session";
import { getToken } from "@/utils/tokenClient";
import { Pagination, ParamsPaginationFilter } from "@contracts/API";
import { GetUser } from "@interfaces/User/GetUser";
import { UpdateUser } from "@interfaces/User/UpdateUser";
import { IUser } from "@interfaces/User/User";

export const getAllUsers = async (params?: ParamsPaginationFilter, server: boolean = false) => {
    const token = await getToken(server)
    const { GET } = useClient(token)

    const query : Record<string ,string> = {}

    if (params?.max) {
		query.max = params.max.toString()
	}

	if (params?.page) {
		query.page = params.page.toString()
	}


	if (params?.search) {
		query.search = params.search
	}

    const response = await GET<Pagination<IUser>>({
        endpoint : "/users",
        query
    })

    return response
}

export const addNewUser = async ( addUserData : AddUserModel ) => {
	const token = await getToken()
	const { POST } = useClient(token)

	const response = await POST({
		endpoint: "/users",
		body : addUserData
	})
    
	return response
}

export const getUserById = async (id: string, server: boolean = false) => {
	const token = await getToken(server)
	const { GET } = useClient(token)

	const response = await GET<GetUser>({
		endpoint: `/users/${id}`,	
	})
	
	return response
}

export const updateUser = async (id: string, updateUserData : UpdateUser) => {
	const token = await getToken()
	const { PATCH } = useClient(token)

	const response = await PATCH<IUser>({
		endpoint: `/users/${id}`,
		body : updateUserData
	})
	
	return response
}

export const deleteUser = async (id: string) => {
	const token = await getToken()
	const { DELETE } = useClient(token)

	const response = await DELETE<IUser>({
		endpoint: `/users/${id}`
	})

	return response
}

