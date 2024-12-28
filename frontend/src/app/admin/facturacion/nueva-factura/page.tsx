"use client";

import React, { useState, useEffect } from "react";
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import styles from "@modules/facturas/styles/facturas.module.css";
import InvoiceSummary from "@modules/facturas/components/InvoiceSummary";
import CustomSelect from "@shared/components/Form/Select";
import { useCreateInvoice } from "@modules/facturas/hooks/useCreateInvoice";
import { useSession } from "@/contexts/Session";
import { IconTrash } from "@tabler/icons-react";
import { useShortFormatName } from "@/hooks/useShortName";
import { useCart } from "@modules/facturas/hooks/useCart";
import { useProductSearch } from "@modules/facturas/hooks/useProductSearch";

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { createInvoice, formData, setFormData, handleFormDataChange } =
    useCreateInvoice();
  const {
    selectedProducts,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    calculateTotals,
  } = useCart();
  const { products, loading, error } = useProductSearch(searchTerm);
  const { subtotal, itbis, total } = calculateTotals();

  const { data } = useSession();
  const userName = useShortFormatName(`${data.firstName} ${data.lastName}`);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!formData.supplierName) {
      setFormData((prevData) => ({
        ...prevData,
        supplierName: userName,
      }));
    }
  }, [userName, formData.supplierName, setFormData]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      items: selectedProducts.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        description: product.name,
        unitPrice: product.price,
        total: product.price * product.quantity,
      })),
    }));
  }, [selectedProducts, setFormData]);

  const formatCurrency = (value: number) =>
    value.toLocaleString("es-DO", { style: "currency", currency: "DOP" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.billingPage}>
      <h1 className={styles.heading}>Detalles de la Factura</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer} style={{ width: "100%" }}>
            <label htmlFor="rncNumber">RNC</label>
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
            <label htmlFor="supplierName">Suplidor</label>
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
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer} style={{ width: "100%" }}>
            <label htmlFor="clientName">Cliente</label>
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
            <label htmlFor="clientRnc">RNC Cliente</label>
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
            <label htmlFor="paymentCondition">Condición de Pago</label>
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
            <label htmlFor="expirationDate">Fecha de Expiración</label>
            <CustomInput
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              maxWidth="600px"
              disabled={true}
            />
          </div>
        </div>
        <div className={styles.billingSection}>
          <h2>Productos</h2>
          <div
            className={styles.inputSearchContainer}
            style={{ width: "100%" }}
          >
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
                <span className={styles.quantityDisplay}>
                  {product.quantity}
                </span>
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
          <CustomButton
            text="Crear Factura"
            buttonType="submit"
            onClick={createInvoice}
          />
        </div>
      </form>
    </div>
  );
}
