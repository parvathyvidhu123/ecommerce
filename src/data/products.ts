export interface GalleryItem {
  id: string;
  title: string;
  category: "chains" | "rings" | "wedding-jewellery" | "cosmetics" | "skincare";
  categoryLabel: string;
  subtitle: string;
  tag: string;
  image: string;
  details: string;
  specifications: { [key: string]: string };
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Works", count: 15 },
  { id: "chains", label: "Chains", count: 3 },
  { id: "rings", label: "Rings", count: 3 },
  { id: "wedding-jewellery", label: "Wedding Jewellery", count: 3 },
  { id: "cosmetics", label: "Cosmetics", count: 3 },
  { id: "skincare", label: "Skincare Products", count: 3 },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // CHAINS
  {
    id: "CH-01",
    title: "Designer 24K Gold Pendant Chains Suite",
    category: "chains",
    categoryLabel: "Chains",
    subtitle: "Crown, Heart, Butterfly & Floral Charms",
    tag: "Signature Suite",
    image: "/images/chains_1.jpg",
    details: "A curated collection of delicate 24K micron gold-plated fine link chains featuring studded micro-pendant charms: regal crown, romantic heart, crystal butterfly, and asymmetric floral motifs.",
    specifications: {
      "Pendants": "Crown, Heart, Pavé Butterfly & Modern Floral",
      "Finish": "24K High-Micron Gold Anti-Tarnish Tone",
      "Clasp": "Reinforced Luxury Lobster Lock",
      "Occasion": "Daily Sophistication & Layered Styling"
    }
  },
  {
    id: "CH-02",
    title: "Solitaire Diamond Droplet Choker Chain",
    category: "chains",
    categoryLabel: "Chains",
    subtitle: "Dangling Brilliant Solitaire Droplet Accents",
    tag: "Fine Choker",
    image: "/images/chains_2.jpg",
    details: "An ultra-chic minimalist gold choker chain adorned with spaced dangling solitaire bezel droplets that contour gracefully along the neckline.",
    specifications: {
      "Style": "Dangling Bezel Solitaire Droplet Choker",
      "Stones": "5A Grade Faceted Cubic Zirconia",
      "Length": "16 - 18 Inches Adjustable Extender Chain",
      "Occasion": "Cocktails, Party Glamour & Modern Bridal"
    }
  },
  {
    id: "CH-03",
    title: "Eternity Infinity Loop & Teardrop Pendant Chain",
    category: "chains",
    categoryLabel: "Chains",
    subtitle: "Micro-Pavé Infinity with Pear-Cut Crystal",
    tag: "Contemporary",
    image: "/images/chains_3.jpg",
    details: "A stunning modern symbol of endless beauty featuring a pavé-encrusted infinity loop anchored by a shimmering pear-cut crystal pendant drop.",
    specifications: {
      "Design": "Pavé Infinity Loop with Pear-Cut Droplet",
      "Plating": "24K Yellow Gold Mirror Finish",
      "Weight": "Ultra-lightweight Ergonomic Wear",
      "Occasion": "Anniversary, Celebrations & Daily Elegance"
    }
  },

  // RINGS
  {
    id: "RG-01",
    title: "Pink Sapphire Heart Tiara Crown Ring",
    category: "rings",
    categoryLabel: "Rings",
    subtitle: "Heart-Cut Pink Gemstone with Marquise Tiara",
    tag: "Princess Tiara",
    image: "/images/rings_1.jpg",
    details: "A romantic fairytale crown ring anchored by a radiant pink heart-cut center crystal, flanked by marquise amethyst accents and delicate beaded milgrain detailing.",
    specifications: {
      "Center Stone": "Faceted Pink Heart Crystal",
      "Band": "Curved Milgrain Beaded Crown Band",
      "Finish": "Rose Gold & Warm Yellow Gold Dipping",
      "Style": "Princess Crown Tiara Silhouette"
    }
  },
  {
    id: "RG-02",
    title: "Triple Stacked Diamond Pavé Cocktail Bands",
    category: "rings",
    categoryLabel: "Rings",
    subtitle: "Interlocking Multi-Row Starburst Pavé Set",
    tag: "Haute Cocktail",
    image: "/images/rings_2.jpg",
    details: "A dramatic luxury ring showcasing three interlocking rows of micro-pavé starburst zircon crystals designed for high-impact evening glamour.",
    specifications: {
      "Structure": "3-in-1 Triple Tiered Connected Bands",
      "Stones": "5A High-Reflect Micro-Pavé Zircons",
      "Plating": "Platinum Rhodium Mirror Polish",
      "Style": "Imperial Cocktail Statement"
    }
  },
  {
    id: "RG-03",
    title: "Minimalist Dainty Gold Solitaire Band",
    category: "rings",
    categoryLabel: "Rings",
    subtitle: "Ultra-Slim 24K Gold Wire with Bezel Solitaire",
    tag: "Everyday Luxury",
    image: "/images/rings_3.jpg",
    details: "Clean, featherlight elegance featuring an ultra-slim 1mm gold wire band accented by a brilliant bezel-set solitaire crystal.",
    specifications: {
      "Profile": "Ultra-Slim 1mm Low-Profile Band",
      "Stone": "Round Brilliant Bezel-Set Zircon",
      "Finish": "24K Smooth Polished Gold Tone",
      "Occasion": "Stacking, Daily Office & Minimalist Chic"
    }
  },

  // WEDDING JEWELLERY
  {
    id: "WJ-01",
    title: "Cascading Pear-Cut Diamond Bridal Statement Necklace",
    category: "wedding-jewellery",
    categoryLabel: "Wedding Jewellery",
    subtitle: "Tiered Pear & Marquise Diamond Chandelier Drape",
    tag: "Masterpiece Bridal",
    image: "/images/wedding_1.jpg",
    details: "A breathtaking royal wedding necklace featuring cascading tiers of brilliant pear-cut and marquise diamond drops designed to illuminate the bride with radiant grandeur.",
    specifications: {
      "Design": "Cascading Chandelier Bridal Drape",
      "Stones": "5A Grade Multi-Faceted Crystal Zircons",
      "Base": "Micro-Cast Jeweller's Brass with Rose Gold & Rhodium Seal",
      "Closure": "Secure Luxury Box Clasp with Safety Latch"
    }
  },
  {
    id: "WJ-02",
    title: "Royal Emerald & Uncut Kundan Choker & Earring Suite",
    category: "wedding-jewellery",
    categoryLabel: "Wedding Jewellery",
    subtitle: "Octagon Emerald Centerpiece with Natural Pearl Drops",
    tag: "Kundan Heritage",
    image: "/images/wedding_2.jpg",
    details: "An opulent wedding suite featuring a majestic emerald-cut Colombian green center stone framed in uncut Kundan crystals, matching floral earrings, and dangling South Sea pearls.",
    specifications: {
      "Set Contents": "Grand Bridal Choker & Matching Chandelier Earrings",
      "Stones": "Hydrothermal Colombian Emerald, Jadau Kundan, Pearls",
      "Plating": "Vintage Matte Antique Gold Tone",
      "Closure": "Bespoke Handwoven Zari Silk Dori"
    }
  },
  {
    id: "WJ-03",
    title: "Heritage South Indian Temple Lakshmi Bridal Haaram",
    category: "wedding-jewellery",
    categoryLabel: "Wedding Jewellery",
    subtitle: "Embossed Goddess Lakshmi with Ruby Kemp & Jhumkas",
    tag: "Temple Classic",
    image: "/images/wedding_3.jpg",
    details: "An authentic South Indian temple masterpiece showcasing intricately sculpted Goddess Lakshmi medallions, ruby kemp cabochon stones, and matching bell jhumka earrings.",
    specifications: {
      "Set Contents": "Grand Lakshmi Haaram & Matching Temple Bell Jhumkas",
      "Craft": "Authentic Nakshi Temple Hand-Embossing",
      "Finish": "Red Antique Temple Matte Gold",
      "Occasion": "Kerala Traditional Muhurtham & Wedding Receptions"
    }
  },

  // COSMETICS
  {
    id: "CS-01",
    title: "Lakmé Absolute & 9to5 Bridal Glamour Suite",
    category: "cosmetics",
    categoryLabel: "Cosmetics",
    subtitle: "Blur Primer, Eyeconic Mascara, Kajals & Lip Mousse",
    tag: "Bridal Cosmetics",
    image: "/images/cosmetics_1.jpg",
    details: "Complete bridal makeover essentials including Lakmé Absolute Blur Perfect Primer, intense Eyeconic Kajals, Curling Mascara, 9to5 Weightless Lip Mousse, and luminous setting powder.",
    specifications: {
      "Set Includes": "Blur Primer, 2x Eyeconic Kajals, Lip Mousse, Mascara, Loose Powder",
      "Wear Time": "16-Hour Sweat & Humidity Resistant",
      "Formula": "Dermatologically Tested High-Definition Glamour"
    }
  },
  {
    id: "CS-02",
    title: "Luxury Bridal Eye, Cheek & Contouring Studio Set",
    category: "cosmetics",
    categoryLabel: "Cosmetics",
    subtitle: "Multi-Tone Eyeshadows, Mineral Blush & Velvet Lipsticks",
    tag: "Studio Glamour",
    image: "/images/cosmetics_2.jpg",
    details: "A comprehensive cosmetic artist collection featuring pearl shimmer eyeshadow quads, warm peach blushes, luxury matte lipsticks, and ultra-soft cruelty-free application brushes.",
    specifications: {
      "Palette": "4-Color Baked Shimmer Eyeshadow, Peach & Rose Duo Blush",
      "Tools": "Fluffy Powder Brush, Angled Blush Brush, Foundation Blender",
      "Finish": "Micro-Reflective Camera-Ready Radiance"
    }
  },
  {
    id: "CS-03",
    title: "Naked 12-Color Eyeshadow & HD Foundation Kit",
    category: "cosmetics",
    categoryLabel: "Cosmetics",
    subtitle: "Full-Coverage Foundations, Lip Glosses & Brow Soap",
    tag: "Complete Kit",
    image: "/images/cosmetics_3.jpg",
    details: "The ultimate glam suite featuring a 12-shade neutral-to-smoky eyeshadow palette, oil-controlling liquid foundations, matte lip glosses, precision eyeliner pens, and brow styling soap.",
    specifications: {
      "Includes": "12-Color Palette, 2x HD Foundations, 3x Lip Glosses, Brow Soap, Blender Sponges",
      "Coverage": "Seamless Medium-to-Full Buildable Coverage",
      "Finish": "Poreless Velvet Matte"
    }
  },

  // SKINCARE PRODUCTS
  {
    id: "SK-01",
    title: "Madagascar Centella Calming & Barrier Repair Ritual",
    category: "skincare",
    categoryLabel: "Skincare Products",
    subtitle: "Toning Toner, Ampoules, Light Cleansing Oil & Soothing Cream",
    tag: "Barrier Care",
    image: "/images/skincare_1.jpg",
    details: "Formulated with pure Centella Asiatica extract from Madagascar to deeply soothe redness, restore skin barrier vitality, and provide glass skin radiance.",
    specifications: {
      "Set Includes": "Centella Toning Toner, Ampoule, Cleansing Oil, Soothing Cream",
      "Key Ingredient": "Pure Centella Asiatica Extract",
      "Benefits": "Calming, Deep Hydration & Redness Relief"
    }
  },
  {
    id: "SK-02",
    title: "The Ordinary Glycolic Acid 7% Exfoliating Toner",
    category: "skincare",
    categoryLabel: "Skincare Products",
    subtitle: "Direct Acid Solution for Radiance & Texture Refinement",
    tag: "Derm Approved",
    image: "/images/skincare_2.jpg",
    details: "Targeted botanical exfoliating toner with 7% Glycolic Acid, Tasmanian Pepperberry, and Aloe Vera to boost skin clarity, reduce dullness, and promote luminous even tone.",
    specifications: {
      "Active Ingredient": "7% Glycolic Acid (AHA)",
      "Additions": "Tasmanian Pepperberry Derivative, Ginseng Root, Aloe Vera",
      "Target": "Dullness, Uneven Texture & Dark Spots"
    }
  },
  {
    id: "SK-03",
    title: "Plum Green Tea Clear & Matte Pore-Cleansing Routine",
    category: "skincare",
    categoryLabel: "Skincare Products",
    subtitle: "Cleanser, Alcohol-Free Toner, Moisturizer & SPF 50 Gel",
    tag: "Acne Control",
    image: "/images/skincare_3.jpg",
    details: "Gentle green tea antioxidant skincare suite designed to control excess sebum, refine enlarged pores, combat breakouts, and maintain a fresh, matte glow throughout the day.",
    specifications: {
      "Includes": "Pore Cleansing Face Wash, Alcohol-Free Toner, Oil-Free Moisturizer, Night Gel, SPF 50 Gel",
      "Key Botanicals": "Organic Green Tea Extracts & Glycolic Acid",
      "Skin Type": "Oily, Acne-Prone & Combination Skin"
    }
  }
];

export const STORE_DETAILS = {
  name: "NAKSHATRA Collections",
  subtitle: "BEAUTY STORE & FASHION ACCESSORIES",
  location: "CMP Building, Main Road, Kanjirappally, Kerala 686507",
  whatsappNumber: "919447003584",
  instagram: "nakshatra.collections.kply",
  instagramUrl: "https://www.instagram.com/nakshatra.collections.kply?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
  hours: "Mon - Sat: 9:30 AM - 8:30 PM | Sun: 10:00 AM - 7:00 PM",
  phoneDisplay: "+91 94470 03584"
};
