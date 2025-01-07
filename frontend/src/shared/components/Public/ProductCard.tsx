'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/shared/styles/components/Public/ProductCard.module.css'
import Link from 'next/link'
import { IconStar, IconListDetails } from '@tabler/icons-react'
import { getCategoryNameById } from '@services/product'
import { toast } from 'sonner'
import { ProductCardSkeleton } from '@shared/components/Public/ProductCardSkeleton'
import { s } from 'framer-motion/client'

interface Props {
  id: string | number
  title: string
  price: number
  image: string
  description: string
  code: string
  category: string
}

export function ProductCard(props: Props) {
  const [categoryName, setCategoryName] = useState<string>("asdas")
  const [isLoading, setIsLoading] = useState<boolean>(false)



  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true)
      const response = await getCategoryNameById(props.category)
      console.log(response)
      if (response.ok) {
        setCategoryName(response.result.name)
      } else {
        toast.error(response.messages[0].message)
      }
      setIsLoading(false)
    }

    fetchCategory()
  }, [])



  const { title, price, image, description, id, code } = props

  if (isLoading) {
    return <ProductCardSkeleton />
  }

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

        <p className={styles.price}>${price.toFixed(2)}</p>
        <span className={styles.code}>
          {code}
        </span>
        <span className={styles.category}>
          {categoryName}
        </span>
        <p className={styles.description}>{description}</p>

      </div>
    </article>
  )
}
