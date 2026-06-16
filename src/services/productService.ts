// =====================================================================
// Product service — backend-agnostic abstraction.
//
// The UI imports ONLY these functions. Swap the implementation
// (WooCommerce REST, custom Node API, Shopify, etc.) by replacing
// the bodies below — the rest of the app does not change.
// =====================================================================

import { products as mockProducts } from "@/data/products";
import { categories as mockCategories, getCategory } from "@/data/categories";
import type { Product, Category, ProductCategorySlug } from "@/types";

// Tiny artificial delay so the UI exercises loading states realistically.
const delay = <T,>(value: T, ms = 120): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export async function getAllProducts(): Promise<Product[]> {
  return delay([...mockProducts]);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return delay(mockProducts.find((p) => p.slug === slug) ?? null);
}

export async function getProductsByCategory(slug: ProductCategorySlug): Promise<Product[]> {
  return delay(mockProducts.filter((p) => p.category === slug));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return delay(mockProducts.filter((p) => p.featured));
}

export async function getBestSellers(): Promise<Product[]> {
  return delay(mockProducts.filter((p) => p.bestSeller));
}

export async function getNewArrivals(): Promise<Product[]> {
  return delay(mockProducts.filter((p) => p.newArrival));
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return delay([...mockProducts]);
  return delay(
    mockProducts.filter((p) => {
      const haystack = [p.name, p.description, p.category, ...(p.tags ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    }),
  );
}

export async function getAllCategories(): Promise<Category[]> {
  return delay([...mockCategories]);
}

export { getCategory };
