"use client"

import React from 'react'
import { Stepper, StepperItem } from '@shared/components/Stepper'
import { IconCheck, IconImageInPicture, IconUser } from '@tabler/icons-react'
import { useCreateProduct } from '@modules/productos/hooks/useCreateProduct'
import { useCreateUser } from '@modules/usuarios/hooks/useCreateUser'
import UserGeneralInfo from '@/app/admin/usuarios/crear-usuario/steps/GeneralInfo'
import UserUploadImage from '@/app/admin/usuarios/crear-usuario/steps/UploadImage'
import UserSummary from '@/app/admin/usuarios/crear-usuario/steps/Summary'

export default function CreateUsersPage() {

    const { currentStep, handleNextStep, setFormData, formData, setImageUrl, imageUrl, createUser } = useCreateUser()

    return (
        <div>
            <Stepper
                active={currentStep}
                onChange={handleNextStep}
                onFinish={createUser}
                activeColor='#287881' defaultColor='#e6f7f8' steps={[
                    { title: "Información general", icon: IconUser },
                    { title: "Subir imagen", icon: IconImageInPicture },
                    { title: "Paso final", icon: IconCheck }
                ]}>
            <StepperItem>
                    <UserGeneralInfo setUserData={setFormData} userData={formData} />
                </StepperItem>
                <StepperItem>
                    <UserUploadImage setImage={setImageUrl} actualImage={imageUrl} />
                </StepperItem>
                <StepperItem>
                    <UserSummary userData={formData} image={imageUrl} />
                </StepperItem>
            </Stepper>

            <div style={{ height: 24 }}></div>

        </div>
    )
}
