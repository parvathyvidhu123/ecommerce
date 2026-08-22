"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { AnimatedHero } from "@/components/AnimatedHero";
import { AboutSection } from "@/components/AboutSection";
import { AmbienceSection } from "@/components/AmbienceSection";
import { GallerySection } from "@/components/GallerySection";
import { InstagramSection } from "@/components/InstagramSection";
import { StoreLocation } from "@/components/StoreLocation";
import { Footer } from "@/components/Footer";
import { GalleryModal } from "@/components/GalleryModal";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { GalleryItem } from "@/data/products";

export default function Home() {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  return (
    <main className="min-h-screen bg-[#FDFCF9] text-[#1F1F1F] flex flex-col justify-between relative">
      
      {/* Luxury Celestial Loading Experience */}
      <Preloader />

      {/* Navigation (Home, About, Ambience, Gallery, Contact) */}
      <Navbar />

      {/* Full-Screen Video Hero Section (#home) */}
      <AnimatedHero />

      {/* About Us & Founder's Story (#about) */}
      <AboutSection />

      {/* Showroom Ambience & Boutique Highlights (#ambience) */}
      <AmbienceSection />

      {/* Image-Only Product Gallery (#gallery) */}
      <GallerySection onOpenLightbox={(item) => setActiveModalItem(item)} />

      {/* Official Instagram Wall (@nakshatra.collections.kply) */}
      <InstagramSection />

      {/* Showroom & Contact (#contact) */}
      <StoreLocation />

      {/* Footer */}
      <Footer />

      {/* Image Lightbox & Specifications Modal */}
      <GalleryModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* Floating WhatsApp Concierge */}
      <WhatsAppFloating />

    </main>
  );
}
