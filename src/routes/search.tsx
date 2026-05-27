import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({ q: z.string().optional().catch("") });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
  head: () => ({
    meta: [{ title: "Search — Cartveda" }],
  }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const query = q?.trim() || "";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchProducts(50, query || undefined),
  });

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mb-10">
        <p className="text-sm text-muted-foreground">Search results</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-1">
          {query ? <>"{query}"</> : "Browse all"}
        </h1>
        <p className="mt-2 text-muted-foreground">{isLoading ? "Searching…" : `${products.length} product${products.length !== 1 ? "s" : ""}`}</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-surface border border-border aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <h3 className="text-lg font-semibold">Nothing matched "{query}"</h3>
          <p className="text-muted-foreground mt-2">Try a different keyword or browse all products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
