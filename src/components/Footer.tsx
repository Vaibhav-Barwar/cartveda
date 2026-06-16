import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page py-16 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <span className="font-display text-2xl font-bold tracking-tight">CARTVEDA</span>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Premium fitness essentials engineered for the everyday athlete. Train better. Perform every day.
          </p>
          <div className="flex gap-2 pt-2">
            <a href="#" className="h-10 w-10 grid place-items-center rounded-full bg-background border border-border hover:border-foreground transition" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="h-10 w-10 grid place-items-center rounded-full bg-background border border-border hover:border-foreground transition" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterCol title="Shop" links={[
          { label: "All Products", to: "/products" },
          { label: "Resistance Bands", to: "/search", search: { q: "resistance" } },
          { label: "Yoga Mats", to: "/search", search: { q: "yoga" } },
          { label: "Gym Bags", to: "/search", search: { q: "gym bag" } },
        ]} />

        <FooterCol title="Company" links={[
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
          { label: "FAQ", href: "#faq" },
          { label: "Privacy Policy", href: "#" },
        ]} />

        <FooterCol title="Account" links={[
          { label: "Sign In", to: "/account" },
          { label: "Wishlist", to: "/wishlist" },
          { label: "Cart", href: "#" },
        ]} />
      </div>

      <div className="border-t border-border">
        <div className="container-page py-5 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Cartveda. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

type LinkItem = { label: string } & ({ to: string; search?: any } | { href: string });

function FooterCol({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-4 text-foreground">{title}</h4>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((l) =>
          "to" in l ? (
            <li key={l.label}>
              <Link to={l.to as any} search={l.search} className="hover:text-foreground transition">{l.label}</Link>
            </li>
          ) : (
            <li key={l.label}>
              <a href={l.href} className="hover:text-foreground transition">{l.label}</a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
