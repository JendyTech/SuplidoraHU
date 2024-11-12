'use client'

import { logoutService } from "@services/auth";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const navigation = useRouter()

  const handleLogOut = async () => {
    await logoutService()
    navigation.replace('/login')
  }

  return (
    <>

      <h1>
        Hola Admin
      </h1>
      <CustomButton onClick={handleLogOut} style="filled" maxWidth="350px" text="Cerrar sesión" buttonType="submit" />

    </>
  )
}