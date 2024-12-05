import { useState, useEffect } from "react"
import { useLoader } from "@/contexts/Loader"
import { Pagination, ParamsPaginationFilter } from '@/contracts/API'
import { useDelay } from "@/hooks/useDelay"
import { toast } from "sonner"
import { IUser } from "@interfaces/User/User"
import { getAllUsers } from "@services/users"


export const useUsers = (initialState: Pagination<IUser>) => {
  const [pagination, setPagination] = useState(initialState)
  const [firstLoad, setFirstLoad] = useState(true)
  const [filters, setFilters] = useState<ParamsPaginationFilter>({})

  const { setLoading } = useLoader()

  useEffect(() => {

    if (firstLoad) {
      setFirstLoad(false)
      return
    }

    const getUsers = async () => {
      setLoading(true)

      await useDelay(500)

      try {
        const response = await getAllUsers(filters)

        if (!response.ok) {
          toast.error("Error al buscar los usuarios")
          return
        }
  
        setPagination(response.result)
      } catch (error) {
        toast.error("Error al buscar los usuarios")
      } finally {
        setLoading(false)
      }
    }


    void getUsers()

  }, [filters])


  return {
    pagination, 
    setFilters
  }
}