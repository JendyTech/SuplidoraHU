"use client";

import styles from "@modules/public/styles/Catalog.module.css";
import { ContentContainer } from "@shared/components/Public/ContentContainer";
import { ProductCard } from "@shared/components/Public/ProductCard";
import { Typography } from "@shared/components/Public/Typograpy";
import { useEffect, useRef, useState } from "react";
import { CatalogProduct } from "@interfaces/catalog/CatalogProduct";
import { getCatalog } from "@services/catalog";
import { toast } from "sonner";
import { useDelay } from "@/hooks/useDelay";
import { getAllCategories, getCategoryNameById } from "@services/product";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { IconAdjustmentsHorizontal, IconSearch, IconX } from "@tabler/icons-react";
import styles2 from "@/shared/styles/components/Public/FilterProductCard.module.css";
import { ClipLoader } from "react-spinners";
import Badge from "@shared/components/Badge";
import CatalogPagination from "@/app/(public)/catalogo/components/Pagination";

interface Filter {
  search: string;
  maxPrice: number;
  minPrice: number;
  max: number;
  category: string;
}

export default function CalalogPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isNextProducts, setIsNextProducts] = useState(false);
  const [actualNextIndex, setActualNextIndex] = useState(1);
  const [changed, setChanged] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [actualCategory, setActualCategory] = useState<string>();
  const [totalPages, setTotalPages] = useState<number>(0);


  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await useDelay(1000);
      const data = await getCatalog();
      if (data.ok) {
        setProducts(data.result.data);
        setTotalPages(data.result.metadata.totalPages);
        setIsNextProducts(data.result.metadata.next);
        setTotalProducts(data.result.metadata.total);
        console.log(data.result.metadata);
      } else {
        toast.error(data.messages[0].message);
      }
      setLoading(false);
    };

    const fetchCategories = async () => {
      const response = await getAllCategories();
      if (response && response.ok && response.result) {
        const isNextPage = !!response.result.metadata?.next;
        setIsNext(isNextPage);
        setCategories(response.result.data);

      } else {
        console.error("Error en la respuesta de categorías:", response);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const [filter, setFilter] = useState<Filter>({
    max: 20,
    search: "",
    maxPrice: 0,
    minPrice: 0,
    category: "",
  });

  const defaultFilter = {
    max: 20,
    search: "",
    maxPrice: 0,
    minPrice: 0,
    category: "",
  };

  const filterProducts = async () => {
    if (filter.maxPrice < filter.minPrice) {
      toast.error("El precio maximo no puede ser menor que el precio mínimo");
      return;
    }

    const areFiltersEqual = () => {
      return (
        filter.max === defaultFilter.max &&
        filter.search === defaultFilter.search &&
        filter.maxPrice === defaultFilter.maxPrice &&
        filter.minPrice === defaultFilter.minPrice &&
        filter.category === defaultFilter.category
      );
    };

    if (areFiltersEqual()) {
      setLoading(true);

      const data = await getCatalog();
      if (data.ok) {
        setProducts(data.result.data);
      } else {
        toast.error(data.messages[0].message);
      }
      setLoading(false);
      return;
    } else {
      if (filter.category && filter.category !== "") {
        const category = await getCategoryNameById(filter.category);
        if (category.ok) {
          setActualCategory(category.result.name);
        } else {
          toast.error(category.messages[0].message);
          return;
        }
      }

      setLoading(true);
      await useDelay(1000);
      const data = await getCatalog(filter);
      if (data.ok) {
        setProducts(data.result.data);
      } else {
        toast.error(data.messages[0].message);
      }
      setLoading(false);
      setIsFiltered(true);
      setChanged(!changed);
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  const addNextCategoryPage = async () => {
    const response = await getAllCategories({ page: actualNextIndex + 1 });

    if (response && response.ok && response.result) {
      setCategories((prev) => [...prev, ...response.result.data]);
      setIsNext(response.result.metadata?.next);
      setActualNextIndex(actualNextIndex + 1);
    } else {
      console.error("Error en la respuesta de categorías:", response);
    }
  };

  const handleRemoveFilters = async () => {
    setLoading(true);

    const data = await getCatalog();
    if (data.ok) {
      setProducts(data.result.data);
    } else {
      toast.error(data.messages[0].message);
    }
    setLoading(false);
    setFilter(defaultFilter);
    setIsFiltered(false);
    setChanged(false);
    return;
  };

  const formRef = useRef<HTMLFormElement>(null);

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className={styles.main}>
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
                value={filter.search}
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
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      minPrice: parseInt(e.target.value),
                    }));
                  }}
                  value={filter.minPrice == 0 ? "" : filter.minPrice}
                />
                <input
                  type="number"
                  placeholder="Máximo"
                  className={styles2.priceInput}
                  min={0}
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      maxPrice: parseInt(e.target.value),
                    }));
                  }}
                  value={filter.maxPrice == 0 ? "" : filter.maxPrice}
                />
              </div>
            </div>

            <div className={styles2.categoriesWrapper}>
              <h3 className={styles2.categoryTitle}>Categorías</h3>
              <div>
                <form ref={formRef}>
                  {/* Opción "Todas las categorías" */}
                  <label className={styles2.categoryOption}>
                    <input
                      type="radio"
                      name="category"
                      value=""
                      className={styles2.categoryInput}
                      onChange={() => {
                        setFilter((prev) => ({
                          ...prev,
                          category: "",
                        }));
                      }}
                      checked={filter.category === ""}
                    />
                    <span className={styles2.categoryLabel}>
                      Todas las categorías
                    </span>
                  </label>

                  {categories?.map((category) => (
                    <label key={category._id} className={styles2.categoryOption}>
                      <input
                        type="radio"
                        name="category"
                        value={category.name}
                        className={styles2.categoryInput}
                        onChange={() => {
                          setFilter((prev) => ({
                            ...prev,
                            category: category._id,
                          }));
                        }}
                        checked={filter.category === category._id}
                      />
                      <span className={styles2.categoryLabel}>
                        {category.name}
                      </span>
                    </label>
                  ))}
                </form>

                {isNext ? (
                  <p
                    style={{
                      color: "var(--primary-color)",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={addNextCategoryPage}
                  >
                    Ver mas...
                  </p>
                ) : (
                  ""
                )}
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
          <section className={styles.productsContainer} style={{ width: "100%" }}>

            {isFiltered ? (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  width: "100%",
                  justifyContent: "start",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                Filtros:{" "}
                {filter.maxPrice > 0 && filter.minPrice > 0 ? (
                  <Badge
                    label={`Precio: RD$${filter.minPrice} - RD$${filter.maxPrice}`}
                    variant="success"
                  />
                ) : null}{" "}
                {filter.category ? (
                  <Badge
                    label={`Categoría: ${actualCategory}`}
                    variant="primary"
                  />
                ) : null}
                {filter.search ? (
                  <Badge label={`Buscar: ${filter.search}`} variant="warning" />
                ) : null}
                <Badge
                  label={`Limpiar filtros`}
                  variant="error"
                  onClick={() => {
                    handleRemoveFilters();
                  }}
                />
              </div>
            ) : null}
            <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>

              <div className={styles2.filterButton} onClick={() => setShowModal(true)}>
                <p>Filtros</p>

              </div>

              <CatalogPagination
                currentPage={actualNextIndex}
                onPageChange={async function (page: number) {
                  const response = await getCatalog({ page: page });
                  if (response.ok) {
                    setProducts(response.result.data);
                    setActualNextIndex(page);
                    setIsNextProducts(response.result.metadata.next);
                  }
                }}
                totalPages={totalPages - 1}

                isNextPage={isNextProducts}
              />
              <p>{
                totalProducts < 20 ? totalProducts : `${actualNextIndex * 20} a ${(actualNextIndex + 1) * 20}`
              } de {totalProducts} productos listados</p>
            </div>

            {loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "60%",
                    left: "60%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <ClipLoader size={100} color="#287881" />
                </div>
                {/* <ProductCardSkeleton /> */}
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
                  changed={changed}
                />
              </div>
            ))}
            {
              loading ? null : <CatalogPagination
                currentPage={actualNextIndex}
                onPageChange={async function (page: number) {
                  const response = await getCatalog({ page: page });
                  if (response.ok) {
                    setProducts(response.result.data);
                    setActualNextIndex(page);
                    setIsNextProducts(response.result.metadata.next);
                  }
                }}
                totalPages={totalPages - 1}

                isNextPage={isNextProducts}
              />
            }
          </section>
        </section>

      </div>
      {showModal ? <div className={styles2.cardResponsive}>
        <div className={styles2.cardResponsiveContent}>
          <div className={styles2.inputWrapper} style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
            <input
              type="text"
              placeholder="Buscar productos..."
              className={styles2.input}
              onChange={handleChangeSearch}
              value={filter.search}
            />
            <IconSearch className={styles2.iconSearch} />

            <IconX onClick={() => setShowModal(false)} size={36} strokeWidth={1.5} />

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
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    minPrice: parseInt(e.target.value),
                  }));
                }}
                value={filter.minPrice == 0 ? "" : filter.minPrice}
              />
              <input
                type="number"
                placeholder="Máximo"
                className={styles2.priceInput}
                min={0}
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    maxPrice: parseInt(e.target.value),
                  }));
                }}
                value={filter.maxPrice == 0 ? "" : filter.maxPrice}
              />
            </div>
          </div>

          <div className={styles2.categoriesWrapper}>
            <h3 className={styles2.categoryTitle}>Categorías</h3>
            <div>
              <form ref={formRef}>
                {/* Opción "Todas las categorías" */}
                <label className={styles2.categoryOption}>
                  <input
                    type="radio"
                    name="category"
                    value=""
                    className={styles2.categoryInput}
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        category: "",
                      }));
                    }}
                    checked={filter.category === ""}
                  />
                  <span className={styles2.categoryLabel}>
                    Todas las categorías
                  </span>
                </label>

                {categories?.map((category) => (
                  <label key={category._id} className={styles2.categoryOption}>
                    <input
                      type="radio"
                      name="category"
                      value={category.name}
                      className={styles2.categoryInput}
                      onChange={() => {
                        setFilter((prev) => ({
                          ...prev,
                          category: category._id,
                        }));
                      }}
                      checked={filter.category === category._id}
                    />
                    <span className={styles2.categoryLabel}>
                      {category.name}
                    </span>
                  </label>
                ))}
              </form>

              {isNext ? (
                <p
                  style={{
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={addNextCategoryPage}
                >
                  Ver mas...
                </p>
              ) : (
                ""
              )}
            </div>
            <div style={{ paddingTop: "20px" }}>
              <CustomButton
                text="Buscar"
                buttonType="button"
                onClick={() => {
                  filterProducts()
                  setShowModal(false)
                }}
                maxWidth="100%"
              />
            </div>
          </div>
        </div>
      </div> : null}
    </div>
  );
}
