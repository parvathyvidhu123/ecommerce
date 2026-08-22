"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Gem, ShieldCheck, Heart, MapPin, Store, UserCheck } from "lucide-react";
import { STORE_DETAILS } from "@/data/products";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#FDFCF9] border-b border-[#520B0F]/15 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#520B0F]/5 border border-[#520B0F]/20 text-[#520B0F] text-xs font-brand-sub uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#840D11]" />
            <span>Kanjirappally Showroom</span>
          </div>

          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
            About Nakshatra Collections
          </h2>

          <p className="text-xs sm:text-sm font-brand-sub uppercase tracking-[0.25em] text-[#840D11] font-semibold">
            BEAUTY STORE & FASHION ACCESSORIES
          </p>
        </div>

        {/* Grid: Owner Portrait & Modern Boutique Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Real Color-Graded Portrait of Elizabeth Devasia */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Frame Accent */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#520B0F]/15 via-transparent to-[#D4AF37]/25 -z-10"></div>

              <div className="relative rounded-3xl overflow-hidden border-2 border-[#520B0F]/25 shadow-xl bg-[#F8F6F0]">
                <div className="relative h-96 sm:h-[460px] w-full">
                  <Image
                    src="/images/owner.jpg"
                    alt="Elizabeth Devasia - Founder & Owner of Nakshatra Collections Kanjirappally"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0305]/85 via-[#1A0305]/20 to-transparent"></div>
                  
                  {/* Owner Label Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FFFFFF]/95 backdrop-blur-md p-4 rounded-2xl border border-[#520B0F]/20 shadow-md">
                    <span className="font-brand-sub text-[9.5px] uppercase tracking-[0.22em] text-[#840D11] font-bold block">
                      Founder & Owner
                    </span>
                    <h3 className="font-brand text-lg font-bold text-[#1A1A1A] mt-0.5">
                      Elizabeth Devasia
                    </h3>
                    <p className="text-xs text-zinc-600 font-medium">
                      Nakshatra Collections • CMP Building, Kanjirappally
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Clean Modern Store Overview */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="space-y-3">
              <span className="font-brand-sub text-[10.5px] uppercase tracking-[0.28em] text-[#840D11] font-bold block">
                Welcome to Our Showroom
              </span>
              <h3 className="font-brand text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug">
                Curated beauty essentials, fine jewellery & styling accessories by Elizabeth Devasia.
              </h3>
            </div>

            {/* Clean Narrative Box */}
            <div className="p-6 rounded-2xl bg-[#F8F6F0] border border-[#520B0F]/15 space-y-3 text-left">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                Founded and led by <strong>Elizabeth Devasia</strong>, Nakshatra Collections is a premier destination for beauty, skincare, and fashion accessories in Kanjirappally. Located at CMP Building, we offer a handpicked collection of bridal and daily jewellery, high-performance makeup, soothing skincare routines, and party accessories crafted to complement every special occasion.
              </p>
              
              <div className="pt-3 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[#520B0F] font-brand text-xs font-bold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Elizabeth Devasia — Founder & Owner</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-brand-sub uppercase tracking-wider text-zinc-500">
                  <MapPin className="w-3 h-3 text-[#840D11]" />
                  <span>CMP Building, Kanjirappally</span>
                </div>
              </div>
            </div>

            {/* 3 Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#520B0F]/10 shadow-sm space-y-1 text-left">
                <Gem className="w-5 h-5 text-[#520B0F] mb-1.5" />
                <h4 className="font-brand text-sm font-bold text-[#1A1A1A]">Curated Collections</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                  Chains, rings, bridal sets, cosmetics & skincare.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#520B0F]/10 shadow-sm space-y-1 text-left">
                <ShieldCheck className="w-5 h-5 text-[#520B0F] mb-1.5" />
                <h4 className="font-brand text-sm font-bold text-[#1A1A1A]">Premium Quality</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                  High-micron gold plating & skin-safe cosmetic care.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#520B0F]/10 shadow-sm space-y-1 text-left">
                <Heart className="w-5 h-5 text-[#520B0F] mb-1.5" />
                <h4 className="font-brand text-sm font-bold text-[#1A1A1A]">In-Store Experience</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                  Personalized assistance at CMP Building.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
