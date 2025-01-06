import { useClient } from "@/hooks/useClient"
import { ParamsPaginationFilter } from "@contracts/API"
import { getToken } from "@/utils/tokenClient"
import { Pagination } from "@/contracts/API"
import { ICreditNote } from '@interfaces/CreditNote/Creditnote';

export const getAllCreditNotes = async (params?: ParamsPaginationFilter, server: boolean = false) => {
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

    const response = await GET<Pagination<ICreditNote>>({
        endpoint: "/credit-notes",
        query
    })
    
    return response
}

export const addNewCreditNote = async (addCreditNoteData: AddCreditNoteModel) => {
    const token = await getToken()
    const { POST } = useClient(token)

    const response = await POST<Pagination<ICreditNote>>({
        endpoint: "/credit-notes",
        body: addCreditNoteData
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
        const response = await GET<ICreditNote>({
            endpoint: `/credit-notes/${id}`,
            query
        })
        return response
    } catch (error) {
        console.error('Error fetching credit notes:', error)
        throw new Error('Failed to fetch credit notes')
    }
};


