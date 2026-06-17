import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, discountPct, effectivePrice } from "@/utils/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const wished = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWish = useWishlistStore((s) => s.toggle);

  const sale = product.salePrice && product.salePrice < product.price;
  const pct = discountPct(product.price, product.salePrice);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success("Added to cart", { description: product.name, position: "top-center" });
    setOpen(true);
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.slug }}
      className="group flex flex-col rounded-[18px] bg-card overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {sale && (
          <span className="absolute top-3 left-3 rounded-full bg-foreground text-background text-[11px] font-semibold px-2.5 py-1">
            −{pct}%
          </span>
        )}

        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(product.id); }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur grid place-items-center border border-border hover:border-foreground transition"
          aria-label="Add to wishlist"
        >
          <Heart className={cn("h-4 w-4", wished ? "fill-foreground text-foreground" : "text-foreground")} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            size="sm"
            onClick={handleAdd}
            className="w-full rounded-full font-medium"
          >
            <ShoppingBag className="h-4 w-4" /> Quick Add
          </Button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-semibold text-foreground line-clamp-1 leading-snug">{product.name}</h3>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-3.5 w-3.5", i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-border")}
              />
            ))}
          </div>
          <span className="text-[11px]">({product.reviewCount})</span>
        </div>

        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold tracking-tight">
            {formatPrice(effectivePrice(product), product.currency)}
          </span>
          {sale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price, product.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
