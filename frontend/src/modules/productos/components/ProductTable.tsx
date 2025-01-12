"use client";

import dayjs from "dayjs";
import CustomTable from "@shared/components/CustomTable";
import { useProducts } from "@modules/productos/hooks/useProducts";
import { Pagination } from "@/contracts/API";
import { IProduct } from "@interfaces/Product/Product";
import { TableColumn } from "react-data-table-component";
import { Options } from "@shared/components/Elements/Options";
import { useRouter } from "next/navigation";
import DeleteProductModal from "@shared/components/Modal";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProduct } from "@services/product";
import { useLoader } from "@/contexts/Loader";
import CustomButton from "@shared/components/Buttons/CustomButton";
import styles from "@modules/productos/styles/productos.module.css";

interface Props {
  initialState: Pagination<IProduct>;
}

export default function ProductTable(props: Props) {
  const router = useRouter();

  const { initialState } = props;

  const headers: TableColumn<IProduct>[] = [
    { name: "Nombre", selector: (row) => row.name, maxWidth: "250px" },
    { name: "Código", selector: (row) => row.code, maxWidth: "120px" },
    {
      name: "Descripción",
      selector: (row) => row.description.substring(0, 100) + "...",
      maxWidth: "300px",
    },
    {
      name: "Estado",
      cell: (row) =>
        row.status ? (
          <span style={{ color: "#03c250", fontWeight: "500" }}>Disponible</span>
        ) : (
          <span style={{ color: "#FF5252", fontWeight: "500" }}>No disponible</span>
        ),
      maxWidth: "130px",
    },
    {
      name: "Unidades",
      selector: (row) => row.unitsPerPack,
      maxWidth: "130px",
    },
    {
      name: "Categoría",
      selector: (row) => row.categoryName,
      maxWidth: "130px",
    },
    {
      name: "Fecha de Creación",
      selector: (row) => dayjs(row.createdAt).format("DD/MM/YYYY"),
      maxWidth: "200px",
    },
    {
      name: "",
      cell: (row) => (
        <div style={{ width: "100%" }}>
          <Options
            data={{ id: 1 }}
            options={[
              {
                type: "button",
                text: "Editar",
                handler: () => {
                  if (row._id) {
                    router.push(`productos/editar/${row._id}`);
                  } else {
                    console.error("El id no está definido.");
                  }
                },
              },
              {
                type: "button",
                text: "Ver detalles",
                handler: () => {
                  if (row._id) {
                    router.push(`productos/detalle/${row._id}`);
                  } else {
                    console.error("El id no está definido.");
                  }
                },
              },
              {
                type: "button",
                text: "Eliminar",
                handler: () => openModal(row),
              },
            ]}
          />
        </div>
      ),
      maxWidth: "10px",
    },
  ];

  const { pagination, setFilters, reload } = useProducts(initialState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct>();

  const openModal = (product: IProduct) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { setLoading } = useLoader();

  const handleDelete = async () => {
    setLoading(true);
    closeModal();
    try {
      if (!productToDelete) {
        console.error("No hay producto seleccionado para eliminar.");
        return;
      }

      const response = await deleteProduct(productToDelete._id);

      if (response.ok) {
        toast.success(`Producto eliminado correctamente.`);

        reload();

        router.refresh();
      } else {
        toast.success(`Error al eliminar el producto.`);
      }

      setLoading(false);
      setProductToDelete(undefined);
    } catch (error) {
      console.error(
        "Ocurrió un error al intentar eliminar el producto:",
        error
      );

      setLoading(false);
    }
  };
  const [search, setSearch] = useState<string>("");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <CustomTable
        setFilters={setFilters}
        headers={headers}
        result={pagination}
        noDataComponent={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <p>No hay productos agregados.</p>
          </div>
        }
      >
        <div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              onChange={handleChangeSearch}
              className={styles.searchBar}
              placeholder="Buscar por código o nombre"
            />
            <div style={{ width: "170px" }}>
              <CustomButton
                text="Buscar"
                style="filled"
                buttonType="button"
                onClick={() => {
                  console.log(search);
                  setFilters({
                    page: 1,
                    max: 10,
                    search: search,
                  });
                }}
              />
            </div>
          </div>{" "}
          <br />
        </div>{" "}
      </CustomTable>
      <DeleteProductModal
        isOpen={isModalOpen}
        productName={productToDelete?.name}
        type="product"
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </>
  );
}
