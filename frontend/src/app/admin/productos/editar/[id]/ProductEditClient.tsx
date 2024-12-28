'use client';

import styles from '@modules/productos/styles/editProduct.module.css';
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { GetProduct } from "@interfaces/Product/GetProduct.";
import { useState } from 'react';
import { useTranformFileToBase64 } from "@/hooks/useBase64";
import { updateProduct } from '@services/product';
import { useLoader } from '@/contexts/Loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ProductEditClientProps {
    productData: GetProduct;
}

const ProductEditClient: React.FC<ProductEditClientProps> = ({ productData }) => {
    const [product, setProduct] = useState<GetProduct | null>(productData);
    const [previewImages, setPreviewImages] = useState<string[]>(productData.images.map((el) => el.url) || []);
    const router = useRouter();
    if (!product) return <div>Producto no encontrado</div>;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));

        console.log(product)
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const result = await useTranformFileToBase64(file);
        setPreviewImages((prev) => [...prev, result]);
        setProduct((prev) => ({
            ...prev!,
            images: [...(prev?.images.map((el) => el.url) || []), result],
        }));
    };

    const handleRemoveImage = (index: number) => {
        const newImages = previewImages.filter((_, i) => i !== index);
        setPreviewImages(newImages);
        setProduct((prev) => ({
            ...prev!,
            images: newImages,
        }));
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
                            value={product.name}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="price"
                            type="text"
                            placeholder="Precio del Producto"
                            value={product.price}
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
                            value={product.code}
                            maxWidth="280px" onChange={handleChange}
                        />
                    </div>
                    <div style={{ width: "280px" }}>
                        <CustomInput
                            name="unitsPerPack"
                            type="text"
                            placeholder="Unidades por Paquete"
                            value={product.unitsPerPack}
                            maxWidth="280px" onChange={handleChange}
                        />
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
                                onClick={() => handleRemoveImage(index)} // Llamada a la función para eliminar
                            >
                                <img src={image} alt="Vista previa" className={styles.preview} />
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

                            try {


                                const response = await updateProduct(productData._id, product);

                                if (response.ok) {
                                    toast.success(`Producto ${productData.name} editado correctamente.`);
                                } else {
                                    toast.success(`Error al editar el producto.`);
                                }
                                console.log(productData)
                                setLoading(false)
                                router.push('/admin/productos')
                            } catch (error) {
                                console.error("Ocurrió un error al intentar eliminar el producto:", error);

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
