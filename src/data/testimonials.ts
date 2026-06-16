import type { Testimonial, FAQ } from "@/types";

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Aarav Mehta",  location: "Bengaluru", rating: 5, quote: "The band set is genuinely premium. I haven't missed a workout in 4 months. Quality you can feel from day one." },
  { id: "t2", name: "Priya Sharma", location: "Mumbai",    rating: 5, quote: "Cancelled my studio membership after the TPE mat showed up. Cushion is unreal — feels exactly like the high-end ones." },
  { id: "t3", name: "Rohit Verma",  location: "Delhi",     rating: 5, quote: "Skipping rope + gloves combo travels with me everywhere. Lost 8kg in 5 months. Worth every rupee." },
];

export const faqs: FAQ[] = [
  { id: "f1", question: "Where do you ship?",                a: undefined as any, answer: "We ship across India with 2–5 day delivery to all major cities and 4–7 days to remote pincodes." },
  { id: "f2", question: "What's your return policy?",        answer: "Unused products can be returned within 7 days of delivery for a full refund — no questions asked." },
  { id: "f3", question: "Are these beginner-friendly?",      answer: "Every product is curated for both beginners and seasoned athletes. Each listing includes setup notes." },
  { id: "f4", question: "Do you offer bundles?",             answer: "Yes — bundles combine top-rated essentials at up to 30% off the individual prices." },
  { id: "f5", question: "How do I track my order?",          answer: "Once shipped you'll receive a tracking link by email and SMS, updated in real time." },
  { id: "f6", question: "What payment methods are accepted?", answer: "UPI, credit & debit cards, net banking, and popular wallets via our secure checkout." },
];
