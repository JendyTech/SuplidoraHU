import React, { Fragment } from 'react'
import styles from '@shared/styles/sidebar.module.css'
import { Logo } from '@/assets/logo'
import Link from 'next/link'
import Router from 'next/router'

export default function Sidebar() {

    const items = [
        {
            url: "/admin",
            name: "Dashboard"
        },
        {
            url: "/admin/facturacion",
            name: "Facturación"
        },
        {
            url: "/admin/productos",
            name: "Productos"
        },
        {
            url: "/admin/configuracion",
            name: "Configuración"
        },
    ]

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <Logo />

            </div>
            <ul className={styles.listItems}>
                {
                    items.map(item => (
                        <Fragment key={item.url}>
                            <div className={styles.itemContainer}>
                                <div className={styles.itemSelector}></div>
                                <li className={styles.item}><Link className={styles.itemLink} href={item.url}>{item.name}</Link></li>
                            </div>
                        </Fragment>
                    ))
                }


            </ul>
        </aside>
    )
}
