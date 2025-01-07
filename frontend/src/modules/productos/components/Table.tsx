"use client";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import { GetProduct } from "@interfaces/Product/GetProduct";
import { Pagination, ParamsPaginationFilterOptions } from "@/contracts/API"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { TableColumn, TableStyles } from "react-data-table-component";
import { useProducts } from "@/modules/productos/hooks/useProducts"

interface Props<T> {
    result: Pagination<any>
    setFilters: Dispatch<SetStateAction<Partial<ParamsPaginationFilterOptions>>>
    headers: TableColumn<any>
}


export default function Table<T = any>(props: Props<any>) {
    const {
        result,
        setFilters: _setFilters
    } = props

    const { pagination, setFilters } = useProducts(result)

    const headers: TableColumn<any>[] = [
        { name: "Nombre", selector: (row) => row.name },
        { name: "Código", selector: (row) => row.code },
        { name: "Descripción", selector: (row) => row.description },
        { name: "Unidades por Paquete", selector: (row) => row.unitsPerPack },
        {
            name: "Fecha de Creación",
            selector: (row) => dayjs(row.createdAt).format("DD/MM/YYYY"),
        },
    ];


    const handleChangePage = (newPage: number) => {
        setFilters({
            page: newPage
        })
    }

    const handleChangeMax = (newMax: number) => {
        setFilters({
            page: 1,
            max: newMax
        })
    }

    const customStyles: TableStyles = {
        header: {
            style: {
                minHeight: '56px',
                backgroundColor: '#f8f9fa',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#d1d5db',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1px',
                borderLeftColor: '#d1d5db',
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: '#d1d5db',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                backgroundColor: '#287881',
            },
        },
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
            },
        },
        rows: {
            style: {
                minHeight: '48px',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: '#d1d5db',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1px',
                borderLeftColor: '#d1d5db',
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: '#d1d5db',
                backgroundColor: '#ffffff',
                '&:hover': {
                    backgroundColor: '#f3f4f6',
                },
            },
        },
        pagination: {
            style: {
                borderTop: 'none',
                backgroundColor: '#f8f9fa',
                padding: '8px',
            },
        },
    };



    return (
        <div>
            <DataTable
                paginationServer
                selectableRows
                noHeader
                pagination
                columns={headers}
                data={pagination.data}
                customStyles={customStyles}
                paginationRowsPerPageOptions={[5, 8, 10]}
                paginationPerPage={pagination.metadata.max}
                paginationTotalRows={pagination.metadata.total}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeMax}
            />
        </div>
    );
}
