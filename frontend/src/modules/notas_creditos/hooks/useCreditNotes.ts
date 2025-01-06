import { useState, useEffect } from "react"
import { useLoader } from "@/contexts/Loader"
import { Pagination, ParamsPaginationFilter } from '@/contracts/API'
import { ICreditNote } from '@interfaces/CreditNote/Creditnote';
import { getAllCreditNotes } from "@services/creditnote"
import { useDelay } from "@/hooks/useDelay"
import { toast } from "sonner"


export const useCreditNotes = (initialState: Pagination<ICreditNote>) => {
    const [pagination, setPagination] = useState(initialState)
    const [firstLoad, setFirstLoad] = useState(true)
    const [filters, setFilters] = useState<ParamsPaginationFilter>({})

    const { setLoading } = useLoader()

    useEffect(() => {

        if (firstLoad) {
            setFirstLoad(false)
            return
        }

        const getCreditNotes = async () => {
            setLoading(true)

            await useDelay(500)

            try {
                const response = await getAllCreditNotes(filters)

                if (!response.ok) {
                    toast.error("Error al buscar las notas de credito")
                    return
                }

                setPagination(response.result)
            } catch (error) {
                toast.error("Error al buscar las notas de credito")
            } finally {
                setLoading(false)
            }
        }


        void getCreditNotes()

    }, [filters])


    return {
        pagination,
        setFilters
    }
}