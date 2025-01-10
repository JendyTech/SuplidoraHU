'use client'

import React, { Fragment } from 'react'
import styles from '@shared/styles/sidebar.module.css'
import Logo from '@/assets/logo.jpeg'
import Link from 'next/link'
import CustomButton from '@shared/components/Buttons/CustomButton'
import { usePathname, useRouter } from 'next/navigation'
import { IconHome, IconReceipt, IconShoppingCart, IconUser } from '@tabler/icons-react'
import { logoutService } from '@services/auth'
import { useSession } from '@/contexts/Session'
import { useShortFormatName } from '@/hooks/useShortName'

export default function Sidebar() {
    const path = usePathname()
    const navigation = useRouter()

    const handleLogOut = async () => {
        await logoutService()
        navigation.replace('/login')
    }

    const { data } = useSession()

    const items = [
        {
            url: "/admin",
            name: "Dashboard",
            Icon: IconHome,
            id: 'admin'
        },
        /* {
            url: "/admin/facturacion",
            name: "Facturación",
            Icon: IconReceipt,
            id: 'facturacion'
        }, */
        {
            url: "/admin/productos",
            name: "Productos",
            Icon: IconShoppingCart,
            id: 'productos'
        },
        {
            url: "/admin/usuarios",
            name: "Usuarios",
            Icon: IconUser,
            id: 'usuarios'
        },
        // {
        //     url: "/admin/configuracion",
        //     name: "Configuración",
        //     Icon: IconSettings,
        //     id: 'configuracion'
        // },
    ]


    const parts = path.split('/').filter((item) => item.length > 0)


    const urlActive = (id: string) => {
        if (parts.length === 1 && id === 'admin') return true

        return parts.length > 1 && parts[1] === id

    }

    const userName = useShortFormatName(`${data.firstName} ${data.lastName}`)

    return (

        <aside className={styles.sidebar}>
            <div className={styles.siderbarContent}>
                <div className={styles.logo}>

                    <img src={Logo.src} alt="logo" width={150} />

                </div>
                <ul className={styles.listItems}>
                    {
                        items.map(item => (
                            <Fragment key={item.url}>
                                <div className={styles.itemContainer}>
                                    <li className={`${styles.item} ${urlActive(item.id) && styles.itemSelected} `}>
                                        <Link
                                            className={styles.itemLink}
                                            href={item.url}>
                                            <item.Icon strokeWidth={1.5} />
                                            {item.name}
                                        </Link>
                                    </li>
                                </div>
                            </Fragment>
                        ))
                    }
                </ul>

            </div>

            <div className={styles.sidebarBottom}>
                <Link href="/admin/perfil" style={{ textDecoration: "none" }}>
                    <div className={styles.sidebarBottomProfile}>
                        {data.photo ? (
                            <img src={data.photo} alt={`Foto de ${data.firstName} ${data.lastName}`} width={40} height={40} />
                        ) : (
                            <div
                                style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: "#287881",
                                    display: "flex",
                                    color: "#FFF",
                                    fontSize: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center"
                                }}
                            >
                                {data.firstName.at(0)?.toUpperCase()}
                            </div>
                        )}

                        <div>
                            <p>{userName}</p>
                            <span>Administrador</span>
                        </div>
                    </div></Link>
                <CustomButton
                    onClick={handleLogOut}
                    style="filled"
                    maxWidth="350px"
                    text="Cerrar sesión"
                    buttonType="submit"
                />
            </div>
        </aside>
    )
}
