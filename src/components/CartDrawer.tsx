"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_DETAILS } from "@/data/products";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    freeShippingThreshold,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setInputCoupon("");
    }
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map((item, idx) => `${idx + 1}. ${item.product.title} (Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}`)
      .join("%0A");

    const message = `Hello Nakshatra Collections Kanjirappally! 🌟%0A%0AI would like to place an order directly from your online catalog:%0A%0A${itemList}%0A%0A*Subtotal:* ₹${subtotal}%0A*Shipping:* ${shippingFee === 0 ? "FREE" : `₹${shippingFee}`}%0A*Estimated Total:* ₹${grandTotal}%0A%0APlease let me know how to confirm and complete my delivery!`;

    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCF9] text-[#1F1F1F] shadow-2xl flex flex-col border-l border-[#520B0F]/20 animate-slideLeft">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#520B0F] text-[#FFF8E7] flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-brand text-xl font-bold tracking-wide">
                Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#FFF8E7] px-6 py-3 border-b border-[#D4AF37]/30">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-2 text-xs text-[#520B0F] font-semibold">
                <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0 animate-pulse" />
                <span>You unlocked <strong>FREE Kerala & All-India Shipping!</strong></span>
              </div>
            ) : (
              <div className="text-xs text-[#520B0F] space-y-1.5">
                <p>
                  Add <strong>₹{amountNeededForFreeShipping}</strong> more to unlock <strong>FREE Express Shipping</strong>
                </p>
                <div className="w-full bg-[#520B0F]/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#D4AF37] to-[#840D11] h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 text-zinc-500">
                <div className="w-16 h-16 rounded-full bg-[#520B0F]/5 flex items-center justify-center border border-[#520B0F]/20">
                  <ShoppingBag className="w-8 h-8 text-[#520B0F]/60" />
                </div>
                <div>
                  <h3 className="font-brand text-lg font-bold text-[#1A1A1A]">Your Bag is Empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explore our heirloom jewellery, bridal suites, and luxury cosmetics curated for you.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#520B0F] text-[#FFF8E7] font-brand-sub text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#840D11] transition-all shadow-md"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#520B0F]/10 shadow-sm hover:border-[#520B0F]/25 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-brand-sub uppercase tracking-wider text-[#840D11] font-semibold">
                          {item.product.categoryLabel}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-zinc-400 hover:text-[#840D11] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-brand text-sm font-bold text-zinc-900 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500">SKU: {item.product.sku}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-brand font-bold text-[#520B0F] text-base">
                          ₹{item.product.price}
                        </span>
                        {item.product.originalPrice > item.product.price && (
                          <span className="text-[11px] text-zinc-400 line-through">
                            ₹{item.product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-zinc-200 rounded-full bg-[#FDFCF9]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-[#520B0F] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-[#520B0F] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Actions */}
          {cart.length > 0 && (
            <div className="px-6 py-4 bg-white border-t border-[#520B0F]/15 space-y-3.5">
              
              {/* Coupon Code Input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code <strong>{couponCode}</strong> applied!</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="Promo code (e.g. NAKSHATRA10)"
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:border-[#520B0F] uppercase"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-[#520B0F] text-[#FFF8E7] rounded-xl text-xs font-brand-sub uppercase tracking-wider font-semibold hover:bg-[#840D11] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-rose-600">{couponError}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => applyCoupon("NAKSHATRA10")}
                      className="text-[11px] text-[#840D11] hover:underline flex items-center gap-1 pt-0.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      Tap to apply <strong>NAKSHATRA10</strong> (10% OFF)
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 border-t border-zinc-100 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-800">₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({couponCode})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery (Kerala & All-India)</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 uppercase font-bold text-[11px]">Free</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-brand font-bold text-[#520B0F] border-t border-zinc-200 pt-2">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Primary Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl burgundy-gradient-btn flex items-center justify-center gap-2 font-brand-sub text-xs uppercase tracking-[0.2em] font-bold shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 font-brand-sub text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Authentic Quality Guaranteed • Direct Boutique Dispatch</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
