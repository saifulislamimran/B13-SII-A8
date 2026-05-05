"use client";

import { useCartStore, CartItem } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function AddToCartButton({ product, className }: { product: CartItem, className?: string }) {
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <button 
      onClick={handleAdd}
      className={className || "sunset-gradient text-white py-5 rounded-full font-label-bold uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(170,48,0,0.6)] hover:shadow-[0_15px_25px_-5px_rgba(170,48,0,0.8)] transform hover:-translate-y-1 transition-all active:scale-95 duration-150 shimmer-effect"}
    >
      Add to Cart
    </button>
  );
}
