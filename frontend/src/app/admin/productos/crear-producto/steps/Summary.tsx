import React from "react";
import styles from "@modules/productos/styles/Summary.module.css";
import { IconX } from "@tabler/icons-react";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { useCreateProduct } from "@modules/productos/hooks/useCreateProduct";

const SummaryModal = ({
    isOpen,
    onClose,
    productData,
    image,
    create
}: {
    isOpen: boolean;
    onClose: () => void;
    productData: AddProductModel;
    image: string[] | null;
    create: () => void
}) => {

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.title}>Resumen del Producto</h2>
                        <button
                            onClick={onClose}
                            className={styles.closeButton}
                        >
                            <IconX className="w-6 h-6" />
                        </button>
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.infoSection}>
                            <div className={styles.infoItem}>
                                <p className={styles.label}>Nombre:</p>
                                <p className={styles.value}>{productData.name}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.label}>Precio:</p>
                                <p className={styles.value}>${productData.price}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.label}>Código:</p>
                                <p className={styles.value}>{productData.code}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.label}>Unidades por Paquete:</p>
                                <p className={styles.value}>{productData.unitsPerPack}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.label}>Descripción:</p>
                                <p className={styles.value}>{productData.description}</p>
                            </div>
                        </div>

                        <div className={styles.imagesGrid}>
                            {image?.map((img, index) => (
                                <div
                                    key={index}
                                    className={styles.imageWrapper}
                                >
                                    <img
                                        src={img}
                                        alt={`Vista previa ${index + 1}`}
                                        className={styles.image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end", gap: "20px" }}>
                        <CustomButton text="Confirmar" buttonType="submit" onClick={() => {

                            create()
                        }} />

                    </div>                </div>
            </div>

        </div>
    );
};

export default SummaryModal;