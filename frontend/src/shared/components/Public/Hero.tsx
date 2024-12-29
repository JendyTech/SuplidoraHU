import styles from "@/shared/styles/components/Public/Hero.module.css"
import { Anchor } from '@/shared/components/Public/Anchor'

export function Hero() {
  return (
    <header
      className={styles.container}
    >
      <div className={styles.heroBackground}>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
          alt="Hero background"
          className={styles.heroImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Tienda al por mayor y de suministros
        </h1>
        <p className={styles.heroDescription}>
          En Suplidora Hernández Ureña encontras los mejores productos al por mayor al mejor precio del mercado
        </p>

        <Anchor url="/catalogo">
          Ver catálogo
        </Anchor>
      </div>

    </header>
  )
}