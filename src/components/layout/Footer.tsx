import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-20 bg-white/10 dark:bg-black/40 backdrop-blur-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 w-full container mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-2xl">wb_sunny</span>
            <span className="text-lg font-bold text-orange-500">SunCart</span>
          </div>
          <p className="text-sm font-inter text-slate-600 dark:text-slate-400 max-w-xs">
            Curating the finest summer essentials for your luxury lifestyle. From beach to boulevard, we've got you covered.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface">Shopping</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-slate-500 hover:text-orange-400 transition-colors text-sm font-inter hover:translate-x-1 inline-block">Shipping</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-orange-400 transition-colors text-sm font-inter hover:translate-x-1 inline-block">Returns</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-orange-400 transition-colors text-sm font-inter hover:translate-x-1 inline-block">Size Guide</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-orange-400 transition-colors text-sm font-inter hover:translate-x-1 inline-block">Gift Cards</Link></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface">Legal</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-slate-500 hover:text-orange-400 transition-colors text-sm font-inter hover:translate-x-1 inline-block">Privacy Policy</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-orange-400 transition-colors text-sm font-inter hover:translate-x-1 inline-block">Terms of Service</Link></li>
            <li><Link href="#" className="text-slate-500 hover:text-orange-400 transition-colors text-sm font-inter hover:translate-x-1 inline-block">Contact</Link></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface">Join the SunClub</h4>
          <p className="text-sm font-inter text-slate-600 dark:text-slate-400">Exclusive drops and summer inspiration directly to your inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-orange-500 outline-none" />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/5 py-8 text-center">
        <p className="text-sm font-inter text-slate-600 dark:text-slate-400">© 2024 SunCart Premium Summer Essentials.</p>
      </div>
    </footer>
  );
}
