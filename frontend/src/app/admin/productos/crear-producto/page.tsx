"use client"

import React from 'react'
import { Stepper, StepperItem } from '@shared/components/Stepper'
import { IconCheck, IconImageInPicture, IconInfoCircle } from '@tabler/icons-react'
import { useCreateProduct } from '@modules/productos/hooks/useCreateProduct'
import GeneralInfo from '@/app/admin/productos/crear-producto/steps/GeneralInfo'
import UploadImage from '@/app/admin/productos/crear-producto/steps/UploadImage'
import Summary from '@/app/admin/productos/crear-producto/steps/Summary'

export default function CreateProductsPage() {

    const { currentStep, handleNextStep, setFormData, formData, setImagesUrl, imagesUrl, createProduct, getCategories } = useCreateProduct()

    return (
        <div>
            <Stepper
                active={currentStep}
                onChange={handleNextStep}
                onFinish={
                    createProduct
                }
                lastStepLabel='Crear Producto'
                activeColor='#287881' defaultColor='#e6f7f8' steps={[
                    { title: "Información general", icon: IconInfoCircle },
                    { title: "Subir imagen", icon: IconImageInPicture },
                    { title: "Paso final", icon: IconCheck }
                ]} >
                <StepperItem>
                    <GeneralInfo setProductData={setFormData} productData={formData} getCategories={getCategories} />
                </StepperItem>
                <StepperItem>
                    <UploadImage setImage={setImagesUrl} actualImage={imagesUrl} />
                </StepperItem>
                <StepperItem>
                    <Summary productData={formData} image={imagesUrl[0]} />
                </StepperItem>
            </Stepper>

            <div style={{ height: 24 }}></div>

        </div>
    )
}
