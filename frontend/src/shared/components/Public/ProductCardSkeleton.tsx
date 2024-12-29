import styles from '@/shared/styles/components/Public/ProductCardSkeleton.module.css'

export function ProductCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.imageSkeleton} />
      <section className={styles.textSkeleton}>
        <div className={styles.titleSkeleton} />
        <div className={styles.ratingSkeleton} />
        <div className={styles.priceSkeleton} />
        <div className={styles.shippingSkeleton} />
        <div className={styles.descriptionSkeleton} />
        <div className={styles.button} />
      </section>
    </div>
  )
}
