import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, ShoppingBag, Heart, Truck, ShieldCheck, RefreshCw, ChevronLeft } from "lucide-react";
import { fetchProductByHandle, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

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
        <Link to="/products" className="text-primary mt-4 inline-block">← Back to shop</Link>
      </div>
    );
  }

  return <ProductDetail product={{ node: product } as ShopifyProduct} />;
}

function ProductDetail({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const variant = node.variants.edges[variantIndex]?.node;
  const images = node.images.edges;
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);
  const wished = useWishlist((s) => s.ids.includes(node.id));
  const toggleWish = useWishlist((s) => s.toggle);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title });
    setOpen(true);
  };

  return (
    <div className="container-page py-8 md:py-12">
      <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
            {images[imageIndex] && (
              <img src={images[imageIndex].node.url} alt={images[imageIndex].node.altText || node.title} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 bg-muted",
                    i === imageIndex ? "border-primary" : "border-border"
                  )}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:py-6">
          {node.productType && (
            <span className="text-xs uppercase tracking-widest text-primary">{node.productType}</span>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">{node.title}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">
              {formatPrice(variant?.price.amount ?? node.priceRange.minVariantPrice.amount, variant?.price.currencyCode ?? "INR")}
            </span>
            <span className="text-sm text-muted-foreground">Inclusive of all taxes</span>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{node.description}</p>

          {node.options.filter((o) => o.name !== "Title").map((option) => (
            <div key={option.name} className="mt-6">
              <h3 className="text-sm font-medium mb-2">{option.name}</h3>
              <div className="flex flex-wrap gap-2">
                {node.variants.edges.map((v, i) => {
                  const value = v.node.selectedOptions.find((s) => s.name === option.name)?.value;
                  if (!value) return null;
                  const active = i === variantIndex;
                  return (
                    <button
                      key={v.node.id}
                      onClick={() => setVariantIndex(i)}
                      className={cn(
                        "px-4 h-10 rounded-full border text-sm",
                        active ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-foreground/40"
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 grid place-items-center hover:text-primary">−</button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-12 w-12 grid place-items-center hover:text-primary">+</button>
            </div>
            <Button size="lg" className="flex-1 rounded-full h-12" onClick={handleAdd} disabled={isLoading || !variant?.availableForSale}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShoppingBag className="h-4 w-4 mr-2" /> Add to cart</>}
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 w-12 p-0" onClick={() => toggleWish(node.id)}>
              <Heart className={cn("h-5 w-5", wished && "fill-primary text-primary")} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              { icon: Truck, label: "Free shipping over ₹999" },
              { icon: ShieldCheck, label: "Quality guaranteed" },
              { icon: RefreshCw, label: "7-day returns" },
            ].map((b) => (
              <div key={b.label} className="p-3 rounded-lg bg-surface border border-border text-center">
                <b.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                <span className="text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
