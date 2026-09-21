"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, Heart, ShoppingBag, Star, Search, ArrowUpDown, X } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const filteredItems = useMemo(() => {
    let result = [...GALLERY_ITEMS];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="gallery" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#520B0F]/5 border border-[#520B0F]/20 text-[#520B0F] text-xs font-brand-sub uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-[#840D11]" />
          <span>Curated E-Commerce Showcase</span>
        </div>

        <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-[0.04em]">
          The Boutique Catalog & Gallery
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 font-normal">
          Explore our heirloom 24K gold chains, cocktail rings, grand wedding suites, studio cosmetics, and dermatologist-tested skincare routines.
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

        {/* Search & Sort Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          {/* Search Box */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery, rings, bridal..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-full border border-zinc-300 focus:outline-none focus:border-[#520B0F] bg-white shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 hidden sm:inline-block" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 text-xs rounded-full border border-zinc-300 bg-white text-zinc-700 focus:outline-none focus:border-[#520B0F] shadow-xs cursor-pointer font-medium"
            >
              <option value="featured">Featured Collections</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated &amp; Reviews</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product & Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-zinc-200">
          <p className="font-brand text-xl text-zinc-800 font-bold">No collections found matching &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-zinc-500">Try searching for &quot;chains&quot;, &quot;kundan&quot;, &quot;ring&quot;, or reset your filters.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-full bg-[#520B0F] text-[#FFF8E7] text-xs font-brand-sub uppercase tracking-wider font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isFavorited = isInWishlist(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#F8F6F0] border border-[#520B0F]/15 shadow-sm hover:shadow-[0_20px_40px_rgba(82,11,15,0.18)] hover:border-[#520B0F]/40 transition-all duration-500 aspect-[4/5] flex flex-col justify-between"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0305]/95 via-[#1A0305]/30 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-400"></div>

                {/* Top Controls: Wishlist Heart & Category Badge */}
                <div className="relative z-10 p-4 flex items-start justify-between">
                  {/* Wishlist Heart Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id);
                    }}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                      isFavorited
                        ? "bg-rose-50 text-rose-600"
                        : "bg-white/80 text-zinc-700 hover:bg-white hover:text-rose-600"
                    }`}
                    title={isFavorited ? "Saved in Wishlist" : "Add to Wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorited ? "fill-rose-600" : ""}`}
                    />
                  </button>

                  {/* Category Tag (Top Right) */}
                  <div className="bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#520B0F]/20 text-[9.5px] font-brand-sub uppercase tracking-wider text-[#520B0F] font-bold shadow-sm flex items-center gap-1.5">
                    <span>{item.categoryLabel}</span>
                  </div>
                </div>

                {/* Floating Bottom Card Details */}
                <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end transform translate-y-1 group-hover:translate-y-0 transition-transform duration-400 space-y-2">
                  
                  {/* Tag & Rating */}
                  <div className="flex items-center justify-between">
                    <span className="font-brand-sub text-[9.5px] uppercase tracking-[0.22em] text-[#F7E5A9] font-bold">
                      {item.badge || item.tag}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#FFF8E7]/90 bg-black/30 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                      <span>{item.rating || 4.9}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-brand text-base sm:text-lg font-bold text-[#FFF8E7] leading-snug line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Price & Add to Bag */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-brand text-lg sm:text-xl font-bold text-[#F7E5A9]">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-[#FFF8E7]/60 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Quick Add to Bag CTA */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#FFF8E7] text-[#520B0F] hover:bg-[#D4AF37] hover:text-[#1A0305] font-brand-sub text-[10.5px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Expanded View Hint on Hover */}
                  <div className="flex items-center justify-between text-[10px] text-[#FFF8E7]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1 font-brand-sub uppercase tracking-wider border-t border-white/15">
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-[#D4AF37]" />
                      <span>Full Specs &amp; Trial</span>
                    </span>
                    <span className="text-emerald-300 font-semibold">In Showroom Stock</span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
