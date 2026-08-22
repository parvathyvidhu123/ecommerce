"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsFinishing(true), 200);
          setTimeout(() => setIsCurtainOpen(true), 600);
          setTimeout(() => setShouldRemove(true), 1500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 8;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (shouldRemove) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden select-none">
      
      {/* Top Velvet Curtain Panel */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#140204] z-20 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isCurtainOpen ? "-translate-y-full" : "translate-y-0"
        } border-b border-[#D4AF37]/20`}
      />

      {/* Bottom Velvet Curtain Panel */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#140204] z-20 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isCurtainOpen ? "translate-y-full" : "translate-y-0"
        } border-t border-[#D4AF37]/20`}
      />

      {/* Central Interactive Content Container */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
          isFinishing ? "opacity-0 scale-110 blur-sm" : "opacity-100 scale-100"
        }`}
      >
        {/* Subtle Film Grain Noise */}
        <div className="grain-overlay opacity-15" />

        {/* Ambient Pulsing Radial Aura */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#520B0F]/30 via-[#840D11]/20 to-[#D4AF37]/15 blur-3xl animate-pulse pointer-events-none" />

        {/* Rotating Celestial Constellations & Emblem */}
        <div className="relative mb-8 flex items-center justify-center">
          
          {/* Outer Ring (Clockwise) */}
          <div className="absolute -inset-10 rounded-full border border-[#D4AF37]/35 border-dashed animate-spin-slow pointer-events-none" />

          {/* Inner Counter-Rotating Orbit (Counter-Clockwise) */}
          <div
            className="absolute -inset-5 rounded-full border border-[#F7E5A9]/20 pointer-events-none"
            style={{ animation: "spinSlow 20s linear infinite reverse" }}
          />

          {/* Floating Orbiting Constellation Stars */}
          <span className="absolute -top-7 text-[#D4AF37] text-xs animate-pulse opacity-80">✦</span>
          <span className="absolute -bottom-7 text-[#F7E5A9] text-xs animate-pulse opacity-80" style={{ animationDelay: "1s" }}>✧</span>
          <span className="absolute -left-9 text-[#D4AF37] text-[10px] animate-pulse opacity-70" style={{ animationDelay: "0.5s" }}>★</span>
          <span className="absolute -right-9 text-[#F7E5A9] text-[10px] animate-pulse opacity-70" style={{ animationDelay: "1.5s" }}>✦</span>

          {/* Central Luxury Logo Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.4)] bg-[#1F0306] p-1.5 transition-transform duration-700 hover:scale-105">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Nakshatra Emblem"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Brand Editorial Statement */}
        <div className="space-y-3 text-center px-4 max-w-lg">
          <h1 className="font-brand text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.22em] text-white drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)]">
            NAKSHATRA
          </h1>

          <p className="font-brand text-lg sm:text-xl italic text-[#F7E5A9] font-normal tracking-wide">
            Adorning Every Moment with Timeless Grace
          </p>

          <p className="font-brand-sub text-[9px] uppercase tracking-[0.3em] text-white/50 pt-1">
            Beauty Store • Fashion Accessories • Jewellery • Skincare
          </p>
        </div>

        {/* Shimmering Laser Gold Progress Bar */}
        <div className="w-56 sm:w-72 space-y-2.5 pt-8">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF8E7] to-[#D4AF37] transition-all duration-200 ease-out relative shadow-[0_0_15px_#D4AF37]"
              style={{ width: `${progress}%` }}
            >
              {/* Laser Tip Glow Flare */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFF8E7] rounded-full blur-[2px] shadow-[0_0_10px_#FFF8E7]" />
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-brand-sub uppercase tracking-[0.25em] text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>Curating Experience</span>
            </span>
            <span className="font-brand text-sm font-bold text-[#D4AF37]">{progress}%</span>
          </div>
        </div>

      </div>

    </div>
  );
};
