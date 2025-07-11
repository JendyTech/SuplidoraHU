
import { PageParams } from "@/interfaces/Page"
import ProductEditClient from "@/modules/productos/components/ProductEditClient"
import { getAllCategoriesServer, getProductById } from "@services/product"
import { ErrorLoadServer } from "@/shared/components/Error/ErrorLoadServer"

export default async function ProductEdit(props: PageParams) {
  const { id } = await props.params

  try {
    const response = await getProductById(id, true)

    if (!response.ok) return <ErrorLoadServer />

    const { result: product } = response



    const categoriesResponse = await getAllCategoriesServer()


    if (!categoriesResponse.ok) {
      return <>Error al Buscar las Categorias</>
    }

    const categories = categoriesResponse.result

    return <ProductEditClient productData={product} categories={categories} />
  } catch (error) {
    return <ErrorLoadServer />
  }
}
