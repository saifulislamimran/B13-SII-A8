"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data, error } = await authClient.signIn.email({
        email,
        password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to login. Please check your credentials.");
    } else {
      toast.success("Successfully logged in!");
      router.push("/product/prod-1"); // Redirecting back here based on instructions or home
    }
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await authClient.signIn.social({
        provider: "google",
    });
    if (error) {
        toast.error(error.message || "Failed to login with Google.");
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg relative overflow-hidden min-h-[80vh]">
      {/* Background Decorative Floaters */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary-fixed-dim blur-[120px] rounded-full opacity-20 dark:opacity-20"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-secondary-fixed blur-[120px] rounded-full opacity-10 dark:opacity-10"></div>
      
      {/* Authentication Card */}
      <div className="glass-panel w-full max-w-[440px] rounded-xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative z-10 animate__animated animate__fadeIn bg-white/20 dark:bg-black/60 border-white/20">
        <header className="text-center mb-stack-lg">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shadow-inner border border-slate-200 dark:border-white/10">
              <span className="material-symbols-outlined text-orange-500 dark:text-primary-fixed-dim text-4xl">wb_sunny</span>
            </div>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-600 dark:text-slate-400 font-body-md">Sign in to your summer oasis</p>
        </header>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-stack-md">
          <div className="space-y-unit">
            <label className="font-label-bold text-label-bold text-slate-700 dark:text-slate-300 ml-1" htmlFor="email">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">mail</span>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg py-4 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 dark:focus:ring-secondary-fixed-dim focus:border-orange-500 dark:focus:border-secondary-fixed-dim transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
          </div>
          
          <div className="space-y-unit">
            <div className="flex justify-between items-center ml-1">
              <label className="font-label-bold text-label-bold text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
              <Link href="#" className="text-orange-600 dark:text-primary-fixed-dim text-sm font-label-bold hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">lock</span>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-lg py-4 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 dark:focus:ring-secondary-fixed-dim focus:border-orange-500 dark:focus:border-secondary-fixed-dim transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-1">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 dark:border-white/20 bg-black/5 dark:bg-white/5 text-orange-500 focus:ring-orange-500 dark:focus:ring-primary-fixed-dim" />
            <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">Stay signed in for 30 days</label>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="sunset-gradient w-full py-4 rounded-full text-white font-label-bold text-body-lg shadow-[0_12px_24px_-8px_rgba(170,48,0,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 shimmer-effect disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login to SunCart"}
          </button>
        </form>
        
        <div className="relative my-stack-lg">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 glass-panel border-none rounded-full text-slate-400 font-medium bg-transparent backdrop-blur-none">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-4 px-6 rounded-full bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center space-x-3 hover:bg-black/10 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYOCVTzGoEIZzzUkr6Y3wypRu7KCxyRPZOvbJq0D9uAkOXX8fXKGnyLcLCtZgNnQwGzseV_uyCZFqQFvHH369Qybe6qvYmqb0xDOpPGfXDxhUszDOidc6f5iJH_h62s774X5gzcc2RAmXn6OSXGXyvIvVgENkTsgQcx7izpdj9yL9dOd1tLJ1v0-C8_0Vp0B_hX3LH4AFHwVK3XMYg4WKIQqAdg2hM-3OetA1QxUb1etHx5ImJ9X7ARXmoO3I8o62BtKnTqyv00onh" alt="Google" className="w-5 h-5 opacity-90" />
            <span className="font-label-bold text-slate-700 dark:text-slate-200">Continue with Google</span>
          </button>
        </div>
        
        <footer className="mt-stack-lg text-center">
          <p className="text-slate-500 dark:text-slate-400 font-body-md">
            New to SunCart? <Link href="/register" className="text-orange-600 dark:text-primary-fixed-dim font-bold hover:underline">Create an account</Link>
          </p>
        </footer>
      </div>

      {/* Featured Product Peeking (Desktop Only) */}
      <div className="hidden lg:block absolute left-20 bottom-20 w-64 h-[400px] rotate-[-6deg] z-0 animate__animated animate__fadeInLeft opacity-40">
        <div className="glass-panel p-4 rounded-xl shadow-2xl">
          <img src="https://lh3.googleusercontent.com/aida/ADBb0ugyhwtCGBySHuNo7Wt-0-5Mi-IrGDmWHaySSjKSiirgtgr0oFdiv2mT1-_tTFfkVM1ueFbwwUr3FutbWVM0ZCQXGqbLeaWdCPF4HtywuSXUg6XcX6VYXhEEKC19A24UwrbZwDaHgW2TT04Vqc8wfRRFopma-LEtJPFf8cP2m4VL5MbSBG3ix8GsRhwwburovGKo6qy30cw3BA2fcWckl7a9NZtEpyKr_aAKWv_0wyNCFORxd6B4Vorl9iJgMpdBuP4YHPTlTUSs_W0" className="w-full h-72 object-cover rounded-lg mb-4 grayscale-[0.2] brightness-75" alt="Premium summer accessories" />
          <div className="h-4 w-3/4 bg-primary-fixed/20 rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-white/5 rounded"></div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute right-20 top-20 w-56 h-auto rotate-[12deg] z-0 animate__animated animate__fadeInRight opacity-40">
        <div className="glass-panel p-4 rounded-xl shadow-2xl">
          <img src="https://lh3.googleusercontent.com/aida/ADBb0ug6SM5NO0Q_nXzt5uFc-GihTttiYA4N5jkPWRxO1NDju-N3KR2GLgR_ps_3_IyD1TngBGUGlOnqwau9-Svg5BbK2ko2L77LLZHyPdwjaD0Rfvd4h7Sdy-n2tUX2sqfD3w4xj7ewIeAzZMiZL8c7csfs5ZoRg00rn0RIsIQTHwKGB3eBNLPP7nJoApKrVoXa7rlVDGrgJUFEJiC1q4Y3RvSwtxPlRguGwAVrUY_LGytYy8kbTgzorAsfME_Fahb2oXoIwDixFWHizIQ" className="w-full aspect-square object-cover rounded-lg mb-4 grayscale-[0.2] brightness-75" alt="Summer cocktail" />
          <div className="h-4 w-1/2 bg-secondary-container/20 rounded mb-2"></div>
        </div>
      </div>
    </main>
  );
}
