import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({ meta: [{ title: "Account — Cartveda" }] }),
});

function AccountPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-md mx-auto rounded-2xl border border-border bg-surface p-8">
        <h1 className="text-3xl font-bold tracking-tight">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to track orders and wishlists." : "Join Cartveda to start your fitness journey."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === "signup" && (
            <Field icon={User} label="Full name" type="text" placeholder="Your name" />
          )}
          <Field icon={Mail} label="Email" type="email" placeholder="you@cartveda.in" />
          <Field icon={Lock} label="Password" type="password" placeholder="••••••••" />
          <Button type="submit" size="lg" className="w-full mt-2">
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground text-center">
          {mode === "login" ? "New to Cartveda?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline">
            {mode === "login" ? "Create one" : "Sign in"}
          </button>
        </p>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          Final checkout happens securely on Shopify. <Link to="/" className="text-primary hover:underline">Back home</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, ...props }: any) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative mt-1.5">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          {...props}
          className="w-full h-11 pl-10 pr-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:border-primary/60"
        />
      </div>
    </label>
  );
}
