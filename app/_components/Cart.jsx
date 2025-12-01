"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cart-context';
import Image from 'next/image';

export default function Cart({ open, onOpenChange }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const onClose = () => onOpenChange(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "971582987028"; // Replace with your actual WhatsApp number
    
    // Create the message with cart items
    let message = "🛒Flyer Order Details:\n\n";
    cartItems.forEach((item, index) => {
      const quantity = item.unit_type === 'kg' 
        ? item.displayQuantity  // For kg products, use the display quantity (e.g., "500gm", "1kg")
        : `${item.quantity || 1} Nos`; // For piece products, show quantity with "pcs"
      
      message += `${index + 1}. ${item.name}\n`;
      message += `   • Quantity: ${quantity}\n`;
      message += `   • Price: AED ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}\n\n`;
    });
    
    message += `💰 Total Amount: AED ${totalPrice.toFixed(2)}`;
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');

    // Clear cart after initiating checkout
    try {
      clearCart();
    } catch (e) {
      console.error('Failed to clear cart after checkout', e);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sliding Cart Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-black">
              Shopping Cart ({mounted ? cartItems.length : 0})
            </h3>
            <div className="flex items-center gap-4">
              {mounted && cartItems.length > 0 && (
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              )}
              <button 
                onClick={onClose}
                className="text-slate-500 hover:text-slate-700 p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto px-4 py-2">
            <div className="space-y-4">
              {!mounted || cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex gap-4 p-3 bg-slate-50 rounded-lg">
                    <Image
                      src={`http://localhost:8000/uploads/${item.image}`} 
                      alt={'Product'}
                      width={120}
                      height={80}
                      className="w-24 h-20 object-cover bg-white rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-black">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.name)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.unit_type === 'kg' ? (
                            <select 
                              value={item.displayQuantity}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                const kgValue = newValue.endsWith('gm') 
                                  ? parseFloat(newValue.replace('gm', '')) / 1000 
                                  : parseFloat(newValue.replace('kg', ''));
                                updateQuantity(item.name, kgValue, newValue);
                              }}
                              className="text-sm bg-white border border-emerald-200 rounded-lg py-2 px-3 text-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            >
                              {['100gm', '250gm', '500gm', '750gm', '1kg', '1.5kg', '2kg', '2.5kg', '3kg', '4kg', '5kg']
                                .map((option) => (
                                  <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateQuantity(item.name, Math.max(1, (item.quantity || 1) - 1))}
                                className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-black">{item.quantity || 1}</span>
                              <button 
                                onClick={() => updateQuantity(item.name, (item.quantity || 1) + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-black">AED {(parseFloat(item.actual_price) * (item.quantity || 1)).toFixed(2)}</div>
                          {item.old_price && (
                            <div className="text-sm text-slate-500 line-through">
                              AED {(parseFloat(item.old_price) * (item.quantity || 1)).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          {mounted && cartItems.length > 0 && (
            <div className="border-t p-4 bg-white">
              <div className="flex justify-between items-center mb-4 text-black">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold">AED {totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 font-medium flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Order on WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}