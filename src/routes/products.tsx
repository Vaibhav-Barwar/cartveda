import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { useAllProducts } from "@/hooks/useProducts";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Shop All — Cartveda" },
      { name: "description", content: "Browse the full Cartveda catalog of premium fitness accessories." },
    ],
  }),
});

function ProductsPage() {
  const { data: products = [], isLoading } = useAllProducts();

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Shop All</h1>
        <p className="mt-3 text-muted-foreground">Premium fitness essentials, curated for your everyday journey.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-surface aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <h3 className="text-lg font-semibold">No products found</h3>
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
