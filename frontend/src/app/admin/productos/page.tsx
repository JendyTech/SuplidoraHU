

import { IconShoppingCart } from '@tabler/icons-react'
import { getAllProducts } from "@services/product"
import styles from '@modules/productos/styles/productos.module.css'
import { InfoContainer } from '@modules/productos/components/InfoContainer'
import { ErrorLoadServer } from "@shared/components/Error/ErrorLoadServer"
import ProductTable from '@modules/productos/components/ProductTable'


// eslint-disable-next-line @next/next/no-async-client-component
export default async function ProductsPage() {

    try {
        const response = await getAllProducts({}, true)

        if (!response.ok) return <ErrorLoadServer />

        return (
            <div className={styles.main}>
                <div className={styles.infoContainerGroup}>
                    <InfoContainer Icon={IconShoppingCart} title={response.result.metadata.total} subtitle='Productos en sistema' color='#287881' />
                </div>

                <ProductTable initialState={response.result} />



            </div>
        )
    } catch (error) {
        return <ErrorLoadServer />
    }
}

