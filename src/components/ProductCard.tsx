import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
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
      className="group relative flex flex-col rounded-2xl bg-surface border border-border overflow-hidden transition-all hover:border-primary/40 hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWish(node.id);
          }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur grid place-items-center border border-border hover:border-primary/50"
          aria-label="Wishlist"
        >
          <Heart className={cn("h-4 w-4", wished ? "fill-primary text-primary" : "text-foreground")} />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {node.productType && (
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{node.productType}</span>
        )}
        <h3 className="font-medium text-foreground line-clamp-2 leading-snug">{node.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold tracking-tight">
            {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              handleAdd(e);
              setOpen(true);
            }}
            disabled={isLoading || !variant}
            className="rounded-full"
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}
