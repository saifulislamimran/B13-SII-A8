"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Protected route logic
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const { data, error } = await authClient.updateUser({
      name,
      image: image || undefined,
    });

    setIsUpdating(false);

    if (error) {
      toast.error(error.message || "Failed to update profile.");
    } else {
      toast.success("Profile updated successfully!");
      router.push("/profile");
      router.refresh();
    }
  };

  if (isPending || !session) {
    return (
      <main className="min-h-screen pt-32 pb-12 px-margin-mobile flex justify-center">
        <div className="w-16 h-16 rounded-full animate-pulse bg-slate-200/50"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-12 px-margin-mobile md:px-margin-desktop flex justify-center">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-8 md:p-12 shadow-xl animate__animated animate__fadeIn relative overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary-fixed blur-[80px] rounded-full opacity-30 pointer-events-none"></div>

        <header className="mb-10 text-center relative z-10">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Update Profile</h1>
          <p className="text-on-surface-variant font-body-md bg-white/40 inline-block px-4 py-1 rounded-full">{session.user.email}</p>
        </header>

        <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="font-label-bold text-label-bold text-on-surface-variant ml-1" htmlFor="name">Display Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">person</span>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/50 border-outline-variant rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-bold text-label-bold text-on-surface-variant ml-1" htmlFor="image">Profile Picture URL</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">image</span>
              <input 
                type="url" 
                id="image" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/avatar.png"
                className="w-full bg-white/50 border-outline-variant rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => {
                setName(session.user.name || "");
                setImage(session.user.image || "");
              }}
              className="px-6 py-3 rounded-full font-label-bold text-on-surface hover:bg-white/40 transition-colors"
            >
              Reset
            </button>
            <button 
              type="submit" 
              disabled={isUpdating || (name === session.user.name && image === (session.user.image || ""))}
              className="sunset-gradient px-8 py-3 rounded-full text-white font-label-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
