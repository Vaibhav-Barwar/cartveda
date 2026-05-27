import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
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

  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : 0;
  const hasDiscount = compareAt > price;
  const discountPct = hasDiscount ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
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
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: node.handle }}
      className="group relative flex flex-col rounded-2xl bg-surface border border-border overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_color-mix(in_oklab,var(--color-primary)_55%,transparent)]"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 rounded-full bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 shadow">
            -{discountPct}%
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWish(node.id);
          }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur grid place-items-center border border-border hover:border-primary/50 hover:scale-110 transition"
          aria-label="Wishlist"
        >
          <Heart className={cn("h-4 w-4", wished ? "fill-primary text-primary" : "text-foreground")} />
        </button>

        {/* Quick add overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            size="sm"
            onClick={(e) => {
              handleAdd(e);
              setOpen(true);
            }}
            disabled={isLoading || !variant}
            className="w-full rounded-full shadow-lg"
          >
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        {node.productType && (
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{node.productType}</span>
        )}
        <h3 className="font-medium text-foreground line-clamp-2 leading-snug">{node.title}</h3>

        {/* Rating placeholder — no fake reviews per policy */}
        <div className="flex items-center gap-1.5 text-muted-foreground" aria-label="No reviews yet">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3" />
            ))}
          </div>
          <span className="text-[11px]">No reviews yet</span>
        </div>

        <div className="mt-2 flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight">
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
            onClick={(e) => {
              handleAdd(e);
              setOpen(true);
            }}
            disabled={isLoading || !variant}
            className="rounded-full sm:hidden"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
