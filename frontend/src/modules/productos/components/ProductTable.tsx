"use client"

import dayjs from 'dayjs'
import CustomTable from '@shared/components/CustomTable'
import { useProducts } from '@modules/productos/hooks/useProducts'
import { Pagination } from "@/contracts/API"
import { IProduct } from "@interfaces/Product/Product"
import { TableColumn } from 'react-data-table-component'


interface Props {
    initialState: Pagination<IProduct>
}

export default function ProductTable(props: Props) {
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
