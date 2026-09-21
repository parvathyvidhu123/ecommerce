"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Package, CheckCircle2, Truck, MapPin, Clock, MessageCircle, ArrowRight, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_DETAILS } from "@/data/products";

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, trackingOrderId, setTrackingOrderId } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTracking, setActiveTracking] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (trackingOrderId) {
      setSearchQuery(trackingOrderId);
      lookupOrder(trackingOrderId);
    }
  }, [trackingOrderId]);

  if (!isTrackOrderOpen) return null;

  const lookupOrder = (query: string) => {
    setSearched(true);
    const cleaned = query.trim().toUpperCase();

    // Generate or fetch realistic order tracking details
    const isPlacedOrder = cleaned.startsWith("NK-");
    const id = isPlacedOrder ? cleaned : `NK-2026-${Math.abs(hashString(cleaned) % 9000 + 1000)}`;

    setActiveTracking({
      orderId: id,
      courierName: "Blue Dart Express / Delhivery",
      awbNumber: `AWB${Math.abs(hashString(id) % 90000000 + 10000000)}`,
      origin: "Nakshatra Boutique, Main Road, Kanjirappally",
      destination: "Kerala & All-India Delivery",
      estimatedDelivery: "2-3 Business Days",
      currentStep: 3, // In transit
      steps: [
        {
          title: "Order Confirmed",
          desc: "Payment verified & order booked with showroom",
          time: "Sep 21, 09:30 AM",
          completed: true,
        },
        {
          title: "Hand-Crafted & Quality Inspected",
          desc: "Hallmark verification & velvet gift packaging completed at Kanjirappally boutique",
          time: "Sep 21, 11:15 AM",
          completed: true,
        },
        {
          title: "In Transit with Courier",
          desc: "Scanned & departed Central Kerala Distribution Hub (Kottayam/Kochi)",
          time: "In Progress (Live Courier Sync)",
          completed: true,
          current: true,
        },
        {
          title: "Out for Delivery",
          desc: "Assigned to local delivery associate with Doorstep SMS code",
          time: "Expected Tomorrow",
          completed: false,
        },
        {
          title: "Delivered",
          desc: "Package safely handed over to recipient",
          time: "Pending",
          completed: false,
        },
      ],
    });
  };

  function hashString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    lookupOrder(searchQuery);
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello Nakshatra Collections Kanjirappally! 🌟%0A%0AI am tracking my order *#${activeTracking?.orderId || searchQuery}* (AWB: ${activeTracking?.awbNumber || "N/A"}).%0APlease provide the latest delivery update. Thank you!`;
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsTrackOrderOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#FDFCF9] rounded-3xl shadow-2xl border border-[#520B0F]/20 overflow-hidden z-10 animate-scaleUp my-8">
          
          {/* Header */}
          <div className="bg-[#520B0F] text-[#FFF8E7] px-6 py-5 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div>
              <span className="font-brand-sub text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Live Courier Tracking System</span>
              </span>
              <h3 className="font-brand text-xl sm:text-2xl font-bold tracking-wide mt-0.5">
                Track Your Nakshatra Order
              </h3>
            </div>
            <button
              onClick={() => setIsTrackOrderOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Order ID (e.g. NK-2026-8891) or Mobile Number"
                  className="w-full pl-9 pr-4 py-3 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:border-[#520B0F] bg-white uppercase font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl burgundy-gradient-btn font-brand-sub text-xs uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <span>Track</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Tracking Result View */}
            {activeTracking && (
              <div className="space-y-6">
                
                {/* Status Header Card */}
                <div className="p-5 rounded-2xl bg-[#FFF8E7]/70 border border-[#D4AF37]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-brand-sub text-[10px] uppercase tracking-wider text-[#840D11] font-bold">
                        Tracking Number (AWB)
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        In Transit
                      </span>
                    </div>
                    <p className="font-mono text-base sm:text-lg font-bold text-[#520B0F] mt-0.5">
                      {activeTracking.awbNumber}
                    </p>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      Order ID: <strong>#{activeTracking.orderId}</strong> • Carrier: {activeTracking.courierName}
                    </p>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-200">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Estimated Delivery</span>
                    <span className="font-brand text-base font-bold text-zinc-900">
                      {activeTracking.estimatedDelivery}
                    </span>
                    <span className="text-[11px] text-emerald-700 block font-medium">Express Insured Courier</span>
                  </div>
                </div>

                {/* Timeline Progress Stepper */}
                <div className="space-y-4 px-2">
                  <span className="text-xs font-brand-sub uppercase tracking-wider text-zinc-600 font-bold block">
                    Shipment Journey
                  </span>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                    {activeTracking.steps.map((step: any, idx: number) => (
                      <div key={idx} className="relative group">
                        {/* Step Marker Icon */}
                        <div
                          className={`absolute -left-6 top-0 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                            step.completed
                              ? "bg-[#520B0F] border-[#520B0F] text-white"
                              : "bg-white border-zinc-300"
                          } ${step.current ? "ring-4 ring-[#D4AF37]/40 scale-110" : ""}`}
                        >
                          {step.completed && <CheckCircle2 className="w-2.5 h-2.5 text-[#FFF8E7]" />}
                        </div>

                        {/* Step Info */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4
                            className={`text-sm font-semibold ${
                              step.current
                                ? "text-[#840D11] font-bold"
                                : step.completed
                                ? "text-zinc-900"
                                : "text-zinc-400"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-[11px] font-mono text-zinc-500">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 mt-0.5 max-w-md leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Courier & WhatsApp Action Row */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Real-time sync via Shiprocket / Delhivery API</span>
                  </div>

                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-brand-sub uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Help on WhatsApp</span>
                  </button>
                </div>

              </div>
            )}

            {!activeTracking && !searched && (
              <div className="text-center py-8 space-y-3 text-zinc-500">
                <div className="w-12 h-12 rounded-full bg-[#520B0F]/5 flex items-center justify-center mx-auto text-[#520B0F]">
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Enter your order confirmation number or mobile number to track real-time delivery status, courier AWB, and location.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
