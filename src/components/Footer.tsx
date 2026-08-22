"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MapPin, Phone, Clock, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { STORE_DETAILS } from "@/data/products";

export const Footer: React.FC = () => {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Ambience", href: "#ambience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#FFFFFF] text-[#1A1A1A] border-t border-[#520B0F]/15 relative overflow-hidden">
      
      {/* Top Accent Strip */}
      <div className="h-1 bg-gradient-to-r from-[#520B0F] via-[#D4AF37] to-[#840D11]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-[#520B0F] shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Nakshatra Collections Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-brand text-2xl font-bold tracking-[0.14em] text-[#520B0F]">
                  NAKSHATRA
                </h3>
                <p className="font-brand-sub text-[8.5px] uppercase tracking-[0.24em] text-[#840D11]/80 font-medium">
                  BEAUTY STORE & FASHION ACCESSORIES
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
              Kanjirappally’s premier destination for artisanal chains, solitaire rings, grand wedding suites, bridal cosmetics, skincare, and fashion accessories.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <Link
                href={STORE_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#520B0F]/5 text-[#520B0F] border border-[#520B0F]/20 hover:bg-[#520B0F] hover:text-[#FFF8E7] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Nakshatra Collections Kanjirappally, I would like to inquire about your jewellery and beauty collections."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#520B0F] text-[#FFF8E7] hover:bg-[#840D11] transition-colors shadow-sm"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-brand text-sm font-bold text-[#520B0F] uppercase tracking-wider border-b border-zinc-200 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-brand-sub uppercase tracking-wider text-zinc-600">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#520B0F] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Showroom Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-brand text-sm font-bold text-[#520B0F] uppercase tracking-wider border-b border-zinc-200 pb-2">
              CMP Showroom
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#520B0F] flex-shrink-0 mt-0.5" />
                <span>{STORE_DETAILS.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#520B0F] flex-shrink-0" />
                <span>{STORE_DETAILS.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#520B0F] flex-shrink-0" />
                <span>{STORE_DETAILS.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#520B0F] flex-shrink-0" />
                <Link
                  href={STORE_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#520B0F] underline"
                >
                  @{STORE_DETAILS.instagram}
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-3">
          <p>© {new Date().getFullYear()} NAKSHATRA Collections. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Kanjirappally, Kerala • CMP Building
          </p>
        </div>

      </div>
    </footer>
  );
};
