"use client"

import { useState, useEffect } from "react";
import { getAllProducts } from "@services/product";
import { IProduct } from "@interfaces/Product/Product";

export const useProductSearch = (searchTerm: string) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!debouncedSearchTerm) {
        setProducts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getAllProducts({
          search: debouncedSearchTerm,
          max: 10000000,
          page: 1,
        });

        if (
          response.ok &&
          response.result &&
          Array.isArray(response.result.data)
        ) {
          const filteredProducts = response.result.data.filter((product) =>
            product.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
          );
          const limitedProducts = filteredProducts.slice(0, 3);
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
    };

    fetchProducts();
  }, [debouncedSearchTerm]);

  return { products, loading, error };
};
