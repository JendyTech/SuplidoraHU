"use client"

import dayjs from 'dayjs'
import CustomTable from '@shared/components/CustomTable'
import { useProducts } from '@modules/productos/hooks/useProducts'
import { Pagination } from "@/contracts/API"
import { IProduct } from "@interfaces/Product/Product"
import { TableColumn } from 'react-data-table-component'
import { Options } from '@shared/components/Elements/Options'
import { useRouter } from 'next/navigation'


interface Props {
    initialState: Pagination<IProduct>
}

export default function ProductTable(props: Props) {

    const router = useRouter();

    const {
        initialState
    } = props

    const headers: TableColumn<IProduct>[] = [
        { name: "Nombre", selector: (row) => row.name },
        { name: "Código", selector: (row) => row.code },
        { name: "Descripción", selector: (row) => row.description },
        { name: "Unidades por Paquete", selector: (row) => row.unitsPerPack },
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
                            handler: () => alert('Hola mundo')
                        },
                        {
                            type: "button",
                            text: "Ver detalles",
                            handler: () => {
                                router.push(`productos/${row._id}`)
                            }

                        }
                    ]}
                />
            </div>, maxWidth: "10px"
        },

    ];

    const {
        pagination,
        setFilters
    } = useProducts(initialState);

    return (
        <CustomTable
            setFilters={setFilters}
            headers={headers}
            result={pagination}
        />
    )
}
