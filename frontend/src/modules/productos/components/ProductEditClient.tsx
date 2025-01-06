'use client';

import styles from '@modules/productos/styles/editProduct.module.css';
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { useState } from 'react';
import { useTranformFileToBase64 } from "@/hooks/useBase64";
import { updateProduct } from '@services/product';
import { useLoader } from '@/contexts/Loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GetProduct, Image } from '@interfaces/Product/GetProduct';
import { pre } from 'framer-motion/client';
import { UpdateProduct } from '@interfaces/Product/UpdateProduct';
import { useDelay } from '@/hooks/useDelay';

interface ProductEditClientProps {
    productData: GetProduct;
}

const ProductEditClient: React.FC<ProductEditClientProps> = ({ productData }) => {
    const [product, setProduct] = useState<GetProduct<Image>>(() => ({ ...productData, images: productData.images.map((el) => el) }));
    const [previewImages, setPreviewImages] = useState<Image[]>(productData.images.map((el) => el));

    const [willDeleteImagesIds, setWillDeleteImagesIds] = useState<string[]>([]);
    const [willAddImages, setWillAddImages] = useState<string[]>([]);

    const router = useRouter();
    if (!product) return <div>Producto no encontrado</div>;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (value && name) {
            setProduct((prevProduct) => ({
                ...prevProduct!,
                [name]: value,
            }));
        }

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
            publicId: ""
        };
        const isInWillAddImages: boolean = willAddImages.some((image: string) => image === result);

        if (!isInWillAddImages) {
            const newImages = [...previewImages, newImage];
            setPreviewImages((prev) => [...prev, newImage]);
            setProduct((prev) => ({
                ...prev!,
                images: newImages,
            }));
        }

        fileInput.value = "";

        const isInProduct: boolean = productData.images.some((image: Image) => image.url === result);
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

        const isInProduct: boolean = productData.images.some((image: Image) => image._id === id);
        if (isInProduct) {
            setWillDeleteImagesIds((prev) => [...prev, id]);
        }

        setWillAddImages((prev) => prev.filter((image: string) => image !== url));
    };

    const { setLoading } = useLoader()

    return (
        <div className={styles.tableContainer}>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                <div style={{ display: "flex", justifyContent: "start", gap: "30px" }}>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="name"
                            type="text"
                            placeholder="Nombre del Producto"
                            defaultValue={product.name}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="price"
                            type="text"
                            placeholder="Precio del Producto"
                            defaultValue={product.price.toString()}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "start", gap: "30px" }}>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="code"
                            type="text"
                            placeholder="Código del Producto"
                            defaultValue={product.code}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="unitsPerPack"
                            type="text"
                            placeholder="Unidades por Paquete"
                            defaultValue={product.unitsPerPack.toString()}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "280px" }}>

                    </div>
                </div>

                <div style={{ width: "590px" }}>
                    <CustomInput
                        height="80px"
                        name="description"
                        type="text"
                        placeholder="Descripción"
                        value={product.description}
                        maxWidth="590px"
                        onChange={handleChange}
                    />
                </div>

                {/* Muestra las imágenes cargadas */}
                <div className={styles.imagesContainer}>
                    {previewImages.length > 0 ? (
                        previewImages.map((image, index) => (
                            <div
                                key={index}
                                className={styles.imageContainer}
                                onClick={() => handleRemoveImage(index, image._id, image.url)} // Llamada a la función para eliminar
                            >
                                <img src={image.url} alt="Vista previa" className={styles.preview} />
                            </div>
                        ))
                    ) : (
                        <p>No hay imágenes disponibles.</p>
                    )}
                </div>

                {/* Caja para subir imágenes */}
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

                <div style={{ display: "flex", justifyContent: "end", gap: "30px" }}>
                    <CustomButton
                        onClick={async () => {

                            setLoading(true)
                            await useDelay(2000)

                            try {

                                const model: UpdateProduct = {
                                    ...product,
                                    price: Number(product.price),
                                    imagesToDelete: willDeleteImagesIds,
                                    imagesToAdd: willAddImages,

                                }

                                console.log(model)

                                const response = await updateProduct(productData._id, model);

                                if (response.ok) {
                                    toast.success(`Producto ${productData.name} editado correctamente.`);
                                } else {
                                    toast.error(response.messages[0].message);
                                    return
                                }

                                setLoading(false)
                                router.push('/admin/productos')
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
        </div>
    );
};

export default ProductEditClient;