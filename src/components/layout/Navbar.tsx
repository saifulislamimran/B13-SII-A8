"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/20 bg-white/20 dark:bg-black/20 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(255,77,0,0.1)]">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-none">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500 dark:text-orange-400 text-3xl">wb_sunny</span>
          <span className="text-2xl font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest font-inter">
            SunCart
          </span>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-orange-500 border-b-2 border-orange-500 font-bold font-inter tracking-tight hover:backdrop-blur-2xl hover:scale-105 transition-all duration-300">
            Home
          </Link>
          <Link href="#" className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-400 font-inter tracking-tight hover:backdrop-blur-2xl hover:scale-105 transition-all duration-300">
            Products
          </Link>
          <Link href="/profile" className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-400 font-inter tracking-tight hover:backdrop-blur-2xl hover:scale-105 transition-all duration-300">
            My Profile
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {!isPending && !session ? (
            <>
              <Link href="/login" className="text-sm font-bold text-orange-600 hover:text-orange-500 transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-sm font-bold bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Register
              </Link>
            </>
          ) : !isPending && session ? (
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors">
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
            <div className="w-10 h-10 rounded-full animate-pulse bg-slate-200/50"></div>
          )}
        </div>
      </div>
    </header>
  );
}
