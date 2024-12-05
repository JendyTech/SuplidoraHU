import React, { useState } from "react";
import styles from "@modules/productos/styles/UploadImage.module.css";

const UploadImage = ({ setImage }: { setImage: any }) => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

        }
    };


    return (
        <div className={styles.container}>
            <h2>Subir Imagen</h2>
            <div className={styles.uploadBox}>
                {preview ? (
                    <img src={preview} alt="Vista previa" className={styles.preview} />
                ) : (
                    <p>Selecciona una imagen para cargar</p>
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

export default UploadImage;
