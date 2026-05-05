import Link from "next/link";
import productsData from "../../../public/data/products.json";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-margin-mobile md:px-margin-desktop container mx-auto">
      <header className="mb-12 text-center max-w-3xl mx-auto animate__animated animate__fadeInDown">
        <h1 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white mb-4">All Summer Essentials</h1>
        <p className="font-body-lg text-slate-600 dark:text-slate-300">
          Browse our complete collection of premium coastal accessories, skincare, and apparel designed for the modern sun-seeker.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {productsData.map((product, index) => (
          <div 
            key={product.id} 
            className="glass-panel rounded-xl overflow-hidden group hover-glow transition-all flex flex-col animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="h-64 overflow-hidden relative">
              <img
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={product.image}
              />
              <div className="absolute top-4 right-4 bg-surface/80 dark:bg-black/40 backdrop-blur-md p-2 rounded-full text-primary shadow-md">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-1">
                <p className="text-secondary font-label-bold text-xs tracking-wider">{product.category}</p>
                <div className="flex items-center gap-1 text-xs text-tertiary font-bold">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {product.rating}
                </div>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mt-auto pt-4">
                <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <Link href={`/product/${product.id}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg flex items-center justify-center text-sm font-bold transition-colors duration-300">
                    View
                  </Link>
                  <AddToCartButton 
                    product={{ ...product, quantity: 1 }} 
                    className="bg-secondary/10 text-secondary hover:bg-secondary hover:text-white p-2 rounded-lg flex items-center justify-center transition-colors duration-300 shadow-none transform-none" 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
