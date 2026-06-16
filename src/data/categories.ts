import type { Category } from "@/types";
import resistanceImg from "@/assets/resistance-bands.jpg";
import glovesImg from "@/assets/gym-gloves.jpg";
import shakerImg from "@/assets/shaker-bottle.jpg";
import gripImg from "@/assets/grip-strengthener.jpg";
import skipImg from "@/assets/skipping-rope.jpg";
import yogaImg from "@/assets/yoga-mat.jpg";
import abImg from "@/assets/ab-roller.jpg";
import tummyImg from "@/assets/tummy-trimmer.jpg";
import bagImg from "@/assets/hero-bg.jpg";

export const categories: Category[] = [
  { slug: "resistance-bands", name: "Resistance Bands", image: resistanceImg, description: "Train anywhere with progressive tension." },
  { slug: "gym-gloves",       name: "Gym Gloves",        image: glovesImg,     description: "Grip stronger. Lift longer." },
  { slug: "shaker-bottles",   name: "Shaker Bottles",    image: shakerImg,     description: "Leak-proof. Lump-free shakes." },
  { slug: "lifting-straps",   name: "Lifting Straps",    image: gripImg,       description: "Pull heavier with confidence." },
  { slug: "skipping-ropes",   name: "Skipping Ropes",    image: skipImg,       description: "Cardio that travels." },
  { slug: "yoga-mats",        name: "Yoga Mats",         image: yogaImg,       description: "Cushioned, non-slip practice." },
  { slug: "foam-rollers",     name: "Foam Rollers",      image: abImg,         description: "Recovery you can feel." },
  { slug: "massage-guns",     name: "Massage Guns",      image: tummyImg,      description: "Percussive relief in minutes." },
  { slug: "gym-bags",         name: "Gym Bags",          image: bagImg,        description: "Built for the daily grind." },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
