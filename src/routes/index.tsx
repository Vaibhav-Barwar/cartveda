import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Lock, Star, Sparkles, Dumbbell, ChevronDown } from "lucide-react";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cartveda — Everything Fitness. One Cart." },
      { name: "description", content: "Shop premium resistance bands, yoga mats, shaker bottles, ab rollers and fitness bundles. Built for gym beginners, athletes and busy professionals in India." },
    ],
  }),
});

const categories = [
  { name: "Resistance Bands", q: "resistance" },
  { name: "Grip Strengtheners", q: "grip" },
  { name: "Yoga Mats", q: "yoga" },
  { name: "Skipping Ropes", q: "skipping" },
  { name: "Gym Gloves", q: "gloves" },
  { name: "Tummy Trimmers", q: "tummy" },
  { name: "Ab Rollers", q: "ab roller" },
  { name: "Shaker Bottles", q: "shaker" },
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

function Index() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "home"],
    queryFn: () => fetchProducts(12),
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-grid">
        <div className="container-page py-20 md:py-28 lg:py-32 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New drops every week
            </span>
            <h1 className="mt-5 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Everything Fitness.<br />
              <span className="text-gradient">One Cart.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Premium fitness essentials for your everyday journey. Built for gym beginners,
              college students and pros who don't compromise on quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="rounded-full px-7 h-12 text-base font-semibold">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="#bestsellers">
                <Button size="lg" variant="outline" className="rounded-full px-7 h-12 text-base border-border bg-surface/40">
                  Explore Best Sellers
                </Button>
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free shipping over ₹999</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Quality guaranteed</div>
              <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-primary" /> 7-day returns</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Shop by category</h2>
            <p className="mt-2 text-muted-foreground">Find the gear that matches your training.</p>
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
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-surface to-background hover:border-primary/50 transition-all p-5 flex flex-col justify-between"
            >
              <Dumbbell className="h-6 w-6 text-primary opacity-80 group-hover:scale-110 transition" />
              <div>
                <h3 className="text-base md:text-lg font-semibold leading-tight">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-primary">Shop now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section id="bestsellers" className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-primary mb-2">Best Sellers</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trained & tested favourites</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-primary">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-surface border border-border aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* BUNDLE OFFER */}
      <section className="container-page py-10">
        <div className="rounded-3xl bg-gradient-to-br from-primary/15 via-surface to-background border border-primary/20 p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center overflow-hidden relative">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <div className="relative">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Fitness Bundle</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Save up to 30% on starter bundles.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Get everything you need to start strong — mats, bands, gloves and a shaker — packed into one box.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/search" search={{ q: "bundle" }}>
                <Button size="lg" className="rounded-full">Shop Bundles</Button>
              </Link>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.node.id} className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                {p.node.images.edges[0] && (
                  <img src={p.node.images.edges[0].node.url} alt={p.node.title} className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-page py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why choose Cartveda</h2>
          <p className="mt-2 text-muted-foreground">A premium experience from cart to first rep.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="p-6 rounded-2xl bg-surface border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/15 grid place-items-center text-primary mb-4">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS - empty state per policy */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-primary mb-2">Customer Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">From the community</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-dashed border-border bg-surface/40">
              <div className="flex gap-0.5 mb-3 text-muted-foreground">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4" />)}
              </div>
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your Cartveda experience.</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-page py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-primary mb-2">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Got questions? We've got answers.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Can't find what you're looking for? <a className="text-primary hover:underline" href="#">Reach out to our team.</a>
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
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
