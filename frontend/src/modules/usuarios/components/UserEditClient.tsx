"use client";

import styles from "@modules/productos/styles/GeneralInfo.module.css";
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { useState } from "react";
import { useTranformFileToBase64 } from "@/hooks/useBase64";
import { useLoader } from "@/contexts/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GetUser } from "@interfaces/User/GetUser";
import { updateUser } from "@services/users";
import { UpdateUser } from "@interfaces/User/UpdateUser";
import {
  IconPhoto,
  IconUser,
  IconUserEdit,
  IconUserFilled,
} from "@tabler/icons-react";

interface UserEditClientProps {
  userData: GetUser;
  id: string;
}

const UserEditClient: React.FC<UserEditClientProps> = ({ userData, id }) => {
  const router = useRouter();

  const [newUserData, setNewUserData] = useState<UpdateUser>({
    name: userData.firstName,
    lastname: userData.lastName,
    photo: userData.photo,
  });
  if (!userData) return <div>Producto no encontrado</div>;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    const file = files?.[0];

    if (name === "photo" && !file) return;

    if (name === "photo" && file) {
      const result = await useTranformFileToBase64(file);
      setNewUserData((prev) => ({ ...prev!, photo: result }));
      return;
    }
    setNewUserData((prev) => ({ ...prev!, [name]: value }));
  };

  const { setLoading } = useLoader();

  return (
    <div className={styles.containergf}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconUserEdit className={styles.icon} />
          Editar Usuario
        </h1>
        <p className={styles.subtitle}>
          Ingrese los detalles del usuario que desea Editar. Todos los campos
          marcados con * son obligatorios.
        </p>
      </div>
      <div className={styles.formGrid}>
        <div className={styles.inputWrapper}>
          <label>
            <IconUser
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            Nombre del Usuario*
          </label>
          <CustomInput
            name="firstName"
            type="text"
            placeholder="Nombre del Usuario"
            defaultValue={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>
            <IconUserFilled
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            Apellido*
          </label>
          <CustomInput
            name="lastName"
            type="text"
            placeholder="Apellido del Producto"
            defaultValue={userData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.imagesContainer}>
        {newUserData.photo && (
          <div className={styles.imageContainer}>
            <img
              src={newUserData.photo}
              alt="Vista previa"
              className={styles.preview}
            />
          </div>
        )}
      </div>

      <div className={styles.uploadSection} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
        <IconPhoto
          size={32}
          style={{ marginBottom: "16px", color: "#287881" }}
        />
        <h3 className={styles.uploadTitle}>Imagen del usuario *</h3>
        <p className={styles.uploadDescription}>
          Sube imágenes de alta calidad que muestren claramente tu producto. Se
          recomienda usar un fondo blanco.
        </p>
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
          />
        </div>

      </div>

      <div className={styles.buttonContainer}>
        <CustomButton
          onClick={async () => {
            setLoading(true);
            try {
              const response = await updateUser(id, newUserData!);

              if (response.ok) {
                toast.success(
                  `Usuario ${userData.firstName} editado correctamente.`
                );
              } else {
                toast.error(`Debe editar ambos campos.`);
              }

              setLoading(false);
              router.push("/admin/usuarios");
            } catch (error) {
              setLoading(false);
            }
          }}
          style="filled"
          maxWidth="200px"
          text="Guardar cambios"
          buttonType="submit"
        />
      </div>
    </div>
  );
};

export default UserEditClient;
