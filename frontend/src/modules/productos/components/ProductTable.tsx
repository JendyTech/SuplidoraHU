"use client"

import dayjs from 'dayjs'
import CustomTable from '@shared/components/CustomTable'
import { useProducts } from '@modules/productos/hooks/useProducts'
import { Pagination } from "@/contracts/API"
import { IProduct } from "@interfaces/Product/Product"
import { TableColumn } from 'react-data-table-component'
import { Options } from '@shared/components/Elements/Options'
import { useRouter } from 'next/navigation'
import DeleteProductModal from '@shared/components/Modal'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteProduct } from '@services/product'
import { useLoader } from '@/contexts/Loader'


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
                            handler: () => {
                                if (row._id) {
                                    router.push(`productos/editar/${row._id}`);
                                } else {
                                    console.error("El id no está definido.");
                                }
                            }

                        },
                        {
                            type: "button",
                            text: "Eliminar",
                            handler: () => openModal(row)
                        },
                        {
                            type: "button",
                            text: "Ver detalles",
                            handler: () => {
                                if (row._id) {
                                    router.push(`productos/detalle/${row._id}`);
                                } else {
                                    console.error("El id no está definido.");
                                }
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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<IProduct>();


    const openModal = (product: IProduct) => {
        setProductToDelete(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

    };

    const { setLoading } = useLoader()

    const handleDelete = async () => {
        setLoading(true)
        closeModal();
        try {

            if (!productToDelete) {
                console.error("No hay producto seleccionado para eliminar.");
                return;
            }

            const response = await deleteProduct(productToDelete._id);

            if (response.ok) {
                toast.success(`Producto ${productToDelete} eliminado correctamente.`)

                router.refresh();
            } else {
                toast.success(`Error al editar el producto.`);
            }

            setLoading(false)
            setProductToDelete(undefined);
        } catch (error) {
            console.error("Ocurrió un error al intentar eliminar el producto:", error);

            setLoading(false)
        }
    };

    return (
        <>
            <CustomTable
                setFilters={setFilters}
                headers={headers}
                result={pagination}
            />
            <DeleteProductModal
                isOpen={isModalOpen}
                productName={productToDelete?.name}

                onClose={closeModal}
                onConfirm={handleDelete}
            /></>
    )
}
