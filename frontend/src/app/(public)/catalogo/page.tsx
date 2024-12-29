import styles from "@modules/public/styles/Catalog.module.css"
import { ProductCardSkeleton } from '@shared/components/Public/ProductCardSkeleton'
import { FilterProductCard } from '@shared/components/Public/FilterProductCard'
import { ContentContainer } from '@shared/components/Public/ContentContainer'
import { ProductCard } from '@shared/components/Public/ProductCard'
import { Typography } from '@shared/components/Public/Typograpy'
import { SAMPLE_PRODUCTS } from '@shared/data/public'


export default function CalalogPage() {
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
        <FilterProductCard />
        <section>
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.image}
              description={product.description}
              code={product.code}
            />
          ))}
          <ProductCardSkeleton />

        </section>
      </section>

    </ContentContainer>
  )
}