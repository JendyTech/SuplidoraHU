import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "@modules/productos/styles/GeneralInfo.module.css";
import CustomInput from "@shared/components/Form/Input";
import { AutoComplete, Option } from "@shared/components/Form/AutoComplete";
import { useCreateProduct } from "@modules/productos/hooks/useCreateProduct";
import UploadImage from "@/app/admin/productos/crear-producto/steps/UploadImage";
import SummaryModal from "@/app/admin/productos/crear-producto/steps/Summary";
import CustomButton from "@shared/components/Buttons/CustomButton";
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
      <div className={styles.formGrid}>
        <div className={styles.inputWrapper}>
          <CustomInput
            name="name"
            type="text"
            placeholder="Nombre del Producto"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <CustomInput
            pattern="^\d*\.?\d*$"
            name="price"
            type="number"
            isMoneyInput
            placeholder="Precio"
            value={formData.price <= 0 ? "" : formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <CustomInput
            name="code"
            type="text"
            placeholder="Código"
            required
            value={formData.code}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <CustomInput
            name="unitsPerPack"
            type="text"
            placeholder="Unidades por Paquete"
            value={formData.unitsPerPack <= 0 ? "" : formData.unitsPerPack}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <AutoComplete
            placeholder="Categoría"
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

          <CustomInput
            height="80px"
            name="description"
            type="text"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleInputChange}
            multiple
          />
        </div>
      </div>


      <UploadImage setImage={setImagesUrl} actualImage={imagesUrl} />
      <div style={{ height: 34 }} />
      <div style={{ display: "flex", justifyContent: "end", gap: "20px" }}>
        <CustomButton text="Crear" buttonType="submit" onClick={() => {
          handleSubmit()
        }} />

      </div>      <SummaryModal create={() => {

      }} isOpen={isOpen} onClose={() => { setIsOpen(false) }} productData={formData} image={imagesUrl} />

    </div>
  );
};

export default GeneralInfo;