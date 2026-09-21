"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounceIn">
      <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#1A0305]/95 text-[#FFF8E7] border border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(82,11,15,0.4)] backdrop-blur-md text-xs sm:text-sm font-medium">
        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse flex-shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
