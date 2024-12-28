import React, { useState } from "react";
import styles from "@modules/productos/styles/UploadImage.module.css";
import { useTranformFileToBase64 } from "@/hooks/useBase64";

const UploadImage = ({ setImage, actualImage = [] }: { setImage: React.Dispatch<React.SetStateAction<string[]>>, actualImage: Array<string> }) => {
    const [previewImages, setPreviewImages] = useState<Array<string>>(actualImage);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return
        const result = await useTranformFileToBase64(file);
        setPreviewImages(prev => [...prev, result])
        setImage(prev => [...prev, result])
    };

    return (
        <div className={styles.container}>
            <h2>Subir Imagen</h2>

            <div className={styles.imagesContainer}>
                {previewImages.length > 0 ? (

                    previewImages?.map((image, index) => (
                        <div key={index} className={styles.imageContainer} onClick={() => {
                            const newImages = actualImage.filter((item) => item != image);
                            setImage(newImages)
                            setPreviewImages(newImages)
                        }}>
                            <img key={index} src={image} alt="Vista previa" className={styles.preview} />
                        </div>
                    ))
                ) : (
                    <div>

                    </div>
                )}
            </div>
            <div className={styles.uploadBox}>
                <div>
                    <p>Selecciona una imagen para cargar</p>
                    <p>Haga click o arrastre una</p>
                </div>
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


