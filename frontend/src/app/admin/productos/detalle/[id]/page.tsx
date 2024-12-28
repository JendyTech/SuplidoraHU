import { getProductById } from "@services/product";
import { PageParams } from "@/interfaces/Page"
import { GetProduct } from "@interfaces/Product/GetProduct.";

export default async function ProductDetail(props: PageParams) {
    const { id } = await props.params

    console.log(id)

    try {
        const response = await getProductById(id, true);

        if (!response.ok) {
            return (
                <div>
                    error no encontrado
                </div>
            )
        }

        const { result: product } = response

        console.log(product.images)

        return (
            <div>

                <p><strong>Nombre:</strong> {product.name}</p>
                <p><strong>Código:</strong> {product.code}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
                <p><strong>Unidades por Paquete:</strong> {product.unitsPerPack}</p>
                <p><strong>Fecha de Creación:</strong> {product.createdAt}</p>
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
