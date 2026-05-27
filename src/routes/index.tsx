import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Lock, Star, Sparkles, Zap, Flame, Package, Instagram, Quote } from "lucide-react";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import heroBg from "@/assets/hero-bg.jpg";
import resistanceImg from "@/assets/resistance-bands.jpg";
import gripImg from "@/assets/grip-strengthener.jpg";
import yogaImg from "@/assets/yoga-mat.jpg";
import skipImg from "@/assets/skipping-rope.jpg";
import glovesImg from "@/assets/gym-gloves.jpg";
import tummyImg from "@/assets/tummy-trimmer.jpg";
import abImg from "@/assets/ab-roller.jpg";
import shakerImg from "@/assets/shaker-bottle.jpg";
import life1 from "@/assets/life-1.jpg";
import life2 from "@/assets/life-2.jpg";
import life3 from "@/assets/life-3.jpg";
import life4 from "@/assets/life-4.jpg";
import life5 from "@/assets/life-5.jpg";
import life6 from "@/assets/life-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cartveda — Everything Fitness. One Cart." },
      { name: "description", content: "Premium fitness essentials made for India. Resistance bands, yoga mats, ab rollers, shakers and curated bundles — built for athletes who don't compromise." },
    ],
  }),
});

const categories = [
  { name: "Resistance Bands", q: "resistance", img: resistanceImg },
  { name: "Grip Strengtheners", q: "grip", img: gripImg },
  { name: "Yoga Mats", q: "yoga", img: yogaImg },
  { name: "Skipping Ropes", q: "skipping", img: skipImg },
  { name: "Gym Gloves", q: "gloves", img: glovesImg },
  { name: "Tummy Trimmers", q: "tummy", img: tummyImg },
  { name: "Ab Rollers", q: "ab roller", img: abImg },
  { name: "Shaker Bottles", q: "shaker", img: shakerImg },
];

const reasons = [
  { icon: Truck, title: "Fast delivery", desc: "2–5 day shipping across India, free over ₹999." },
  { icon: ShieldCheck, title: "Premium quality", desc: "Tested gear from trusted Indian manufacturers." },
  { icon: RefreshCw, title: "Easy returns", desc: "7-day no-questions-asked return policy." },
  { icon: Lock, title: "Secure payments", desc: "UPI, cards & netbanking via Shopify Checkout." },
];

const faqs = [
  { q: "Where do you ship?", a: "We ship across India with 2–5 day delivery to most cities." },
  { q: "What is your return policy?", a: "Unused products can be returned within 7 days of delivery for a full refund." },
  { q: "Are your products beginner-friendly?", a: "Yes — every product is curated for both beginners and seasoned fitness enthusiasts." },
  { q: "Do you offer bundles or discounts?", a: "Yes, our Fitness Bundles combine top-rated essentials at a discounted price." },
  { q: "How can I track my order?", a: "Once shipped, you'll get a tracking link via email and SMS." },
];

const lifestyle = [life1, life4, life2, life6, life3, life5];

const transformations = [
  {
    name: "Aarav, 26 · Bengaluru",
    body: "Started with the starter bundle six months ago. The resistance bands and ab roller became part of my daily routine — finally consistent for the first time.",
    tag: "6 months · Strength",
  },
  {
    name: "Priya, 31 · Mumbai",
    body: "The yoga mat is genuinely premium. I cancelled my studio membership and built a home practice that actually sticks.",
    tag: "4 months · Yoga",
  },
  {
    name: "Rohit, 22 · Delhi",
    body: "As a hostel student I needed something compact. The skipping rope + grip combo travels with me everywhere. Lost 8kg.",
    tag: "5 months · Cardio",
  },
];

