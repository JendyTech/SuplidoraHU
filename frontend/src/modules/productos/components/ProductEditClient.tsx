"use client";

import styles from "@modules/productos/styles/editProduct.module.css";
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { useState } from "react";
import { useTranformFileToBase64 } from "@/hooks/useBase64";
import { getAllCategories, updateProduct } from "@services/product";
import { useLoader } from "@/contexts/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GetProduct, Image } from "@interfaces/Product/GetProduct";
import { UpdateProduct } from "@interfaces/Product/UpdateProduct";
import { useDelay } from "@/hooks/useDelay";
import { AutoComplete, Option } from "@shared/components/Form/AutoComplete";
import {
  IconBarcode,
  IconBoxSeam,
  IconCategory,
  IconCurrencyDollar,
  IconFileDescription,
  IconPackage,
  IconPhoto,
} from "@tabler/icons-react";

interface ProductEditClientProps {
  productData: GetProduct;
}

const ProductEditClient: React.FC<ProductEditClientProps> = ({
  productData,
}) => {
  const [product, setProduct] = useState<GetProduct<Image>>(() => ({
    ...productData,
    images: productData.images.map((el) => el),
  }));
  const [previewImages, setPreviewImages] = useState<Image[]>(
    productData.images.map((el) => el)
  );

  const [willDeleteImagesIds, setWillDeleteImagesIds] = useState<string[]>([]);
  const [willAddImages, setWillAddImages] = useState<string[]>([]);

  const router = useRouter();
  if (!product) return <div>Producto no encontrado</div>;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (value && name) {
      setProduct((prevProduct) => ({
        ...prevProduct!,
        [name]: value,
      }));
    }
  };

  const [categories, setCategories] = useState<Option[]>([]);

  const getCategories = async () => {
    const response = await getAllCategories();

    if (response.ok) {
      const categories = response.result.data;
      return categories;
    }

    return [];
  };

  const handleSeachCategory = async (value: string) => {
    const categories = await getCategories();
    if (!categories) return;
    setCategories((prevState) => [
      ...prevState,
      ...categories
        .map((category) => ({
          label: String(category.name),
          value: category._id,
        }))
        .filter(
          (newCategory) =>
            !prevState.some(
              (existingCategory) => existingCategory.value === newCategory.value
            )
        )
        .slice(0, 2),
    ]);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files?.[0];
    if (!file) return;

    const result = await useTranformFileToBase64(file);

    const newImage: Image = {
      _id: "",
      url: result,
      productId: product._id,
      uploadBy: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      publicId: "",
    };
    const isInWillAddImages: boolean = willAddImages.some(
      (image: string) => image === result
    );

    if (!isInWillAddImages) {
      const newImages = [...previewImages, newImage];
      setPreviewImages((prev) => [...prev, newImage]);
      setProduct((prev) => ({
        ...prev!,
        images: newImages,
      }));
    }

    fileInput.value = "";

    const isInProduct: boolean = productData.images.some(
      (image: Image) => image.url === result
    );
    if (!isInProduct && !isInWillAddImages) {
      setWillAddImages((prev) => [...prev, result]);
    }
  };

  const handleRemoveImage = (index: number, id: string, url: string) => {
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
    setProduct((prev) => ({
      ...prev!,
      images: newImages,
    }));

    const isInProduct: boolean = productData.images.some(
      (image: Image) => image._id === id
    );
    if (isInProduct) {
      setWillDeleteImagesIds((prev) => [...prev, id]);
    }

    setWillAddImages((prev) => prev.filter((image: string) => image !== url));
  };

  const { setLoading } = useLoader();

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconPackage className={styles.icon} />
          Editar Producto
        </h1>
        <p className={styles.subtitle}>
          Modifique los detalles del producto para actualizarlo en su catálogo. Todos
          los campos marcados con * son obligatorios.
        </p>
      </div>
      <div className={styles.formGrid}>
        <div className={styles.inputWrapper}>
          <label>
            <IconPackage
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            Nombre del Producto *
          </label>
          <CustomInput
            name="name"
            type="text"
            placeholder="Nombre del Producto"
            defaultValue={product.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>
            <IconCurrencyDollar size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Precio *
          </label>
          <CustomInput
            pattern="^\d*\.?\d*$"
            name="price"
            type="number"
            isMoneyInput
            placeholder="ej. 299.99"
            defaultValue={product.price.toString()}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label>
            <IconBarcode size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Código *
          </label>
          <CustomInput
            name="code"
            type="text"
            placeholder="Código del Producto"
            defaultValue={product.code}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label>
            <IconBoxSeam size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Unidades por Paquete
          </label>
          <CustomInput
            name="unitsPerPack"
            type="text"
            placeholder="Unidades por Paquete"
            defaultValue={product.unitsPerPack.toString()}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper} style={{ zIndex: 1000 }}>
          <label>
            <IconCategory
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            Categoría *
          </label>
          <AutoComplete
            placeholder="Seleccione o cree una categoría"
            freeOption
            options={categories}
            onInput={handleSeachCategory}
            onSelect={(value, label) => {
              value === label
                ? setProduct((prevProduct) => ({
                  ...prevProduct,
                  categoryName: value,
                }))
                : setProduct((prevProduct) => ({
                  ...prevProduct,
                  categoryId: value,
                }));
            }}
          />
        </div>

        <div className={`${styles.inputWrapper} ${styles.descriptionWrapper}`}>
          <label>
            <IconFileDescription
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            Descripción
          </label>
          <CustomInput
            height="120px"
            name="description"
            type="text"
            maxWidth="100%"
            placeholder="Describa las características principales del producto..."
            value={product.description}
            onChange={handleChange}
            multiple
          />
        </div>
      </div>

      <div className={styles.imagesContainer}>
        {previewImages.length > 0 ? (
          previewImages.map((image, index) => (
            <div
              key={index}
              className={styles.imageContainer}
              onClick={() => handleRemoveImage(index, image._id, image.url)}
            >
              <img
                src={image.url}
                alt="Vista previa"
                className={styles.preview}
              />
            </div>
          ))
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
      </div>

      <div className={styles.uploadSection}>
        <IconPhoto
          size={32}
          style={{ marginBottom: "16px", color: "#287881" }}
        />
        <h3 className={styles.uploadTitle}>Imágenes del Producto *</h3>
        <p className={styles.uploadDescription}>
          Sube imágenes de alta calidad que muestren claramente tu producto. Se
          recomienda usar un fondo blanco.
        </p>
        <div className={styles.uploadBox}>
          <div>
            <p>Selecciona una imagen para cargar</p>
            <p>Haga click o arrastre una</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <CustomButton
          onClick={async () => {
            console.log(product);

            setLoading(true);
            await useDelay(2000);

            try {
              const model: UpdateProduct = {
                ...product,
                price: Number(product.price),
                imagesToDelete: willDeleteImagesIds,
                imagesToAdd: willAddImages,
              };

              console.log(model);

              const response = await updateProduct(productData._id, model);

              if (response.ok) {
                toast.success(
                  `Producto ${productData.name} editado correctamente.`
                );
              } else {
                toast.error(response.messages[0].message);
                return;
              }

              setLoading(false);
              router.push("/admin/productos");
            } catch (error) {
              setLoading(false);
            } finally {
              setLoading(false);
            }
          }}
          style="filled"
          maxWidth="200px"
          text="Guardar cambios"
          buttonType="submit"
        />
      </div>
    </div>
  );
};

export default ProductEditClient;
