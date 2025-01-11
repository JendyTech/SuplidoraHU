import { useState, useEffect } from "react"
import { useLoader } from "@/contexts/Loader"
import { Pagination, ParamsPaginationFilter } from '@/contracts/API'
import { IInvoice } from '@interfaces/Invoice/Invoice';
import { getAllInvoices } from "@services/invoice"
import { useDelay } from "@/hooks/useDelay"
import { toast } from "sonner"


export const useInvoices = (initialState: Pagination<IInvoice>) => {
    const [pagination, setPagination] = useState(initialState)
    const [firstLoad, setFirstLoad] = useState(true)
    const [filters, setFilters] = useState<ParamsPaginationFilter>({})

    const { setLoading } = useLoader()

    useEffect(() => {

        if (firstLoad) {
            setFirstLoad(false)
            return
        }

        const getInvoices = async () => {
            setLoading(true)
            console.log("hola MaMi")
            // await useDelay(500)

            try {
                const response = await getAllInvoices(filters)

                if (!response.ok) {
                    toast.error("Error al buscar las facturas")
                    return
                }

                setPagination(response.result)
            } catch (error) {
                toast.error("Error al buscar las facturas")
            } finally {
                setLoading(false)
            }
        }


        void getInvoices()

    }, [filters])


    return {
        pagination,
        setFilters
    }
}