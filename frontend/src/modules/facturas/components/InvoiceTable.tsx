"use client"

import dayjs from 'dayjs'
import CustomTable from '@shared/components/CustomTable'
import CustomButton from "@shared/components/Buttons/CustomButton";
import InvoiceView from "@modules/facturas/components/InvoiceView";
import usePrintContent from "@modules/facturas/hooks/usePrintContent";
import { useInvoices } from '@modules/facturas/hooks/useInvoices'
import { Pagination } from "@/contracts/API"
import { IInvoice } from "@interfaces/Invoice/Invoice"
import { TableColumn } from 'react-data-table-component'
import { getInvoiceById } from '@services/invoice';
import { toast } from 'sonner';

interface Props {
    initialState: Pagination<IInvoice>
}

export default function InvoiceTable(props: Props) {
    const {
        initialState
    } = props

    const printContent = usePrintContent();


    const handleViewReceipt = async (invoice: IInvoice) => {
        try {
            const response = await getInvoiceById(invoice._id, true)
            if (response.ok && response.result) {
                printContent(<InvoiceView invoice={response.result} />, "Factura");
            } else {
                toast.error("No se pudo cargar la factura con los ítems")
            }
        } catch (error) {
            toast.error("Error al buscar la factura")
        }
    };

    const headers: TableColumn<IInvoice>[] = [
        { name: "Cliente", selector: (row) => row.clientName },
        { name: "Forma de Pago", selector: (row) => row.paymentCondition },
        { name: "Suplidor", selector: (row) => row.supplierName },
        { name: "Fecha de Vencimiento", selector: (row) => dayjs(row.expirationDate).format("DD/MM/YYYY") },
        {
            name: "Fecha de Creación",
            selector: (row) => dayjs(row.createdAt).format("DD/MM/YYYY"),
        },
        {
            name: 'Acción',
            cell: row => (
                <CustomButton
                    onClick={() => handleViewReceipt(row)}
                    text="ver PDF"
                    buttonType="submit"
                    styles={{ padding: "10px 10px", fontSize: "14px", textAlign: "center" }}

                />
            ),
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
