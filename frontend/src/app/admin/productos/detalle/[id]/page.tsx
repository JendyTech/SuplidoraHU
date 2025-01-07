import { getProductById } from "@services/product";
import { PageParams } from "@/interfaces/Page"
import { GetProduct } from "@interfaces/Product/GetProduct";
import dayjs from "dayjs";

export default async function ProductDetail(props: PageParams) {
    const { id } = await props.params

    try {
        const response = await getProductById(id, true);

        console.log(response)

        if (!response.ok) {


            return (
                <div>
                    error no encontrado
                </div>
            )
        }

        const { result: product } = response

        dayjs.locale('es');


        return (
            <div>

                <p><strong>Nombre:</strong> {product.name}</p>
                <p><strong>Código:</strong> {product.code}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
                <p><strong>Unidades por Paquete:</strong> {product.unitsPerPack}</p>
                <p><strong>Categoría:</strong> {product.categoryName}</p>
                <p><strong>Fecha de Creación:</strong> {dayjs(product.createdAt).format("DD/MM/YYYY")}</p>
                <div>
                    {product.images.length > 0 ? (
                        product.images.map((image, i) => (
                            <img key={i} src={image.url} alt="producto" width="200" height="200" />
                        ))
                    ) : (
                        <p>No hay imágenes disponibles</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {

        return (
            <div>error</div>
        )
    }

}
