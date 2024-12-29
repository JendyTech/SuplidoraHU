import React from 'react'
import styles from '@/shared/styles/components/Public/ProductCard.module.css'
import Link from 'next/link'
import { IconStar, IconListDetails } from '@tabler/icons-react'

interface Props {
  id: string | number
  title: string
  price: number
  rating: number
  image: string
  description: string
  code: string
}

export function ProductCard(props: Props) {
  const { title, price, rating, image, description, id, code } = props

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.ratingWrapper}>
          {[...Array(5)].map((_, i) => (
            <IconStar
              key={i}
              className={`${styles.rating} ${i < rating ? styles.ratingFilled : styles.ratingEmpty}`}
            />
          ))}
          <span className={styles.ratingText}>({rating}/5)</span>
        </div>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <span className={styles.code}>
          {code}
        </span>
        <p className={styles.description}>{description}</p>
        <Link className={styles.link} href={`/catalogo/${id}`}>
          <IconListDetails />
          Detalles
        </Link>
      </div>
    </article>
  )
}