function Index() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "home"],
    queryFn: () => fetchProducts(12),
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-center animate-hero-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        {/* Subtle drifting grid */}
        <div className="absolute inset-0 -z-10 bg-hero-grid animate-grid-drift pointer-events-none" aria-hidden />
        {/* Primary glow */}
        <div className="absolute -top-40 left-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" aria-hidden />

        <div className="container-page py-24 md:py-36 lg:py-44 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              New drops every week
            </span>
            <h1 className="mt-7 text-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92]">
              Everything Fitness.<br />
              <span className="text-gradient">One Cart.</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Premium fitness essentials engineered for your everyday journey — built for gym beginners,
              athletes and busy professionals who refuse to compromise on quality.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-[0_0_40px_-8px_color-mix(in_oklab,var(--color-primary)_70%,transparent)]">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="#bestsellers">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-border bg-background/40 backdrop-blur">
                  Explore Best Sellers
                </Button>
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free shipping over ₹999</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Quality guaranteed</div>
              <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-primary" /> 7-day returns</div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section id="bestsellers" className="container-page py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              <Flame className="h-3.5 w-3.5" /> Best Sellers
            </span>
            <h2 className="text-display text-3xl md:text-5xl">Trained & tested favourites</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-primary transition">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <Skeletons />
        ) : products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-page py-16 md:py-20 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" /> New Arrivals
            </span>
            <h2 className="text-display text-3xl md:text-5xl">Fresh on the rack</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-primary transition">
            View all →
          </Link>
        </div>
        {isLoading ? (
          <Skeletons />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.slice(-8).reverse().slice(0, 8).map((p) => (
              <ProductCard key={`new-${p.node.id}`} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-16 md:py-20 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Categories</span>
            <h2 className="text-display text-3xl md:text-5xl">Shop by category</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-primary">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/search"
              search={{ q: c.q }}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-border bg-surface hover:border-primary/60 transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-90 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-base md:text-lg font-semibold leading-tight">{c.name}</h3>
                <p className="text-xs text-primary mt-1 opacity-0 group-hover:opacity-100 transition">Shop now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FITNESS BUNDLES */}
      <section className="container-page py-16 md:py-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary/15 via-surface to-background border border-primary/25 p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center overflow-hidden relative">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-primary font-bold">
              <Package className="h-3.5 w-3.5" /> Fitness Bundles
            </span>
            <h2 className="mt-4 text-display text-3xl md:text-5xl leading-[1.05]">
              Save up to 30% <br/>on starter bundles
            </h2>
            <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
              Get everything you need to start strong — mats, bands, gloves and a shaker — packed into one premium box.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Hand-picked essentials</li>
              <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Flat 30% bundle discount</li>
              <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Free shipping included</li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/search" search={{ q: "bundle" }}>
                <Button size="lg" className="rounded-full">Shop Bundles</Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="rounded-full bg-surface/40">View all gear</Button>
              </Link>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            {[resistanceImg, glovesImg, yogaImg, shakerImg].map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border hover:border-primary/60 hover:-translate-y-1 transition-all duration-500"
              >
                <img src={src} alt="Bundle item" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS / TESTIMONIALS */}
      <section className="container-page py-16 md:py-24 border-t border-border">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Transformations</span>
          <h2 className="text-display text-3xl md:text-5xl">Real journeys, real results</h2>
          <p className="mt-4 text-muted-foreground">Stories shared by our community.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {transformations.map((t) => (
            <article
              key={t.name}
              className="relative p-7 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:-translate-y-1 transition-all duration-500"
            >
              <Quote className="h-7 w-7 text-primary/60 mb-4" />
              <p className="text-foreground leading-relaxed">"{t.body}"</p>
              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.tag}</p>
                </div>
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INSTAGRAM / LIFESTYLE */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-page flex items-end justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              <Instagram className="h-3.5 w-3.5" /> @cartveda
            </span>
            <h2 className="text-display text-3xl md:text-5xl">Lived in. Tagged daily.</h2>
            <p className="mt-3 text-muted-foreground">Tag <span className="text-primary">#cartveda</span> to be featured.</p>
          </div>
          <a href="#" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-primary">Follow →</a>
        </div>
        <div className="container-page grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {lifestyle.map((src, i) => (
            <a
              key={i}
              href="#"
              className="group relative aspect-square rounded-xl overflow-hidden bg-surface border border-border"
            >
              <img
                src={src}
                alt="Cartveda community"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors grid place-items-center">
                <Instagram className="h-6 w-6 text-foreground opacity-0 group-hover:opacity-100 transition" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-page py-16 md:py-20 border-t border-border">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-display text-3xl md:text-5xl">Why choose Cartveda</h2>
          <p className="mt-3 text-muted-foreground">A premium experience from cart to first rep.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/15 grid place-items-center text-primary mb-4">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-page py-16 md:py-24 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">FAQ</span>
            <h2 className="text-display text-3xl md:text-5xl leading-[1.05]">Got questions? <br/>We've got answers.</h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Can't find what you're looking for? <a className="text-primary hover:underline" href="#">Reach out to our team.</a>
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function Skeletons() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-surface border border-border aspect-[3/4] animate-pulse" />
      ))}
    </div>
  );
}

function EmptyProducts() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center">
      <h3 className="text-lg font-semibold">No products found</h3>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto">
        Your Shopify store is connected but no products are loading yet. Tell me what to add — name, price, category — and I'll create them for you.
      </p>
    </div>
  );
}
