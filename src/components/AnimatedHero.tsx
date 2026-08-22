"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, MapPin, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { STORE_DETAILS } from "@/data/products";

export const AnimatedHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#1A0305] border-b border-[#520B0F]/30 m-0 p-0">
      
      {/* 100% Full-Screen Bleed Background Video */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/storefront.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Cinematic Vignette & Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0305] via-[#1A0305]/40 to-[#1A0305]/75 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[#520B0F]/20 backdrop-brightness-90 pointer-events-none"></div>

      {/* Sound Toggle Button (Bottom Right) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-6 sm:right-10 z-20 p-3 rounded-full bg-[#1A0305]/80 backdrop-blur-md text-[#FFF8E7] hover:bg-[#520B0F] border border-white/20 transition-all shadow-xl hover:scale-105"
        title={isMuted ? "Unmute Video" : "Mute Video"}
        aria-label="Toggle Sound"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Central Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FFF8E7] space-y-6">
        
        {/* Main Brand Title & Editorial Headline */}
        <div className="space-y-3">
          <h1 className="font-brand text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.04em] text-white leading-[1.02] drop-shadow-lg">
            NAKSHATRA
          </h1>

          <p className="font-brand text-2xl sm:text-3xl md:text-4xl italic text-[#F7E5A9] font-normal drop-shadow-md">
            Adorning Every Moment with Timeless Grace
          </p>

          <p className="font-brand-sub text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/80 pt-2">
            Beauty Store • Fashion Accessories • Jewellery • Skincare
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="#gallery"
            className="px-8 py-3.5 rounded-full font-brand-sub text-xs uppercase tracking-[0.22em] font-bold text-[#1A0305] bg-[#FFF8E7] hover:bg-[#D4AF37] shadow-[0_6px_30px_rgba(0,0,0,0.4)] hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Explore Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
              "Hello Nakshatra Collections Kanjirappally! I am visiting your website and would like to inquire about your collections."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full font-brand-sub text-xs uppercase tracking-[0.2em] font-semibold text-[#FFF8E7] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#F7E5A9]" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 pointer-events-none animate-bounce">
        <span className="font-brand-sub text-[8.5px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </div>

    </section>
  );
};
