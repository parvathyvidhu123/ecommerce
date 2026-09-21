"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GalleryItem } from "@/data/products";

export interface CartItem {
  product: GalleryItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  selectedProduct: GalleryItem | null;
  toastMessage: string | null;
  couponCode: string;
  discountPercent: number;
  freeShippingThreshold: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  totalCartCount: number;
  totalWishlistCount: number;
  addToCart: (product: GalleryItem, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setSelectedProduct: (product: GalleryItem | null) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const VALID_COUPONS: { [key: string]: number } = {
  NAKSHATRA10: 10,
  FESTIVE15: 15,
  WELCOME: 10,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<GalleryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Client hydration from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nakshatra_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("nakshatra_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedCoupon = localStorage.getItem("nakshatra_coupon");
      if (savedCoupon && VALID_COUPONS[savedCoupon]) {
        setCouponCode(savedCoupon);
        setDiscountPercent(VALID_COUPONS[savedCoupon]);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("nakshatra_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("nakshatra_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist, isHydrated]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product: GalleryItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added "${product.title.slice(0, 26)}..." to your bag ✨`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from your bag");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("nakshatra_cart");
    } catch (e) {}
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from Wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to Wishlist ❤️");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (VALID_COUPONS[formatted]) {
      setCouponCode(formatted);
      setDiscountPercent(VALID_COUPONS[formatted]);
      localStorage.setItem("nakshatra_coupon", formatted);
      showToast(`Coupon applied! ${VALID_COUPONS[formatted]}% discount added.`);
      return { success: true, message: `Code ${formatted} applied (${VALID_COUPONS[formatted]}% OFF)!` };
    }
    return { success: false, message: "Invalid promo code. Try 'NAKSHATRA10'!" };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
    localStorage.removeItem("nakshatra_coupon");
    showToast("Coupon removed");
  };

  // Computations
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product.price || 0) * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        selectedProduct,
        toastMessage,
        couponCode,
        discountPercent,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        totalCartCount,
        totalWishlistCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setSelectedProduct,
        applyCoupon,
        removeCoupon,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
