import Link from 'next/link'
import React from 'react'

export default function ProductsPage() {
    return (
        <div>Productos <Link href={'/admin/productos/crear-producto'}>Crear un producto</Link></div>
    )
}
