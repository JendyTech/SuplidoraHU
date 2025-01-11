import { PageParams } from "@/interfaces/Page";
import { getUserById } from "@services/users";
import { IconUser, IconMail, IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import styles from "@modules/usuarios/styles/userDetail.module.css";

export default async function ProductDetail(props: PageParams) {
    const { id } = await props.params;

    try {
        const response = await getUserById(id, true);

        if (!response.ok) {
            return (
                <div className={styles.error}>
                    Error no encontrado
                </div>
            );
        }

        const { result: user } = response;

        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    {user.photo && (
                        <div className={styles.imageContainer}>
                            <img
                                src={user.photo}
                                alt="user"
                                className={styles.image}
                                width="125"
                                height="125"
                            />
                        </div>
                    )}
                    <div className={styles.details}>
                        <div className={styles.field}>
                            <IconUser size={20} className={styles.icon} />
                            <div>
                                <label className={styles.label}>Nombre</label>
                                <span>{user.firstName}</span>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <IconUser size={20} className={styles.icon} />
                            <div>
                                <label className={styles.label}>Apellido</label>
                                <span>{user.lastName}</span>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <IconMail size={20} className={styles.icon} />
                            <div>
                                <label className={styles.label}>Correo</label>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <IconCalendar size={20} className={styles.icon} />
                            <div>
                                <label className={styles.label}>Fecha de Creación</label>
                                <span>{dayjs(user.createdAt).format("DD/MM/YYYY")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className={styles.error}>Error</div>
        );
    }
}
