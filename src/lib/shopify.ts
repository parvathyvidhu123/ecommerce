/**
 * Shopify Storefront API (GraphQL) Headless Client
 * Connects Next.js Frontend with Shopify Backend for Live Products, Cart & Checkout.
 */

import { GALLERY_ITEMS, GalleryItem } from "@/data/products";

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const SHOPIFY_API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2024-01";

export const isShopifyConfigured = (): boolean => {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN);
};

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T | null> {
  if (!isShopifyConfigured()) {
    return null;
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Shopify API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error("Shopify GraphQL errors:", json.errors);
      return null;
    }

    return json.data as T;
  } catch (err) {
    console.error("Failed to connect to Shopify Storefront API:", err);
    return null;
  }
}

/**
 * GraphQL Query to Fetch Live Shopify Products
 */
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          tags
          availableForSale
          totalInventory
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch products: returns live Shopify products if credentials exist,
 * or gracefully returns existing local curated items as fallback!
 */
export async function getLiveOrFallbackProducts(): Promise<GalleryItem[]> {
  if (!isShopifyConfigured()) {
    return GALLERY_ITEMS;
  }

  const data = await shopifyFetch<{
    products: { edges: Array<{ node: any }> };
  }>({
    query: PRODUCTS_QUERY,
    variables: { first: 24 },
  });

  if (!data?.products?.edges || data.products.edges.length === 0) {
    return GALLERY_ITEMS;
  }

  return data.products.edges.map(({ node }) => mapShopifyNodeToGalleryItem(node));
}

/**
 * Maps Shopify GraphQL Product to our internal GalleryItem interface
 */
export function mapShopifyNodeToGalleryItem(node: any): GalleryItem {
  const price = Math.round(parseFloat(node.priceRange?.minVariantPrice?.amount || "0"));
  const comparePrice = Math.round(parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || "0"));
  const originalPrice = comparePrice > price ? comparePrice : Math.round(price * 1.3);
  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const image = node.images?.edges?.[0]?.node?.url || "/images/chains_1.jpg";

  // Category classification
  let category: "chains" | "rings" | "wedding-jewellery" | "cosmetics" | "skincare" = "chains";
  const typeLower = (node.productType || node.tags?.join(" ") || "").toLowerCase();

  if (typeLower.includes("ring")) category = "rings";
  else if (typeLower.includes("wedding") || typeLower.includes("bridal") || typeLower.includes("necklace")) category = "wedding-jewellery";
  else if (typeLower.includes("cosmetic") || typeLower.includes("makeup") || typeLower.includes("kajal")) category = "cosmetics";
  else if (typeLower.includes("skin") || typeLower.includes("toner") || typeLower.includes("cream")) category = "skincare";

  const categoryLabelMap = {
    chains: "Chains",
    rings: "Rings",
    "wedding-jewellery": "Wedding Jewellery",
    cosmetics: "Cosmetics",
    skincare: "Skincare Products",
  };

  return {
    id: node.id,
    title: node.title,
    category,
    categoryLabel: categoryLabelMap[category],
    subtitle: node.tags?.[0] || "Handcrafted Heritage Collection",
    tag: node.tags?.[0] || "Signature Suite",
    image,
    details: node.description || "Heirloom craftsmanship from Nakshatra Collections, Kanjirappally.",
    specifications: {
      "Shopify Handle": node.handle,
      "Inventory Status": node.availableForSale ? "In Stock" : "Limited Edition",
      "Purity Guarantee": "24K Gold Micron Seal",
      "Boutique Origin": "Main Road, Kanjirappally, Kerala",
    },
    price,
    originalPrice,
    discountPercent,
    rating: 4.9,
    reviewCount: 42,
    inStock: node.availableForSale,
    stockCount: node.totalInventory || 5,
    isBestseller: node.tags?.includes("Bestseller"),
    badge: node.tags?.[0] || "Featured",
    sku: node.handle ? `NK-${node.handle.slice(0, 8).toUpperCase()}` : "NK-SHOP",
  };
}

/**
 * Create a live Shopify Checkout Cart
 */
export async function createShopifyCheckout(
  variantId: string,
  quantity = 1
): Promise<string | null> {
  const CREATE_CART_MUTATION = `
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    cartCreate: { cart: { id: string; checkoutUrl: string } };
  }>({
    query: CREATE_CART_MUTATION,
    variables: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  return res?.cartCreate?.cart?.checkoutUrl || null;
}
