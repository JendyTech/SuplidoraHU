'use client'

import React, { Fragment } from 'react'
import styles from '@shared/styles/sidebar.module.css'
import Logo from '@/assets/logo.jpeg'
import Yo from '@/assets/yo.jpg'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { IconHome, IconReceipt, IconShoppingCart, IconSettings, IconUser } from '@tabler/icons-react'
import CustomButton from '@shared/components/Buttons/CustomButton'
import { logoutService } from '@services/auth'

export default function Sidebar() {

    const path = usePathname()
    const navigation = useRouter()

    const handleLogOut = async () => {
        await logoutService()
        navigation.replace('/login')
    }

    const items = [
        {
            url: "/admin",
            name: "Dashboard",
            Icon: IconHome,
            id: 'admin'
        },
        {
            url: "/admin/facturacion",
            name: "Facturación",
            Icon: IconReceipt,
            id: 'facturacion'
        },
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
        {
            url: "/admin/configuracion",
            name: "Configuración",
            Icon: IconSettings,
            id: 'configuracion'
        },
    ]


    const parts = path.split('/').filter((item) => item.length > 0)


    const urlActive = (id: string) => {
        if (parts.length === 1 && id === 'admin') return true

        return parts.length > 1 && parts[1] === id

    }

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
                    <div className={styles.sidebarBottomProfile}>
                        <img src={Yo.src} alt="yo" width={40} height={40} />
                        <div>
                            <p>Jeriel Gomez Susaña</p>
                            <span>Administrador</span>

                        </div>
                    </div>
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
