'use client';

import styles from '@modules/productos/styles/editProduct.module.css';
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { useState } from 'react';
import { useTranformFileToBase64 } from "@/hooks/useBase64";
import { useLoader } from '@/contexts/Loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GetUser } from '@interfaces/User/GetUser';
import { updateUser } from '@services/users';
import { UpdateUser } from '@interfaces/User/UpdateUser';

interface UserEditClientProps {
    userData: GetUser;
    id: string;
}

const UserEditClient: React.FC<UserEditClientProps> = ({ userData, id }) => {

    const router = useRouter();

    const [newUserData, setNewUserData] = useState<UpdateUser>({
        name: userData.firstName,
        lastname: userData.lastName,
        photo: userData.photo
    });
    if (!userData) return <div>Producto no encontrado</div>;

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        const file = files?.[0];

        if (name === "photo" && !file) return

        if (name === "photo" && file) {
            const result = await useTranformFileToBase64(file);
            setNewUserData((prev) => ({ ...prev!, photo: result }));
            return
        }
        setNewUserData((prev) => ({ ...prev!, [name]: value }));
    }



    const { setLoading } = useLoader()


    return (
        <div className={styles.tableContainer}>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                <div style={{ display: "flex", justifyContent: "start", gap: "30px" }}>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="firstName"
                            type="text"
                            placeholder="Nombre del Usuario"
                            defaultValue={userData.firstName}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="lastName"
                            type="text"
                            placeholder="Apellido del Producto"
                            defaultValue={userData.lastName}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                </div>


                {/* Muestra las imágenes cargadas */}
                <div className={styles.imagesContainer}>
                    {
                        newUserData.photo && <img src={newUserData.photo} alt="Vista previa" className={styles.preview} />
                    }
                </div>

                <div className={styles.uploadBox}>
                    <div>
                        <p>Selecciona una imagen para cargar</p>
                        <p>Haga click o arrastre una</p>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className={styles.fileInput}
                        name="photo"
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "end", gap: "30px" }}>
                    <CustomButton
                        onClick={async () => {
                            setLoading(true)
                            try {
                                const response = await updateUser(id, newUserData!);



                                if (response.ok) {
                                    toast.success(`Usuario ${userData.firstName} editado correctamente.`);
                                } else {
                                    toast.error(`Error al editar el usuario.`);
                                }

                                setLoading(false)
                                router.push('/admin/usuarios')
                            } catch (error) {

                                setLoading(false)
                            }
                        }}
                        style="filled"
                        maxWidth="200px"
                        text="Guardar cambios"
                        buttonType="submit"
                    />
                </div>
            </div>
        </div>
    );

};


export default UserEditClient;
