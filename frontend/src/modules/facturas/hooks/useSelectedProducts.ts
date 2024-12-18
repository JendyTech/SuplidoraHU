import { useState } from "react";
import { IProduct } from "@interfaces/Product/Product";

export function useCart() {
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

    const addProductToCart = (product: IProduct) => {
        setSelectedProducts((prev) => {
            const existingProduct = prev.find((item) => item._id === product._id);
            if (existingProduct) {
                return prev.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
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

    return {
        selectedProducts,
        addProductToCart,
        increaseQuantity,
        decreaseQuantity,
        removeProductFromCart,
    };
}
