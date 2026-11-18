"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Page khulte hi purana cart browser se wapas laao
  useEffect(() => {
    try {
      const saved = localStorage.getItem("qb-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      console.error("Could not read cart", e);
    }
    setLoaded(true);
  }, []);

  // Cart badalte hi browser me save karo
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("qb-cart", JSON.stringify(items));
    } catch (e) {
      console.error("Could not save cart", e);
    }
  }, [items, loaded]);

  function addItem(product, size) {
    const id = `${product.slug}-${size}`;
    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...current,
        {
          id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          qty: 1,
        },
      ];
    });
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) return removeItem(id);
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
value={{ items, count, total, loaded, addItem, removeItem, updateQty, clearCart }}    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}