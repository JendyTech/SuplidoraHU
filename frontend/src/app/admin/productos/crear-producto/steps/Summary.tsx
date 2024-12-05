import React from "react";
import styles from "@modules/productos/styles/Summary.module.css";

const Summary = ({ productData, image, onConfirm }: { productData: any, image: any, onConfirm: any }) => {
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
                </div>
                <div className={styles.imageSection}>
                    {image && <img src={URL.createObjectURL(image)} alt="Producto" />}
                </div>
            </div>
            <button type="button" className={styles.button} onClick={onConfirm}>
                Confirmar
            </button>
        </div>
    );
};

export default Summary;
