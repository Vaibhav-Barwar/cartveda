import { Link } from "@tanstack/react-router";
import { Dumbbell, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="container-page py-14 grid gap-10 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <Dumbbell className="h-4 w-4" />
            </div>
            <span className="font-display text-xl font-bold">Cartveda</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Everything fitness. One cart. Premium fitness essentials for your everyday journey.
          </p>
          <div className="flex gap-2">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-primary/60 hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/search" search={{ q: "bundle" }} className="hover:text-foreground">Fitness Bundles</Link></li>
            <li><Link to="/search" search={{ q: "resistance" }} className="hover:text-foreground">Resistance Bands</Link></li>
            <li><Link to="/search" search={{ q: "yoga" }} className="hover:text-foreground">Yoga Mats</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Help</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            <li><a href="#" className="hover:text-foreground">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
            <li><Link to="/account" className="hover:text-foreground">My Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Get fitness drops in your inbox</h4>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="you@cartveda.in"
              className="flex-1 h-10 px-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:border-primary/60"
            />
            <button className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              Join
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">No spam. Just drops, deals & training tips.</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Cartveda. Made in India.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
