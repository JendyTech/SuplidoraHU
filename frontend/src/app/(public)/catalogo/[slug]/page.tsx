"use client"

import Image from "next/image"
import styles from "@/shared/styles/CatalogDetail.module.css"
import { ICatalogDetail } from "@/interfaces/catalog/CatalogProduct"
import { useParams, useRouter } from "next/navigation"
import { getCatalogBySlug } from "@services/catalog"
import { useEffect, useState } from "react"
import { useDelay } from '@/hooks/useDelay'
import { ClipLoader } from 'react-spinners'

export default function CatalogDetail() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const router = useRouter()

  const [product, setProduct] = useState<ICatalogDetail | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCatalogDetail = async () => {
      if (!slug) return
      setLoading(true)
      await useDelay(1000)
      try {
        const response = await getCatalogBySlug(slug)

        if (response.ok) {
          setProduct(response.result)
          setSelectedImage(response.result.images[0]?.url || "")
        } else {
          console.error("Error al obtener datos del catálogo")
        }
        setLoading(false)
      } catch (error) {
        console.error("Error de red", error)
        setLoading(false)
      }
    }

    fetchCatalogDetail()
  }, [slug])

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader size={100} color="#287881" />
      </div>
    )
  }

  if (!product) {
    return <p className={styles.loading}>Cargando producto...</p>
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.backButton} onClick={() => router.push("/catalogo")}>
          <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al catálogo
        </button>

        <div className={styles.productDetail}>
          <div className={styles.imageGallery}>
            <div className={styles.mainImage}>
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={600}
                priority
                quality={90}
              />
            </div>
            <div className={styles.thumbnailContainer}>
              {product.images.map((img) => (
                <div
                  key={img._id}
                  className={`${styles.thumbnailWrapper} ${selectedImage === img.url ? styles.activeThumbnailWrapper : ''}`}
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} miniatura`}
                    width={100}
                    height={100}
                    className={styles.thumbnail}
                    onClick={() => setSelectedImage(img.url)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
            </div>

            <div className={styles.productDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Código:</span>
                <span className={styles.detailValue}>{product.code}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Categoría:</span>
                <span className={styles.detailValue}>{product.categoryName}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Unidades por paquete:</span>
                <span className={styles.detailValue}>{product.unitsPerPack}</span>
              </div>
            </div>

            <div className={styles.descriptionContainer}>
              <h2 className={styles.descriptionTitle}>Descripción</h2>
              <p className={styles.description}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
