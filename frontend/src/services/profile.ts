import { useClient } from "@/hooks/useClient"
import { getToken } from "@/utils/tokenClient"
import { Profile } from "@interfaces/Profile/profile"

export const getProfileInfo = async () => {
    const token = await getToken()
    const { GET } = useClient(token)

    const response = await GET<Profile>({
        endpoint: '/users/profile',	
    })
    
    return response
}