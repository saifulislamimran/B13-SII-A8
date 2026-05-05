"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide Top Navigation on Transactional Screens
  if (pathname === "/login" || pathname === "/register") {
    return <Toaster position="top-right" />;
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
    </>
  );
}
