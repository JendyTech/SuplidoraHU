import React, { useState } from "react";
import styles from "@modules/productos/styles/GeneralInfo.module.css";

const GeneralInfo = ({ setProductData }: { setProductData: any }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        code: "",
        unitsPerPack: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
        <div className={styles.container}>
            <h2>Información General</h2>
            <form>
                <label className={styles.label}>
                    Nombre del Producto
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.label}>
                    Precio
                    <input
                        className={styles.input}
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.label}>
                    Descripción
                    <textarea
                        className={styles.textarea}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.label}>
                    Código
                    <input
                        className={styles.input}
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.label}>
                    Unidades por Paquete
                    <input
                        className={styles.input}
                        type="number"
                        name="unitsPerPack"
                        value={formData.unitsPerPack}
                        onChange={handleChange}
                    />
                </label>

            </form>
        </div>
    );
};

export default GeneralInfo;
