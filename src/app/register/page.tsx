"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to register. Please try again.");
    } else {
      toast.success("Successfully registered! Please log in.");
      router.push("/login"); // Redirect login after registration
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
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-tertiary-fixed blur-[100px] rounded-full opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-primary-fixed blur-[100px] rounded-full opacity-40"></div>
      
      {/* Authentication Card */}
      <div className="glass-panel w-full max-w-[440px] rounded-xl p-8 shadow-[0_32px_64px_-16px_rgba(170,48,0,0.15)] relative z-10 animate__animated animate__fadeIn">
        <header className="text-center mb-stack-md">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white/40 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-primary text-4xl">person_add</span>
            </div>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Create Account</h1>
          <p className="text-on-surface-variant font-body-md">Join our premium coastal lifestyle</p>
        </header>
        
        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-unit">
            <label className="font-label-bold text-label-bold text-on-surface-variant ml-1" htmlFor="name">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">person</span>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Alex Summer" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/30 border-outline-variant rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-outline"
              />
            </div>
          </div>

          <div className="space-y-unit">
            <label className="font-label-bold text-label-bold text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/30 border-outline-variant rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-outline"
              />
            </div>
          </div>

          <div className="space-y-unit">
            <label className="font-label-bold text-label-bold text-on-surface-variant ml-1" htmlFor="image">Photo URL (Optional)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">image</span>
              <input 
                type="url" 
                id="image" 
                name="image" 
                placeholder="https://example.com/avatar.jpg" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-white/30 border-outline-variant rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-outline"
              />
            </div>
          </div>
          
          <div className="space-y-unit">
            <label className="font-label-bold text-label-bold text-on-surface-variant ml-1" htmlFor="password">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/30 border-outline-variant rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none placeholder:text-outline"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="sunset-gradient w-full py-4 rounded-full text-white font-label-bold text-body-lg shadow-[0_12px_24px_-8px_rgba(170,48,0,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? "Creating Account..." : "Join SunCart"}
          </button>
        </form>
        
        <div className="relative my-stack-md">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 glass-panel rounded-full text-on-surface-variant font-medium">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 px-6 rounded-full glass-panel border border-white/40 flex items-center justify-center space-x-3 hover:bg-white/60 transition-all active:scale-95"
          >
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYOCVTzGoEIZzzUkr6Y3wypRu7KCxyRPZOvbJq0D9uAkOXX8fXKGnyLcLCtZgNnQwGzseV_uyCZFqQFvHH369Qybe6qvYmqb0xDOpPGfXDxhUszDOidc6f5iJH_h62s774X5gzcc2RAmXn6OSXGXyvIvVgENkTsgQcx7izpdj9yL9dOd1tLJ1v0-C8_0Vp0B_hX3LH4AFHwVK3XMYg4WKIQqAdg2hM-3OetA1QxUb1etHx5ImJ9X7ARXmoO3I8o62BtKnTqyv00onh" alt="Google" className="w-5 h-5" />
            <span className="font-label-bold text-on-surface">Continue with Google</span>
          </button>
        </div>
        
        <footer className="mt-stack-md text-center">
          <p className="text-on-surface-variant font-body-md">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
