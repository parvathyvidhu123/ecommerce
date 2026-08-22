"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, Sparkles, MapPin, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { STORE_DETAILS } from "@/data/products";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Ambience", href: "#ambience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  // At the top over the video: invisible when untouched, smoothly appears on hover or scroll
  const isVisible = isScrolled || isHovered || isMobileMenuOpen;

  return (
    <>
      {/* Invisible Hover Detection Trigger Zone at Top of Screen */}
      <div
        className="fixed top-0 inset-x-0 h-16 z-50 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Main Navigation Header */}
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#1A0305]/95 backdrop-blur-md border-b border-[#520B0F]/30 shadow-lg"
            : "bg-black/10 backdrop-blur-md border-b border-white/10"
        }`}
      >
        
        {/* Main Navigation Bar Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-6">
          
          {/* Brand Logo & Editorial Typography */}
          <Link href="#home" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#D4AF37]/60 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                alt="Nakshatra Collections Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-brand text-lg sm:text-xl font-bold tracking-[0.16em] text-[#FFF8E7] group-hover:text-[#F7E5A9] transition-colors leading-none">
                NAKSHATRA
              </span>
              <span className="font-brand-sub text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.26em] text-[#D4AF37] mt-1 font-medium leading-none">
                BEAUTY STORE & FASHION ACCESSORIES
              </span>
              <span className="text-[9.5px] text-white/70 tracking-wider flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" /> Kanjirappally
              </span>
            </div>
          </Link>

          {/* Luxury Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-brand-sub uppercase tracking-[0.22em] text-[#FFF8E7]/90 hover:text-[#F7E5A9] hover:bg-white/10 transition-all font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={STORE_DETAILS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-white/80 hover:text-[#D4AF37] hover:bg-white/10 transition-colors hidden sm:flex"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                "Hello Nakshatra Collections Kanjirappally! I would like to inquire about your collections."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full font-brand-sub text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1A0305] bg-[#FFF8E7] hover:bg-[#D4AF37] transition-all shadow-md hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#FFF8E7] hover:bg-white/10 border border-white/20"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#1A0305]/95 backdrop-blur-md px-4 py-4 space-y-3">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-brand-sub uppercase tracking-wider text-[#FFF8E7] hover:bg-white/10 hover:text-[#F7E5A9] font-semibold transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href={STORE_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-xs font-brand-sub uppercase tracking-wider text-[#D4AF37]"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow @{STORE_DETAILS.instagram}</span>
              </Link>
              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF8E7] text-[#1A0305] text-xs font-brand-sub uppercase tracking-wider font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        )}

      </header>
    </>
  );
};
