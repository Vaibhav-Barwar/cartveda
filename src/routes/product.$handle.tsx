import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ShoppingBag, Heart, Truck, ShieldCheck, RefreshCw, ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useProductBySlug } from "@/hooks/useProducts";
import { formatPrice, discountPct, effectivePrice } from "@/utils/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useProductBySlug(handle);

  if (isLoading) {
    return (
      <div className="container-page py-20 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/products" className="text-foreground underline mt-4 inline-block">← Back to shop</Link>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const wished = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWish = useWishlistStore((s) => s.toggle);

  const sale = product.salePrice && product.salePrice < product.price;
  const pct = discountPct(product.price, product.salePrice);

  const handleAdd = () => {
    addItem(product, { quantity: qty, color: product.colors[colorIndex]?.name });
    toast.success("Added to cart", { description: product.name });
    setOpen(true);
  };

  return (
    <div className="container-page py-8 md:py-12">
      <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface">
            <img src={product.images[imageIndex]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 bg-surface",
                    i === imageIndex ? "border-foreground" : "border-border",
                  )}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:py-6">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{product.category.replace(/-/g, " ")}</span>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-border")} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} · {product.reviewCount} reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{formatPrice(effectivePrice(product), product.currency)}</span>
            {sale && (
              <>
                <span className="text-base text-muted-foreground line-through">{formatPrice(product.price, product.currency)}</span>
                <span className="text-sm font-semibold text-foreground bg-surface px-2 py-1 rounded-full">−{pct}%</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Color: <span className="text-muted-foreground">{product.colors[colorIndex].name}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIndex(i)}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition",
                      i === colorIndex ? "border-foreground" : "border-border hover:border-foreground/40",
                    )}
                    style={{ background: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 grid place-items-center">−</button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-12 w-12 grid place-items-center">+</button>
            </div>
            <Button size="lg" className="flex-1 rounded-full h-12" onClick={handleAdd} disabled={product.stock === 0}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              {product.stock === 0 ? "Out of stock" : "Add to cart"}
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 w-12 p-0 border-border" onClick={() => toggleWish(product.id)}>
              <Heart className={cn("h-5 w-5", wished && "fill-foreground text-foreground")} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              { icon: Truck, label: "Free shipping over ₹999" },
              { icon: ShieldCheck, label: "Quality guaranteed" },
              { icon: RefreshCw, label: "7-day returns" },
            ].map((b) => (
              <div key={b.label} className="p-3 rounded-lg bg-surface text-center">
                <b.icon className="h-4 w-4 mx-auto mb-1" />
                <span className="text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
