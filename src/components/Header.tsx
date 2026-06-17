import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

export function Header() {
  const totalItems = useCartStore((s) => s.items.reduce((a, b) => a + b.quantity, 0));
  const setOpen = useCartStore((s) => s.setOpen);
  const wishCount = useWishlistStore((s) => s.ids.length);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobile(false), [path]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/search", search: { q: query.trim() } });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all bg-background",
        scrolled ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="container-page flex items-center gap-6 md:gap-10 h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight">CARTVEDA</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2 text-sm">
          <Link to="/products" className="px-3 py-2 rounded-md hover:bg-surface font-medium">
            Shop All
          </Link>
          <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-surface font-medium">
            Contact Us
          </Link>
        </nav>

        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-sm ml-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full h-10 pl-10 pr-3 rounded-full bg-surface border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30"
            />
          </div>
        </form>

        <div className="flex items-center gap-1 ml-auto md:ml-2">
          <Link to="/account" className="hidden sm:inline-flex">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/wishlist" className="relative hidden sm:inline-flex">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            {wishCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-foreground text-background text-[10px] font-semibold grid place-items-center">
                {wishCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-foreground text-background text-[10px] font-semibold grid place-items-center">
                {totalItems}
              </span>
            )}
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-label="Menu"
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden border-t border-border">
        <form onSubmit={submitSearch} className="container-page py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full h-10 pl-10 pr-3 rounded-full bg-surface border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30"
            />
          </div>
        </form>
      </div>

      {mobile && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-page py-3 grid gap-1 text-sm">
            <Link to="/products" className="px-3 py-2.5 rounded-md hover:bg-surface font-medium">Shop All</Link>
            <Link to="/contact" className="px-3 py-2.5 rounded-md hover:bg-surface font-medium">Contact Us</Link>
            <Link to="/account" className="px-3 py-2.5 rounded-md hover:bg-surface">Account</Link>
            <Link to="/wishlist" className="px-3 py-2.5 rounded-md hover:bg-surface">Wishlist</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
