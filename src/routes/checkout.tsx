import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";
import { formatPrice } from "@/utils/format";
import type { Order, Address } from "@/types";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — Cartveda" }] }),
});

function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const [form, setForm] = useState<Address>({
    id: "",
    fullName: user?.name || "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
  });
  const [placed, setPlaced] = useState<Order | null>(null);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;
  const currency = items[0]?.currency || "INR";

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    const order: Order = {
      id: (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : `o_${Date.now()}`,
      items: [...items],
      subtotal,
      shipping,
      total,
      currency,
      paymentStatus: "paid",
      orderStatus: "confirmed",
      shippingAddress: { ...form, id: `addr_${Date.now()}` },
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setPlaced(order);
  };

  if (placed) {
    return (
      <div className="container-page py-16 md:py-24">
        <div className="max-w-lg mx-auto text-center rounded-2xl border border-border bg-background p-10">
          <CheckCircle2 className="h-12 w-12 mx-auto text-foreground mb-4" />
          <h1 className="text-3xl font-bold tracking-tight">Order confirmed</h1>
          <p className="mt-2 text-muted-foreground">Thanks {placed.shippingAddress.fullName.split(" ")[0]} — your order #{placed.id.slice(0, 8)} is on its way.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            <Link to="/account"><Button className="rounded-full">View orders</Button></Link>
            <Link to="/products"><Button variant="outline" className="rounded-full">Keep shopping</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container-page py-20 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link to="/products" className="underline mt-4 inline-block" onClick={() => navigate({ to: "/products" })}>Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <form onSubmit={placeOrder} className="lg:col-span-2 space-y-6">
          <Section title="Shipping address">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Full name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
              <Input label="Phone" value={form.phone || ""} onChange={(v) => setForm({ ...form, phone: v })} required />
              <Input label="Address line 1" value={form.line1} onChange={(v) => setForm({ ...form, line1: v })} required className="sm:col-span-2" />
              <Input label="Address line 2" value={form.line2 || ""} onChange={(v) => setForm({ ...form, line2: v })} className="sm:col-span-2" />
              <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Input label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
              <Input label="Postal code" value={form.postalCode} onChange={(v) => setForm({ ...form, postalCode: v })} required />
              <Input label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} required />
            </div>
          </Section>

          <Section title="Payment">
            <p className="text-sm text-muted-foreground">
              This is a demo checkout — no real payment is processed. Connect your preferred gateway (Stripe, Razorpay, etc.) in <code className="text-foreground">src/routes/checkout.tsx</code>.
            </p>
          </Section>

          <Button type="submit" size="lg" className="w-full rounded-full">
            Place order · {formatPrice(total, currency)}
          </Button>
        </form>

        <aside className="rounded-xl border border-border bg-surface p-6 h-fit space-y-4">
          <h2 className="font-semibold">Order summary</h2>
          <ul className="divide-y divide-border">
            {items.map((i) => (
              <li key={i.productId} className="py-3 flex gap-3">
                <div className="w-14 h-14 rounded-md overflow-hidden bg-background shrink-0">
                  <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{i.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {i.quantity}</p>
                </div>
                <span className="text-sm font-medium">{formatPrice(i.price * i.quantity, i.currency)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm pt-4 border-t border-border">
            <Row label="Subtotal" value={formatPrice(subtotal, currency)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping, currency)} />
            <Row label="Total" value={formatPrice(total, currency)} bold />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Input({
  label, value, onChange, className, ...props
}: { label: string; value: string; onChange: (v: string) => void; className?: string }
  & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "className">) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-11 px-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:border-foreground/40"
      />
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "text-base font-semibold pt-2" : "text-muted-foreground"}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
