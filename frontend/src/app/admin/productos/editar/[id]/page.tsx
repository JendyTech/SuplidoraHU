import ProductEditClient from "@/app/admin/productos/editar/[id]/ProductEditClient";
import { getProductById } from "@services/product";
import { ErrorLoadServer } from "@shared/components/Error/ErrorLoadServer";

export default async function ProductEdit({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const response = await getProductById(id, true);

        if (!response.ok) return <ErrorLoadServer />;

        const { result: product } = response;

        return <ProductEditClient productData={product} />;
    } catch (error) {
        return <ErrorLoadServer />;
    }
}
