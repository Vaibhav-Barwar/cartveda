import type { Product } from "@/types";
import resistanceImg from "@/assets/resistance-bands.jpg";
import glovesImg from "@/assets/gym-gloves.jpg";
import shakerImg from "@/assets/shaker-bottle.jpg";
import gripImg from "@/assets/grip-strengthener.jpg";
import skipImg from "@/assets/skipping-rope.jpg";
import yogaImg from "@/assets/yoga-mat.jpg";
import abImg from "@/assets/ab-roller.jpg";
import tummyImg from "@/assets/tummy-trimmer.jpg";
import bagImg from "@/assets/hero-bg.jpg";

const COLORS = {
  black: { name: "Black", hex: "#111111" },
  white: { name: "White", hex: "#FFFFFF" },
  gray:  { name: "Gray",  hex: "#9CA3AF" },
  blue:  { name: "Blue",  hex: "#2563EB" },
  red:   { name: "Red",   hex: "#DC2626" },
};

export const products: Product[] = [
  {
    id: "p-001", slug: "pro-resistance-band-set",
    name: "Pro Resistance Band Set",
    description: "Five progressive bands for full-body strength, mobility and rehab. Snap-resistant natural latex with reinforced loops.",
    price: 1499, salePrice: 999, currency: "INR",
    images: [resistanceImg], category: "resistance-bands",
    rating: 4.7, reviewCount: 312, stock: 120,
    colors: [COLORS.black, COLORS.blue], featured: true, bestSeller: true,
    tags: ["bands", "strength"],
  },
  {
    id: "p-002", slug: "performance-training-gloves",
    name: "Performance Training Gloves",
    description: "Breathable mesh back with reinforced leather palm. Wrist wraps for stability under heavy loads.",
    price: 1299, salePrice: 899, currency: "INR",
    images: [glovesImg], category: "gym-gloves",
    rating: 4.6, reviewCount: 187, stock: 80,
    colors: [COLORS.black, COLORS.gray], featured: true, bestSeller: true,
  },
  {
    id: "p-003", slug: "leakproof-shaker-700ml",
    name: "Leak-Proof Shaker 700ml",
    description: "Stainless mixing ball, screw-tight lid, dishwasher safe. BPA-free and odor-resistant.",
    price: 699, salePrice: 449, currency: "INR",
    images: [shakerImg], category: "shaker-bottles",
    rating: 4.8, reviewCount: 524, stock: 200,
    colors: [COLORS.black, COLORS.white, COLORS.blue], featured: true, bestSeller: true,
  },
  {
    id: "p-004", slug: "heavy-duty-lifting-straps",
    name: "Heavy-Duty Lifting Straps",
    description: "8mm padded cotton with neoprene wrist support. Pull heavier on deadlifts, rows and shrugs.",
    price: 599, salePrice: 399, currency: "INR",
    images: [gripImg], category: "lifting-straps",
    rating: 4.5, reviewCount: 142, stock: 150,
    colors: [COLORS.black], featured: false, newArrival: true,
  },
  {
    id: "p-005", slug: "speed-skipping-rope",
    name: "Speed Skipping Rope",
    description: "Steel cable with ball bearings for ultra-fast rotation. Adjustable length, ergonomic handles.",
    price: 499, salePrice: 349, currency: "INR",
    images: [skipImg], category: "skipping-ropes",
    rating: 4.7, reviewCount: 268, stock: 175,
    colors: [COLORS.black, COLORS.red], featured: true, bestSeller: true,
  },
  {
    id: "p-006", slug: "premium-tpe-yoga-mat",
    name: "Premium TPE Yoga Mat 6mm",
    description: "Dual-layer non-slip TPE. Lightweight, eco-friendly, and machine washable.",
    price: 2499, salePrice: 1799, currency: "INR",
    images: [yogaImg], category: "yoga-mats",
    rating: 4.8, reviewCount: 412, stock: 90,
    colors: [COLORS.blue, COLORS.gray, COLORS.black], featured: true, newArrival: true, bestSeller: true,
  },
  {
    id: "p-007", slug: "textured-foam-roller",
    name: "Textured Foam Roller",
    description: "High-density EVA with trigger-point ridges for deep muscle release after training.",
    price: 1199, salePrice: 849, currency: "INR",
    images: [abImg], category: "foam-rollers",
    rating: 4.6, reviewCount: 96, stock: 60,
    colors: [COLORS.black, COLORS.blue], featured: false, newArrival: true,
  },
  {
    id: "p-008", slug: "deep-tissue-massage-gun",
    name: "Deep Tissue Massage Gun",
    description: "6 speeds, 4 attachments, 4-hour battery. Quiet brushless motor for studio-grade recovery.",
    price: 7999, salePrice: 4999, currency: "INR",
    images: [tummyImg], category: "massage-guns",
    rating: 4.9, reviewCount: 218, stock: 35,
    colors: [COLORS.black], featured: true, bestSeller: true,
  },
  {
    id: "p-009", slug: "everyday-gym-duffle",
    name: "Everyday Gym Duffle 40L",
    description: "Water-resistant ripstop with vented shoe compartment and padded laptop sleeve.",
    price: 3499, salePrice: 2499, currency: "INR",
    images: [bagImg], category: "gym-bags",
    rating: 4.7, reviewCount: 154, stock: 70,
    colors: [COLORS.black, COLORS.gray], featured: true, newArrival: true,
  },
  {
    id: "p-010", slug: "fabric-resistance-loop-bands",
    name: "Fabric Loop Bands (Set of 3)",
    description: "Non-slip cotton-poly weave. Light / medium / heavy for glutes, hips and warm-ups.",
    price: 899, salePrice: 599, currency: "INR",
    images: [resistanceImg], category: "resistance-bands",
    rating: 4.6, reviewCount: 203, stock: 110,
    colors: [COLORS.black, COLORS.gray], featured: false, newArrival: true,
  },
  {
    id: "p-011", slug: "weighted-skipping-rope",
    name: "Weighted Skipping Rope",
    description: "1lb handles for added forearm and shoulder activation. Tangle-free PVC cord.",
    price: 799, salePrice: 549, currency: "INR",
    images: [skipImg], category: "skipping-ropes",
    rating: 4.5, reviewCount: 87, stock: 65,
    colors: [COLORS.black], featured: false,
  },
  {
    id: "p-012", slug: "cork-yoga-block",
    name: "Cork Yoga Block",
    description: "Natural cork, soft on hands, firm under pressure. Sold as a pair.",
    price: 999, salePrice: 699, currency: "INR",
    images: [yogaImg], category: "yoga-mats",
    rating: 4.7, reviewCount: 64, stock: 120,
    colors: [{ name: "Natural", hex: "#C9A26D" }], featured: false, newArrival: true,
  },
];
