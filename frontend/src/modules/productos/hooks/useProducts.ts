import { useState, useEffect } from "react"
import { useLoader } from "@/contexts/Loader"
import { Pagination, ParamsPaginationFilter } from '@/contracts/API'
import { IProduct } from "@interfaces/Product/Product"
import { getAllProducts } from "@services/product"
import { useDelay } from "@/hooks/useDelay"
import { toast } from "sonner"


export const useProducts = (initialState: Pagination<IProduct>) => {
  const [pagination, setPagination] = useState(initialState)
  const [firstLoad, setFirstLoad] = useState(true)
  const [filters, setFilters] = useState<ParamsPaginationFilter>({})

  const { setLoading } = useLoader()

  useEffect(() => {

    if (firstLoad) {
      setFirstLoad(false)
      return
    }

    const getProducts = async () => {
      setLoading(true)

      await useDelay(500)

      try {
        const response = await getAllProducts(filters)

        if (!response.ok) {
          toast.error("Error al buscar los productos")
          return
        }
  
        setPagination(response.result)
      } catch (error) {
        toast.error("Error al buscar los productos")
      } finally {
        setLoading(false)
      }
    }


    void getProducts()

  }, [filters])


  return {
    pagination, 
    setFilters
  }
}