"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { STORE_DETAILS } from "@/data/products";

const REAL_REELS = [
  {
    id: 1,
    image: "/images/reel_1_cover.jpg",
    url: "https://www.instagram.com/reel/DZe-8VHy_Ef/?igsi=MXIwZDR0bWRrdWdpYQ==",
    views: "3.4K",
    title: "Nakshatra Showroom Tour",
    caption: "Experience our bridal jewellery, accessories, cosmetics & skincare at CMP Building, Kanjirappally ✨",
  },
  {
    id: 2,
    image: "/images/reel_2_cover.jpg",
    url: "https://www.instagram.com/reel/DbN15AgS_Ny/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    views: "2.8K",
    title: "Royal Kundan Bridal Choker",
    caption: "Hand-inlaid Kundan stones and antique emerald drops for the classic South Indian bride 💎",
  },
  {
    id: 3,
    image: "/images/reel_3_cover.jpg",
    url: "https://www.instagram.com/reel/DbIxpCbh1JV/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    views: "3.7K",
    title: "Skincare Glow Essentials",
    caption: "Gentle facial cleansers and fruit-enriched skincare for radiant daily and bridal glow 🌸",
  },
  {
    id: 4,
    image: "/images/reel_4_cover.jpg",
    url: "https://www.instagram.com/reel/DZhG4JTyB33/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    views: "4.5K",
    title: "CMP Building Storefront",
    caption: "Visit our showroom on Main Road, CMP Building, Kanjirappally 🏛️",
  },
];

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FDFCF9] border-b border-[#520B0F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#520B0F]/5 border border-[#520B0F]/20 text-[#520B0F] text-xs font-brand-sub uppercase tracking-[0.22em] mb-2">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Official Instagram Reels</span>
            </div>
            <h2 className="font-brand text-2xl sm:text-4xl font-bold text-[#1A1A1A]">
              @{STORE_DETAILS.instagram}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Tap any reel to watch on Instagram and join our community.
            </p>
          </div>

          <Link
            href={STORE_DETAILS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#520B0F] hover:bg-[#840D11] text-[#FFF8E7] font-brand-sub text-xs uppercase tracking-wider font-bold shadow-sm transition-transform hover:scale-105 self-center md:self-auto"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* Real Reels 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {REAL_REELS.map((reel) => (
            <Link
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden aspect-[9/16] border border-[#520B0F]/20 bg-[#1A0305] shadow-sm hover:border-[#520B0F]/50 hover:shadow-xl transition-all block"
            >
              {/* Real Official Cover Image from the Reel */}
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0305]/90 via-[#1A0305]/20 to-transparent opacity-55 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Reel Icon & Views */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="p-2 rounded-full bg-black/40 backdrop-blur-md text-[#FFF8E7] border border-white/20">
                  <Play className="w-3 h-3 fill-white text-white" />
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[9px] font-brand-sub text-white/90 uppercase tracking-wider font-semibold">
                  {reel.views} Views
                </span>
              </div>

              {/* Bottom Caption & Watch on Instagram CTA */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-brand text-sm sm:text-base font-bold text-white leading-snug">
                  {reel.title}
                </h3>
                <p className="text-[10px] text-zinc-300 line-clamp-2 leading-relaxed">
                  {reel.caption}
                </p>

                <div className="pt-1 flex items-center gap-1 text-[9.5px] font-brand-sub uppercase tracking-wider text-[#F7E5A9] group-hover:underline">
                  <span>Watch on Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
