"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "My Profile", href: "/profile" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/20 dark:bg-black/40 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center px-4 md:px-8 h-20 w-full max-w-none">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden p-2 text-orange-500 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <Link href="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
            <span className="material-symbols-outlined text-orange-500 dark:text-orange-400 text-3xl hidden md:block group-hover:rotate-12 transition-transform">wb_sunny</span>
            <span className="text-2xl font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest font-inter">
              SunCart
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`${
                  isActive 
                    ? "text-orange-500 dark:text-orange-400 border-b-2 border-orange-500 dark:border-orange-400 font-bold" 
                    : "text-slate-700 dark:text-slate-100 font-medium hover:text-orange-400"
                } font-inter tracking-tight hover:backdrop-blur-2xl hover:scale-105 transition-all duration-300`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          {!isPending && !session ? (
            <>
              <Link href="/login" className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-sm font-bold bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Register
              </Link>
            </>
          ) : !isPending && session ? (
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={handleLogout} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors hidden md:block">
                Logout
              </button>
              <Link href="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500/30 hover:scale-105 transition-transform duration-300">
                <img 
                  alt="User Profile" 
                  className="w-full h-full object-cover" 
                  src={session.user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + session.user.name} 
                />
              </Link>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full animate-pulse bg-slate-200/50 dark:bg-slate-800/50"></div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-black border-b border-white/20 shadow-xl flex flex-col py-4 px-6 gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive ? "text-orange-500 font-bold" : "text-slate-700 dark:text-slate-200 font-medium"
                } font-inter text-lg`}
              >
                {link.name}
              </Link>
            );
          })}
          {session && (
            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-left text-slate-500 font-bold font-inter text-lg mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
