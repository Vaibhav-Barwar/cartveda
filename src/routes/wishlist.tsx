import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({ meta: [{ title: "Wishlist — Cartveda" }] }),
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const { data: products = [] } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(50),
  });

  const wished = products.filter((p) => ids.includes(p.node.id));

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your wishlist</h1>
        <p className="mt-2 text-muted-foreground">Save the gear you love for later.</p>
      </div>

      {wished.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Heart className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold">Nothing saved yet</h3>
          <p className="text-muted-foreground mt-2">Tap the heart on any product to save it here.</p>
          <Link to="/products" className="inline-block mt-4 text-primary hover:underline">Browse products →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wished.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
