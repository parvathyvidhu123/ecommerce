"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { MessageCircle, Eye, Sparkles, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem, STORE_DETAILS } from "@/data/products";

interface EditorialGalleryProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenItemModal: (item: GalleryItem) => void;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenItemModal,
}) => {
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="editorial-gallery" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#520B0F]/5 border border-[#520B0F]/20 text-[#520B0F] text-xs font-brand-sub uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-[#840D11]" />
          <span>Curated Suites</span>
        </div>

        <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-[0.04em]">
          The Product Gallery
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 font-normal">
          Explore our exclusive curation of fine chains, solitaire rings, wedding suites, couture cosmetics, and rejuvenating skincare.
        </p>

        {/* Elegant Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredItems.map((item) => {
          const whatsappMsg = `Hello Nakshatra Collections Kanjirappally!
I am interested in inquiring about this piece from your gallery:
✨ *${item.title}*
🏷️ Category: ${item.categoryLabel}
📌 ID: ${item.id}

Could you please share details, pricing, and availability? Thank you!`;

          return (
            <div
              key={item.id}
              className="luxury-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Image Frame */}
              <div
                onClick={() => onOpenItemModal(item)}
                className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#F8F6F0] cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 z-10 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#520B0F]/20 text-[10px] font-brand-sub uppercase tracking-wider text-[#520B0F] font-bold shadow-sm">
                  {item.tag}
                </div>

                {/* Subtle Hover Action Overlay */}
                <div className="absolute inset-0 bg-[#520B0F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-[#FFFFFF]/95 text-[#520B0F] font-brand-sub text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </span>
                </div>
              </div>

              {/* Details & Description */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="font-brand-sub text-[10px] uppercase tracking-[0.22em] text-[#840D11] font-bold">
                    {item.categoryLabel}
                  </span>
                  
                  <h3
                    onClick={() => onOpenItemModal(item)}
                    className="font-brand text-lg sm:text-xl font-bold text-[#1A1A1A] hover:text-[#520B0F] transition-colors cursor-pointer leading-snug line-clamp-1"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-500 font-medium line-clamp-1">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 pt-1">
                    {item.details}
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-4 border-t border-[#520B0F]/10 flex items-center gap-2.5">
                  <a
                    href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#520B0F] hover:bg-[#840D11] text-[#FFF8E7] text-xs font-brand-sub uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F7E5A9]" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onOpenItemModal(item)}
                    className="p-2.5 rounded-full bg-[#520B0F]/5 text-[#520B0F] border border-[#520B0F]/20 hover:bg-[#520B0F]/10 transition-colors"
                    title="View Item Specs"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
