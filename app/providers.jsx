"use client";

import { useState, useEffect } from "react";
import { CartProvider, useCart } from "./context/cart-context";
import { ShoppingCart } from "lucide-react";
import Cart from "./_components/Cart";
import { Toaster } from 'react-hot-toast';
import Onboarding from './_components/Onboarding';

function FloatingCartButton() {
    const { totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
  
    return (
      <>
        <div className="fixed bottom-20 right-6 z-50">
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative h-16 w-16 rounded-full shadow-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center"
            >
                <ShoppingCart className="h-8 w-8" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-sm font-semibold">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
            </button>
        </div>
        <Cart open={isCartOpen} onOpenChange={setIsCartOpen} />
      </>
    );
  }

export function Providers({ children }) {
  return (
    <CartProvider>
      {children}
      <FloatingCartButton />
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} limit={1} />
      {/* <Onboarding /> */}
    </CartProvider>
  );
}
