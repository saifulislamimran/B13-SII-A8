"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    toast.success("Checkout feature coming soon!");
    clearCart();
    toggleCart();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/90 dark:bg-black/90 backdrop-blur-2xl z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col border-l border-white/20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-headline-md text-2xl text-on-surface">Your Cart</h2>
          <button 
            onClick={toggleCart}
            className="w-10 h-10 rounded-full flex items-center justify-center glass-panel hover:bg-white/20 transition-colors text-slate-600 dark:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <span className="material-symbols-outlined text-6xl mb-4">shopping_bag</span>
              <p className="font-body-lg">Your cart is empty.</p>
              <button 
                onClick={toggleCart}
                className="text-primary mt-4 font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 glass-panel p-4 rounded-xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-label-bold text-on-surface line-clamp-1">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-on-surface-variant hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                    <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white/30 dark:bg-white/10 rounded-full overflow-hidden border border-white/20">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/40 transition-colors text-slate-800 dark:text-white"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/40 transition-colors text-slate-800 dark:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body-lg text-on-surface-variant">Subtotal</span>
              <span className="font-headline-md text-on-surface">${getTotalPrice().toFixed(2)}</span>
            </div>
            <p className="text-xs text-on-surface-variant mb-6 text-center">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full py-4 rounded-full sunset-gradient text-white font-label-bold text-lg shadow-[0_10px_20px_-10px_rgba(170,48,0,0.5)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
