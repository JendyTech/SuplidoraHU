import { LoginForm } from "@modules/login/components/LoginForm";
import styles from "@modules/login/login.module.css";
import { redirectSession } from "@/utils/session";
import CustomButton from "@shared/components/Buttons/CustomButton";

export default async function LoginPage() {

  await redirectSession()

  return (
    <>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <p className={styles.title}>Inicie sesión con sus credenciales</p>
          <LoginForm />


        </div>
      </main>
    </>
  );
}
