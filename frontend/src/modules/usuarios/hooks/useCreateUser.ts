import { useState } from "react"
import { CREATE_USER_STEPS } from "@modules/usuarios/constants"
import { useLoader } from "@/contexts/Loader"
import { useRouter } from "next/navigation"
import { useDelay } from "@/hooks/useDelay"
import { addNewUser } from "@services/users"
import { toast } from "sonner"


export const useCreateUser = () => {
  const [currentStep, setCurrentStep] = useState<number>(CREATE_USER_STEPS.INFORMATION)

  const { setLoading } = useLoader()
  const router = useRouter()

  const [formData, setFormData] = useState<AddUserModel>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    photo : ""
  });

  const [imageUrl, setImageUrl] =  useState<string | null>(null); 

  const createUser = async () => {
    setLoading(true)
   try {
    await useDelay(2000)
   
    const response = await addNewUser({
      ...formData,
      photo : imageUrl ?? undefined
    });


    if(!response.ok) {
      toast.error(response.messages[0].message)
      return
    }
    
    toast.success(response.message)
    router.replace('/admin/usuarios')
   } catch (error) {
    toast.error("Error al conectar al servidor")
   } finally {
    setLoading(false)

   }

};

  const handleNextStep = (newStep: number) => {
    setCurrentStep(newStep)
  } 

  return {
    currentStep,
    handleNextStep,
    setLoading,
    formData,
    setFormData,
    imageUrl,
    setImageUrl,
    createUser
  }
}