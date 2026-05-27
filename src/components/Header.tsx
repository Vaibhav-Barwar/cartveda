import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, Heart, User, ShoppingBag, Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Resistance Bands", q: "resistance" },
  { label: "Yoga Mats", q: "yoga" },
  { label: "Skipping Ropes", q: "skipping" },
  { label: "Gym Gloves", q: "gloves" },
  { label: "Ab Rollers", q: "ab roller" },
  { label: "Shaker Bottles", q: "shaker" },
  { label: "Bundles", q: "bundle" },
];

export function Header() {
  const totalItems = useCartStore((s) => s.items.reduce((a, b) => a + b.quantity, 0));
  const setOpen = useCartStore((s) => s.setOpen);
  const wishCount = useWishlist((s) => s.ids.length);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        "sticky top-0 z-50 transition-all border-b",
        scrolled ? "bg-background/85 backdrop-blur border-border" : "bg-background border-transparent"
      )}
    >
      <div className="container-page flex items-center gap-3 md:gap-6 h-16">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative h-9 w-9 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-[0_0_20px_-4px_color-mix(in_oklab,var(--color-primary)_70%,transparent)] transition-transform group-hover:scale-105">
            <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight">
            Cart<span className="text-primary">veda</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <Link to="/products" className="px-3 py-2 rounded-md hover:bg-surface text-muted-foreground hover:text-foreground">
            Shop All
          </Link>
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.label}
              to="/search"
              search={{ q: c.q }}
              className="px-3 py-2 rounded-md hover:bg-surface text-muted-foreground hover:text-foreground"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-md ml-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bands, mats, shakers…"
              className="w-full h-10 pl-10 pr-3 rounded-full bg-surface border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
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
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">
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
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">
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
              placeholder="Search fitness essentials…"
              className="w-full h-10 pl-10 pr-3 rounded-full bg-surface border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
            />
          </div>
        </form>
      </div>

      {mobile && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-page py-3 grid gap-1 text-sm">
            <Link to="/products" className="px-3 py-2.5 rounded-md hover:bg-surface">Shop All</Link>
            {categories.map((c) => (
              <Link key={c.label} to="/search" search={{ q: c.q }} className="px-3 py-2.5 rounded-md hover:bg-surface text-muted-foreground">
                {c.label}
              </Link>
            ))}
            <Link to="/account" className="px-3 py-2.5 rounded-md hover:bg-surface">Account</Link>
            <Link to="/wishlist" className="px-3 py-2.5 rounded-md hover:bg-surface">Wishlist</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
