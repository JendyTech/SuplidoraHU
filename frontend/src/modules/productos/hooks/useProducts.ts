import { useState, useEffect } from "react"
import { useLoader } from "@/contexts/Loader"
import { Pagination, ParamsPaginationFilter } from '@/contracts/API'
import { IProduct } from "@interfaces/Product/Product"
import { getAllProducts } from "@services/product"
import { toast } from "sonner"

export const useProducts = (initialState: Pagination<IProduct>) => {
  const [pagination, setPagination] = useState(initialState)
  const [firstLoad, setFirstLoad] = useState(true)
  const [filters, setFilters] = useState<ParamsPaginationFilter>({})

  const [refresh, setRefresh] = useState<boolean>(false)

  const { setLoading } = useLoader()
  console.log("hola papi")
  useEffect(() => {
    
    if (firstLoad) {

      setFirstLoad(false)
      return
    }


    const getProducts = async () => {

      // if (!refresh) {
      //   return
      // }
      setLoading(true)
   

      // await useDelay(500)


      try {
      console.log(filters)
        
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

        if (refresh) {
          setRefresh(false)
        }
      }
    }

    void getProducts()

  }, [filters, refresh])

  const reload = () => {
    setRefresh(true)
  }


  return {
    pagination, 
    setFilters,
    reload
  }
}