"use client";
import DataTable from "react-data-table-component";
import { Pagination, ParamsPaginationFilterOptions } from "@/contracts/API"
import { Dispatch, SetStateAction } from "react";
import { TableColumn, TableStyles } from "react-data-table-component";
import styles from '@modules/productos/styles/productos.module.css'


interface Props<T> {
    result?: Pagination<any>;
    setFilters: Dispatch<SetStateAction<Partial<ParamsPaginationFilterOptions>>>;
    headers: TableColumn<any>[];
    children?: React.ReactNode;
    noDataComponent?: React.ReactNode;
    customStyles?: TableStyles;
    paginationEnabled?: boolean; 
}

export default function CustomTable<T = any>(props: Props<any>) {
    const {
        result: pagination = {
            data: [],
            metadata: {
                max: 10,
                page: 1,
                total: 0,
                next: false,
                previous: false,
                totalPages: 0
            }
        },
        setFilters,
        headers,
        customStyles,
        paginationEnabled = true, 
    } = props;

    const handleChangePage = (newPage: number) => {
        setFilters({
            page: newPage
        });
    };

    const handleChangeMax = (newMax: number) => {
        setFilters({
            page: 1,
            max: newMax
        });
    };

    const defaultStyles: TableStyles = {
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
        <div className={styles.tableContainer}>
            {props.children}
            <DataTable
                paginationServer={paginationEnabled}
                selectableRows
                noHeader
                pagination={paginationEnabled}
                columns={headers}
                data={pagination.data}
                customStyles={customStyles || defaultStyles} 
                paginationRowsPerPageOptions={[5, 8, 10]}
                paginationPerPage={pagination.metadata.max}
                paginationTotalRows={pagination.metadata.total}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeMax}
                noDataComponent={props.noDataComponent}
            />
        </div>
    );
}
