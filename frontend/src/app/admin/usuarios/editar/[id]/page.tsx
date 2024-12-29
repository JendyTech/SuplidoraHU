import { PageParams } from "@interfaces/Page";
import UserEditClient from "@modules/usuarios/components/UserEditClient";
import ProductEditClient from "@modules/usuarios/components/UserEditClient";
import { getProductById } from "@services/product";
import { getUserById } from "@services/users";
import { ErrorLoadServer } from "@shared/components/Error/ErrorLoadServer";
import { log } from "console";

export default async function ProductEdit(props: PageParams) {
    const { id } = await props.params
    try {
        const response = await getUserById(id, true);

        if (!response.ok) return <ErrorLoadServer />;

        const { result: user } = response;

        return <UserEditClient userData={user} id={id} />;
    } catch (error) {
        return <ErrorLoadServer />;
    }
}
