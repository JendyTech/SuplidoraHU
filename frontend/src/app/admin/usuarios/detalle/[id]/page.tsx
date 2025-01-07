import { PageParams } from "@/interfaces/Page"
import { getUserById } from "@services/users";
import dayjs from "dayjs";

export default async function ProductDetail(props: PageParams) {
    const { id } = await props.params

    try {
        const response = await getUserById(id, true);

        if (!response.ok) {
            return (
                <div>
                    error no encontrado
                </div>
            )
        }

        const { result: user } = response

        return (
            <div>

                <p><strong>Nombre:</strong> {user.firstName}</p>
                <p><strong>Apellido:</strong> {user.lastName}</p>
                <p><strong>Correo:</strong> {user.email}</p>
                <p><strong>Fecha de Creación:</strong> {dayjs(user.createdAt).format("DD/MM/YYYY")}</p>
                <div>
                    {
                        user.photo &&
                        <img src={user.photo} alt="user" width="200" height="200" />
                    }
                </div>
            </div>
        );
    } catch (error) {

        return (
            <div>error</div>
        )
    }

}
