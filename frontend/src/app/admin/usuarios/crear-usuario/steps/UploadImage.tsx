import React, { useState } from "react";
import styles from "@modules/productos/styles/UploadImage.module.css";
import { useTranformFileToBase64 } from "@/hooks/useBase64";

const UserUploadImage = ({ setImage, actualImage = null }: { setImage: any, actualImage?: string | null }) => {
    const [preview, setPreview] = useState<string | null>(actualImage);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return
        const result = await useTranformFileToBase64(file);
        setPreview(result)
        setImage(result)
    };

    return (
        <div className={styles.container}>
            <h2>Subir Imagen</h2>
            <div className={styles.uploadBox}>
                {preview ? (

                    <img src={preview} alt="Vista previa" className={styles.preview} />
                ) : (
                    <div>
                        <p>Selecciona una imagen para cargar</p>
                        <p>Haga click o arrastre una</p>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                />
            </div>
        </div>
    );
};

export default UserUploadImage;


