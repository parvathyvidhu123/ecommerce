"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { STORE_DETAILS } from "@/data/products";

export const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState("");

  const quickPrompts = [
    "💍 I want to see your wedding jewellery suites",
    "📿 Inquiring about 24K gold-plated chains",
    "💎 Looking for cocktail & solitaire rings",
    "🌸 Inquiring about saffron skincare & cosmetics",
  ];

  const handleSendPrompt = (text: string) => {
    const url = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#FFFFFF] border border-[#520B0F]/20 shadow-[0_15px_45px_rgba(82,11,15,0.2)] overflow-hidden text-[#1A1A1A] animate-fade-in">
          
          {/* Header */}
          <div className="bg-[#520B0F] p-4 flex items-center justify-between text-[#FFF8E7]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37]">
                <Image src="/images/logo.png" alt="Nakshatra Collections" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-brand text-sm font-bold tracking-wider leading-tight">
                  Nakshatra Concierge
                </h4>
                <p className="text-[10px] text-[#F7E5A9] flex items-center gap-1 font-brand-sub uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Kanjirappally Showroom
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#FFF8E7]/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            <div className="bg-[#F8F6F0] p-3 rounded-2xl border border-zinc-200 text-xs text-zinc-700">
              👋 Namaskaram! How can we assist you with our jewellery or beauty collections today?
            </div>

            <div className="space-y-1.5">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendPrompt(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#520B0F] hover:text-[#FFF8E7] border border-[#520B0F]/15 text-[11px] text-[#520B0F] transition-all flex items-center justify-between group"
                >
                  <span className="font-medium">{prompt}</span>
                  <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customText.trim()) {
                    handleSendPrompt(customText);
                  }
                }}
                className="flex-1 bg-[#F8F6F0] border border-zinc-300 rounded-xl px-3 py-2 text-xs text-[#1A1A1A] placeholder-zinc-400 focus:outline-none focus:border-[#520B0F]"
              />
              <button
                onClick={() => {
                  if (customText.trim()) handleSendPrompt(customText);
                }}
                className="p-2 rounded-xl bg-[#520B0F] hover:bg-[#840D11] text-[#FFF8E7] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#520B0F] text-[#FFF8E7] shadow-[0_6px_25px_rgba(82,11,15,0.3)] hover:bg-[#840D11] hover:scale-108 transition-all duration-300 flex items-center justify-center border border-[#D4AF37]/50"
        aria-label="Open WhatsApp Concierge"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Subtle pulsing dot */}
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
      </button>

    </div>
  );
};
