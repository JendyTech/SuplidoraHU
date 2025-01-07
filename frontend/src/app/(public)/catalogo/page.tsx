"use client";

import styles from "@modules/public/styles/Catalog.module.css";
import { ProductCardSkeleton } from "@shared/components/Public/ProductCardSkeleton";
import { ContentContainer } from "@shared/components/Public/ContentContainer";
import { ProductCard } from "@shared/components/Public/ProductCard";
import { Typography } from "@shared/components/Public/Typograpy";
import { useEffect, useState } from "react";
import { CatalogProduct } from "@interfaces/catalog/CatalogProduct";
import { getCatalog } from "@services/catalog";
import { toast } from "sonner";
import { useDelay } from "@/hooks/useDelay";
import { div } from "framer-motion/client";
import { getAllCategories } from "@services/product";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import styles2 from "@/shared/styles/components/Public/FilterProductCard.module.css";

export default function CalalogPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      await useDelay(1000);
      const data = await getCatalog();
      if (data.ok) {
        setProducts(data.result.data);
      } else {
        toast.error(data.messages[0].message);
      }
      setLoading(false);
    };

    const fetchCategories = async () => {
      const response = await getAllCategories();
      if (response.ok) {
        setCategories(response.result.data);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const [search, setSearch] = useState<string>("");

  const filterProducts = async () => {

    if (search == "") return;
    setLoading(true);
    await useDelay(500);
    const data = await getCatalog({
      page: 1,
      max: 10,
      search: search,
    });
    if (data.ok) {
      setProducts(data.result.data);
    } else {
      toast.error(data.messages[0].message);
    }
    setLoading(false);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <ContentContainer>
      <header>
        <Typography textAlign="left" variant="h1">
          Catálogo de Productos de Alta Calidad para Todos tus Necesidades
        </Typography>

        <Typography
          variant="span"
          fontSize="16px"
          fontWeight={500}
          color="#6b7280"
        >
          Explora nuestro catálogo de productos cuidadosamente seleccionados
          para ofrecerte lo mejor en calidad y variedad. Desde tecnología hasta
          artículos para el hogar, encuentra todo lo que necesitas con opciones
          accesibles y de confianza. Actualizado regularmente, nuestro catálogo
          está diseñado para satisfacer tus expectativas y brindarte una
          experiencia de compra única. ¡Descubre lo que tenemos para ti!
        </Typography>
      </header>
      <section className={styles.container}>
        <div className={styles2.card}>
          <div className={styles2.inputWrapper}>
            <input
              type="text"
              placeholder="Buscar productos..."
              className={styles2.input}
              onChange={handleChangeSearch}
            />
            <IconSearch className={styles2.iconSearch} />
          </div>

          <div className={styles2.priceRangeWrapper}>
            <div className={styles2.priceRangeHeader}>
              <IconAdjustmentsHorizontal className={styles2.iconSliders} />
              <h3 className={styles2.priceRangeTitle}>Rango de precio</h3>
            </div>
            <div className={styles2.priceInputWrapper}>
              <input
                type="number"
                placeholder="Mínimo"
                className={styles2.priceInput}
                min={0}
              />
              <input
                type="number"
                placeholder="Máximo"
                className={styles2.priceInput}
                min={0}
              />
            </div>
          </div>

          <div className={styles2.categoriesWrapper}>
            <h3 className={styles2.categoryTitle}>Categorías</h3>
            <div>
              {categories?.map((category) => (
                <label key={category._id} className={styles2.categoryOption}>
                  <input
                    type="radio"
                    name="category"
                    value={category.name}
                    className={styles2.categoryInput}
                  />
                  <span className={styles2.categoryLabel}>{category.name}</span>
                </label>
              ))}
            </div>
            <div style={{ paddingTop: "20px" }}>
              <CustomButton
                text="Buscar"
                buttonType="button"
                onClick={() => filterProducts()}
              />
            </div>
          </div>
        </div>
        <section className={styles.productsContainer}>
          {loading ? (
            <div style={{ width: "100%" }}>
              <ProductCardSkeleton />
            </div>
          ) : products.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : null}

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
  );
}
