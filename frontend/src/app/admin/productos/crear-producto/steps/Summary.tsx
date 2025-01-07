import React from "react";
import styles from "@modules/productos/styles/Summary.module.css";

const Summary = ({ productData, image }: { productData: AddProductModel, image: string[] | null }) => {
    return (
        <div className={styles.container}>
            <h2>Resumen del Producto</h2>
            <div className={styles.summaryBox}>
                <div className={styles.textSection}>
                    <p><strong>Nombre:</strong> {productData.name}</p>
                    <p><strong>Precio:</strong> ${productData.price}</p>
                    <p><strong>Descripción:</strong> {productData.description}</p>
                    <p><strong>Código:</strong> {productData.code}</p>
                    <p><strong>Unidades por Paquete:</strong> {productData.unitsPerPack}</p>
                    <p><strong>Categoría:</strong> {productData.categoryName}</p>
                </div>
                <div className={styles.imageSection}>
                    {image?.map((image, index) => (

                        <div key={index} className={styles.imageContainer}>
                            <img key={index} src={image} alt="Vista previa" className={styles.preview} />
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
};

export default Summary;
