
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "@shared/styles/components/Public/productDetails.module.css"; // Import CSS Module
import { useRouter } from "next/navigation";
import { PageParams } from "@interfaces/Page";
import { getProductById } from "@services/product";
import { IconChevronLeft, IconStar } from "@tabler/icons-react";

export default async function ProductDetails(props: PageParams) {
    const { id } = await props.params;
    const navigate = useRouter();
    const [imageIndex, setImageIndex] = useState<number>(0);

    try {
        const response = await getProductById(id, true);

        console.log(response)

        if (!response.ok) {


            return (
                <div>
                    error no encontrado
                </div>
            )
        }

        const { result: product } = response


        useEffect(() => {
            if (!product) return;

            const interval = setInterval(() => {
                const newIndex = imageIndex + 1;
                const next = product.images[newIndex];

                if (!next) {
                    setImageIndex(0);
                    return;
                }

                setImageIndex(newIndex);
            }, 3000);

            return () => {
                clearInterval(interval);
            };
        }, [product, imageIndex]);

        if (!product) {
            return (
                <div className={styles.centered}>
                    <p>Product not found</p>
                </div>
            );
        }

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.container}
            >
                <div className={styles.content}>
                    <button onClick={() => navigate.back()} className={styles.backButton}>
                        <IconChevronLeft size={20} />
                        Volver al catálogo
                    </button>

                    <div className={styles.grid}>
                        {/* Image Gallery */}
                        <div>
                            <div className={styles.imageWrapper}>
                                <motion.img
                                    key={imageIndex}
                                    src={product.images[imageIndex].url}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className={styles.mainImage}
                                />
                            </div>
                            <div className={styles.thumbnailGrid}>
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`${product.name} view ${index + 2}`}
                                        className={`${styles.thumbnail} ${imageIndex === index ? styles.activeThumbnail : ""
                                            }`}
                                        onClick={() => setImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>


                        <div>
                            <div className={styles.price}>${product.price.toFixed(2)}</div>
                            <div>
                                <h2 className={styles.subtitle}>Descripción</h2>
                                <p className={styles.text}>{product.description}</p>
                            </div>




                        </div>
                    </div>
                </div>
            </motion.div>
        );
    } catch (error) {

        return (
            <div>error</div>
        )
    }
}
