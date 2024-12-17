import React from 'react'
import styles from "@modules/facturas/styles/facturas.module.css";

export default function InvoiceSummary({ subtotal, itbis, total }: { subtotal: number, itbis: number, total: number }) {

    const formatCurrency = (value: number) =>
        value.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
    
    return (
        <div className={styles.InvoicesContainer}>
            <div className={styles.invoiceSummary}>
                <div className={styles.invoiceRow}>
                    <span className={styles.label}>Subtotal:</span>
                    <span className={styles.amount}>{formatCurrency(subtotal)}</span>
                </div>
                <div className={styles.invoiceRow}>
                    <span className={styles.label}>ITBIS (18%):</span>
                    <span className={styles.amount}>{formatCurrency(itbis)}</span>
                </div>
                <div className={`${styles.invoiceRow} ${styles.totalRow}`}>
                    <span className={styles.label}>Total:</span>
                    <span className={styles.amount}>{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    )
}
