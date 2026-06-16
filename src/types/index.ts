// =====================================================================
// Core domain types — backend-agnostic.
// Adapters in /services map any backend (mock JSON, WooCommerce REST,
// Shopify Storefront, custom Node API) into these shapes.
// =====================================================================

export type ID = string;

export interface Money {
  amount: number;
  currency: string;
}

export type ProductCategorySlug =
  | "resistance-bands"
  | "gym-gloves"
  | "shaker-bottles"
  | "lifting-straps"
  | "skipping-ropes"
  | "yoga-mats"
  | "foam-rollers"
  | "massage-guns"
  | "gym-bags";

export interface Category {
  slug: ProductCategorySlug;
  name: string;
  image: string;
  description?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: ID;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  currency: string;
  images: string[];
  category: ProductCategorySlug;
  rating: number;       // 0..5
  reviewCount: number;
  stock: number;
  colors: ProductColor[];
  featured: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  tags?: string[];
}

export interface CartItem {
  productId: ID;
  slug: string;
  name: string;
  image: string;
  price: number;        // unit price actually paid (sale or list)
  currency: string;
  quantity: number;
  color?: string;
}

export interface Address {
  id: ID;
  label?: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface User {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus =
  | "placed"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: ID;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
}

export interface Testimonial {
  id: ID;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface FAQ {
  id: ID;
  question: string;
  answer: string;
}
