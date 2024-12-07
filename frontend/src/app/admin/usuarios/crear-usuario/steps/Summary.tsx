import React from "react";
import styles from "@modules/productos/styles/Summary.module.css";

const UserSummary = ({ userData, image }: { userData: AddUserModel, image: string | null }) => {
    return (
        <div className={styles.container}>
            <h2>Resumen del Usuario</h2>
            <div className={styles.summaryBox}>
                <div className={styles.textSection}>
                    <p><strong>Nombre:</strong> {userData.firstName}</p>
                    <p><strong>Precio:</strong> {userData.lastName}</p>
                    <p><strong>Descripción:</strong> {userData.password}</p>
                    <p><strong>Código:</strong> {userData.email}</p>

                </div>
                <div className={styles.imageSection}>
                    {image && <img src={image} alt="Usuario" />}
                </div>
            </div>
        </div>
    );
};

export default UserSummary;
