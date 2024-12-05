import { useClient } from "@/hooks/useClient";
import { readTokenServer } from "@/utils/session";
import { getToken } from "@/utils/tokenClient";
import { Pagination, ParamsPaginationFilter } from "@contracts/API";
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