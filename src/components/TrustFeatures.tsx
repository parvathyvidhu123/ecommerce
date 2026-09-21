"use client";

import React from "react";
import { Truck, ShieldCheck, RefreshCw, Clock } from "lucide-react";

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Insured Express Delivery",
      desc: "Fast & tamper-proof insured courier across Kerala & All-India. Free on orders above ₹999.",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic Craftsmanship",
      desc: "Hand-curated 24K gold micron dipping, genuine certified gemstones, and salon-grade cosmetics.",
    },
    {
      icon: RefreshCw,
      title: "7-Day Easy Exchange",
      desc: "Hassle-free size exchange and boutique support for your complete peace of mind.",
    },
    {
      icon: Clock,
      title: "Personal Boutique Concierge",
      desc: "Live video trial and direct WhatsApp assistance from our Kanjirappally stylists.",
    },
  ];

  return (
    <section className="py-12 bg-[#F8F6F0] border-y border-[#520B0F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-[#520B0F]/10 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="p-3 rounded-xl bg-[#520B0F]/5 text-[#520B0F] border border-[#520B0F]/15 flex-shrink-0">
                <f.icon className="w-5 h-5 text-[#840D11]" />
              </div>
              <div>
                <h4 className="font-brand font-bold text-sm sm:text-base text-zinc-900">
                  {f.title}
                </h4>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
