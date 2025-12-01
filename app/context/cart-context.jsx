"use client";

import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { toast } from 'react-hot-toast';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const LOCAL_KEY = 'zap_cart_v1';

  const [cartItems, setCartItems] = useState(() => {
    try {
      if (typeof window === 'undefined') return [];
      const raw = localStorage.getItem(LOCAL_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to read cart from localStorage', e);
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Add item to cart or increase quantity if exists
  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        const updated = prevItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        toast.dismiss();
        toast.success(`${product.name} quantity updated`);
        return updated;
      }
      toast.dismiss();
      toast.success(`${product.name} added to cart`);
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  // Update quantity (removes if quantity <= 0)
  const updateQuantity = useCallback((productName, quantity, displayQuantity = null) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        toast.dismiss();
        toast.success(`${productName} removed from cart`);
        return prevItems.filter((item) => item.name !== productName);
      }
      toast.dismiss();
      toast.success(`Quantity updated`);
      return prevItems.map((item) =>
        item.name === productName 
          ? { 
              ...item, 
              quantity,
              displayQuantity: displayQuantity || item.displayQuantity || quantity
            } 
          : item
      );
    });
  }, []);

  // Remove item completely
  const removeFromCart = useCallback((productName) => {
    setCartItems((prevItems) => {
      const exists = prevItems.some(i => i.name === productName);
      if (exists) {
        toast.dismiss();
        toast.error(`${productName} removed from cart`);
      }
      return prevItems.filter((item) => item.name !== productName);
    });
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    toast.dismiss();
    toast.success('Cart cleared');
  }, []);

  // Calculate totals
  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.actual_price) * (item.quantity || 1),
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;

