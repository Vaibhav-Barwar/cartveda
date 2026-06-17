import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — Cartveda" },
      { name: "description", content: "Get in touch with the Cartveda team. We reply within 24 hours." },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">Contact</span>
        <h1 className="text-display text-4xl md:text-5xl mt-3">Get in touch.</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Questions about products, orders or partnerships? Drop us a line — we reply within 24 hours.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-3 gap-10">
        <div className="space-y-6">
          <Info icon={Mail} label="Email" value="hello@cartveda.in" />
          <Info icon={Phone} label="Phone" value="+91 80000 00000" />
          <Info icon={MapPin} label="Address" value="Bengaluru, India" />
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="lg:col-span-2 grid sm:grid-cols-2 gap-4 p-8 rounded-2xl bg-surface"
        >
          <Field label="Name" placeholder="Your name" />
          <Field label="Email" type="email" placeholder="you@email.com" />
          <Field label="Subject" placeholder="How can we help?" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows={6}
              placeholder="Tell us more..."
              className="rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
            />
          </div>
          <Button type="submit" size="lg" className="rounded-full sm:col-span-2 justify-self-start px-8">
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-11 w-11 rounded-full bg-surface grid place-items-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label, type = "text", placeholder, className = "",
}: { label: string; type?: string; placeholder?: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-xl bg-background border border-border px-4 text-sm focus:outline-none focus:border-foreground"
      />
    </div>
  );
}
