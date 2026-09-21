"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Package, CheckCircle2, Truck, MapPin, Clock, MessageCircle, ArrowRight, ShieldCheck, AlertCircle, RefreshCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_DETAILS } from "@/data/products";

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, trackingOrderId, setTrackingOrderId } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTracking, setActiveTracking] = useState<any | null>(null);
  const [notFoundError, setNotFoundError] = useState(false);
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
    const cleaned = query.trim();
    if (!cleaned) return;

    const cleanDigits = cleaned.replace(/\D/g, "");
    const upperId = cleaned.toUpperCase().replace("#", "");

    // 1. Fetch placed orders from localStorage
    let placedOrders: any[] = [];
    try {
      placedOrders = JSON.parse(localStorage.getItem("nakshatra_orders") || "[]");
    } catch (e) {
      console.error("Failed to read placed orders", e);
    }

    // 2. Pre-seeded verified demo orders (for testing)
    const sampleDemoOrders = [
      {
        orderId: "NK-2026-1001",
        fullName: "Parvathy S.",
        phone: "9447003584",
        rawPhone: "+91 94470 03584",
        address: "Main Road, Kanjirappally, Kerala (686507)",
        items: ["Designer 24K Gold Pendant Chains Suite (x1)", "Pink Sapphire Heart Tiara Crown Ring (x1)"],
        grandTotal: 3198,
        paymentMethod: "UPI (Google Pay)",
        date: "Sep 21, 09:30 AM",
        awbNumber: "BD93821049",
        courierName: "Blue Dart Express",
      },
    ];

    const allOrders = [...placedOrders, ...sampleDemoOrders];

    // 3. Match against Order ID or Mobile Number
    const match = allOrders.find((ord) => {
      const matchId = ord.orderId?.toUpperCase().replace("#", "") === upperId;
      const matchPhone = cleanDigits.length >= 8 && ord.phone?.includes(cleanDigits);
      return matchId || matchPhone;
    });

    if (!match) {
      setActiveTracking(null);
      setNotFoundError(true);
      return;
    }

    setNotFoundError(false);
    setActiveTracking({
      orderId: match.orderId,
      customerName: match.fullName,
      phone: match.rawPhone || match.phone,
      items: match.items || [],
      total: match.grandTotal,
      courierName: match.courierName || "Blue Dart Express",
      awbNumber: match.awbNumber || "BD83921084",
      origin: "Nakshatra Boutique, Main Road, Kanjirappally",
      destination: match.address,
      estimatedDelivery: "2-3 Business Days",
      date: match.date,
      steps: [
        {
          title: "Order Confirmed & Payment Verified",
          desc: `Booking verified for ${match.fullName}`,
          time: match.date || "Sep 21, 09:30 AM",
          completed: true,
        },
        {
          title: "Hand-Crafted & Quality Checked",
          desc: "24K Hallmark inspection & velvet packaging at Kanjirappally Boutique",
          time: "Dispatched",
          completed: true,
        },
        {
          title: "In Transit with Courier",
          desc: `Departed Central Kerala Hub (${match.courierName || "Blue Dart Express"}) - Scanned & En Route`,
          time: "Live Courier Sync",
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    lookupOrder(searchQuery);
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello Nakshatra Collections Kanjirappally! 🌟%0A%0AI have a question regarding order tracking for: *${searchQuery}*.%0APlease check and assist me. Thank you!`;
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (notFoundError) setNotFoundError(false);
                  }}
                  placeholder="Enter Order ID (e.g. NK-2026-1001) or Mobile Number"
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

            {/* Error State: Invalid Number / Order ID Not Found */}
            {notFoundError && (
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-3 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-rose-900">
                      No Active Shipment Found for &quot;{searchQuery}&quot;
                    </h4>
                    <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                      We couldn&apos;t find any order associated with this number or ID. Please verify:
                    </p>
                    <ul className="list-disc list-inside text-xs text-rose-700 mt-1.5 space-y-1">
                      <li>The 10-digit mobile number used during checkout.</li>
                      <li>The Order ID format (e.g. <strong>#NK-2026-XXXX</strong>).</li>
                      <li>Try demo test order <strong>NK-2026-1001</strong> to preview the tracking experience.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2 border-t border-rose-200/60">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("NK-2026-1001");
                      lookupOrder("NK-2026-1001");
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-800 text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCcw className="w-3 h-3" />
                    <span>Try Demo Order #NK-2026-1001</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Check with WhatsApp Concierge</span>
                  </button>
                </div>
              </div>
            )}

            {/* Valid Tracking Result View */}
            {activeTracking && (
              <div className="space-y-6 animate-fadeIn">
                
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
                    {activeTracking.customerName && (
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Customer: <strong>{activeTracking.customerName}</strong>
                      </p>
                    )}
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-200">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Estimated Delivery</span>
                    <span className="font-brand text-base font-bold text-zinc-900">
                      {activeTracking.estimatedDelivery}
                    </span>
                    <span className="text-[11px] text-emerald-700 block font-medium">Express Insured Courier</span>
                  </div>
                </div>

                {/* Ordered Items Summary if available */}
                {activeTracking.items && activeTracking.items.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200 text-xs">
                    <span className="font-brand-sub text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                      Items in Parcel:
                    </span>
                    <ul className="text-zinc-700 space-y-0.5 list-disc list-inside">
                      {activeTracking.items.map((it: any, i: number) => (
                        <li key={i} className="truncate">{typeof it === "string" ? it : it.title}</li>
                      ))}
                    </ul>
                  </div>
                )}

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

            {!activeTracking && !notFoundError && !searched && (
              <div className="text-center py-8 space-y-3 text-zinc-500">
                <div className="w-12 h-12 rounded-full bg-[#520B0F]/5 flex items-center justify-center mx-auto text-[#520B0F]">
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Enter your order confirmation number or mobile number to track real-time delivery status, courier AWB, and location.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("NK-2026-1001");
                    lookupOrder("NK-2026-1001");
                  }}
                  className="text-xs text-[#840D11] hover:underline font-semibold"
                >
                  Or click here to preview demo order #NK-2026-1001
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
