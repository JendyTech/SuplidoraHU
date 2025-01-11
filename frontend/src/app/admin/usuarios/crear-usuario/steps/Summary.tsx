import React from "react";
import styles from "@modules/productos/styles/Summary.module.css";

const UserSummary = ({ userData, image }: { userData: AddUserModel, image: string | null }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Resumen del Usuario</h2>
            <div className={styles.summaryBox}>
                <div className={styles.imageSection}>
                    {image && <img src={image} alt="Usuario" className={styles.userImage} />}
                </div>
                <div className={styles.textSection}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Nombre:</span>
                        <span className={styles.value}>{userData.firstName}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Precio:</span>
                        <span className={styles.value}>{userData.lastName}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Descripción:</span>
                        <span className={styles.value}>{userData.password}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Código:</span>
                        <span className={styles.value}>{userData.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSummary;
