import type { Product } from "@/types";
import resistanceImg from "@/assets/p-resistance-bands.jpg";
import glovesImg from "@/assets/p-gym-gloves.jpg";
import shakerImg from "@/assets/p-shaker.jpg";
import strapsImg from "@/assets/p-lifting-straps.jpg";
import skipImg from "@/assets/p-skipping-rope.jpg";
import yogaImg from "@/assets/p-yoga-mat.jpg";
import foamImg from "@/assets/p-foam-roller.jpg";
import massageImg from "@/assets/p-massage-gun.jpg";

const COLORS = {
  black: { name: "Black", hex: "#111111" },
  white: { name: "White", hex: "#FFFFFF" },
  gray:  { name: "Gray",  hex: "#9CA3AF" },
  blue:  { name: "Blue",  hex: "#2563EB" },
  red:   { name: "Red",   hex: "#DC2626" },
};

export const products: Product[] = [
  {
    id: "p-001", slug: "resistance-band-set",
    name: "Resistance Band Set",
    description: "Five progressive bands for full-body strength, mobility and rehab. Snap-resistant natural latex with reinforced loops.",
    price: 1499, salePrice: 999, currency: "INR",
    images: [resistanceImg], category: "resistance-bands",
    rating: 4.7, reviewCount: 312, stock: 120,
    colors: [COLORS.black, COLORS.blue], featured: true, bestSeller: true,
    tags: ["bands", "strength"],
  },
  {
    id: "p-002", slug: "gym-gloves",
    name: "Gym Gloves",
    description: "Breathable mesh back with reinforced leather palm. Wrist wraps for stability under heavy loads.",
    price: 1299, salePrice: 899, currency: "INR",
    images: [glovesImg], category: "gym-gloves",
    rating: 4.6, reviewCount: 187, stock: 80,
    colors: [COLORS.black, COLORS.gray], featured: true, bestSeller: true,
  },
  {
    id: "p-003", slug: "shaker-bottle",
    name: "Shaker Bottle",
    description: "Leak-proof 700ml shaker with stainless mixing ball. BPA-free, dishwasher safe and odor-resistant.",
    price: 699, salePrice: 449, currency: "INR",
    images: [shakerImg], category: "shaker-bottles",
    rating: 4.8, reviewCount: 524, stock: 200,
    colors: [COLORS.black, COLORS.white, COLORS.blue], featured: true, bestSeller: true,
  },
  {
    id: "p-004", slug: "lifting-straps",
    name: "Lifting Straps",
    description: "8mm padded cotton with neoprene wrist support. Pull heavier on deadlifts, rows and shrugs.",
    price: 599, salePrice: 399, currency: "INR",
    images: [strapsImg], category: "lifting-straps",
    rating: 4.5, reviewCount: 142, stock: 150,
    colors: [COLORS.black], featured: true, newArrival: true,
  },
  {
    id: "p-005", slug: "skipping-rope",
    name: "Skipping Rope",
    description: "Steel cable with ball bearings for ultra-fast rotation. Adjustable length, ergonomic handles.",
    price: 499, salePrice: 349, currency: "INR",
    images: [skipImg], category: "skipping-ropes",
    rating: 4.7, reviewCount: 268, stock: 175,
    colors: [COLORS.black, COLORS.red], featured: true, bestSeller: true,
  },
  {
    id: "p-006", slug: "yoga-mat",
    name: "Yoga Mat",
    description: "Premium 6mm dual-layer non-slip TPE. Lightweight, eco-friendly, and machine washable.",
    price: 2499, salePrice: 1799, currency: "INR",
    images: [yogaImg], category: "yoga-mats",
    rating: 4.8, reviewCount: 412, stock: 90,
    colors: [COLORS.blue, COLORS.gray, COLORS.black], featured: true, newArrival: true, bestSeller: true,
  },
  {
    id: "p-007", slug: "foam-roller",
    name: "Foam Roller",
    description: "High-density EVA with trigger-point texture for deep muscle release after training.",
    price: 1199, salePrice: 849, currency: "INR",
    images: [foamImg], category: "foam-rollers",
    rating: 4.6, reviewCount: 96, stock: 60,
    colors: [COLORS.black, COLORS.blue], featured: true, newArrival: true,
  },
  {
    id: "p-008", slug: "massage-gun",
    name: "Massage Gun",
    description: "6 speeds, 4 attachments, 4-hour battery. Quiet brushless motor for studio-grade recovery.",
    price: 7999, salePrice: 4999, currency: "INR",
    images: [massageImg], category: "massage-guns",
    rating: 4.9, reviewCount: 218, stock: 35,
    colors: [COLORS.black], featured: true, bestSeller: true, newArrival: true,
  },
];
