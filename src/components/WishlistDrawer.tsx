"use client";

import React from "react";
import Image from "next/image";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { GALLERY_ITEMS } from "@/data/products";

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = GALLERY_ITEMS.filter((item) =>
    wishlist.includes(item.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCF9] text-[#1F1F1F] shadow-2xl flex flex-col border-l border-[#520B0F]/20 animate-slideLeft">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#520B0F] text-[#FFF8E7] flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
              <h2 className="font-brand text-xl font-bold tracking-wide">
                Saved Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 text-zinc-500">
                <div className="w-16 h-16 rounded-full bg-[#520B0F]/5 flex items-center justify-center border border-[#520B0F]/20">
                  <Heart className="w-8 h-8 text-[#520B0F]/50" />
                </div>
                <div>
                  <h3 className="font-brand text-lg font-bold text-[#1A1A1A]">Your Wishlist is Empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Tap the heart icon on any jewellery piece or cosmetic product to save it here for later.
                  </p>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#520B0F] text-[#FFF8E7] font-brand-sub text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#840D11] transition-all shadow-md"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#520B0F]/10 shadow-sm hover:border-[#520B0F]/25 transition-all"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-brand-sub uppercase tracking-wider text-[#840D11] font-semibold">
                          {product.categoryLabel}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-zinc-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-brand text-sm font-bold text-zinc-900 line-clamp-1">
                        {product.title}
                      </h4>
                      <p className="font-brand font-bold text-[#520B0F] text-base mt-1">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product.id);
                      }}
                      className="mt-2 w-full py-1.5 px-3 rounded-lg bg-[#520B0F]/5 hover:bg-[#520B0F] text-[#520B0F] hover:text-[#FFF8E7] border border-[#520B0F]/20 text-[11px] font-brand-sub uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom All Move CTA */}
          {wishlistProducts.length > 0 && (
            <div className="px-6 py-4 bg-white border-t border-[#520B0F]/15">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p, 1));
                  wishlistProducts.forEach((p) => toggleWishlist(p.id));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 rounded-xl burgundy-gradient-btn flex items-center justify-center gap-2 font-brand-sub text-xs uppercase tracking-[0.2em] font-bold shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
