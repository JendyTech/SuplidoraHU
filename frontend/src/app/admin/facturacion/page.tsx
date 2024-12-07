import { IconShoppingCart } from '@tabler/icons-react'
import { getAllInvoices } from "@services/invoice"
import { InfoContainer } from '@modules/productos/components/InfoContainer'
import { ErrorLoadServer } from "@shared/components/Error/ErrorLoadServer"
import InvoiceTable from '@modules/facturas/components/InvoiceTable'
import styles from '@modules/productos/styles/productos.module.css'

export default async function BillingPage() {
  try {
    const response = await getAllInvoices({}, true)

    if (!response.ok) return <ErrorLoadServer />

    return (
      <div className={styles.main}>
        <div className={styles.infoContainerGroup}>
          <InfoContainer Icon={IconShoppingCart} title={response.result.metadata.total} subtitle='Facturas en sistema' color='#287881' />
        </div>


        <InvoiceTable initialState={response.result} />

      </div>
    )
  } catch (error) {
    return <ErrorLoadServer />
  }
}
