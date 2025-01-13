"use client";

import { useLoader } from "@/contexts/Loader";
import { useDelay } from "@/hooks/useDelay";
import { Pagination } from "@contracts/API";
import { IProduct } from "@interfaces/Product/Product";
import { GetProduct, Image } from "@interfaces/Product/GetProduct";
import { CatalogProduct } from "@interfaces/catalog/CatalogProduct";
import styles from "@modules/dashboard/styles/dashboard.module.css";
import { InfoContainer } from "@modules/productos/components/InfoContainer";
import { useProducts } from "@modules/productos/hooks/useProducts";
import { getAllProducts, getAllCategories } from "@services/product";
import CustomTable from "@shared/components/CustomTable";
import {
  IconCalendarTime,
  IconCategory,
  IconShoppingCart,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { AutoComplete } from "@shared/components/Form/AutoComplete";
import { getCatalog } from "@services/catalog";
import { toast } from "sonner";
import { ProductCard } from "@shared/components/Public/ProductCard";

export default function AdminPage() {
  const [last3Products, setLast3Products] = useState<Pagination<IProduct>>();
  const [allProducts, setAllProducts] = useState<Pagination<IProduct>>();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalCategories, setTotalCategories] = useState<number>(0);

  const { setLoading } = useLoader();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await useDelay(1000);
      const data = await getCatalog();
      if (data.ok) {
        setProducts(data.result.data.slice(-3));
      } else {
        toast.error(data.messages[0].message);
      }

      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const setData = async () => {
      setLoading(true);

      const productsResponse = await getAllProducts({}, false);
      const categoriesResponse = await getAllCategories({});

      if (!productsResponse.ok || !categoriesResponse.ok) {
        setLoading(false);
        return;
      }

      const productData = productsResponse.result;
      const categoryData = categoriesResponse.result;

      const sortedProducts = [...productData.data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const last3 = sortedProducts.slice(0, 3);

      await useDelay(3000);
      setAllProducts(productData);
      setLast3Products({ ...productData, data: last3 });
      setTotalProducts(productData.metadata.total);
      setTotalCategories(categoryData.metadata.total);
      setLoading(false);
    };
    setData();
  }, []);

  const productsHeaders: TableColumn<IProduct>[] = [
    { name: "Nombre", selector: (row) => row.name, width: "350px" },
    { name: "Código", selector: (row) => row.code, width: "120px" },
    {
      name: "Estado",
      cell: (row) =>
        row.status ? (
          <span style={{ color: "#03c250", fontWeight: "500" }}>
            Disponible
          </span>
        ) : (
          <span style={{ color: "#FF5252", fontWeight: "500" }}>
            No disponible
          </span>
        ),
      maxWidth: "130px",
    },
    { name: "Unidades por paquete", selector: (row) => row.unitsPerPack },
    {
      name: "Fecha de Creación",
      selector: (row) => dayjs(row.createdAt).format("DD [de] MMMM YYYY"),
    },
  ];

  return (
    <>
      <div className={styles.main}>
        <div
          className={styles.infoContainerGroup}
          style={{ display: "flex", gap: "20px", width: "100%" }}
        >
          <InfoContainer
            Icon={IconShoppingCart}
            title={totalProducts}
            subtitle="Productos en sistema"
            color="#EF7B52"
          />
          <InfoContainer
            Icon={IconShoppingCartPlus}
            title={
              allProducts?.data.filter((product) => product.status === true)
                .length || 0
            }
            subtitle="Productos activos"
            color="#287881"
          />
          <InfoContainer
            Icon={IconCategory}
            title={totalCategories}
            subtitle="Total Categorias"
            color="#EF7B52"
          />
          <InfoContainer
            Icon={IconCalendarTime}
            title={
              last3Products?.data[0]
                ? dayjs(last3Products.data[0].createdAt).format("DD/MM/YYYY")
                : "N/A"
            }
            subtitle="Última publicación"
            color="#287881"
          />
        </div>

        <div style={{ display: "flex", gap: "20px", width: "100%" }}>
          <div className={styles.container}>
            <h3>Últimos productos agregados</h3>
            <br />
            <CustomTable
              setFilters={() => {}}
              headers={productsHeaders}
              result={last3Products}
              paginationEnabled={false}
              customStyles={{
                header: {
                  style: {
                    minHeight: "56px",
                    backgroundColor: "#f8f9fa",
                  },
                },
                headRow: {
                  style: {
                    borderTopStyle: "solid",
                    borderTopWidth: "1px",
                    borderTopColor: "#d1d5db",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1px",
                    borderLeftColor: "#d1d5db",
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: "#d1d5db",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    backgroundColor: "#287881",
                  },
                },
                headCells: {
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                  },
                },
                rows: {
                  style: {
                    minHeight: "48px",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1px",
                    borderBottomColor: "#d1d5db",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1px",
                    borderLeftColor: "#d1d5db",
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: "#d1d5db",
                    backgroundColor: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#f3f4f6",
                    },
                    "&:last-child": {
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                    },
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                gap: "20px",
                width: "100%",
                marginTop: "20px",
              }}
            >
              {products.map((product, i) => (
                <div key={i}>
                  <ProductCard
                    id={product.id}
                    key={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.image}
                    code={product.code}
                    category={product.category}
                    changed={false}
                    description={""}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
