import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useOrderStore } from "@/store/orderStore";
import { formatPrice } from "@/utils/format";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({ meta: [{ title: "Account — Cartveda" }] }),
});

function AccountPage() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const orders = useOrderStore((s) => s.orders);

  if (isAuthenticated && user) {
    return (
      <div className="container-page py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            </div>
            <Button variant="outline" onClick={logout} className="rounded-full">
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-background p-6">
            <h2 className="text-lg font-semibold mb-4">Recent orders</h2>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">You don't have any orders yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {orders.map((o) => (
                  <li key={o.id} className="py-3 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">Order #{o.id.slice(0, 8)}</p>
                      <p className="text-muted-foreground text-xs">{new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(o.total, o.currency)}</p>
                      <p className="text-xs text-muted-foreground capitalize">{o.orderStatus}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <AuthForm />;
}

function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((s) => s.login);
  const signup = useAuthStore((s) => s.signup);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") await login(email, password);
      else await signup(name, email, password);
      navigate({ to: "/account" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-md mx-auto rounded-xl border border-border bg-background p-8">
        <h1 className="text-3xl font-bold tracking-tight">{mode === "login" ? "Welcome back" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to track orders and wishlists." : "Join Cartveda to start your fitness journey."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <Field icon={User} label="Full name" type="text" placeholder="Your name" value={name} onChange={setName} required />
          )}
          <Field icon={Mail} label="Email" type="email" placeholder="you@cartveda.in" value={email} onChange={setEmail} required />
          <Field icon={Lock} label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} required />
          <Button type="submit" size="lg" className="w-full mt-2 rounded-full" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground text-center">
          {mode === "login" ? "New to Cartveda?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="underline font-medium text-foreground">
            {mode === "login" ? "Create one" : "Sign in"}
          </button>
        </p>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          <Link to="/" className="underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon, label, value, onChange, ...props
}: {
  icon: any; label: string; value: string; onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative mt-1.5">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          {...props}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 pl-10 pr-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:border-foreground/40"
        />
      </div>
    </label>
  );
}
