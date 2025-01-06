"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IInvoice } from "@interfaces/Invoice/Invoice";
import { FinalResult } from "@contracts/Client";
import { getInvoiceById } from "@services/invoice";
import { useInvoiceSearch } from "@modules/facturas/hooks/useInvoiceSearch";
import { useProductSearch } from "@modules/facturas/hooks/useProductSearch";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useCreateCreditNotes } from "@modules/notas_creditos/hooks/useCreateCreditNotes";
import CustomInput from "@shared/components/Form/Input";
import CustomButton from "@shared/components/Buttons/CustomButton";
import styles from "@modules/facturas/styles/notas.module.css";
import { desc } from "framer-motion/client";

export default function CreditNoteForm() {
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [invoiceSelected, setInvoiceSelected] = useState(false);
  const [reason, setReason] = useState("");
  const [ncfNumber, setNcfNumber] = useState<string>("");
  const [showPopover, setShowPopover] = useState(false);

  const {
    invoices,
    loading: invoicesLoading,
    error,
  } = useInvoiceSearch(invoiceSearch);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProductSearch(productSearch);

  const { formData, setFormData, createCreditNote } = useCreateCreditNotes();

  const handleInvoiceSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInvoiceSearch(query);

    if (query) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleInvoiceClick = async (invoice: IInvoice) => {
    setInvoiceSearch(invoice.invoiceNumber);
    setShowDropdown(false);
    setInvoiceSelected(true);

    try {
      const invoiceWithItems: FinalResult<IInvoice> = await getInvoiceById(
        invoice._id,
        true
      );

      if (invoiceWithItems.ok) {
        const items = invoiceWithItems.result.items;
        setNcfNumber(invoiceWithItems.result.ncfNumber);

        const formattedItems = items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          description: item.description,
          unitPrice: item.unitPrice,
          total: item.total,
          creditNoteId: item.creditNoteId,
        }));

        setInvoiceItems(formattedItems);

        setFormData((prev) => ({
          ...prev,
          invoiceId: invoice._id,
          items: formattedItems,
        }));
      } else {
        toast.error("No se pudo cargar la factura con los ítems");
      }
    } catch (error) {
      toast.error("Error al buscar la factura");
    }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setReason(value);

    setFormData((prev) => ({
      ...prev,
      reason: value,
    }));
  };

  const handleAddProductClick = () => {
    setShowPopover((prevState) => !prevState);
  };

  const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setProductSearch(query);
  };

  const handleProductSelect = (product: any) => {
    const maxDescriptionLength = 100;
    const newItem = {
      productId: product._id,
      quantity: 1,
      unitPrice: useFormatCurrency(product.price),
      total: useFormatCurrency(product.price),
      description:
        product.description.length > maxDescriptionLength
          ? `${product.description.slice(0, maxDescriptionLength)}...`
          : product.description,
    };

    const updatedItems = [...invoiceItems, newItem];
    setInvoiceItems(updatedItems);
    setShowPopover(false);

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = [...invoiceItems];

    const unitPriceValue = parseFloat(
      updatedItems[index].unitPrice.replace(/[^\d.-]/g, "")
    );

    if (isNaN(unitPriceValue)) return;

    updatedItems[index].quantity = newQuantity;
    updatedItems[index].total = useFormatCurrency(unitPriceValue * newQuantity);
    setInvoiceItems(updatedItems);

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleSaveCreditNote = async () => {
    if (
      !formData.invoiceId ||
      !formData.reason ||
      formData.items.length === 0
    ) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    await createCreditNote();
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Crear Nota de Crédito</h2>

      <div style={{ display: "flex", gap: "2rem" }}>
        <div className={styles.inputGroup}>
          <label htmlFor="invoiceSearch" className={styles.label}>
            Buscar Factura
          </label>
          <CustomInput
            name="invoiceSearch"
            type="search"
            value={invoiceSearch}
            onChange={handleInvoiceSearch}
            placeholder="Escribe para buscar..."
            maxWidth="100%"
            disabled={invoiceSelected}
          />
          {showDropdown && !invoiceSelected && (
            <div className={styles.dropdown}>
              {invoicesLoading ? (
                <p className={styles.loadingText}>Cargando...</p>
              ) : invoices.length > 0 ? (
                invoices.map((invoice: IInvoice) => (
                  <div
                    key={invoice._id}
                    className={styles.dropdownItem}
                    onClick={() => handleInvoiceClick(invoice)}
                  >
                    {invoice.invoiceNumber} - {invoice.clientName}
                  </div>
                ))
              ) : (
                <p className={styles.noResultsText}>
                  {error || "No se encontraron resultados"}
                </p>
              )}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <label htmlFor="ncfNumber" className={styles.label}>
            Campo afectado
          </label>
          <CustomInput
            name="ncfNumber"
            type="text"
            value={ncfNumber}
            disabled={true}
            maxWidth="100%"
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="creditReason" className={styles.label}>
          Razón de la Nota de Crédito
        </label>
        <textarea
          id="creditReason"
          placeholder="Escribe la razón..."
          rows={4}
          className={styles.textarea}
          value={reason}
          onChange={handleReasonChange}
        />
      </div>

      <div className={styles.containerTable}>
        <h3 className={styles.sectionTitle}>Productos Relacionados</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Precio por Unidad</th>
              <th>Importe</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.length > 0 ? (
              invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <CustomInput
                      name="quantity"
                      type="number"
                      value={item.quantity}
                      min={1}
                      maxWidth="90px"
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>{item.description}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.total}</td>
                  <td>
                    <CustomButton
                      text="Eliminar"
                      buttonType="button"
                      onClick={() => {
                        const updatedItems = invoiceItems.filter(
                          (_, i) => i !== index
                        );
                        setInvoiceItems(updatedItems);

                        setFormData((prev) => ({
                          ...prev,
                          items: updatedItems,
                        }));
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className={styles.noItemsText}>
                  No se han encontrado productos para esta factura.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <CustomButton
          text="Agregar Producto"
          buttonType="button"
          disabled={!invoiceSelected}
          onClick={handleAddProductClick}
        />
        {showPopover && invoiceSelected && (
          <div className={styles.popover}>
            <h3>Buscar Producto</h3>
            <CustomInput
              name="productSearch"
              type="search"
              value={productSearch}
              onChange={handleProductSearch}
              placeholder="Buscar producto..."
            />
            {productsLoading ? (
              <p>Cargando productos...</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductSelect(product)}
                >
                  {product.name} - {useFormatCurrency(product.price)}
                </div>
              ))
            ) : (
              <p>{productsError || "No se encontraron productos"}</p>
            )}
          </div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <CustomButton
          text="Guardar Nota"
          buttonType="button"
          onClick={handleSaveCreditNote}
        />
      </div>
    </div>
  );
}
