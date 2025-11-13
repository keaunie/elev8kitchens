// CartContext.jsx — shared cart state for Elev8 Kitchens

import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  // items shape:
  // { productId, handle, sku, size, color, qty }

  const addItem = ({ productId, handle, sku, size, color, qty = 1 }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.sku === sku);
      if (existingIndex !== -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          qty: copy[existingIndex].qty + qty,
        };
        return copy;
      }
      return [...prev, { productId, handle, sku, size, color, qty }];
    });
  };

  const removeItem = (sku) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  };

  const updateQuantity = (sku, qty) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.sku === sku ? { ...i, qty: Math.max(1, qty) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
