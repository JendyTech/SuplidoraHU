import dayjs from "dayjs";
import React from "react";
import { Tailwind } from "@fileforge/react-print";
import { IInvoice } from "@interfaces/Invoice/Invoice";

const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

interface Props {
    invoice: IInvoice;
}

function InvoiceView({ invoice }: Props) {
    const subtotal =
        invoice.items?.reduce((acc, item) => acc + item.total, 0) || 0;
    const itbis = subtotal * 0.18;
    const total = subtotal + itbis;

    return (
        <Tailwind>
            <style>
                {`
                    @page {
                        size: A3;
                        margin: 20mm;
                    }
                    .invoice-container {
                        width: 100%;
                        max-width: 1400px;
                        margin: 0 auto;
                    }
                `}
            </style>
            <div className="invoice-container">
                <div className="flex flex-col items-center justify-center w-full mt-22">
                    <div className="w-full">
                        <div className="flex items-end justify-between w-full">
                            <div className="object-contain">
                                <img src="/logo.png" alt="Logo" />
                            </div>
                            <div className="pb-5 text-xl">
                                <h1 className="text-green-600 font-semibold">
                                    FACTURA PARA CREDITO FISCAL
                                </h1>
                            </div>
                        </div>

                        <div className="px-5">
                            <h2 className="text-xl font-semibold mb-7">
                                SUPLIDORA HERNANDEZ URENA S,R,L
                            </h2>
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-md">
                                        <b>RNC:</b> 132-38173-4
                                    </p>
                                    <p className="text-md">
                                        <b>FECHA:</b>{" "}
                                        {dayjs(invoice.createdAt).format("DD/MM/YYYY")}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-md">
                                        <b>NCF:</b> {invoice.ncfNumber}
                                    </p>
                                    <p className="text-md">
                                        <b>VENCIMIENTO:</b>{" "}
                                        {dayjs(invoice.expirationDate).format("DD/MM/YYYY")}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-green-600 text-xl font-semibold mt-7">
                                    INFORMACION DE CLIENTE
                                </h2>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <p className="text-md">
                                            <b>{invoice.clientName}</b>
                                        </p>
                                        <p className="text-md font-bold">
                                            RNC: {invoice.clientRnc}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-md">
                                            <b>CONDICIONES:</b> {invoice.paymentCondition}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center mt-8">
                                {invoice.items && invoice.items.length > 0 ? (
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="text-white bg-[#4a9e74]">
                                                <th className="px-6 py-2 text-left font-semibold">
                                                    CANTIDAD
                                                </th>
                                                <th className="px-6 py-2 text-left font-semibold">
                                                    DESCRIPCION
                                                </th>
                                                <th className="px-6 py-2 text-right font-semibold">
                                                    PRECIO POR UNIDAD
                                                </th>
                                                <th className="px-6 py-2 text-right font-semibold">
                                                    IMPORTE
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.items.map((item, index) => {
                                                const backgroundColor =
                                                    index % 2 === 0 ? "bg-[#cafcd1]" : "bg-[#7ed88c]";
                                                return (
                                                    <tr key={item._id} className={`border-b ${backgroundColor}`}>
                                                        <td className="px-6 py-2 text-center">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="px-6 py-2">{item.description}</td>
                                                        <td className="px-6 py-2 text-right">
                                                            {formatCurrency(item.unitPrice)}
                                                        </td>
                                                        <td className="px-6 py-2 text-right font-bold">
                                                            {formatCurrency(item.total)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td className="text-center font-bold">Subtotal</td>
                                                <td className="text-right text-black py-2 bg-[#4a9e74]">
                                                    {formatCurrency(subtotal)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td className="text-center font-bold">ITBIS 18.00%</td>
                                                <td className="text-right py-2">{formatCurrency(itbis)}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td className="text-center font-bold">TOTAL</td>
                                                <td className="text-right text-white py-2 bg-[#4a9e74] font-semibold">
                                                    {formatCurrency(total)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>No hay ítems disponibles para mostrar.</div>
                                )}
                            </div>

                            <div className="flex flex-col gap-32 mt-32">
                                <p className="text-lg">
                                    Entregado por: __________________________________________
                                </p>
                                <p className="text-lg">
                                    Recibido por: __________________________________________
                                </p>
                            </div>

                            <div className="text-center">
                                <p className="mt-16 mb-16 text-xl font-medium text-gray-400">
                                    Gracias por su compra
                                </p>
                                <p className="text-md font-medium text-black mb-8">
                                    Garantía para articulos grandes tales como neveras, lavadoras,
                                    estufas corresponde a 30 dias habiles . La misma solo aplica
                                    para defectos de fabrica (escapes, roturas)
                                </p>
                                <p className="text-md font-medium text-black mb-8">
                                    Garantía para articulos pequeños corresponde a 15 dias
                                    habiles. Los audífonos (todos los modelos ) cuentan con una
                                    garantía de 24 a 48 horas. No se aceptan devoluciones de
                                    mercancía sucia, alterada, dañada, y/o en oferta.
                                </p>
                                <p className="text-md font-medium text-black mb-8">
                                    Para mayor información sobre las garantías, por favor ponerse
                                    en contacto con nosotros a través de los diferentes medios de
                                    contacto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Tailwind>
    );
}

export default InvoiceView;
