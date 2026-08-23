"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, MessageCircle, Navigation, Sparkles } from "lucide-react";
import { STORE_DETAILS } from "@/data/products";

export const StoreLocation: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8F6F0] border-b border-[#520B0F]/15 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#520B0F]/5 border border-[#520B0F]/20 text-[#520B0F] text-xs font-brand-sub uppercase tracking-[0.25em]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Showroom & Contact</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
            Visit Nakshatra Collections
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Conveniently located on Main Road, Kanjirappally, Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Card */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-3xl p-7 sm:p-9 border border-[#520B0F]/15 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="font-brand-sub text-[10px] uppercase tracking-[0.25em] text-[#840D11] font-bold">
                  Kanjirappally Showroom
                </span>
                <h3 className="font-brand text-2xl font-bold text-[#520B0F] mt-1">
                  {STORE_DETAILS.name}
                </h3>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  {STORE_DETAILS.subtitle}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#520B0F]/5 border border-[#520B0F]/15 text-[#520B0F] mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-brand-sub uppercase tracking-wider text-[#520B0F] font-bold">
                    Store Address
                  </h4>
                  <p className="text-sm text-[#1A1A1A] mt-0.5 leading-snug font-medium">
                    {STORE_DETAILS.location}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Central Kanjirappally, Kottayam District, Kerala
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#520B0F]/5 border border-[#520B0F]/15 text-[#520B0F] mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-brand-sub uppercase tracking-wider text-[#520B0F] font-bold">
                    Opening Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1A1A1A] mt-0.5">
                    {STORE_DETAILS.hours}
                  </p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                    Open All 7 Days
                  </span>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#520B0F]/5 border border-[#520B0F]/15 text-[#520B0F] mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-brand-sub uppercase tracking-wider text-[#520B0F] font-bold">
                    Concierge Line
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1A1A1A] mt-0.5 font-medium">
                    {STORE_DETAILS.phoneDisplay}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <a
                href={STORE_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#520B0F] hover:bg-[#840D11] text-[#FFF8E7] font-brand-sub text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions on Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Nakshatra Collections, I would like to check showroom timings and visiting details."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#FFFFFF] hover:bg-[#520B0F]/5 text-[#520B0F] border border-[#520B0F]/30 text-xs font-brand-sub uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#840D11]" />
                <span>Contact Concierge on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Embedded Google Maps */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#520B0F]/15 shadow-sm relative min-h-[350px] lg:min-h-[440px] bg-[#FFFFFF]">
            <iframe
              title="Nakshatra Collections Kanjirapally Location"
              src="https://maps.google.com/maps?q=9.5550571,76.7897127&hl=en&z=17&output=embed"
              className="w-full h-full min-h-[350px] lg:min-h-[440px] border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#FFFFFF]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#520B0F]/20 text-xs shadow-md hidden sm:flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#840D11] animate-ping"></span>
              <span className="font-brand font-bold text-[#520B0F]">Nakshatra Collections, Kanjirappally</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
