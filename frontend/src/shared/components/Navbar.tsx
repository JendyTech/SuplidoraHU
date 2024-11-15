'use client'

import React from 'react'
import styles from '@shared/styles/navbar.module.css'
import { usePathname } from 'next/navigation'
import { topBar } from '@shared/data/menu'
import { getItemBarMenuItem } from '@/utils/getItemBarMenuItem'

export default function Navbar() {
    const path = usePathname()

    const item = getItemBarMenuItem(path, topBar)

    if (!item) return (
        <h2 style={{ color: "red" }}>
            Agregar a los items del top bar
        </h2>
    )


    return (
        <h2 className={styles.title}>{item.title}</h2>
    )
}
