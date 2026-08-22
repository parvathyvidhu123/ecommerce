"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Sparkles, Eye, Maximize2 } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from "@/data/products";

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#520B0F]/5 border border-[#520B0F]/20 text-[#520B0F] text-xs font-brand-sub uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-[#840D11]" />
          <span>Pure Visual Showcase</span>
        </div>

        <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-[0.04em]">
          The Product Gallery
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 font-normal">
          An animated visual gallery of our signature chains, rings, bridal jewellery suites, couture cosmetics, and skincare.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full font-brand-sub text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                  isSelected
                    ? "bg-[#520B0F] text-[#FFF8E7] shadow-[0_4px_15px_rgba(82,11,15,0.25)] font-bold scale-105 border border-[#D4AF37]/50"
                    : "bg-[#FFFFFF] text-zinc-700 hover:text-[#520B0F] hover:bg-[#520B0F]/5 border border-zinc-200"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Image-Only Animated Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item)}
            className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#F8F6F0] border border-[#520B0F]/15 shadow-sm hover:shadow-[0_20px_40px_rgba(82,11,15,0.18)] hover:border-[#520B0F]/40 transition-all duration-500 aspect-[4/5]"
          >
            {/* Main Visual Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Shade on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0305]/85 via-[#1A0305]/20 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-400"></div>

            {/* Category Tag (Top Right) */}
            <div className="absolute top-4 right-4 z-10 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#520B0F]/20 text-[9.5px] font-brand-sub uppercase tracking-wider text-[#520B0F] font-bold shadow-sm">
              {item.categoryLabel}
            </div>

            {/* Floating Title & Zoom Indicator (Bottom on Hover) */}
            <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
              <span className="font-brand-sub text-[9.5px] uppercase tracking-[0.22em] text-[#F7E5A9] font-bold">
                {item.tag}
              </span>
              <h3 className="font-brand text-base sm:text-lg font-bold text-[#FFF8E7] mt-0.5 leading-snug">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs text-[#FFF8E7]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 font-brand-sub uppercase tracking-wider">
                <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Click to expand</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
