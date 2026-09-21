"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, Sparkles, MapPin, ArrowUpRight, ShoppingBag, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { STORE_DETAILS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { totalCartCount, totalWishlistCount, setIsCartOpen, setIsWishlistOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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
    { label: "Shop Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  // Visible on scroll, hover, or mobile open
  const isVisible = isScrolled || isHovered || isMobileMenuOpen;

  return (
    <>
      {/* Invisible Hover Detection Trigger Zone at Top of Screen */}
      <div
        className="fixed top-0 inset-x-0 h-14 z-50 pointer-events-auto"
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
            ? "bg-[#1A0305]/95 backdrop-blur-md border-b border-[#520B0F]/30 shadow-xl"
            : "bg-black/35 backdrop-blur-md border-b border-white/15"
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-[#520B0F] via-[#840D11] to-[#520B0F] text-[#FFF8E7] py-1 px-4 text-[10.5px] font-brand-sub tracking-[0.2em] uppercase text-center border-b border-[#D4AF37]/25 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          <span>Use Code <strong>NAKSHATRA10</strong> For 10% OFF • Free Kerala &amp; All-India Delivery &gt; ₹999</span>
          <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse hidden sm:inline-block" />
        </div>
        
        {/* Main Navigation Bar Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Editorial Typography */}
          <Link href="#home" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#D4AF37]/60 shadow-md group-hover:scale-105 transition-transform duration-300">
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
              <span className="font-brand-sub text-[7px] sm:text-[8px] uppercase tracking-[0.24em] text-[#D4AF37] mt-1 font-medium leading-none">
                BEAUTY STORE &amp; FASHION ACCESSORIES
              </span>
              <span className="text-[9px] text-white/70 tracking-wider flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" /> Kanjirappally
              </span>
            </div>
          </Link>

          {/* Luxury Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs font-brand-sub uppercase tracking-[0.2em] text-[#FFF8E7]/90 hover:text-[#F7E5A9] hover:bg-white/10 transition-all font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons (Wishlist, Cart, Instagram, WhatsApp) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button with Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full text-white/85 hover:text-[#D4AF37] hover:bg-white/10 transition-colors"
              title="Saved Wishlist"
              aria-label="Open Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[9.5px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-scaleUp">
                  {totalWishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-white/90 hover:text-[#D4AF37] hover:bg-white/10 transition-colors flex items-center gap-1.5 group"
              title="Shopping Bag"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-[#1A0305] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md font-brand-sub animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Instagram Link */}
            <Link
              href={STORE_DETAILS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-white/80 hover:text-[#D4AF37] hover:bg-white/10 transition-colors hidden sm:flex"
              title="Instagram @nakshatra.collections.kply"
            >
              <InstagramIcon className="w-4 h-4" />
            </Link>

            {/* WhatsApp Concierge */}
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                "Hello Nakshatra Collections Kanjirappally! I would like to inquire about your collections."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-brand-sub text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A0305] bg-[#FFF8E7] hover:bg-[#D4AF37] transition-all shadow-md hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Concierge</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#FFF8E7] hover:bg-white/10 border border-white/20 ml-1"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#1A0305]/98 backdrop-blur-lg px-4 py-4 space-y-3">
            <div className="flex flex-col gap-1">
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
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-brand-sub uppercase tracking-wider text-[#FFF8E7]"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Your Shopping Bag</span>
                </div>
                <span className="font-bold text-[#D4AF37]">{totalCartCount} items</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-brand-sub uppercase tracking-wider text-[#FFF8E7]"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Saved Wishlist</span>
                </div>
                <span className="font-bold text-rose-400">{totalWishlistCount} items</span>
              </button>

              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF8E7] text-[#1A0305] text-xs font-brand-sub uppercase tracking-wider font-bold shadow-md mt-1"
              >
                <MessageCircle className="w-4 h-4 text-[#520B0F]" />
                <span>WhatsApp Boutique Order</span>
              </a>
            </div>
          </div>
        )}

      </header>
    </>
  );
};
