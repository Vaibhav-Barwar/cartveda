import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getBestSellers,
  getFeaturedProducts,
  getNewArrivals,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
} from "@/services/productService";
import type { ProductCategorySlug } from "@/types";

export const useAllProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: getAllProducts });

export const useBestSellers = () =>
  useQuery({ queryKey: ["products", "best"], queryFn: getBestSellers });

export const useFeaturedProducts = () =>
  useQuery({ queryKey: ["products", "featured"], queryFn: getFeaturedProducts });

export const useNewArrivals = () =>
  useQuery({ queryKey: ["products", "new"], queryFn: getNewArrivals });

export const useProductBySlug = (slug: string) =>
  useQuery({ queryKey: ["product", slug], queryFn: () => getProductBySlug(slug) });

export const useCategoryProducts = (slug: ProductCategorySlug) =>
  useQuery({ queryKey: ["products", "category", slug], queryFn: () => getProductsByCategory(slug) });

export const useSearchProducts = (q: string) =>
  useQuery({ queryKey: ["search", q], queryFn: () => searchProducts(q) });
