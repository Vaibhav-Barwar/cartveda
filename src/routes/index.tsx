import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useAllProducts } from "@/hooks/useProducts";
import type { Product } from "@/types";

import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cartveda — Train Better. Perform Every Day." },
      { name: "description", content: "Premium fitness essentials for the everyday athlete. Resistance bands, yoga mats, gloves, shakers and more." },
    ],
  }),
});

// Fixed reorder for New Arrivals — same 8 products, different sequence, no duplicates.
const NEW_ORDER = ["p-007", "p-008", "p-006", "p-004", "p-002", "p-005", "p-001", "p-003"];

function Index() {
  const { data: products = [] } = useAllProducts();

  const newArrivals = NEW_ORDER
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div>
      {/* HERO */}
      <section className="bg-surface">
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
            </div>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden">
            <img src={heroBg} alt="Athlete training" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <Section title="All Products" eyebrow="Shop the lineup">
        <Grid products={products} />
      </Section>

      {/* NEW ARRIVALS */}
      <Section title="New Arrivals" eyebrow="Fresh in" muted>
        <Grid products={newArrivals} />
      </Section>
    </div>
  );
}

function Section({
  title, eyebrow, children, muted,
}: {
  title: string; eyebrow?: React.ReactNode; children: React.ReactNode; muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-surface" : ""}>
      <div className="container-page py-16 md:py-24">
        <div className="mb-10">
          {eyebrow && (
            <span className="block text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3">{eyebrow}</span>
          )}
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Grid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">No products yet.</div>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
