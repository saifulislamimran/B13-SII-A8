"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function FloatingCartButton() {
  const { toggleCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button 
      onClick={toggleCart}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full sunset-gradient text-white shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform active:scale-95 border-2 border-white/20"
    >
      <span className="material-symbols-outlined text-3xl">shopping_bag</span>
      {getTotalItems() > 0 && (
        <div className="absolute -top-1 -right-1 bg-secondary text-white w-6 h-6 rounded-full text-xs flex items-center justify-center border-2 border-black animate__animated animate__bounceIn">
          {getTotalItems()}
        </div>
      )}
    </button>
  );
}
