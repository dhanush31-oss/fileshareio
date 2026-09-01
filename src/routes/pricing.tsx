import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  Coins,
  Globe2,
  HelpCircle,
  Layers,
  Percent,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Global Multi-Currency Pricing & Escrow Rates | Vaultdrop" },
      {
        name: "description",
        content:
          "Transparent pricing for international digital asset transfers. Multi-currency settlement in USD, EUR, GBP, JPY, USDT, and ETH.",
      },
      { property: "og:title", content: "Global Multi-Currency Pricing & Escrow Rates | Vaultdrop" },
      {
        property: "og:description",
        content:
          "Transparent pricing for international digital asset transfers. Multi-currency settlement in USD, EUR, GBP, JPY, USDT, and ETH.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

type CurrencyKey = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD" | "AED" | "INR" | "USDT";

const CURRENCIES: Record<CurrencyKey, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  JPY: { symbol: "¥", rate: 154.0, label: "JPY (¥)" },
  CAD: { symbol: "CA$", rate: 1.36, label: "CAD ($)" },
  AUD: { symbol: "AU$", rate: 1.52, label: "AUD ($)" },
  AED: { symbol: "AED ", rate: 3.67, label: "AED (د.إ)" },
  INR: { symbol: "₹", rate: 86.5, label: "INR (₹)" },
  USDT: { symbol: "₮", rate: 1.0, label: "USDT (₮)" },
};

function PricingPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyKey>("USD");
  const [dealVolume, setDealVolume] = useState<number>(10000);

  const curr = CURRENCIES[selectedCurrency];

  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * curr.rate;
    if (curr.symbol === "¥" || curr.symbol === "₹") {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Fee calculation (0.8% escrow fee for slider)
  const estimatedEscrowFee = dealVolume * 0.008 * curr.rate;
  const traditionalWireFee = dealVolume * 0.035 * curr.rate;
  const totalSaved = traditionalWireFee - estimatedEscrowFee;

  return (
    <AppShell>
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
          <Percent className="size-3.5" /> International Settlement Rates
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Transparent, Borderless Escrow Pricing
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Zero hidden wire charges, zero chargeback risks. Settle international high-value transfers
          in fiat or crypto with instant cryptographic release.
        </p>

        {/* Currency Switcher Pill Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5">
          {(Object.keys(CURRENCIES) as CurrencyKey[]).map((cKey) => (
            <button
              key={cKey}
              onClick={() => setSelectedCurrency(cKey)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCurrency === cKey
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {CURRENCIES[cKey].label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        {/* Starter Plan */}
        <div className="surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Starter
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1">Free Tier</h3>
              <p className="text-xs text-muted-foreground mt-1">
                For casual file sharing and test escrows.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground font-mono">
                {formatPrice(0)}
              </span>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-muted-foreground border-t border-border/60 pt-4">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>Up to 500 MB per escrow payload</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>Standard 6-digit room codes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>EVM Crypto & Stripe Settlement</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>72-hour Supabase retention</span>
              </li>
            </ul>
          </div>

          <Button asChild variant="outline" className="w-full text-xs font-bold border-border/80">
            <Link to="/send">Start Free Escrow</Link>
          </Button>
        </div>

        {/* Pro Creator Plan (Featured) */}
        <div className="surface-panel p-6 sm:p-8 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col justify-between space-y-6 relative shadow-xl shadow-primary/10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
            Most Popular Worldwide
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Pro Creator & Agency
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1">Studio Suite</h3>
              <p className="text-xs text-muted-foreground mt-1">
                For software developers, 3D studios, and consultants.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground font-mono">
                {formatPrice(29)}
              </span>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-foreground/90 border-t border-border/60 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span className="font-semibold">Up to 25 GB per escrow payload</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>All 8 Turnkey Industry Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>Instant Covalent On-Chain Oracle Release</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>SHA-256 Checksum Proof Badges</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>30-day extended Supabase vault storage</span>
              </li>
            </ul>
          </div>

          <Button
            asChild
            className="w-full text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          >
            <Link to="/send">
              Upgrade to Pro Suite <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Enterprise Organization */}
        <div className="surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Enterprise
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1">Custom Settlement</h3>
              <p className="text-xs text-muted-foreground mt-1">
                For law firms, corporations, and M&A data rooms.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground font-mono">
                {formatPrice(199)}
              </span>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-muted-foreground border-t border-border/60 pt-4">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>Unlimited payload sizes & TB-scale datasets</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>Dedicated Developer Audit Logs & API access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>Custom multi-sig & 2-of-3 human arbitrator signoff</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>Custom legal contract generation & SLA</span>
              </li>
            </ul>
          </div>

          <Button asChild variant="outline" className="w-full text-xs font-bold border-border/80">
            <Link to="/support">Contact Enterprise Desk</Link>
          </Button>
        </div>
      </div>

      {/* Interactive Volume Savings Calculator */}
      <div className="mt-16 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="size-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Cross-Border Escrow Savings Calculator
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Platform Fee: 0.80%</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-semibold">Deal Settlement Volume:</span>
            <span className="font-mono font-bold text-foreground text-sm">
              {formatPrice(dealVolume)}
            </span>
          </div>
          <Slider
            min={1000}
            max={250000}
            step={1000}
            value={[dealVolume]}
            onValueChange={(val) => setDealVolume(val[0] || 1000)}
            className="py-2"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
            <span className="text-muted-foreground font-semibold">Vaultdrop Escrow Fee (0.8%)</span>
            <p className="text-xl font-bold font-mono text-primary">
              {curr.symbol}
              {Math.round(estimatedEscrowFee).toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">Instant cryptographic release</p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
            <span className="text-muted-foreground font-semibold">
              Traditional Bank Wire / Escrow (3.5%)
            </span>
            <p className="text-xl font-bold font-mono text-muted-foreground">
              {curr.symbol}
              {Math.round(traditionalWireFee).toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">3-5 business days delay</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-semibold">Your Estimated Savings</span>
            <p className="text-xl font-bold font-mono text-emerald-400">
              +{curr.symbol}
              {Math.round(totalSaved).toLocaleString()}
            </p>
            <p className="text-[10px] text-emerald-400">100% Zero Chargeback Risk</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
