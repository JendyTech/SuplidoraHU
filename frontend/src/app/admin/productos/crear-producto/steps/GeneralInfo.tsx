import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "@modules/productos/styles/GeneralInfo.module.css";
import CustomInput from "@shared/components/Form/Input";
import { AutoComplete, Option } from "@shared/components/Form/AutoComplete";

const GeneralInfo = ({
  setProductData,
  productData,
  getCategories
}: {
  setProductData: Dispatch<SetStateAction<AddProductModel>>;
  productData: AddProductModel;
  getCategories: () => Promise<Category[]>
}) => {
  const [categories, setCategories] = useState<Option[]>([]);

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
    setProductData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "unitsPerPack" ? Number(value) : value,
    }));
  };

  const handleCategory = (value: string, label: string) => {
    setProductData((prevData) => ({
      ...prevData,
      categoryId: value,
      categoryName: label,
    }));
  };
  return (
    <div className={styles.container} style={{ width: " 100%" }}>
      <h2 style={{ marginBottom: "20px" }}>Información General</h2>
      <div
        style={{
          width: " 100%",
          display: " flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "start", gap: "30px" }}>

          <div style={{ width: "280px" }}>
            <CustomInput name="name" type="text" placeholder="Nombre del Producto" value={productData.name} maxWidth="280px" onChange={handleInputChange} />
          </div>
          <div style={{ width: "280px" }}>
            <CustomInput pattern="^\d*\.?\d*$" name="price" type="number" isMoneyInput placeholder="Precio" value={productData.price <= 0 ? "" : productData.price} maxWidth="280px" onChange={handleInputChange} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "start", gap: "30px" }}>

          <div style={{ width: "280px" }}>
            <CustomInput name="code" type="text" placeholder="Código" required value={productData.code} maxWidth="280px" onChange={handleInputChange} />
          </div>
          <div style={{ width: "280px" }}>

            <AutoComplete placeholder="Categoría" freeOption options={categories} onInput={handleSeachCategory} onSelect={(value, label) => {

              value == label ? setProductData((prevState) => ({
                ...prevState,
                categoryName: value,
              })) : setProductData((prevState) => ({
                ...prevState,
                categoryId: value,
              }));


            }} />
          </div>


          <div style={{ width: "280px" }}>
            <CustomInput name="unitsPerPack" type="text" placeholder="Unidades por Paquete" value={
              productData.unitsPerPack <= 0 ? "" : productData.unitsPerPack
            } maxWidth="280px" onChange={handleInputChange} />
          </div>
        </div>
        <div className={styles.textAreaContainer}>

          <div style={{ width: "590px" }}>
            <CustomInput height="80px" name="description" type="text" placeholder="Descripción" value={productData.description} maxWidth="590px" onChange={handleInputChange} />
          </div>

          <span className="underline"></span>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
