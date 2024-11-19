"use client";

import dayjs from "dayjs";
import React from "react";
import DataTable, { TableColumn, TableStyles } from "react-data-table-component";

interface Product {
    _id: string;
    name: string;
    price: number;
    code: string;
    description: string;
    unitsPerPack: number;
    createdAt: string;
}

export default function Table() {
    const headers: TableColumn<Product>[] = [
        { name: "Nombre", selector: (row) => row.name },
        { name: "Código", selector: (row) => row.code },
        { name: "Descripción", selector: (row) => row.description },
        { name: "Unidades por Paquete", selector: (row) => row.unitsPerPack },
        {
            name: "Fecha de Creación",
            selector: (row) => dayjs(row.createdAt).format("DD [de] MMMM YYYY"),
        },
    ];
    const data = [
        {
            _id: "67340d23e7f9d06796ad5341",
            name: "Producto 3",
            price: 1,
            code: "Código del producto 3",
            description: "Descripción del producto 3",
            unitsPerPack: 1,
            createdAt: "2024-11-13T02:21:23.067Z",
        },
        {
            _id: "6734097cc6ec778218537d0e",
            name: "Producto 5",
            price: 10,
            code: "fdsfsdfd",
            description: "keloke mi bro",
            unitsPerPack: 50,
            createdAt: "2024-11-13T02:05:48.660Z",
        },
        {
            _id: "6732c535bb46b83fd9b57d95",
            name: "Producto 1",
            price: 1,
            code: "Código del producto",
            description: "Descripción del producto",
            unitsPerPack: 10,
            createdAt: "2024-11-12T03:02:13.052Z",
        },
        {
            _id: "6732d6a2bb46b83fd9b57e11",
            name: "Producto 2",
            price: 15,
            code: "Código del producto 2",
            description: "Descripción del producto 2",
            unitsPerPack: 5,
            createdAt: "2024-11-12T04:12:13.052Z",
        },
        {
            _id: "67340e23c6ec778218538a1f",
            name: "Producto 6",
            price: 30,
            code: "Código 6",
            description: "Producto premium",
            unitsPerPack: 20,
            createdAt: "2024-11-13T05:15:45.321Z",
        },
        {
            _id: "6734aa12f7f9d06796ad1112",
            name: "Producto 7",
            price: 7,
            code: "Código 7",
            description: "Descripción 7",
            unitsPerPack: 15,
            createdAt: "2024-11-14T01:12:34.671Z",
        },
        {
            _id: "6734bb45bb46b83fd9b57e99",
            name: "Producto 8",
            price: 25,
            code: "Código 8",
            description: "Descripción 8",
            unitsPerPack: 30,
            createdAt: "2024-11-15T02:45:12.401Z",
        },
        {
            _id: "6734cc67e7f9d06796ad5400",
            name: "Producto 9",
            price: 5,
            code: "Código 9",
            description: "Descripción 9",
            unitsPerPack: 50,
            createdAt: "2024-11-16T03:30:10.123Z",
        },
        {
            _id: "6734dd78c6ec778218538a55",
            name: "Producto 10",
            price: 12,
            code: "Código 10",
            description: "Producto destacado",
            unitsPerPack: 10,
            createdAt: "2024-11-16T04:05:22.784Z",
        },
        {
            _id: "6734ee89f7f9d06796ad5422",
            name: "Producto 11",
            price: 18,
            code: "Código 11",
            description: "Descripción 11",
            unitsPerPack: 40,
            createdAt: "2024-11-16T06:12:45.991Z",
        },
        {
            _id: "6734ff01c6ec778218538b77",
            name: "Producto 12",
            price: 20,
            code: "Código 12",
            description: "Descripción premium",
            unitsPerPack: 25,
            createdAt: "2024-11-17T08:15:34.008Z",
        },
        {
            _id: "67350112e7f9d06796ad5555",
            name: "Producto 4",
            price: 8,
            code: "Código del producto 4",
            description: "Descripción del producto 4",
            unitsPerPack: 8,
            createdAt: "2024-11-14T03:21:23.067Z",
        },
    ];

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
                columns={headers}
                data={data}
                customStyles={customStyles}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 8, 10]}
                selectableRows
                noHeader
            />
        </div>
    );
}
