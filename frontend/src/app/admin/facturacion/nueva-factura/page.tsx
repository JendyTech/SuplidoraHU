"use client";

import React from "react";
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import styles from "@modules/facturas/styles/facturas.module.css";
import { IconTrash } from "@tabler/icons-react";

export default function BillingPage() {
    const products = [
        { id: 1, name: "Producto Falso 1", unitPrice: 20000, quantity: 15 },
        { id: 2, name: "Producto Falso 3", unitPrice: 15000, quantity: 1 },
    ];

    const formatCurrency = (value: number) =>
        value.toLocaleString("es-DO", { style: "currency", currency: "DOP" });

    return (
        <div className={styles.billingPage}>
            <h1 className={styles.heading}>Generar Factura</h1>
            <form className={styles.formContainer}>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="search"
                            name="clientName"
                            placeholder="Buscar Cliente"
                            maxWidth="600px"
                            required
                        />
                    </div>

                    <div className={styles.inputContainer} style={{ width: "100%" }}>
                        <CustomInput
                            type="search"
                            name="product"
                            placeholder="Buscar Producto"
                            maxWidth="100%"
                            required
                        />
                        <div className={styles.productButton}>
                            <CustomButton text="Agregar Producto" />
                        </div>
                    </div>
                </div>
                <div className={styles.productList}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productContainer}>
                            <div className={styles.productDetails}>
                                <img
                                    src="https://via.placeholder.com/80"
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productTitle}>{product.name}</h3>
                                    <p className={styles.productPrice}>
                                        Precio unitario: {formatCurrency(product.unitPrice)}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.productActions}>
                                <div className={styles.quantityControl}>
                                    <button className={styles.quantityButton}>-</button>
                                    <span className={styles.quantityValue}>{product.quantity}</span>
                                    <button className={styles.quantityButton}>+</button>
                                </div>
                                <p className={styles.totalPrice}>
                                    Total: {formatCurrency(product.unitPrice * product.quantity)}
                                </p>
                                <IconTrash className={styles.deleteIcon} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.InvoicesContainer}>
                    <div className={styles.invoiceSummary}>
                        <div className={styles.invoiceRow}>
                            <span className={styles.label}>Subtotal:</span>
                            <span className={styles.amount}>
                                {formatCurrency(
                                    products.reduce(
                                        (sum, product) => sum + product.unitPrice * product.quantity,
                                        0
                                    )
                                )}
                            </span>
                        </div>
                        <div className={styles.invoiceRow}>
                            <span className={styles.label}>ITBIS (18%):</span>
                            <span className={styles.amount}>
                                {formatCurrency(
                                    products.reduce(
                                        (sum, product) => sum + product.unitPrice * product.quantity,
                                        0
                                    ) * 0.18
                                )}
                            </span>
                        </div>
                        <div className={`${styles.invoiceRow} ${styles.totalRow}`}>
                            <span className={styles.label}>Total:</span>
                            <span className={styles.amount}>
                                {formatCurrency(
                                    products.reduce(
                                        (sum, product) => sum + product.unitPrice * product.quantity,
                                        0
                                    ) * 1.18
                                )}
                            </span>
                        </div>
                    </div>
                    <div style={{ placeSelf: "flex-end", paddingTop: "16px" }}>
                        <CustomButton text="Generar Factura" buttonType="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}
