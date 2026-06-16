import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Lock, Star, Instagram, Quote } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAllProducts, useBestSellers, useFeaturedProducts, useNewArrivals } from "@/hooks/useProducts";
import { categories } from "@/data/categories";
import { testimonials, faqs } from "@/data/testimonials";

import heroBg from "@/assets/hero-bg.jpg";
import life1 from "@/assets/life-1.jpg";
import life2 from "@/assets/life-2.jpg";
import life3 from "@/assets/life-3.jpg";
import life4 from "@/assets/life-4.jpg";
import life5 from "@/assets/life-5.jpg";
import life6 from "@/assets/life-6.jpg";
import resistanceImg from "@/assets/resistance-bands.jpg";
import gripImg from "@/assets/grip-strengthener.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cartveda — Train Better. Perform Every Day." },
      { name: "description", content: "Premium fitness essentials for the everyday athlete. Resistance bands, yoga mats, gloves, shakers and more." },
    ],
  }),
});

const lifestyle = [life1, life4, life2, life6, life3, life5];

const perks = [
  { icon: Truck, title: "Premium Quality", desc: "Tested gear built to last." },
  { icon: ShieldCheck, title: "Fast Shipping", desc: "2–5 day delivery across India." },
  { icon: RefreshCw, title: "Easy Returns", desc: "7-day no-questions returns." },
  { icon: Lock, title: "Secure Payments", desc: "UPI, cards & netbanking." },
];

