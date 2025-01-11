import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "@modules/productos/styles/GeneralInfo.module.css";

const UserGeneralInfo = ({
  setUserData,
  userData,
}: {
  setUserData: Dispatch<SetStateAction<AddUserModel>>;
  userData: AddUserModel;
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "unitsPerPack" ? Number(value) : value,
    }));
  };
  return (
    <div className={styles.container} style={{ width: " 100%" }}>
      <h2 style={{ marginBottom: "20px" }}>Información General</h2>
      <form
        style={{
          width: " 100%",
          display: " flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "start", gap: "30px" }}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="material-input"
              placeholder="Nombre"
              onChange={handleInputChange}
              name="firstName"
              value={userData.firstName}
            />

            <span className="underline"></span>
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              id="material-input"
              placeholder="Apellido"
              onChange={handleInputChange}
              name="lastName"
              value={userData.lastName}
            />

            <span className="underline"></span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "start", gap: "30px" }}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="material-input"
              placeholder="Contraseña"
              onChange={handleInputChange}
              name="password"
              value={userData.password}
            />

            <span className="underline"></span>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="material-input"
              placeholder="Correo electronico"
              onChange={handleInputChange}
              name="email"
              value={
                userData.email
              }
            />

            <span className="underline"></span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserGeneralInfo;
