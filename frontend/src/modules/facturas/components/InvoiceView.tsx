import { Tailwind } from "@fileforge/react-print";
import React from "react";

function InvoiceView() {
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
                <div className='flex flex-col items-center justify-center w-full mt-22'>
                    <div className='w-full'>
                        <div className='flex items-end justify-between w-full'>
                            <div className='object-contain'>
                                <img src="/logo.png" alt='Logo' />
                            </div>
                            <div className='pb-5 text-xl'>
                                <h1 className='text-green-600 font-semibold'>FACTURA PARA CREDITO FISCAL</h1>
                            </div>
                        </div>

                        <div className='px-5'>
                            <h2 className='text-xl font-semibold mb-7'>SUPLIDORA HERNANDEZ URENA S,R,L</h2>

                            <div className='grid grid-cols-2'>
                                <div>
                                    <p className='text-md'><b>RNC:</b> [RNC]</p>
                                    <p className='text-md'><b>TELEFONO:</b> [TELEFONO]</p>
                                    <p className='text-md'><b>DIRECCION:</b> [DIRECCION]</p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-md'><b>NCF:</b> [NCF]</p>
                                    <p className='text-md'><b>FECHA:</b> [FECHA]</p>
                                    <p className='text-md'><b>VENCIMIENTO:</b> [VENCIMIENTO]</p>
                                </div>
                            </div>

                            <div>
                                <h2 className='text-green-600 text-xl font-semibold mt-7'>INFORMACION DE CLIENTE</h2>

                                <div className='grid grid-cols-2'>
                                    <div>
                                        <p className='text-md'><b>RAMPORT</b></p>
                                        <p className='text-md'><b>RNC:</b> [RNC]</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-md'><b>CONDICIONES:</b> [PAGO]</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-center mt-8'>
                                <table className='w-full table-auto'>
                                    <thead className='bg-gray-100'>
                                        <tr className='text-black'>
                                            <th className='px-6 py-3 text-left font-semibold'>CANTIDAD</th>
                                            <th className='px-6 py-3 text-left font-semibold'>DESCRIPCION</th>
                                            <th className='px-6 py-3 text-right font-semibold'>PRECIO</th>
                                            <th className='px-6 py-3 text-right font-semibold'>IMPORTE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-b hover:bg-gray-50'>
                                            <td className='px-6 py-4 text-center'>1</td>
                                            <td className='px-6 py-4'>[DESCRIPCION]</td>
                                            <td className='px-6 py-4 text-right'>[PRECIO]</td>
                                            <td className='px-6 py-4 text-right'>[IMPORTE]</td>
                                        </tr>
                                        <tr className='border-b hover:bg-gray-50'>
                                            <td className='px-6 py-4 text-center'>1</td>
                                            <td className='px-6 py-4'>[DESCRIPCION]</td>
                                            <td className='px-6 py-4 text-right'>[PRECIO]</td>
                                            <td className='px-6 py-4 text-right'>[IMPORTE]</td>
                                        </tr>
                                        <tr className='border-b hover:bg-gray-50'>
                                            <td className='px-6 py-4 text-center'>1</td>
                                            <td className='px-6 py-4'>[DESCRIPCION]</td>
                                            <td className='px-6 py-4 text-right'>[PRECIO]</td>
                                            <td className='px-6 py-4 text-right'>[IMPORTE]</td>
                                        </tr>
                                        <tr className='font-bold'>
                                            <td></td>
                                            <td></td>
                                            <td className='text-center'>Subtotal</td>
                                            <td className='text-right py-4'>[SUBTOTAL]</td>
                                        </tr>
                                        <tr className='font-bold'>
                                            <td></td>
                                            <td></td>
                                            <td className='text-center'>ITBIS 18.00%</td>
                                            <td className='text-right py-4'>[IMPUESTO]</td>
                                        </tr>
                                        <tr className='font-bold'>
                                            <td></td>
                                            <td></td>
                                            <td className='text-center'>TOTAL</td>
                                            <td className='text-right py-4'>[TOTAL]</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>



                            <div className='flex flex-col gap-32 mt-32'>
                                <p className='text-lg'>Entregado por: __________________________________________</p>
                                <p className='text-lg'>Recibido por: __________________________________________</p>
                            </div>

                            <div className='text-center'>
                                <p className='mt-16 mb-16 text-xl font-medium text-gray-400'>Gracias por su compra</p>
                                <p className='text-md font-medium text-black mb-8'>Garantía para articulos grandes tales como neveras, lavadoras, estufas corresponde a 30 dias habiles . La misma solo aplica para defectos de fabrica (escapes, roturas) </p>
                                <p className='text-md font-medium text-black mb-8'>Garantia para articulos pequeños corresponde a 15 dias habiles. Los audifonos (todos los modelos ) cuentan con una garantia de 24 a 48 horas. No se aceptan devoluciones de mercancía sucia, alterada, dañada, y/o en oferta.</p>

                                <p className='text-md font-medium text-black mb-8'> Para mayor informacion sobre las garantias, por favor ponerse en contacto con nosotros a traves de los diferentes medios de contacto.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Tailwind>
    );
}

export default InvoiceView;
