"use client"

import React from 'react'
import { Stepper, StepperItem } from '@shared/components/Stepper'
import { IconCheck, IconImageInPicture, IconInfoCircle } from '@tabler/icons-react'
import { useCreateProduct } from '@modules/productos/hooks/useCreateProduct'
import GeneralInfo from '@/app/admin/productos/crear-producto/steps/GeneralInfo'
import UploadImage from '@/app/admin/productos/crear-producto/steps/UploadImage'
import Summary from '@/app/admin/productos/crear-producto/steps/Summary'

export default function CreateProductsPage() {

    const { setImagesUrl, imagesUrl, createProduct, getCategories } = useCreateProduct()

    return (
        <div>

            <GeneralInfo getCategories={getCategories} />


            <div style={{ height: 24 }}></div>

        </div>
    )
}
