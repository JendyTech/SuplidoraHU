"use client"

import dayjs from 'dayjs'
import CustomTable from '@shared/components/CustomTable'
import { Pagination } from "@/contracts/API"
import { TableColumn } from 'react-data-table-component'
import { IUser } from '@interfaces/User/User'
import { useUsers } from '@modules/usuarios/hooks/useUsers'
import { Options } from '@shared/components/Elements/Options'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLoader } from '@/contexts/Loader'
import { deleteUser } from '@services/users'
import { toast } from 'sonner'
import DeleteProductModal from '@shared/components/Modal'
import CustomButton from '@shared/components/Buttons/CustomButton'
import styles from '@modules/productos/styles/productos.module.css'

interface Props {
    initialState: Pagination<IUser>
}

export default function UsersTable(props: Props) {
    const router = useRouter();

    const {
        initialState
    } = props

    const headers: TableColumn<IUser>[] = [
        { name: "Nombre", selector: (row) => `${row.firstName} ${row.lastName}` },
        { name: "Correo", selector: (row) => row.email },


        {
            name: "Fecha de Creación",
            selector: (row) => dayjs(row.createdAt).format("DD/MM/YYYY"),
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
                                    router.push(`usuarios/editar/${row._id}`);
                                } else {
                                    console.error("El id no está definido.");
                                }
                            }

                        },
                        {
                            type: "button",
                            text: "Ver detalles",
                            handler: () => {
                                if (row._id) {
                                    router.push(`usuarios/detalle/${row._id}`);
                                } else {
                                    console.error("El id no está definido.");
                                }
                            }

                        },
                        {
                            type: "button",
                            text: "Eliminar",
                            handler: () => openModal(row)
                        }
                    ]}
                />
            </div>, maxWidth: "10px"
        },
    ];

    const {
        pagination,
        setFilters
    } = useUsers(initialState);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<IUser>();


    const openModal = (user: IUser) => {
        setUserToDelete(user);
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

            if (!userToDelete) {
                console.error("No hay usuario seleccionado para eliminar.");
                return;
            }

            const response = await deleteUser(userToDelete._id);

            if (response.ok) {
                toast.success(`Usuario eliminado correctamente.`)

                router.refresh();
            } else {
                toast.error(`Error al eliminar el usuario.`);
            }

            setLoading(false)
            setUserToDelete(undefined);
        } catch (error) {
            console.error("Ocurrió un error al intentar eliminar el producto:", error);

            setLoading(false)
        }
    };
    const [search, setSearch] = useState<string>("")
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <CustomTable
                setFilters={setFilters}
                headers={headers}
                result={pagination}
            ><div>

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                        <input type="text" className={styles.searchBar} placeholder="Buscar por nombre" onChange={handleChangeSearch} />

                        <div style={{ width: "170px" }}>
                            <CustomButton text="Buscar" style="filled" buttonType="button" onClick={() => {
                                console.log(search)
                                setFilters({
                                    page: 1,
                                    max: 10,
                                    search: search
                                })
                            }} />
                        </div>
                    </div> <br /></div></CustomTable>

            <DeleteProductModal
                isOpen={isModalOpen}
                productName={userToDelete?.firstName}
                type='product'
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </>
    )
}
