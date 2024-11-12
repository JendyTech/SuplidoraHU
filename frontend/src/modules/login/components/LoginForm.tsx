"use client";

import SubmitForm from "@/shared/components/Logic/Form";
import { useLogin } from "@modules/login/useLogin";
import styles from "@modules/login/login.module.css";
import CustomInput from "@/shared/components/Form/Input";
import CustomButton from "@/shared/components/Buttons/CustomButton";

export function LoginForm() {
  const { submit } = useLogin();

  return (
    <SubmitForm submit={submit} className={styles.form}>
      <CustomInput maxWidth="350px" name="email" type="email" placeholder="Correo" />
      <CustomInput maxWidth="350px" name="password" type="password" placeholder="Contraseña" />

      <CustomButton style="filled" maxWidth="350px" text="Iniciar sesión" buttonType="submit" />
    </SubmitForm>
  );
}
