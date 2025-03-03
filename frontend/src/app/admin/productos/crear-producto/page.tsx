import React from 'react'
import GeneralInfo from '@/app/admin/productos/crear-producto/steps/GeneralInfo'
import { getAllCategories, getAllCategoriesServer } from '@services/product'

export default async function CreateProductsPage() {


  try {

    const categoriesResponse = await getAllCategoriesServer()


    if (!categoriesResponse.ok) {
      return <>Error al Buscar las Categorias</>
    }

    const categories = categoriesResponse.result

    return (
      <div>
        <GeneralInfo categories={categories} />
        <div style={{ height: 24 }}></div>

      </div>
    )


  } catch (error) {
    console.log(error)
    return <>Error al Buscar las Categorias</>
  }


}
