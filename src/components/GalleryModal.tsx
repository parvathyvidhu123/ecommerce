"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, MessageCircle, ShieldCheck, Star, Heart, ShoppingBag, Plus, Minus, ArrowRight, Sparkles, Check, Truck } from "lucide-react";
import { GalleryItem, STORE_DETAILS } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen, setIsCheckoutOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isFavorited = isInWishlist(item.id);

  const handleAddToCart = () => {
    addToCart(item, quantity);
  };

  const handleBuyNow = () => {
    addToCart(item, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  const whatsappMsg = `Hello Nakshatra Collections Kanjirappally! ✨
I would like to purchase / inquire about:
*${item.title}* (${item.categoryLabel})
SKU: ${item.sku}
Price: ₹${item.price} (Qty: ${quantity})

Please assist with my order and express delivery in Kerala. Thank you!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#520B0F]/20 shadow-[0_25px_60px_rgba(82,11,15,0.3)] z-10 text-[#1A1A1A]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FFFFFF]/90 text-[#520B0F] border border-[#520B0F]/20 hover:bg-[#520B0F] hover:text-white transition-colors shadow-sm"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image & Badges */}
          <div className="space-y-3">
            <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-[#520B0F]/15 bg-[#F8F6F0]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                <span className="bg-[#520B0F] text-[#FFF8E7] px-3 py-1 rounded-full text-[10px] font-brand-sub uppercase tracking-wider font-bold shadow-md">
                  {item.badge || item.tag}
                </span>
                {item.discountPercent > 0 && (
                  <span className="bg-emerald-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                    {item.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button Overlay */}
              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-md text-zinc-600 hover:text-rose-600 transition-colors"
                title="Save to Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited ? "text-rose-600 fill-rose-600" : ""
                  }`}
                />
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-600">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F8F6F0] border border-zinc-200">
                <Truck className="w-3.5 h-3.5 text-[#520B0F]" />
                <span>Free Kerala Shipping &gt; ₹999</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F8F6F0] border border-zinc-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Authentic Quality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Information & Purchase Actions */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-brand-sub text-[10.5px] uppercase tracking-[0.25em] text-[#840D11] font-bold">
                    {item.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                    SKU: {item.sku}
                  </span>
                </div>

                <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-tight mt-1">
                  {item.title}
                </h2>
                
                {/* Rating & Review Summary */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-1 bg-[#520B0F]/5 px-2 py-0.5 rounded-md border border-[#520B0F]/15 text-xs font-bold text-[#520B0F]">
                    <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    <span>{item.rating || 4.9}</span>
                  </div>
                  <span className="text-xs text-zinc-500">
                    ({item.reviewCount || 48} verified boutique reviews)
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 rounded-2xl bg-[#FFF8E7]/60 border border-[#D4AF37]/35 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-brand text-2xl sm:text-3xl font-bold text-[#520B0F]">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-zinc-400 line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                    Inclusive of all taxes • Free Showroom pickup available
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    In Stock ({item.stockCount} left)
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {item.details}
              </p>

              {/* Specifications Table */}
              <div className="bg-[#F8F6F0] p-3 rounded-xl border border-zinc-200 text-xs space-y-1.5">
                {Object.entries(item.specifications).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5 border-b border-zinc-200/60 last:border-b-0">
                    <span className="text-zinc-500">{k}:</span>
                    <span className="text-[#1A1A1A] font-semibold text-right ml-2">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Control Zone */}
            <div className="space-y-3 pt-2 border-t border-zinc-200">
              
              {/* Quantity Picker & Add to Bag */}
              <div className="flex gap-3">
                <div className="flex items-center border border-zinc-300 rounded-xl px-2 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-zinc-600 hover:text-[#520B0F] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-3 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(item.stockCount, q + 1))}
                    className="p-1.5 text-zinc-600 hover:text-[#520B0F] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-white border border-[#520B0F] text-[#520B0F] hover:bg-[#520B0F]/5 font-brand-sub text-xs uppercase tracking-[0.18em] font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 rounded-xl burgundy-gradient-btn font-brand-sub text-xs uppercase tracking-[0.18em] font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* WhatsApp Boutique Inquiry */}
              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-brand-sub text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat or Order via WhatsApp</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
