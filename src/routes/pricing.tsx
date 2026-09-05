import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Globe2,
  HelpCircle,
  Layers,
  Lock,
  Mail,
  Percent,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

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

  // Pro & Enterprise Modal states
  const [proModalOpen, setProModalOpen] = useState(false);
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false);

  // Pro waitlist form state
  const [proEmail, setProEmail] = useState("");
  const [proUseCase, setProUseCase] = useState("Software & SaaS Code");
  const [proSubmitting, setProSubmitting] = useState(false);

  // Enterprise inquiry form state
  const [entCompanyName, setEntCompanyName] = useState("");
  const [entEmail, setEntEmail] = useState("");
  const [entVolume, setEntVolume] = useState("$100,000 - $1,000,000 / month");
  const [entMessage, setEntMessage] = useState("");
  const [entSubmitting, setEntSubmitting] = useState(false);

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

  const handleProSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    setProSubmitting(true);
    setTimeout(() => {
      setProSubmitting(false);
      setProModalOpen(false);
      setProEmail("");
      toast.success("🎉 You're on the Pro Studio VIP waitlist! 30-day free pass reserved.");
    }, 600);
  };

  const handleEnterpriseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entEmail.trim() || !entCompanyName.trim()) {
      toast.error("Please provide your company name and work email");
      return;
    }
    setEntSubmitting(true);
    setTimeout(() => {
      setEntSubmitting(false);
      setEnterpriseModalOpen(false);
      setEntCompanyName("");
      setEntEmail("");
      setEntMessage("");
      toast.success("✅ Enterprise request received! Our Senior Account Director will reach out within 2 hours.");
    }, 700);
  };

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
                <span>EVM Crypto & Multi-Currency Settlement</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-emerald-400 shrink-0" />
                <span>72-hour Private Cloud retention</span>
              </li>
            </ul>
          </div>

          <Button asChild variant="outline" className="w-full text-xs font-bold border-border/80 h-10">
            <Link to="/send">Start Free Escrow</Link>
          </Button>
        </div>

        {/* Pro Creator Plan (Featured - Coming Soon / VIP Waitlist) */}
        <div className="surface-panel p-6 sm:p-8 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col justify-between space-y-6 relative shadow-xl shadow-primary/10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
            Coming Soon · Early VIP Access
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
                <span>30-day extended Private Cloud vault storage</span>
              </li>
            </ul>
          </div>

          <Button
            type="button"
            onClick={() => setProModalOpen(true)}
            className="w-full text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md h-10"
          >
            <Sparkles className="size-3.5 mr-1.5" />
            Join Pro VIP Waitlist (Get 30 Days Free)
          </Button>
        </div>

        {/* Enterprise Organization (Bespoke SLA Consultation) */}
        <div className="surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Enterprise & Legal
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

          <Button
            type="button"
            variant="outline"
            onClick={() => setEnterpriseModalOpen(true)}
            className="w-full text-xs font-bold border-border/80 h-10 hover:bg-card"
          >
            <Building2 className="size-3.5 mr-1.5 text-primary" />
            Request Enterprise Concierge
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

      {/* Pro Studio Suite Waitlist Modal */}
      <Dialog open={proModalOpen} onOpenChange={setProModalOpen}>
        <DialogContent className="max-w-md bg-card border-border shadow-2xl p-6">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider w-fit mb-1">
              <Sparkles className="size-3" /> Coming Soon in Q4
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Join Pro Studio Early Access
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              We are finalizing automated multi-seat agency permissions, 25 GB payload pipelines, and custom webhook feeds. Sign up for early access to receive **30 Days Free Pro Access** on launch day.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleProSubmit} className="space-y-4 my-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Work Email Address *
              </label>
              <Input
                type="email"
                required
                value={proEmail}
                onChange={(e) => setProEmail(e.target.value)}
                placeholder="developer@studio.com"
                className="text-xs bg-muted/40 h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Primary Use Case
              </label>
              <select
                value={proUseCase}
                onChange={(e) => setProUseCase(e.target.value)}
                className="h-10 w-full rounded-xl border border-input bg-muted/40 px-3 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
              >
                <option value="Software & SaaS Code">Software & SaaS Code Repositories</option>
                <option value="3D VFX & 4K Media">3D VFX & 4K Studio Media</option>
                <option value="Legal & M&A Data Rooms">Legal & M&A Confidential Data Rooms</option>
                <option value="Domain & Digital IP">Domain Name & Digital IP Transfers</option>
                <option value="AI Datasets & Models">AI Model Weights & Training Datasets</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" /> Included in Pro Studio Suite:
              </p>
              <p className="text-[11px] leading-relaxed">
                • 25 GB per payload storage · All 8 Industry Blueprints · Covalent Oracle Smart Release · Verified Cryptographic SHA-256 Certificates
              </p>
            </div>

            <DialogFooter className="pt-2 gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setProModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={proSubmitting}
                className="text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm flex-1"
              >
                {proSubmitting ? "Reserving VIP Pass..." : "Reserve My 30-Day Free Pass"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Enterprise Concierge Modal */}
      <Dialog open={enterpriseModalOpen} onOpenChange={setEnterpriseModalOpen}>
        <DialogContent className="max-w-lg bg-card border-border shadow-2xl p-6">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-wider w-fit mb-1">
              <Building2 className="size-3" /> Bespoke SLA & Custom Settlement
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Enterprise Consultation & Custody
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Bespoke digital asset escrow for international enterprises, M&A law practices, and corporate data rooms requiring custom multi-sig arbitrator governance and SOC2 compliance dossiers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEnterpriseSubmit} className="space-y-4 my-2">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Organization / Entity *
                </label>
                <Input
                  required
                  value={entCompanyName}
                  onChange={(e) => setEntCompanyName(e.target.value)}
                  placeholder="Acme Global Inc."
                  className="text-xs bg-muted/40 h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Corporate Email *
                </label>
                <Input
                  type="email"
                  required
                  value={entEmail}
                  onChange={(e) => setEntEmail(e.target.value)}
                  placeholder="legal@acme.com"
                  className="text-xs bg-muted/40 h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Estimated Monthly Escrow Volume
              </label>
              <select
                value={entVolume}
                onChange={(e) => setEntVolume(e.target.value)}
                className="h-10 w-full rounded-xl border border-input bg-muted/40 px-3 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
              >
                <option value="$25,000 - $100,000 / month">$25,000 - $100,000 / month</option>
                <option value="$100,000 - $1,000,000 / month">$100,000 - $1,000,000 / month</option>
                <option value="$1,000,000+ / month">$1,000,000+ / month (High-Volume Multi-Sig)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Custody & SLA Requirements (Optional)
              </label>
              <Textarea
                value={entMessage}
                onChange={(e) => setEntMessage(e.target.value)}
                placeholder="Mention specific requirements: 2-of-3 multi-sig arbitrator, custom legal clauses, terabyte-scale uploads, SOC2 audit dossier..."
                className="text-xs bg-muted/40 min-h-[75px]"
              />
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border/70 space-y-1 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-400" /> Enterprise SLA Guarantees:
              </p>
              <p className="text-[11px] leading-relaxed">
                Dedicated Senior Key Account Director · 15-Minute Critical Response SLA · Custom Arbitrator Multi-Sig · Tailored Jurisdiction Contracts
              </p>
            </div>

            <DialogFooter className="pt-2 gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setEnterpriseModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={entSubmitting}
                className="text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm flex-1"
              >
                {entSubmitting ? "Transmitting Request..." : "Request Enterprise Consultation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
