import { getProductById } from "@services/product";
import { PageParams } from "@/interfaces/Page";
import { IconTag, IconPackage, IconCalendar } from "@tabler/icons-react";
import styles from "@modules/productos/styles/detailProduct.module.css";
import dayjs from "dayjs";

export default async function ProductDetail(props: PageParams) {
  const { id } = await props.params;

  try {
    const response = await getProductById(id, true);

    if (!response.ok) {
      return <div className={styles.error}>Error: Producto no encontrado</div>;
    }

    const { result: product } = response;

    dayjs.locale("es");



    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {product.images.length > 0 ? (
            <>
              <img
                src={product.images[0].url}
                alt={product.name}
                className={styles.productImage}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                {product.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className={styles.productMiniImages}
                    width={100}
                    height={100}


                  />
                ))}</div></>
          ) : (
            <div className={styles.noImage}>No hay imágenes disponibles</div>
          )}
        </div>
        <div className={styles.detailsContainer}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productCode}>Código: {product.code}</p>
          <div className={styles.infoBox}>
            <div className={styles.infoItem}>
              <IconTag size={24} strokeWidth={1.5} />
              <div>
                <span>Categoría:</span>
                <p>{product.categoryName}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <IconPackage size={24} strokeWidth={1.5} />
              <div>
                <span>Unidades por Paquete:</span>
                <p>{product.unitsPerPack}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <IconCalendar size={24} strokeWidth={1.5} />
              <div>
                <span>Fecha de Creación:</span>
                <p> {dayjs(product.createdAt).format("DD/MM/YYYY")}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <IconCalendar size={24} strokeWidth={1.5} />
              <div>
                <span>Disponibilidad:</span>
                <p style={product.status ? {color:"#03c250"} : {color: "#FF5252"}}>{product.status ? "Disponible" : "No disponible"}</p>
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <h2>Descripción</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <div className={styles.error}>Error al cargar el producto</div>;
  }
}
