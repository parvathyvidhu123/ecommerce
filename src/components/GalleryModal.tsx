"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, MessageCircle, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { GalleryItem, STORE_DETAILS } from "@/data/products";

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
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

  const whatsappMsg = `Hello Nakshatra Collections Kanjirappally!
I am viewing this piece in your online gallery:
✨ *${item.title}* (${item.categoryLabel})
ID: ${item.id}

Please share pricing and showroom trial availability. Thank you!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Frame */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#520B0F]/20 shadow-[0_25px_60px_rgba(82,11,15,0.25)] z-10 text-[#1A1A1A]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FFFFFF]/90 text-[#520B0F] border border-[#520B0F]/20 hover:bg-[#520B0F] hover:text-white transition-colors shadow-sm"
          aria-label="Close image modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 items-center">
          
          {/* Image */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#520B0F]/15 bg-[#F8F6F0]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#520B0F] text-[#FFF8E7] px-3 py-1 rounded-full text-[10px] font-brand-sub uppercase tracking-wider font-bold shadow-md">
              {item.tag}
            </div>
          </div>

          {/* Info & WhatsApp */}
          <div className="space-y-4">
            <div>
              <span className="font-brand-sub text-[10px] uppercase tracking-[0.25em] text-[#840D11] font-bold">
                {item.categoryLabel}
              </span>
              <h2 className="font-brand text-xl sm:text-2xl font-bold text-[#1A1A1A] leading-snug mt-1">
                {item.title}
              </h2>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">
                {item.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {item.details}
            </p>

            {/* Specifications */}
            <div className="bg-[#F8F6F0] p-3.5 rounded-xl border border-zinc-200 text-xs space-y-1.5">
              {Object.entries(item.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between py-0.5 border-b border-zinc-200/60 last:border-b-0">
                  <span className="text-zinc-500">{k}:</span>
                  <span className="text-[#1A1A1A] font-semibold text-right ml-2">{v}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp Inquiry */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#520B0F] hover:bg-[#840D11] text-[#FFF8E7] font-brand-sub text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-[#F7E5A9]" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
