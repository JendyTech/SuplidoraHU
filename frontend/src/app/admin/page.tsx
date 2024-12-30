"use client"

import { useLoader } from '@/contexts/Loader'
import { useDelay } from '@/hooks/useDelay'
import { Pagination } from '@contracts/API'
import { IInvoice } from '@interfaces/Invoice/Invoice'
import { IProduct } from '@interfaces/Product/Product'
import { IUser } from '@interfaces/User/User'
import styles from '@modules/dashboard/styles/dashboard.module.css'
import { useInvoices } from '@modules/facturas/hooks/useInvoices'
import { InfoContainer } from '@modules/productos/components/InfoContainer'
import { useProducts } from '@modules/productos/hooks/useProducts'
import { getAllInvoices } from '@services/invoice'
import { getAllProducts } from '@services/product'
import CustomTable from '@shared/components/CustomTable'
import { IconInvoice, IconShoppingCart } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

export default function AdminPage() {

  const [last3Products, setLast3Products] = useState<Pagination<IProduct>>()
  const [last3Invoices, setLast3Invoices] = useState<Pagination<IInvoice>>()

  const [totalProducts, setTotalProducts] = useState<number>(0)
  const [totalInvoices, setTotalInvoices] = useState<number>(0)

  const { setLoading } = useLoader()

  useEffect(() => {
    const setData = async () => {
      setLoading(true)

      const productsResponse = await getAllProducts({}, false)
      const invoicesResponse = await getAllInvoices({}, false)

      if (!productsResponse.ok || !invoicesResponse.ok) return

      const productData = productsResponse.result
      const invoiceData = invoicesResponse.result
      await useDelay(3000)
      setTotalProducts(productData.metadata.total)
      setTotalInvoices(invoiceData.metadata.total)
      setLast3Products(productData)
      setLast3Invoices(invoiceData)
      setLoading(false)
    }
    setData()
  }, [])



  const productsHeaders: TableColumn<IProduct>[] = [
    { name: "Nombre", selector: (row) => row.name },
    { name: "Código", selector: (row) => row.code },
    { name: "Descripción", selector: (row) => row.description },
    { name: "Unidades por Paquete", selector: (row) => row.unitsPerPack },
    {
      name: "Fecha de Creación",
      selector: (row) => dayjs(row.createdAt).format("DD [de] MMMM YYYY"),
    },
  ];

  const headers: TableColumn<IInvoice>[] = [
    { name: "Cliente", selector: (row) => row.clientName },
    { name: "Forma de Pago", selector: (row) => row.paymentCondition },
    { name: "Suplidor", selector: (row) => row.supplierName },
    { name: "Fecha de Vencimiento", selector: (row) => dayjs(row.expirationDate).format("DD [de] MMMM YYYY") },
    {
      name: "Fecha de Creación",
      selector: (row) => dayjs(row.createdAt).format("DD [de] MMMM YYYY"),
    }]

  const {
    pagination: productsPagination,
  } = useProducts(last3Products!);


  const {
    pagination: invoicesPagination,
  } = useInvoices(last3Invoices!);


  return (
    <>
      <div className={styles.main}>
        <div className={styles.infoContainerGroup} style={{ display: "flex", gap: "20px", width: "100%" }}>

          <InfoContainer Icon={IconInvoice} title={totalInvoices} subtitle='Facturas en sistema' color='#287881' />
          <InfoContainer Icon={IconShoppingCart} title={totalProducts} subtitle='Productos en sistema' color='#EF7B52' />
        </div>

        <div style={{ display: "flex", gap: "20px", width: "100%" }}>
          <div className={styles.container}>
            <h3>Ultimos productos agregados</h3>
            <br />
            <CustomTable
              setFilters={() => { }}
              headers={productsHeaders}
              result={productsPagination}
            />
          </div>

          <div className={styles.container}>
            <h3>Ultimas facturas agregadas</h3>
            <br />
            <CustomTable
              setFilters={() => { }}
              headers={headers}
              result={invoicesPagination}
            />
          </div>

        </div>


      </div>
    </>
  )
}