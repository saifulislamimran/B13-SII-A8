import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import productsData from "../../../../../public/data/products.json";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return <div className="pt-32 text-center text-2xl min-h-screen">Product not found</div>;
  }

  return (
    <main className="pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Hero Image Section */}
        <div className="lg:col-span-7 flex flex-col gap-stack-md">
          <div className="glass-panel rounded-xl overflow-hidden aspect-[3/4] md:aspect-square relative group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={product.name}
              src={product.image}
            />
            <div className="absolute top-4 right-4 glass-panel p-3 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
          </div>
          {/* Variant Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className={`min-w-[100px] aspect-square rounded-lg glass-panel ${i === 1 ? 'border-2 border-primary' : 'opacity-70 hover:opacity-100'} overflow-hidden hover:scale-105 transition-all`}>
                <img className="w-full h-full object-cover" src={product.image} alt="Thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="lg:col-span-5 flex flex-col gap-stack-lg sticky top-28">
          <div className="glass-panel p-8 rounded-xl flex flex-col gap-stack-md">
            <div>
              <p className="text-primary font-label-bold uppercase tracking-widest mb-2">{product.brand}</p>
              <h1 className="font-headline-lg text-on-surface mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-tertiary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="ml-2 font-label-bold text-on-surface-variant">{product.rating}</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="text-secondary font-label-bold uppercase">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display-xl text-primary">${product.price.toFixed(2)}</span>
              <span className="text-slate-400 line-through font-body-lg">${(product.price * 1.2).toFixed(2)}</span>
            </div>
            
            <p className="text-on-surface-variant font-body-lg">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <button className="sunset-gradient text-white py-5 rounded-full font-label-bold uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(170,48,0,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(170,48,0,0.5)] transform hover:-translate-y-1 transition-all active:scale-95 duration-150">
                Add to Cart
              </button>
              <button className="glass-panel py-5 rounded-full font-label-bold uppercase tracking-widest text-on-surface border-white/40 hover:bg-white/30 transition-all active:scale-95 duration-150">
                Buy Now
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">local_shipping</span>
                <span className="text-xs font-label-bold">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">published_with_changes</span>
                <span className="text-xs font-label-bold">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asymmetric Detail Section */}
      <section className="mt-stack-lg grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        <div className="flex flex-col justify-center gap-stack-md">
          <h2 className="font-headline-lg text-primary">Designed for the Endless Summer</h2>
          <p className="font-body-lg text-on-surface-variant">Our {product.name} isn't just an item; it's an invitation to a lifestyle of leisure and luxury. We've sourced the finest materials to ensure comfort even in the peak of a coastal afternoon.</p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
              <span className="font-body-md">Premium Quality Materials</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
              <span className="font-body-md">Designed for coastal luxury</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
              <span className="font-body-md">Environmentally friendly</span>
            </li>
          </ul>
        </div>
        <div className="glass-panel p-4 rounded-3xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
          <img className="w-full h-auto rounded-2xl object-cover aspect-video" alt={product.name} src={product.image} />
        </div>
      </section>
    </main>
  );
}
