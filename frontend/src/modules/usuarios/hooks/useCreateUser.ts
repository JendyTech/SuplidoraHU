import { useState } from "react"
import { CREATE_USER_STEPS } from "@modules/usuarios/constants"


export const useCreateUser = () => {
  const [currentStep, setCurrentStep] = useState<number>(CREATE_USER_STEPS.INFORMATION)


  const handleNextStep = (newStep: number) => {
    setCurrentStep(newStep)
  } 

  return {
    currentStep,
    handleNextStep
  }
}