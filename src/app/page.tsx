import Image from "next/image";
import Link from "next/link";
import productsData from "../../public/data/products.json";

export default function Home() {
  // Get first 3 products for the popular section
  const popularProducts = productsData.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Luxury infinity pool"
            src="https://lh3.googleusercontent.com/aida/ADBb0uhE-aeS3p2djkMcxuglYVqPW85r1zGumTGeFDEx83p-A3rw6TAzf2ksglv0ZjtAHGqhRTWaArRTYTfAF5Eqzn2oRsoHTFibUHQ8GGCcrpj3HLZTmefNvqrpu1GeUD07h2DK_fUXcqNYRCsQHwkmtBxZ264s9hsqSttvmxt7Tvg1FxHeUMHh2BjbiSHPqLaVlwSpeHBXxaLau3_4rZaMd-dhs5fGatPDiBSPQWGnBsV459qcajLiXWnHErEg6TFii6Ujj75_T2kCA4o"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl glass-panel p-8 md:p-16 rounded-[2rem] shadow-2xl animate__animated animate__fadeInUp">
          <div className="inline-block px-4 py-1 rounded-full bg-primary-container text-on-primary-container font-label-bold text-label-bold mb-6 animate__animated animate__pulse animate__infinite">
            HOT DEALS 🔥
          </div>
          <h1 className="font-display-xl text-display-xl text-primary mb-6 leading-[1.1] animate__animated animate__fadeInLeft animate__delay-1s">
            Summer Sale<br /><span className="text-on-surface">50% OFF</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto animate__animated animate__fadeInRight animate__delay-1s">
            Dive into the season with our curated collection of luxury beachwear, sun protection, and coastal accessories designed for your best summer yet.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate__animated animate__fadeInUp animate__delay-2s">
            <button className="sunset-gradient text-white font-label-bold py-4 px-10 rounded-full hover-glow flex items-center justify-center gap-2 transition-all">
              Shop Now <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="glass-panel border-2 border-primary text-primary font-label-bold py-4 px-10 rounded-full hover:bg-primary/5 transition-colors">
              View Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Summer Essentials</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Our most-loved picks for the golden hour.</p>
          </div>
          <Link href="/products" className="text-primary font-label-bold flex items-center gap-2 mt-4 md:mt-0 hover:underline">
            View All <span className="material-symbols-outlined">chevron_right</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularProducts.map((product) => (
            <div key={product.id} className="glass-panel rounded-xl overflow-hidden group hover-glow transition-all flex flex-col">
              <div className="h-80 overflow-hidden relative">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={product.image}
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-secondary font-label-bold text-label-bold">{product.category}</p>
                  <div className="flex items-center gap-1 text-sm text-tertiary font-bold">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {product.rating}
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-primary font-bold text-xl">${product.price.toFixed(2)}</span>
                  <Link href={`/product/${product.id}`} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-orange-700 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="py-stack-lg bg-secondary-container/30 backdrop-blur-sm border-y border-white/20 px-margin-mobile md:px-margin-desktop">
        <div className="container mx-auto text-center max-w-3xl mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Elevate Your Summer Glow</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Expert hydration and skincare advice for the ultimate coastal lifestyle.</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex gap-6 items-start glass-panel p-8 rounded-2xl">
            <div className="bg-primary-container text-on-primary-container p-4 rounded-full flex-shrink-0">
              <span className="material-symbols-outlined text-3xl">water_drop</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Deep Hydration Rituals</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">Maintain your skin's moisture barrier with our sea-mineral infused serums. Reapply after every swim for a lasting dewy finish.</p>
              <Link href="#" className="text-primary font-label-bold border-b border-primary pb-1 hover:text-primary-container transition-colors">Read Guide</Link>
            </div>
          </div>
          <div className="flex gap-6 items-start glass-panel p-8 rounded-2xl">
            <div className="bg-secondary text-on-secondary p-4 rounded-full flex-shrink-0">
              <span className="material-symbols-outlined text-3xl">health_and_safety</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">UV Defense Strategy</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">Sunscreen isn't just for the beach. Learn how to layer SPF with your makeup for full-spectrum protection against photo-aging.</p>
              <Link href="#" className="text-primary font-label-bold border-b border-primary pb-1 hover:text-primary-container transition-colors">Safety Tips</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop container mx-auto">
        <h3 className="text-center text-slate-400 font-label-bold text-label-bold uppercase tracking-[0.2em] mb-12">Partners in Paradise</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
          {['LUMINA', 'AZURE', 'CORAL', 'SOLEIL', 'TROPIC'].map((brand) => (
            <div key={brand} className="flex justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
              <span className="text-2xl font-extrabold text-on-surface-variant">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Cart Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full sunset-gradient text-white shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform active:scale-95">
        <span className="material-symbols-outlined text-3xl">shopping_bag</span>
        <div className="absolute -top-1 -right-1 bg-secondary text-white w-6 h-6 rounded-full text-xs flex items-center justify-center border-2 border-white">
          3
        </div>
      </button>
    </>
  );
}
