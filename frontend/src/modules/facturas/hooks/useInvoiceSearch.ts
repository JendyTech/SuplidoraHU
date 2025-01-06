"use client";

import { useState, useEffect } from "react";
import { getAllInvoices } from "@services/invoice";
import { IInvoice } from "@interfaces/Invoice/Invoice";

export const useInvoiceSearch = (searchTerm: string) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [invoices, setInvoices] = useState<IInvoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        if (!debouncedSearchTerm) {
            setInvoices([]);
            return;
        }

        const fetchInvoices = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getAllInvoices({
                    search: debouncedSearchTerm,
                    page: 1,
                });

                if (response.ok && response.result && Array.isArray(response.result.data)) {
                    const filteredInvoices = response.result.data.filter((invoice: IInvoice) =>
                        invoice.clientName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    );
                    const limitedInvoices = filteredInvoices.slice(0, 3);
                    setInvoices(limitedInvoices);
                } else {
                    setInvoices([]);
                    setError("No se encontraron facturas.");
                }
            } catch (err) {
                setError("Hubo un error al obtener las facturas.");
                setInvoices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [debouncedSearchTerm]);

    return { invoices, loading, error };
};
