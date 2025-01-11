import styles from "@modules/productos/styles/GeneralInfo.module.css";
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import SummaryModal from "@/app/admin/productos/crear-producto/steps/Summary";
import UploadImage from "@/app/admin/productos/crear-producto/steps/UploadImage";
import { useState } from "react";
import { useCreateProduct } from "@modules/productos/hooks/useCreateProduct";
import { AutoComplete, Option } from "@shared/components/Form/AutoComplete";
import { IconBarcode, IconBoxSeam, IconCategory, IconCurrencyDollar, IconFileDescription, IconPackage, IconPhoto } from "@tabler/icons-react";
import { toast } from "sonner";

const GeneralInfo = ({
  getCategories
}: {
  getCategories: () => Promise<Category[]>
}) => {
  const { createProduct } = useCreateProduct()
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Option[]>([]);
  const [formData, setFormData] = useState<AddProductModel>({
    name: "",
    price: 0,
    description: "",
    code: "",
    unitsPerPack: 0,
  });
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const handleSeachCategory = async (value: string) => {
    const categories = await getCategories()
    if (!categories) return;
    setCategories((prevState) => [
      ...prevState,
      ...categories
        .map((category) => ({
          label: String(category.name),
          value: category._id,
        }))
        .filter((newCategory) =>
          !prevState.some((existingCategory) => existingCategory.value === newCategory.value)
        ).slice(0, 2),
    ]);
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "unitsPerPack" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (imagesUrl.length < 1) {
      toast.error("Debe subir al menos una imagen")
      return
    }

    if (!formData.categoryId && !formData.categoryName) {
      toast.error("Debe seleccionar una categoría")
      return
    }

    createProduct(formData, imagesUrl)
  };

  return (
    <div className={styles.containergf}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconPackage className={styles.icon} />
          Crear Nuevo Producto
        </h1>
        <p className={styles.subtitle}>
          Ingrese los detalles del producto para agregarlo a su catálogo. Todos los campos marcados con * son obligatorios.
        </p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.inputWrapper}>
          <label>
            <IconPackage size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Nombre del Producto *
          </label>
          <CustomInput
            name="name"
            type="text"
            placeholder="ej. Smartphone Galaxy S21"
            value={formData.name}
            onChange={handleInputChange}
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
            value={formData.price <= 0 ? "" : formData.price}
            onChange={handleInputChange}
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
            placeholder="ej. PROD-001"
            required
            value={formData.code}
            onChange={handleInputChange}
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
            placeholder="ej. 1"
            value={formData.unitsPerPack <= 0 ? "" : formData.unitsPerPack}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputWrapper} style={{ zIndex: 1000 }}>
          <label>
            <IconCategory size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Categoría *
          </label>
          <AutoComplete
            placeholder="Seleccione o cree una categoría"
            freeOption
            options={categories}
            onInput={handleSeachCategory}
            onSelect={(value, label) => {
              value === label
                ? setFormData((prevState) => ({
                  ...prevState,
                  categoryName: value,
                }))
                : setFormData((prevState) => ({
                  ...prevState,
                  categoryId: value,
                }));
            }}
          />
        </div>

        <div className={`${styles.inputWrapper} ${styles.descriptionWrapper}`}>
          <label>
            <IconFileDescription size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Descripción
          </label>
          <CustomInput
            height="120px"
            name="description"
            type="text"
            maxWidth="100%"
            placeholder="Describa las características principales del producto..."
            value={formData.description}
            onChange={handleInputChange}
            multiple
          />
        </div>
      </div>

      <div className={styles.uploadSection}>
        <IconPhoto size={32} style={{ marginBottom: '16px', color: '#287881' }} />
        <h3 className={styles.uploadTitle}>Imágenes del Producto *</h3>
        <p className={styles.uploadDescription}>
          Sube imágenes de alta calidad que muestren claramente tu producto. Se recomienda usar un fondo blanco.
        </p>
        <UploadImage setImage={setImagesUrl} actualImage={imagesUrl} />
      </div>

      <div className={styles.buttonContainer}>
        <CustomButton 
          text="Crear Producto"
          buttonType="submit"
          onClick={handleSubmit}
        />
      </div>

      <SummaryModal 
        create={() => {}} 
        isOpen={isOpen} 
        onClose={() => { setIsOpen(false) }} 
        productData={formData} 
        image={imagesUrl} 
      />
    </div>
  );
};

export default GeneralInfo;