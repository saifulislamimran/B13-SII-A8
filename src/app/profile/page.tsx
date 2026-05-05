"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Protected route logic
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <main className="min-h-screen pt-32 pb-12 px-margin-mobile flex justify-center">
        <div className="w-16 h-16 rounded-full animate-pulse bg-slate-200/50"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-12 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar / Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col items-center bg-white/20 dark:bg-black/40 border-white/20">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary-fixed blur-[60px] rounded-full opacity-20 pointer-events-none"></div>
            
            <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white/10 shadow-lg bg-white/5 group relative">
              <img 
                src={session.user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (session?.user?.name || "User")} 
                alt="Profile Picture" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="material-symbols-outlined text-white">photo_camera</span>
              </div>
            </div>
            
            <h1 className="font-headline-md text-slate-900 dark:text-white mb-1">{session.user.name}</h1>
            <p className="text-slate-600 dark:text-slate-400 font-body-md mb-6">{session.user.email}</p>
            
            <div className="w-full space-y-3">
              <Link href="/profile/update" className="w-full sunset-gradient py-3 rounded-xl text-white font-label-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit Profile
              </Link>
              <button className="w-full glass-panel py-3 rounded-xl text-slate-700 dark:text-slate-300 font-label-bold flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-all border-slate-200 dark:border-white/10">
                <span className="material-symbols-outlined text-sm">settings</span>
                Account Settings
              </button>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-6 bg-white/20 dark:bg-black/40 border-white/20">
            <h3 className="font-label-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-400">workspace_premium</span>
              SunClub Membership
            </h3>
            <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Tier Status</span>
                <span className="text-sm font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wider">Gold</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full sunset-gradient w-[75%]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 text-center">250 points until Platinum status</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Orders', value: '12', icon: 'shopping_cart' },
              { label: 'Wishlist', value: '24', icon: 'favorite' },
              { label: 'SunPoints', value: '1,250', icon: 'stars' },
              { label: 'Coupons', value: '3', icon: 'confirmation_number' }
            ].map((stat) => (
              <div key={stat.label} className="glass-panel p-4 rounded-xl bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/5 hover:bg-white/50 dark:hover:bg-black/30 transition-all cursor-default">
                <span className="material-symbols-outlined text-orange-500 dark:text-orange-400 mb-2">{stat.icon}</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="glass-panel rounded-2xl p-8 bg-white/20 dark:bg-black/40 border-white/20 dark:border-white/10 min-h-[300px]">
            <h2 className="font-headline-md text-slate-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-center p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden flex-shrink-0">
                    <img src={i === 1 ? "https://lh3.googleusercontent.com/aida/ADBb0ugyhwtCGBySHuNo7Wt-0-5Mi-IrGDmWHaySSjKSiirgtgr0oFdiv2mT1-_tTFfkVM1ueFbwwUr3FutbWVM0ZCQXGqbLeaWdCPF4HtywuSXUg6XcX6VYXhEEKC19A24UwrbZwDaHgW2TT04Vqc8wfRRFopma-LEtJPFf8cP2m4VL5MbSBG3ix8GsRhwwburovGKo6qy30cw3BA2fcWckl7a9NZtEpyKr_aAKWv_0wyNCFORxd6B4Vorl9iJgMpdBuP4YHPTlTUSs_W0" : "https://lh3.googleusercontent.com/aida/ADBb0ug6SM5NO0Q_nXzt5uFc-GihTttiYA4N5jkPWRxO1NDju-N3KR2GLgR_ps_3_IyD1TngBGUGlOnqwau9-Svg5BbK2ko2L77LLZHyPdwjaD0Rfvd4h7Sdy-n2tUX2sqfD3w4xj7ewIeAzZMiZL8c7csfs5ZoRg00rn0RIsIQTHwKGB3eBNLPP7nJoApKrVoXa7rlVDGrgJUFEJiC1q4Y3RvSwtxPlRguGwAVrUY_LGytYy8kbTgzorAsfME_Fahb2oXoIwDixFWHizIQ"} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-slate-900 dark:text-white font-bold">{i === 1 ? 'Order Delivered' : 'Item in Wishlist'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">Premium Beach Set • 2 days ago</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">chevron_right</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Recommendation */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img src="https://lh3.googleusercontent.com/aida/ADBb0ugE-aeS3p2djkMcxuglYVqPW85r1zGumTGeFDEx83p-A3rw6TAzf2ksglv0ZjtAHGqhRTWaArRTYTfAF5Eqzn2oRsoHTFibUHQ8GGCcrpj3HLZTmefNvqrpu1GeUD07h2DK_fUXcqNYRCsQHwkmtBxZ264s9hsqSttvmxt7Tvg1FxHeUMHh2BjbiSHPqLaVlwSpeHBXxaLau3_4rZaMd-dhs5fGatPDiBSPQWGnBsV459qcajLiXWnHErEg6TFii6Ujj75_T2kCA4o" className="w-full h-48 object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <p className="text-orange-400 font-label-bold text-[10px] tracking-widest uppercase mb-2">Featured Summer Pick</p>
              <h3 className="text-2xl font-black text-white mb-4">The Coastal Collection</h3>
              <button className="w-fit px-6 py-2 rounded-full border border-white/20 text-white text-xs font-bold backdrop-blur-md hover:bg-white hover:text-black transition-all">Shop the Look</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
