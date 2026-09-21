"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { X, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, CreditCard, Smartphone, Banknote, Truck, MessageCircle, Sparkles, Printer } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_DETAILS } from "@/data/products";

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    couponCode,
    openTrackOrder,
  } = useCart();

  const [step, setStep] = useState<"address" | "payment" | "confirmed">("address");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Kanjirappally",
    state: "Kerala",
    pincode: "686507",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod" | "whatsapp">("upi");
  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in your name, phone number, and address.");
      return;
    }
    setStep("payment");
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    const generatedId = `NK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);

    setTimeout(() => {
      setIsProcessing(false);
      setStep("confirmed");

      // Explosive confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#520B0F", "#D4AF37", "#840D11", "#FFF8E7", "#F7E5A9"],
        });
      } catch (err) {}

      // Clear the cart
      clearCart();
    }, 1200);
  };

  const handleWhatsAppForward = () => {
    const summary = `*NEW ORDER CONFIRMED - #${orderId}*%0A%0A*Customer:* ${formData.fullName}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}%0A*Payment Mode:* ${paymentMethod.toUpperCase()}%0A*Total Paid/Due:* ₹${grandTotal}%0A%0A📦 *Live Courier Tracking:*%0Ahttps://nakshatracollections.com/track?order=${orderId}%0A%0AThank you for shopping with Nakshatra Collections Kanjirappally!`;
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${summary}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (step !== "confirmed") setIsCheckoutOpen(false);
        }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#FDFCF9] rounded-3xl shadow-2xl border border-[#520B0F]/20 overflow-hidden z-10 animate-scaleUp my-8">
          
          {/* Header */}
          <div className="bg-[#520B0F] text-[#FFF8E7] px-6 py-5 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div>
              <span className="font-brand-sub text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Nakshatra Luxury Boutique Checkout
              </span>
              <h3 className="font-brand text-xl sm:text-2xl font-bold tracking-wide">
                {step === "address" && "1. Delivery Information"}
                {step === "payment" && "2. Payment Method"}
                {step === "confirmed" && "Order Confirmed!"}
              </h3>
            </div>
            {step !== "confirmed" && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {step === "address" && (
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Parvathy S."
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:border-[#520B0F] text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 94470 00000"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:border-[#520B0F] text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:border-[#520B0F] text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                    Complete Shipping Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House name, street, landmarks..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:border-[#520B0F] text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                      City / Town
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-700 font-semibold mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-sm bg-white"
                    />
                  </div>
                </div>

                {/* Order Summary Snapshot */}
                <div className="p-4 rounded-2xl bg-[#FFF8E7]/60 border border-[#D4AF37]/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-zinc-600">Total payable ({cart.reduce((a, b) => a + b.quantity, 0)} items):</span>
                    <p className="font-brand font-bold text-lg text-[#520B0F]">₹{grandTotal.toLocaleString()}</p>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {shippingFee === 0 ? "Free Shipping Applied" : "Standard Shipping ₹99"}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl burgundy-gradient-btn flex items-center justify-center gap-2 font-brand-sub text-xs uppercase tracking-[0.2em] font-bold shadow-lg"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {step === "payment" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="block text-xs font-brand-sub uppercase tracking-wider text-zinc-600 font-semibold">
                    Select Preferred Payment Method
                  </span>

                  {/* UPI */}
                  <label
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#520B0F] bg-[#520B0F]/5 shadow-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="text-[#520B0F] focus:ring-[#520B0F]"
                    />
                    <Smartphone className="w-5 h-5 text-[#520B0F]" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-zinc-900">UPI / QR (Google Pay, PhonePe, Paytm)</span>
                        <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Instant</span>
                      </div>
                      <p className="text-xs text-zinc-500">Scan & pay seamlessly from any Indian UPI app</p>
                    </div>
                  </label>

                  {/* Cards */}
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-[#520B0F] bg-[#520B0F]/5 shadow-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="text-[#520B0F] focus:ring-[#520B0F]"
                    />
                    <CreditCard className="w-5 h-5 text-[#520B0F]" />
                    <div className="flex-1">
                      <span className="font-semibold text-sm text-zinc-900">Credit / Debit Card & NetBanking</span>
                      <p className="text-xs text-zinc-500">Visa, MasterCard, RuPay with 256-bit bank encryption</p>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#520B0F] bg-[#520B0F]/5 shadow-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-[#520B0F] focus:ring-[#520B0F]"
                    />
                    <Banknote className="w-5 h-5 text-[#520B0F]" />
                    <div className="flex-1">
                      <span className="font-semibold text-sm text-zinc-900">Cash on Delivery (COD)</span>
                      <p className="text-xs text-zinc-500">Pay safely upon delivery at your doorstep in Kerala</p>
                    </div>
                  </label>

                  {/* WhatsApp Direct */}
                  <label
                    onClick={() => setPaymentMethod("whatsapp")}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "whatsapp"
                        ? "border-emerald-600 bg-emerald-50 shadow-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "whatsapp"}
                      onChange={() => setPaymentMethod("whatsapp")}
                      className="text-emerald-600 focus:ring-emerald-600"
                    />
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-zinc-900">WhatsApp Boutique Concierge</span>
                        <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full">Recommended</span>
                      </div>
                      <p className="text-xs text-zinc-500">Confirm order with our Kanjirappally team directly on WhatsApp</p>
                    </div>
                  </label>
                </div>

                {/* Final Cost Breakdown */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-zinc-600">
                    <span>Delivering to:</span>
                    <span className="font-semibold text-zinc-800 truncate max-w-[220px]">
                      {formData.fullName}, {formData.city} ({formData.pincode})
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount ({couponCode}):</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping:</span>
                    <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-brand font-bold text-[#520B0F] border-t border-zinc-200 pt-2">
                    <span>Final Amount:</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("address")}
                    className="py-3 px-4 rounded-xl border border-zinc-300 text-zinc-700 font-brand-sub text-xs uppercase tracking-wider font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleCompleteOrder}
                    className="flex-1 py-3 px-4 rounded-xl burgundy-gradient-btn flex items-center justify-center gap-2 font-brand-sub text-xs uppercase tracking-[0.2em] font-bold shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                        <span>Securing Order...</span>
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span>Place Order (₹{grandTotal.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === "confirmed" && (
              <div className="text-center py-4 space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12 animate-scaleUp" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Order Successfully Placed!</span>
                  </span>
                  <h3 className="font-brand text-2xl sm:text-3xl font-bold text-zinc-900">
                    Thank You, {formData.fullName}!
                  </h3>
                  <p className="text-sm text-zinc-600 mt-1 max-w-md mx-auto">
                    Your order reference number is <strong>{orderId}</strong>. We are hand-packing your items at our Kanjirappally boutique.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#520B0F]/15 shadow-md text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-zinc-100 pb-2">
                    <span className="text-zinc-500">Order ID:</span>
                    <span className="font-mono font-bold text-[#520B0F]">{orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-2">
                    <span className="text-zinc-500">Delivery Address:</span>
                    <span className="font-medium text-zinc-800 text-right">{formData.address}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-2">
                    <span className="text-zinc-500">Estimated Delivery:</span>
                    <span className="font-semibold text-emerald-700">2-4 Business Days (Express Insured)</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-2">
                    <span className="text-zinc-500">Payment Status:</span>
                    <span className="font-semibold text-zinc-800 uppercase">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-brand font-bold text-[#520B0F]">
                    <span>Total Amount:</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2 max-w-md mx-auto">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      openTrackOrder(orderId);
                    }}
                    className="flex-1 py-3 px-3.5 rounded-xl burgundy-gradient-btn text-[#FFF8E7] font-brand-sub text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Track Live</span>
                  </button>

                  <button
                    onClick={handleWhatsAppForward}
                    className="flex-1 py-3 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-brand-sub text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setStep("address");
                    }}
                    className="py-3 px-3.5 rounded-xl bg-zinc-200 text-zinc-800 font-brand-sub text-xs uppercase tracking-wider font-semibold hover:bg-zinc-300 transition-all text-center"
                  >
                    Shop
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
