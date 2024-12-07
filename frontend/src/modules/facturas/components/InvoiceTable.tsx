"use client"

import dayjs from 'dayjs'
import CustomTable from '@shared/components/CustomTable'
import { useInvoices } from '@modules/facturas/hooks/useInvoices'
import { Pagination } from "@/contracts/API"
import { IInvoice } from "@interfaces/Invoice/Invoice"
import { TableColumn } from 'react-data-table-component'
import { Options } from '@shared/components/Elements/Options'
import { toast } from 'sonner'


interface Props {
    initialState: Pagination<IInvoice>
}

export default function ProductTable(props: Props) {
    const {
        initialState
    } = props

    const headers: TableColumn<IInvoice>[] = [
        { name: "Cliente", selector: (row) => row.clientName },
        { name: "Forma de Pago", selector: (row) => row.paymentCondition },
        { name: "Suplidor", selector: (row) => row.supplierName },
        { name: "Fecha de Vencimiento", selector: (row) => dayjs(row.expirationDate).format("DD [de] MMMM YYYY") },
        {
            name: "Fecha de Creación",
            selector: (row) => dayjs(row.createdAt).format("DD [de] MMMM YYYY"),
        },
        {
            name: "", cell: (row) => <div style={{ width: "100%", }}>
                <Options
                    data={{ id: 1 }}
                    options={[
                        {
                            type: "button",
                            text: "Editar",
                            handler: () => alert('Hola mundo')
                        },
                        {
                            type: "button",
                            text: "Eliminar",
                            handler: () => toast('Event has been created', {
                                action: {
                                    label: 'No',

                                    onClick: () => console.log('Undo')
                                }, cancel: {
                                    label: "Si,Eliminar",
                                    onClick: () => { }
                                }
                            },)
                        },
                        {
                            type: "button",
                            text: "Ver detalles",
                            handler: () => alert('Hola mundo')
                        }
                    ]}
                />
            </div>, maxWidth: "10px"
        },

    ];

    const {
        pagination,
        setFilters
    } = useInvoices(initialState);

    return (
        <CustomTable
            setFilters={setFilters}
            headers={headers}
            result={pagination}
        />
    )
}
