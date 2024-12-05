import { useState } from "react"
import { CREATE_PRODUCT_STEPS } from "@/modules/productos/constants"


export const useCreateProduct = () => {
  const [currentStep, setCurrentStep] = useState<number>(CREATE_PRODUCT_STEPS.INFORMATION)


  const handleNextStep = (newStep: number) => {
    setCurrentStep(newStep)
  } 

  return {
    currentStep,
    handleNextStep
  }
}