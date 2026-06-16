import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { useSearchProducts } from "@/hooks/useProducts";

const searchSchema = z.object({ q: z.string().optional().catch("") });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
  head: () => ({ meta: [{ title: "Search — Cartveda" }] }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const query = q?.trim() || "";
  const { data: products = [], isLoading } = useSearchProducts(query);

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mb-10">
        <p className="text-sm text-muted-foreground">Search results</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-1">
          {query ? <>"{query}"</> : "Browse all"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {isLoading ? "Searching…" : `${products.length} product${products.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-surface aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <h3 className="text-lg font-semibold">Nothing matched "{query}"</h3>
          <p className="text-muted-foreground mt-2">Try a different keyword or browse all products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
