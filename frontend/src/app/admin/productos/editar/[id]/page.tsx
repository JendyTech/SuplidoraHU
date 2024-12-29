
import { PageParams } from "@interfaces/Page";
import ProductEditClient from "@modules/productos/components/ProductEditClient";
import { getProductById } from "@services/product";
import { ErrorLoadServer } from "@shared/components/Error/ErrorLoadServer";

export default async function ProductEdit(props: PageParams) {
    const { id } = await props.params

    try {
        const response = await getProductById(id, true);

        if (!response.ok) return <ErrorLoadServer />;

        const { result: product } = response;

        return <ProductEditClient productData={product} />;
    } catch (error) {
        return <ErrorLoadServer />;
    }
}
