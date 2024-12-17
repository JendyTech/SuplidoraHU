import { useClient } from "@/hooks/useClient"
import { ParamsPaginationFilter } from "@contracts/API"
import { getToken } from "@/utils/tokenClient"
import { Pagination } from "@/contracts/API"
import { IInvoice } from '@interfaces/Invoice/Invoice';

export const getAllInvoices = async (params?: ParamsPaginationFilter, server: boolean = false) => {
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

    const response = await GET<Pagination<IInvoice>>({
        endpoint: "/invoices",
        query
    })

    return response
}

export const addNewInvoice = async (addInvoiceData: AddInvoiceModel) => {
    const token = await getToken()
    const { POST } = useClient(token)

    const response = await POST<Pagination<IInvoice>>({
        endpoint: "/invoices",
        body: addInvoiceData
    })

    return response
}

export const getInvoiceById = async (id: string, includeItems: boolean = true) => {
    const token = await getToken();
    const { GET } = useClient(token);

    const query: Record<string, string> = {}
    if (includeItems) {
        query.items = 'true'
    }

    try {
        const response = await GET<IInvoice>({
            endpoint: `/invoices/${id}`,
            query
        })
        return response
    } catch (error) {
        console.error('Error fetching invoice:', error)
        throw new Error('Failed to fetch invoice')
    }
};


