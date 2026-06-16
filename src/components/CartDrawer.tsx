import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const currency = items[0]?.currency || "INR";

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Cart
            {totalItems > 0 && <Badge variant="secondary">{totalItems}</Badge>}
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">No items yet.</p>
                <Link to="/products" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="rounded-full">Start shopping</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 p-3 rounded-xl border border-border bg-surface">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-background shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      {item.color && <p className="text-xs text-muted-foreground">{item.color}</p>}
                      <p className="text-sm font-semibold mt-1">{formatPrice(item.price, item.currency)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1 border border-border bg-background rounded-full">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="h-6 w-6 grid place-items-center"><Minus className="h-3 w-3" /></button>
                        <span className="text-xs w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="h-6 w-6 grid place-items-center"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 space-y-4 pt-4 border-t border-border mt-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">{formatPrice(subtotal, currency)}</span>
                </div>
                <Link to="/checkout" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full rounded-full">Checkout</Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground">Shipping & taxes calculated at checkout</p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
