import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NAKSHATRA Collections | Beauty Store & Fashion Accessories - Kanjirappally",
  description:
    "Discover the haute curation of chains, rings, wedding jewellery, cosmetics, skincare, and fashion accessories at Nakshatra Collections, Main Road, Kanjirappally, Kerala.",
  keywords: [
    "Nakshatra Collections",
    "Beauty Store Kanjirappally",
    "Fashion Accessories Kanjirappally",
    "Jewellery Kanjirappally",
    "Wedding Jewellery Kerala",
    "Cosmetics & Skincare Kanjirappally",
  ],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${montserrat.variable} ${jakarta.variable} font-sans bg-[#FDFCF9] text-[#1F1F1F] antialiased selection:bg-[#520B0F] selection:text-[#FFF8E7] min-h-screen relative`}
      >
        {/* Subtle Film Grain Texture Overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
