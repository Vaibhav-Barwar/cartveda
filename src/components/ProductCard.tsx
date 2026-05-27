import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star, Eye, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);
  const wished = useWishlist((s) => s.ids.includes(node.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const [quickOpen, setQuickOpen] = useState(false);

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : 0;
  const hasDiscount = compareAt > price;
  const discountPct = hasDiscount ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title, position: "top-center" });
    setOpen(true);
  };

  return (
    <>
      <Link
        to="/product/$handle"
        params={{ handle: node.handle }}
        className="group relative flex flex-col rounded-2xl bg-surface border border-border overflow-hidden transition-all duration-500 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--color-primary)_50%,transparent)]"
      >
        <div className="relative aspect-square bg-muted overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
          )}

          {hasDiscount && (
            <span className="absolute top-3 left-3 rounded-full bg-primary text-primary-foreground text-[11px] font-extrabold px-2.5 py-1 shadow-[0_0_20px_-2px_color-mix(in_oklab,var(--color-primary)_70%,transparent)]">
              -{discountPct}%
            </span>
          )}

          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWish(node.id);
              }}
              className="h-9 w-9 rounded-full bg-background/85 backdrop-blur grid place-items-center border border-border hover:border-primary hover:scale-110 transition"
              aria-label="Wishlist"
            >
              <Heart className={cn("h-4 w-4", wished ? "fill-primary text-primary" : "text-foreground")} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickOpen(true);
              }}
              className="h-9 w-9 rounded-full bg-background/85 backdrop-blur grid place-items-center border border-border hover:border-primary hover:scale-110 transition"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={isLoading || !variant}
              className="w-full rounded-full shadow-lg font-semibold"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 p-4">
          {node.productType && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">{node.productType}</span>
          )}
          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">{node.title}</h3>

          <div className="flex items-center gap-1.5 text-muted-foreground" aria-label="No reviews yet">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3" />
              ))}
            </div>
            <span className="text-[11px]">No reviews yet</span>
          </div>

          <div className="mt-2 flex items-center justify-between pt-1 gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-lg font-bold tracking-tight">
                {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(variant!.compareAtPrice!.amount, variant!.compareAtPrice!.currencyCode)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleAdd}
              disabled={isLoading || !variant}
              className="rounded-full sm:hidden"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>

      <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-surface border-border">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square bg-muted">
              {image && (
                <img src={image.url} alt={image.altText || node.title} className="h-full w-full object-cover" />
              )}
              {hasDiscount && (
                <span className="absolute top-4 left-4 rounded-full bg-primary text-primary-foreground text-xs font-extrabold px-3 py-1">
                  -{discountPct}%
                </span>
              )}
            </div>
            <div className="p-6 md:p-8 flex flex-col">
              <button
                onClick={() => setQuickOpen(false)}
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 grid place-items-center md:hidden"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              {node.productType && (
                <span className="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">{node.productType}</span>
              )}
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{node.title}</h2>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold">
                  {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(variant!.compareAtPrice!.amount, variant!.compareAtPrice!.currencyCode)}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm text-muted-foreground line-clamp-6">{node.description}</p>
              <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-2">
                <Button onClick={handleAdd} disabled={isLoading || !variant} className="rounded-full flex-1">
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </Button>
                <Link
                  to="/product/$handle"
                  params={{ handle: node.handle }}
                  onClick={() => setQuickOpen(false)}
                  className="inline-flex items-center justify-center h-9 rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
