"use client"

import React from 'react'
import { Stepper, StepperItem } from '@shared/components/Stepper'
import { IconCheck, IconImageInPicture, IconInfoCircle, IconUser } from '@tabler/icons-react'
import { useCreateProduct } from '@modules/productos/hooks/useCreateProduct'

export default function CreateUsersPage() {

    const { currentStep, handleNextStep } = useCreateProduct()

    return (
        <div>
            <Stepper
                active={currentStep}
                onChange={handleNextStep}
                onFinish={() => {
                    console.log("Termino")
                }}
                activeColor='#287881' defaultColor='#e6f7f8' steps={[
                    { title: "Información general", icon: IconUser },
                    { title: "Subir imagen", icon: IconImageInPicture },
                    { title: "Paso final", icon: IconCheck }
                ]} >
                <StepperItem>
                    <h1>Información general</h1>
                </StepperItem>
                <StepperItem>
                    <h1>Subir imagen</h1>
                </StepperItem>
                <StepperItem>
                    <h1>Paso final</h1>
                </StepperItem>
            </Stepper>

            <div style={{ height: 24 }}></div>

        </div>
    )
}
