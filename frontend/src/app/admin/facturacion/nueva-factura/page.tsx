"use client";

import React, { useState, useEffect } from "react";
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import styles from "@modules/facturas/styles/facturas.module.css";
import InvoiceSummary from "@modules/facturas/components/InvoiceSummary";
import CustomSelect from "@shared/components/Form/Select";
import { getAllProducts } from "@services/product";
import { IProduct } from "@interfaces/Product/Product";
import { useCreateInvoice } from '@modules/facturas/hooks/useCreateInvoice'
import { useSession } from '@/contexts/Session'
import { IconTrash } from "@tabler/icons-react";
import { useShortFormatName } from "@/hooks/useShortName";

export default function BillingPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

    const { data } = useSession();

    const userName = useShortFormatName(`${data.firstName} ${data.lastName}`);

    const { createInvoice, formData, setFormData } = useCreateInvoice();

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        if (!formData.supplierName) {
            setFormData((prevData) => ({
                ...prevData,
                supplierName: userName,
            }));
        }
    }, [userName, formData.supplierName, setFormData]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (debouncedSearchTerm) {
                setLoading(true);
                setError(null);

                try {
                    const response = await getAllProducts({ search: debouncedSearchTerm, max: 100, page: 1 });

                    if (response.ok && response.result && Array.isArray(response.result.data)) {
                        const filteredProducts = response.result.data.filter(product =>
                            product.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
                        );

                        const limitedProducts = filteredProducts.slice(0, 2);

                        setProducts(limitedProducts);
                    } else {
                        setProducts([]);
                        setError("No se encontraron productos.");
                    }
                } catch (error) {
                    setError("Hubo un error al obtener los productos.");
                } finally {
                    setLoading(false);
                }
            } else {
                setProducts([]);
            }
        };

        fetchProducts();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            items: selectedProducts.map((product) => ({
                productId: product._id,
                quantity: product.quantity,
                description: product.name,
                unitPrice: product.price,
                total: product.price * product.quantity,
            }))
        }));
    }, [selectedProducts, setFormData]);

    const formatCurrency = (value: number) =>
        value.toLocaleString("es-DO", { style: "currency", currency: "DOP" });

    const addProductToCart = (product: IProduct) => {
        setSelectedProducts((prev) => {
            const existingProduct = prev.find((item) => item._id === product._id);
            if (existingProduct) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const increaseQuantity = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.map((item) =>
                item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.map((item) =>
                item._id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeProductFromCart = (productId: string) => {
        setSelectedProducts((prev) => prev.filter((item) => item._id !== productId));
    };

    const calculateTotals = () => {
        const subtotal = selectedProducts.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        );
        const itbis = subtotal * 0.18;
        const total = subtotal + itbis;
        return { subtotal, itbis, total };
    };

    const { subtotal, itbis, total } = calculateTotals();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
    };

    return (
        <div className={styles.billingPage}>
            <h1 className={styles.heading}>Detalles de la Factura</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="text"
                            value={formData.rncNumber}
                            name="rncNumber"
                            placeholder="132-38173-4"
                            maxWidth="600px"
                            disabled={true}
                        />
                    </div>
                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="text"
                            name="ncfNumber"
                            value={formData.ncfNumber}
                            placeholder="B0100001719"
                            maxWidth="600px"
                            disabled={true}
                        />
                    </div>
                </div>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            placeholder="Nombre del Cliente"
                            maxWidth="600px"
                            required
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="text"
                            name="clientRnc"
                            value={formData.clientRnc}
                            placeholder="RNC Cliente"
                            maxWidth="600px"
                            required
                            onChange={handleFormDataChange}
                        />
                    </div>
                </div>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomSelect
                            name="paymentCondition"
                            value={formData.paymentCondition}
                            placeholder="Condición de Pago"
                            maxWidth="600px"
                            options={[
                                { label: "Contado", value: "Contado" },
                                { label: "Crédito", value: "Crédito" },
                            ]}
                            required
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="text"
                            name="supplierName"
                            value={formData.supplierName}
                            placeholder={`Vendedor: ${userName}`}
                            maxWidth="600px"
                            disabled={true}
                        />
                    </div>
                </div>
                <div className={styles.billingSection}>
                    <h2>Productos</h2>
                    <div className={styles.inputSearchContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="search"
                            name="product"
                            placeholder="Buscar Producto"
                            maxWidth="100%"
                            required={false}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {loading ? (
                        <div className={styles.suggestionContainer}>
                            <p>Cargando productos...</p>
                        </div>
                    ) : error ? (
                        <div className={styles.suggestionContainer}>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className={styles.suggestionContainer}>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product._id} className={styles.productItem}>
                                        <p>{product.name}</p>
                                        <p>{formatCurrency(product.price)}</p>
                                        <CustomButton
                                            text="Agregar"
                                            onClick={() => addProductToCart(product)}
                                            styles={{ width: "100px", placeSelf: "flex-end" }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    )}
                </div>

                <h2>Productos Seleccionados</h2>
                <div className={styles.selectedProductsContainer}>
                    {selectedProducts.map((product) => (
                        <div key={product._id} className={styles.selectedProductItem}>
                            <div className={styles.productDetails}>
                                <p className={styles.productName}>{product.name}</p>
                                <p className={styles.productPrice}>
                                    {formatCurrency(product.price * product.quantity)}
                                </p>
                            </div>
                            <div className={styles.productActions}>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => decreaseQuantity(product._id)}
                                >
                                    -
                                </button>
                                <span className={styles.quantityDisplay}>{product.quantity}</span>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => increaseQuantity(product._id)}
                                >
                                    +
                                </button>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => removeProductFromCart(product._id)}
                                >
                                    <IconTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <InvoiceSummary subtotal={subtotal} itbis={itbis} total={total} />
                <div style={{ placeSelf: "flex-end", paddingTop: "16px" }}>
                    <CustomButton text="Crear Factura" buttonType="submit" onClick={createInvoice}/>
                </div>
            </form>
        </div>
    );
}
