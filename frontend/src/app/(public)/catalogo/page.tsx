'use client'

import styles from "@modules/public/styles/Catalog.module.css"
import { ProductCardSkeleton } from '@shared/components/Public/ProductCardSkeleton'
import { FilterProductCard } from '@shared/components/Public/FilterProductCard'
import { ContentContainer } from '@shared/components/Public/ContentContainer'
import { ProductCard } from '@shared/components/Public/ProductCard'
import { Typography } from '@shared/components/Public/Typograpy'
import { useEffect, useState } from "react"
import { CatalogProduct } from "@interfaces/catalog/CatalogProduct"
import { getCatalog } from "@services/catalog"
import { toast } from "sonner"
import { useDelay } from "@/hooks/useDelay"
import { div } from "framer-motion/client"
import { getAllCategories } from "@services/product"


export default function CalalogPage() {

  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      await useDelay(1000)
      const data = await getCatalog();
      if (data.ok) {
        setProducts(data.result.data)
      } else {
        toast.error(data.messages[0].message)
      }
      setLoading(false)
    }


    const fetchCategories = async () => {
      const response = await getAllCategories()
      if (response.ok) {
        setCategories(response.result.data)
      }
    }

    fetchCategories()


    fetchProducts()

  }, [])

  return (
    <ContentContainer>
      <header>
        <Typography textAlign='left' variant='h1'>
          Catálogo de Productos de Alta Calidad para Todos tus Necesidades
        </Typography>

        <Typography
          variant='span'
          fontSize='16px'
          fontWeight={500}
          color='#6b7280'
        >
          Explora nuestro catálogo de productos cuidadosamente seleccionados para ofrecerte lo mejor en calidad y variedad.
          Desde tecnología hasta artículos para el hogar, encuentra todo lo que necesitas con opciones accesibles y de confianza.
          Actualizado regularmente, nuestro catálogo está diseñado para satisfacer tus expectativas y brindarte una experiencia de compra única.
          ¡Descubre lo que tenemos para ti!
        </Typography>
      </header>
      <section
        className={styles.container}
      >
        <FilterProductCard categories={categories} />
        <section className={styles.productsContainer}>

          {
            loading ?
              <div style={{ width: '100%' }}>
                <ProductCardSkeleton />

              </div>
              : products.length === 0 ?
                <p>No hay productos disponibles</p> : null
          }

          {products.map((product, i) => (
            <div key={i}>
              <ProductCard
                id={product.id}
                key={product.id}
                title={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                code={product.code}
                category={product.category}
              />
            </div>
          ))}

        </section>
      </section>

    </ContentContainer>
  )
}