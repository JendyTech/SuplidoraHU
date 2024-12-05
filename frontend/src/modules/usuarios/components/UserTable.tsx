"use client"

import dayjs from 'dayjs'
import CustomTable from '@shared/components/CustomTable'
import { Pagination } from "@/contracts/API"
import { TableColumn } from 'react-data-table-component'
import { IUser } from '@interfaces/User/User'
import { useUsers } from '@modules/usuarios/hooks/useUsers'


interface Props {
    initialState: Pagination<IUser>
}

export default function UsersTable(props: Props) {
    const {
        initialState
    } = props

    const headers: TableColumn<IUser>[] = [
        { name: "Nombre", selector: (row) => `${row.firstName} ${row.lastName}` },
        { name: "Correo", selector: (row) => row.email },
        { name: "Estado", cell: (row) => <div style={{ width: 30, height: 30, color: row.active ? "#FF0000" : "#77DD77" }}>  </div>, },

        {
            name: "Fecha de Creación",
            selector: (row) => dayjs(row.createdAt).format("DD [de] MMMM YYYY"),
        },
    ];

    const {
        pagination,
        setFilters
    } = useUsers(initialState);

    return (
        <CustomTable
            setFilters={setFilters}
            headers={headers}
            result={pagination}
        />
    )
}
