"use client"

import styles from "@/modules/productos/styles/editProduct.module.css"
import CustomInput from "@/shared/components/Form/Input"
import CustomButton from "@/shared/components/Buttons/CustomButton"
import { useState } from "react"
import { useTranformFileToBase64 } from "@/hooks/useBase64"
import { getAllCategories, updateProduct } from "@services/product"
import { useLoader } from "@/contexts/Loader"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { GetProduct, Image } from "@/interfaces/Product/GetProduct"
import { UpdateProduct } from "@/interfaces/Product/UpdateProduct"
import { useDelay } from "@/hooks/useDelay"
import { AutoComplete, Option } from "@/shared/components/Form/AutoComplete"
import {
  IconBarcode,
  IconBoxSeam,
  IconCategory,
  IconCurrencyDollar,
  IconFileDescription,
  IconPackage,
  IconPhoto,
} from "@tabler/icons-react"
import CustomSelect from "@/shared/components/Form/Select"
import { Autocomplete, TextField } from '@mui/material'

interface ProductEditClientProps {
  productData: GetProduct,
  categories: string[]
}

const inputProps = {
  width: "100%",
  backgroundColor: "#F4F5F9",
  borderRadius: "8px",


  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: 400,
    color: "#727272",
    marginBottom: "20px"
  },


  "& .MuiOutlinedInput-root": {
    height: "46px",
    fontSize: "14px",
    color: "#727272",
    padding: "0 16px",

    "& fieldset": {
      borderRadius: "8px",
      border: "1px solid #DBDCDE",
    },

    "&:hover fieldset": {
      borderColor: "#B0B3B8",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#727272",
    },
  },
}

const ProductEditClient: React.FC<ProductEditClientProps> = ({
  productData,
  categories

}) => {
  const [product, setProduct] = useState<GetProduct<Image>>(() => ({
    ...productData,
    images: productData.images.map((el) => el),
    categoryName: productData.categoryName,
  }))

  const [status, setStatus] = useState<boolean>(productData.status)

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value == "true"
    setStatus(selectedValue)
  }

  const [previewImages, setPreviewImages] = useState<Image[]>(
    productData.images.map((el) => el)
  )

  const [willDeleteImagesIds, setWillDeleteImagesIds] = useState<string[]>([])
  const [willAddImages, setWillAddImages] = useState<string[]>([])

  const router = useRouter()
  if (!product) return <div>Producto no encontrado</div>

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    if (value && name) {
      setProduct((prevProduct) => ({
        ...prevProduct!,
        [name]: value,
      }))
    }
  }


  const getCategories = async () => {
    const response = await getAllCategories()

    if (response.ok) {
      const categories = response.result.data
      return categories
    }

    return []
  }


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target
    const file = fileInput.files?.[0]
    if (!file) return

    const result = await useTranformFileToBase64(file)

    const newImage: Image = {
      _id: "",
      url: result,
      productId: product._id,
      uploadBy: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      publicId: "",
    }
    const isInWillAddImages: boolean = willAddImages.some(
      (image: string) => image === result
    )

    if (!isInWillAddImages) {
      const newImages = [...previewImages, newImage]
      setPreviewImages((prev) => [...prev, newImage])
      setProduct((prev) => ({
        ...prev!,
        images: newImages,
      }))
    }


    fileInput.value = ""

    const isInProduct: boolean = productData.images.some(
      (image: Image) => image.url === result
    )
    if (!isInProduct && !isInWillAddImages) {
      setWillAddImages((prev) => [...prev, result])
    }
  }

  const handleRemoveImage = (index: number, id: string, url: string) => {
    const newImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(newImages)
    setProduct((prev) => ({
      ...prev!,
      images: newImages,
    }))

    const isInProduct: boolean = productData.images.some(
      (image: Image) => image._id === id
    )
    if (isInProduct) {
      setWillDeleteImagesIds((prev) => [...prev, id])
    }

    setWillAddImages((prev) => prev.filter((image: string) => image !== url))
  }

  const { setLoading } = useLoader()

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconPackage className={styles.icon} />
          Editar Producto
        </h1>
        <p className={styles.subtitle}>
          Modifique los detalles del producto para actualizarlo en su catálogo.
          Todos los campos marcados con * son obligatorios.
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
            <IconCurrencyDollar
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
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
            <IconBarcode
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
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
            <IconBoxSeam
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
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

        <div className={styles.inputWrapper} style={{ zIndex: 1 }}>
          <label>
            <IconCategory
              size={18}
              style={{ display: "inline", marginRight: "8px" }}
            />
            Categoría *
          </label>
          <Autocomplete
            disablePortal
            options={categories}
            getOptionLabel={(option) => option}
            sx={{ width: '330px' }}
            defaultValue={product.categoryName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Escribe aquí la categoría"
                variant="outlined"

                sx={inputProps}
              />
            )}
            onChange={(event, newValue) => {
              setProduct((prevState) => ({
                ...prevState,
                categoryName: newValue ?? "N/A",
              }))
            }}
          />

        </div>

        <div className={styles.inputWrapper}>
          <label>Estado del Producto *</label>
          <CustomSelect
            name="status"
            options={[
              { label: "Disponible", value: "true" },
              { label: "No Disponible", value: "false" },
            ]}
            value={status ? "true" : "false"}
            onChange={handleStatusChange}
            placeholder="Selecciona el estado del producto"
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

            setLoading(true)
            await useDelay(2000)

            try {

              const uProduct: UpdateProduct = {
                name: product.name,
                price: Number(product.price),
                status,
                description: product.description,
                code: product.code,
                unitsPerPack: Number(product.unitsPerPack),
                imagesToDelete: willDeleteImagesIds,
                imagesToAdd: willAddImages,
                images: product.images,
                categoryName: product.categoryName ?? "N/A",
              }

              const model: UpdateProduct = uProduct


              const response = await updateProduct(productData._id, model)

              if (response.ok) {
                toast.success(
                  `Producto ${productData.name} editado correctamente.`
                )
              } else {
                toast.error(response.messages[0].message)
                return
              }

              setLoading(false)
              router.push("/admin/productos")
            } catch (error) {
              setLoading(false)
            } finally {
              setLoading(false)
            }
          }}
          style="filled"
          maxWidth="200px"
          text="Guardar cambios"
          buttonType="submit"
        />
      </div>
    </div>
  )
}

export default ProductEditClient
