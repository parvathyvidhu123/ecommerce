"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, MapPin, Play, Pause, RotateCcw } from "lucide-react";
import { STORE_DETAILS } from "@/data/products";

export const AmbienceSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const storeCounters = [
    {
      num: "01",
      tag: "Bridal & Fine Jewellery",
      title: "Fancy & Bridal Jewellery",
      description:
        "Explore a wide selection of bridal choker sets, antique temple haarams, 24K micron gold-plated chains, rings, bangles, and jhumkas for everyday elegance and wedding celebrations.",
    },
    {
      num: "02",
      tag: "Cosmetics & Glamour",
      title: "Cosmetics & Makeup Counter",
      description:
        "Discover curated beauty essentials, long-wear lip palettes, intense kohl kajals, foundations, and bridal makeover products selected for lasting radiance.",
    },
    {
      num: "03",
      tag: "Skin Wellness",
      title: "Skincare & Radiance Care",
      description:
        "Pure steam-distilled floral toners, Ayurvedic Kumkumadi 24K saffron facial elixirs, and nourishing herbal skincare formulated for lasting bridal skin health.",
    },
    {
      num: "04",
      tag: "Styling Accents",
      title: "Fashion Accessories & Accents",
      description:
        "Handcrafted bridal hairpins, brooches, payals, designer clutch accessories, and styling accents that complete your festive and party look.",
    },
  ];

  return (
    <section id="ambience" className="py-20 md:py-28 bg-[#F8F6F0] border-b border-[#520B0F]/15 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="font-brand-sub text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#840D11] font-semibold">
            CMP Building • Kanjirappally
          </p>

          <h2 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-[1.1]">
            Inside Our <span className="italic font-normal text-[#520B0F]">Showroom</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 font-normal max-w-xl mx-auto leading-relaxed">
            Take a video tour inside our Kanjirappally store and explore our four curated beauty and jewellery sections.
          </p>
        </div>

        {/* Ambience 2-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Native Clean HD Studio Video Player */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#520B0F]/25 shadow-[0_25px_60px_rgba(82,11,15,0.18)] bg-[#1A0305] aspect-[9/16] max-w-sm mx-auto group">
              
              <video
                ref={videoRef}
                src="/videos/studio.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0305]/70 via-transparent to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#FFFFFF]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#520B0F]/20 flex items-center gap-2 shadow-md">
                <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[#520B0F]">
                  <Image src="/images/logo.png" alt="Nakshatra Emblem" fill className="object-cover" />
                </div>
                <span className="font-brand text-[10px] text-[#520B0F] font-bold tracking-[0.18em]">NAKSHATRA</span>
              </div>

              {/* Play / Pause Overlay Trigger */}
              <button
                onClick={togglePlay}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#1A0305]/70 backdrop-blur-md text-[#FFF8E7] hover:bg-[#520B0F] border border-white/20 transition-all shadow-md"
                title={isPlaying ? "Pause Video" : "Play Video"}
                aria-label="Toggle Playback"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#D4AF37]" />}
              </button>

              {/* Bottom Label Overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#FFFFFF]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#520B0F]/20 shadow-lg flex items-center justify-between">
                <div>
                  <span className="font-brand-sub text-[9px] uppercase tracking-[0.24em] text-[#840D11] font-bold block">
                    Showroom Tour
                  </span>
                  <h3 className="font-brand text-sm font-bold text-[#1A1A1A]">
                    Nakshatra Collections
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#520B0F]/10 text-[#520B0F] text-[9.5px] font-brand-sub uppercase tracking-wider font-semibold">
                  CMP Building
                </span>
              </div>

            </div>
          </div>

          {/* Right: 4 Store Counters */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {storeCounters.map((counter) => (
              <div
                key={counter.num}
                className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#520B0F]/10 shadow-sm hover:border-[#520B0F]/30 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-brand text-2xl font-bold text-[#520B0F]/60 group-hover:text-[#520B0F] transition-colors">
                      {counter.num}
                    </span>
                    <span className="font-brand-sub text-[9px] uppercase tracking-[0.22em] text-[#840D11] bg-[#520B0F]/5 px-2.5 py-0.5 rounded-full font-semibold border border-[#520B0F]/10">
                      {counter.tag}
                    </span>
                  </div>

                  <h3 className="font-brand text-lg font-bold text-[#1A1A1A] leading-snug">
                    {counter.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  {counter.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