function Index() {
  const { data: bestSellers = [] } = useBestSellers();
  const { data: featured = [] } = useFeaturedProducts();
  const { data: newArrivals = [] } = useNewArrivals();
  const { data: allProducts = [] } = useAllProducts();

  const resistance = allProducts.filter((p) => p.category === "resistance-bands");
  const essentials = allProducts.filter((p) => ["gym-gloves", "shaker-bottles", "lifting-straps"].includes(p.category));

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface">
        <div className="container-page grid lg:grid-cols-2 items-center gap-12 py-16 md:py-24 lg:py-28">
          <div className="max-w-xl">
            <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-5">
              New Season Drop
            </span>
            <h1 className="text-display text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
              Train Better.<br />Perform Every Day.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Premium fitness gear engineered for the everyday grind — built for athletes, students and professionals who refuse to compromise on quality.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/search" search={{ q: "bundle" }}>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-foreground/20 bg-background">
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden">
            <img src={heroBg} alt="Athlete training" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <Section title="Shop by Category" eyebrow="Explore">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/search"
              search={{ q: c.name.toLowerCase() }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-surface"
            >
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-base md:text-lg font-semibold text-white leading-tight">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section title="Best Sellers" eyebrow="Loved by athletes" actionTo="/products" actionLabel="View all">
        <Grid products={bestSellers} />
      </Section>

      {/* FEATURED */}
      <Section title="Featured Products" eyebrow="Hand-picked" muted actionTo="/products" actionLabel="Shop all">
        <Grid products={featured} />
      </Section>

      {/* RESISTANCE BANDS COLLECTION */}
      <CollectionBanner
        eyebrow="Collection"
        title="Resistance Bands"
        copy="Progressive tension for strength, mobility and rehab — train anywhere."
        image={resistanceImg}
        ctaSearch="resistance"
      >
        <Grid products={resistance} compact />
      </CollectionBanner>

      {/* GYM ESSENTIALS COLLECTION */}
      <CollectionBanner
        eyebrow="Collection"
        title="Gym Essentials"
        copy="Gloves, straps and shakers — the everyday gear you'll actually use."
        image={gripImg}
        ctaSearch="gloves"
        flip
        muted
      >
        <Grid products={essentials} compact />
      </CollectionBanner>

      {/* NEW ARRIVALS */}
      <Section title="New Arrivals" eyebrow="Fresh in" actionTo="/products" actionLabel="View all">
        <Grid products={newArrivals} />
      </Section>

      {/* TESTIMONIALS */}
      <Section title="Trusted by everyday athletes" eyebrow="Reviews" muted>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t) => (
            <article key={t.id} className="p-7 rounded-2xl bg-background border border-border">
              <Quote className="h-7 w-7 text-foreground/40 mb-4" />
              <p className="text-foreground leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-foreground text-foreground" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FITNESS LIFESTYLE BANNER */}
      <section className="container-page py-16 md:py-20">
        <div className="relative rounded-2xl overflow-hidden aspect-[16/7] md:aspect-[16/6]">
          <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative h-full flex items-center px-8 md:px-16">
            <div className="max-w-xl text-white">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">Built for the daily grind</span>
              <h2 className="text-display text-3xl md:text-5xl mt-3 leading-tight text-white">It's not about being the best. It's about being better than yesterday.</h2>
              <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-foreground px-6 py-3 text-sm font-medium hover:bg-white/90 transition">
                Shop the gear <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM GRID */}
      <Section title="Lived in. Tagged daily." eyebrow={
        <span className="inline-flex items-center gap-1.5"><Instagram className="h-3.5 w-3.5" /> @cartveda</span>
      }>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {lifestyle.map((src, i) => (
            <a key={i} href="#" className="group relative aspect-square rounded-xl overflow-hidden bg-surface">
              <img src={src} alt="Community" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors grid place-items-center">
                <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* PERKS */}
      <Section title="Why choose Cartveda" eyebrow="Promise" muted>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((p) => (
            <div key={p.title} className="p-6 rounded-xl bg-background border border-border">
              <div className="h-11 w-11 rounded-full bg-surface grid place-items-center mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq" className="container-page py-16 md:py-24 border-t border-border">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">FAQ</span>
            <h2 className="text-display text-3xl md:text-4xl mt-3">Got questions?</h2>
            <p className="mt-4 text-muted-foreground">We've got answers. Can't find what you need? Reach out — we reply within 24 hours.</p>
          </div>
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((f) => (
                <AccordionItem key={f.id} value={f.id} className="border border-border rounded-xl px-5 bg-background">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-foreground text-background">
        <div className="container-page py-16 md:py-20 text-center max-w-2xl mx-auto">
          <h2 className="text-display text-3xl md:text-5xl text-background">Join the movement.</h2>
          <p className="mt-4 text-background/70">Drops, training tips and member-only discounts. Once a week. No noise.</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@cartveda.in"
              className="flex-1 h-12 px-5 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-background"
            />
            <button type="submit" className="h-12 px-6 rounded-full bg-background text-foreground font-medium hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Section({
  title, eyebrow, children, actionTo, actionLabel, muted,
}: {
  title: string; eyebrow?: React.ReactNode; children: React.ReactNode;
  actionTo?: string; actionLabel?: string; muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-surface" : ""}>
      <div className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            {eyebrow && (
              <span className="block text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3">{eyebrow}</span>
            )}
            <h2 className="text-display text-3xl md:text-4xl lg:text-5xl">{title}</h2>
          </div>
          {actionTo && actionLabel && (
            <Link to={actionTo as any} className="hidden sm:inline-flex items-center text-sm font-medium hover:underline shrink-0">
              {actionLabel} →
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Grid({ products, compact = false }: { products: any[]; compact?: boolean }) {
  if (!products.length) {
    return <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">No products yet.</div>;
  }
  return (
    <div className={`grid grid-cols-2 ${compact ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4"} gap-4 md:gap-5`}>
      {products.slice(0, compact ? 3 : 8).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function CollectionBanner({
  eyebrow, title, copy, image, ctaSearch, flip, muted, children,
}: {
  eyebrow: string; title: string; copy: string; image: string;
  ctaSearch: string; flip?: boolean; muted?: boolean; children: React.ReactNode;
}) {
  return (
    <section className={muted ? "bg-surface" : ""}>
      <div className="container-page py-16 md:py-20">
        <div className={`grid lg:grid-cols-2 gap-10 items-center mb-10 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">{eyebrow}</span>
            <h2 className="text-display text-3xl md:text-5xl mt-3">{title}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">{copy}</p>
            <Link to="/search" search={{ q: ctaSearch }} className="mt-6 inline-block">
              <Button size="lg" className="rounded-full">Shop the collection</Button>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
