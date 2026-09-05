import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ESCROW_TEMPLATES } from "@/routes/templates";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Box,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  CloudUpload,
  Code2,
  Coins,
  Compass,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileCode2,
  Film,
  Fingerprint,
  FolderLock,
  Globe,
  Globe2,
  KeyRound,
  Layers,
  Lock,
  MessageSquare,
  Music,
  Percent,
  Play,
  RotateCcw,
  Scale,
  Send,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  Upload,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaultdrop — International Digital Asset Escrow & Secure File Exchange" },
      {
        name: "description",
        content:
          "The international digital asset settlement and confidential file delivery cloud. Powered by Encrypted Private Cloud Storage, multi-chain on-chain settlements, and 6-digit room unlocking.",
      },
      {
        property: "og:title",
        content: "Vaultdrop — International Digital Asset Escrow & Secure File Exchange",
      },
      {
        property: "og:description",
        content:
          "The international digital asset settlement and confidential file delivery cloud. Powered by Encrypted Private Cloud Storage, multi-chain on-chain settlements, and 6-digit room unlocking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const GLOBAL_STATS = [
  {
    label: "Total Settled Volume",
    value: "$18.4M+",
    change: "+14.2% MoM",
    icon: Activity,
    color: "text-emerald-400",
  },
  {
    label: "Active Escrows Completed",
    value: "9,840+",
    change: "100% Delivery Rate",
    icon: CheckCircle2,
    color: "text-primary",
  },
  {
    label: "Median Settlement Speed",
    value: "18.4s",
    change: "Automated Oracle",
    icon: Clock,
    color: "text-amber-400",
  },
  {
    label: "Supported Jurisdictions",
    value: "140+ Countries",
    change: "Multi-Currency",
    icon: Globe2,
    color: "text-indigo-400",
  },
];

const USE_CASES = [
  {
    templateId: "saas-codebase-handover",
    title: "SaaS Codebase & Repository Handover",
    category: "Software & Dev",
    icon: Code2,
    badge: "Agile Release",
    description:
      "Safely transfer private GitHub repos, environment secrets, and intellectual property upon invoice clearance.",
  },
  {
    templateId: "3d-vfx-master-delivery",
    title: "3D VFX & 4K Studio Master Delivery",
    category: "Creative Media",
    icon: Film,
    badge: "High Bitrate",
    description:
      "Lock raw Blender / Unreal Engine 5 archives and ProRes master sequences behind verified client milestone payments.",
  },
  {
    templateId: "cross-border-nda-dataroom",
    title: "Cross-Border Commercial M&A Data Room",
    category: "Legal & Corporate",
    icon: Scale,
    badge: "Confidential",
    description:
      "Share sensitive audit statements, cap tables, and legal agreements with full developer access audit logging.",
  },
  {
    templateId: "domain-digital-ip-transfer",
    title: "Domain Name & Digital IP Transfers",
    category: "Digital Assets",
    icon: Globe,
    badge: "Zero-Fraud",
    description:
      "Lock domain auth codes and registrar transfer paperwork until wire or crypto escrow is permanently confirmed.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Vaultdrop transformed our offshore software deliverables. We deliver client repos with 100% confidence that code is unlocked only after milestone funds clear.",
    author: "Alexander Wright",
    role: "VP Engineering, Synapse Labs",
    location: "London, UK",
    avatar: "AW",
  },
  {
    quote:
      "As a VFX supervisor delivering 20GB 4K render passes to Hollywood agencies, Vaultdrop’s private cloud storage speed and instant release terminal are unmatched.",
    author: "Elena Rostova",
    role: "Lead Technical Director, Apex FX",
    location: "Zurich, Switzerland",
    avatar: "ER",
  },
  {
    quote:
      "The on-chain transaction hash verification saved our cross-border consulting agency dozens of hours previously wasted on fraudulent wire screenshots.",
    author: "Kenji Takahashi",
    role: "Managing Partner, Pacific Tech Capital",
    location: "Tokyo / Singapore",
    avatar: "KT",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  // Interactive 30-Second Escrow Sandbox Simulator State
  const [sandboxStep, setSandboxStep] = useState<1 | 2 | 3 | 4>(1);
  const [sandboxSimulating, setSandboxSimulating] = useState(false);

  const handleOpenRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = roomCode.replace(/\D/g, "").slice(0, 6);
    if (clean.length === 6) {
      navigate({ to: "/room/$code", params: { code: clean } });
    }
  };

  const advanceSandbox = () => {
    setSandboxSimulating(true);
    setTimeout(() => {
      setSandboxSimulating(false);
      setSandboxStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : 1));
    }, 500);
  };

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
        {/* Network Live Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary/20 via-blue-500/10 to-primary/20 border border-primary/40 text-primary text-xs font-extrabold uppercase tracking-wider shadow-sm animate-in fade-in">
          <Sparkles className="size-3.5 animate-pulse" />
          <span>International Digital Asset Settlement & Escrow</span>
          <span className="hidden sm:inline text-muted-foreground font-normal">|</span>
          <span className="hidden sm:inline font-mono text-[11px] text-foreground">
            v2.4 Enterprise
          </span>
        </div>

        {/* Master Heading */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
          Confidential Digital Asset Escrow <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-primary to-indigo-400 bg-clip-text text-transparent">
            for Global Enterprises & Creators.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
          Upload source code repositories, 3D master renders, confidential data rooms, or digital
          IP. Assets are locked in private Encrypted Cloud Storage and released instantly upon verified
          on-chain or wire settlement.
        </p>

        {/* Central Dual Action Box */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="surface-panel p-6 sm:p-8 rounded-3xl border border-border/80 shadow-2xl space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Send Box */}
              <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col justify-between space-y-4 hover:border-primary/60 transition-colors group">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30 group-hover:scale-105 transition-transform">
                    <CloudUpload className="size-5" />
                  </span>
                  <h3 className="mt-3.5 font-bold text-base text-foreground">
                    Send Files & Lock Escrow
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload multiple files to private cloud storage and generate an instant 6-digit room code with
                    smart release rules.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                >
                  <Link to="/send">
                    Create Escrow Room <ArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
              </div>

              {/* Receive Box */}
              <div className="p-5 rounded-2xl border border-border/90 bg-card flex flex-col justify-between space-y-4 hover:border-border transition-colors">
                <div>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground border border-border">
                    <Download className="size-5 text-primary" />
                  </span>
                  <h3 className="mt-3.5 font-bold text-base text-foreground">Unlock & Download</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the 6-digit transfer code you received to inspect terms and unlock your
                    assets.
                  </p>
                </div>
                <form onSubmit={handleOpenRoom} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={roomCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setRoomCode(val);
                        if (val.length === 6) {
                          navigate({ to: "/room/$code", params: { code: val } });
                        }
                      }}
                      placeholder="6-digit code"
                      className="text-center font-mono tracking-widest text-sm bg-muted/40 h-10 font-bold"
                    />
                    <Button
                      type="submit"
                      disabled={roomCode.length !== 6}
                      className="h-10 px-5 font-bold bg-secondary text-secondary-foreground hover:bg-muted"
                    >
                      Open
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Template Shortlink Pill Bar */}
            <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Layers className="size-3.5 text-primary" /> Quick Start Templates:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/send"
                  search={{
                    template: "saas-codebase-handover",
                    title: "Full-Stack SaaS Codebase & Repository Handover",
                    price: "4500",
                    currency: "USD",
                    chain: "eth-mainnet",
                    token: "USDT",
                    instructions: "1. Verify the repository hash matches our agreed commit milestone.\n2. Submit payment in USDT (ERC-20) or USDC.\n3. Seller will inspect proof and unlock full source archive + cloud credentials within 1 hour.",
                    description: "Complete transfer of GitHub/GitLab repositories, environment configurations, and deployment keys.",
                  }}
                  className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                >
                  SaaS Codebase
                </Link>
                <span>·</span>
                <Link
                  to="/send"
                  search={{
                    template: "3d-vfx-master-delivery",
                    title: "High-Resolution 3D, CGI & VFX Studio Master Delivery",
                    price: "2800",
                    currency: "USD",
                    chain: "polygon-mainnet",
                    token: "USDC",
                    instructions: "Inspect the low-res watermarked preview on our client portal. Release payment to unlock the uncompressed 18GB 4K render package from private cloud storage.",
                    description: "Multi-gigabyte 3D project packages (Blender, Maya, Unreal Engine 5, C4D) and 4K/8K master renders.",
                  }}
                  className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                >
                  3D VFX Media
                </Link>
                <span>·</span>
                <Link
                  to="/send"
                  search={{
                    template: "cross-border-nda-dataroom",
                    title: "Cross-Border Commercial M&A Data Room & Confidential NDA",
                    price: "15000",
                    currency: "USD",
                    chain: "eth-mainnet",
                    token: "ETH",
                    instructions: "Enter the room code provided by legal counsel. Provide wire transfer confirmation or deposit escrow to access the confidential data room files.",
                    description: "Confidential financial audits, cap tables, and legal M&A dossiers with cryptographic access logs.",
                  }}
                  className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                >
                  M&A Data Room
                </Link>
                <span>·</span>
                <Link to="/templates" className="text-primary font-semibold hover:underline">
                  View All (8) →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Metrics Ticker */}
      <section className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {GLOBAL_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="surface-panel p-5 rounded-2xl border border-border/80 space-y-1 shadow-md"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-bold uppercase tracking-wider">{stat.label}</span>
                <Icon className={`size-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-black text-foreground font-mono">{stat.value}</p>
              <p className={`text-xs font-semibold ${stat.color}`}>{stat.change}</p>
            </div>
          );
        })}
      </section>

      {/* Interactive 30-Second Escrow Sandbox Simulator */}
      <section className="mt-20 surface-panel p-6 sm:p-10 rounded-3xl border border-border/80 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-2">
              <Play className="size-3" /> Interactive Sandbox
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Test-Drive a 30-Second Escrow Cycle
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Experience the end-to-end cryptographic escrow flow right in your browser.
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-1 bg-muted/50 p-1.5 rounded-xl border border-border/80 shrink-0">
            {([1, 2, 3, 4] as const).map((step) => (
              <button
                key={step}
                onClick={() => setSandboxStep(step)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                  sandboxStep === step
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                0{step}
              </button>
            ))}
          </div>
        </div>

        {/* Sandbox Visual State Display */}
        <div className="p-6 rounded-2xl bg-black/50 border border-border space-y-6">
          {sandboxStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase font-mono">
                  Step 1: Seller Uploads Payload
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">
                  Encrypted Cloud Server
                </span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCode2 className="size-8 text-primary" />
                  <div>
                    <p className="font-bold text-sm text-foreground">saas_core_v3_production.zip</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      Size: 42.8 MB · SHA-256: 9f8a...31b0
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">Locked in Escrow</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Room Code <code className="text-primary font-bold">#849201</code> generated. File is
                safely stored in private cloud storage with 256-bit AES encryption.
              </p>
            </div>
          )}

          {sandboxStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase font-mono">
                  Step 2: Buyer Enters Room & Reviews Terms
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                  Awaiting Payment
                </span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Escrow Price:</span>
                  <span className="font-bold text-foreground font-mono">
                    $4,500.00 USD (4,500 USDT)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Settlement Address:</span>
                  <span className="font-mono text-foreground">0x71C8492...4B91</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Download Access:</span>
                  <span className="text-amber-400 font-semibold">Locked (Pending Settlement)</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Buyer can view file name, size, and milestone checklist, but cannot download the raw
                file.
              </p>
            </div>
          )}

          {sandboxStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase font-mono">
                  Step 3: Blockchain Oracle Verification
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">
                  Covalent On-Chain
                </span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" /> Tx Hash Verified: 0x9a8f...4102
                  </span>
                  <span>42 Confirmations</span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Oracle matched 4,500 USDT ERC-20 transfer from buyer to seller wallet on Ethereum
                  Mainnet.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Automated proof validates payment authenticity, or seller performs manual 1-click
                approval.
              </p>
            </div>
          )}

          {sandboxStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
                  Step 4: Instant Secure Cloud Download Release
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  Settlement Complete
                </span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-emerald-400">
                    Room Status: Approved & Released
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    High-Speed Signed Cloud CDN URL active
                  </p>
                </div>
                <Button
                  size="sm"
                  className="font-bold bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <Download className="size-4 mr-1" /> Download .zip
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Buyer downloads files securely. Seller receives funds. Immutable audit log recorded
                in PostgreSQL.
              </p>
            </div>
          )}

          {/* Sandbox Action Trigger */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSandboxStep(1)}
              className="text-xs font-semibold border-border/80"
            >
              <RotateCcw className="size-3.5 mr-1" /> Reset Simulation
            </Button>
            <Button
              size="sm"
              onClick={advanceSandbox}
              disabled={sandboxSimulating}
              className="text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {sandboxStep === 4 ? "Start Over" : "Advance Step →"}
            </Button>
          </div>
        </div>
      </section>

      {/* Turnkey Industry Solutions Showcase */}
      <section className="mt-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-2">
              <Layers className="size-3" /> Turnkey Blueprints
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Engineered for High-Value International Deals
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select pre-configured escrow rules with verified milestone checklists and legal
              clauses.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border/80 text-xs font-bold shrink-0"
          >
            <Link to="/templates">
              Explore All 8 Templates <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className="surface-panel p-6 rounded-2xl border border-border/80 hover:border-primary/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {uc.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground mt-3 group-hover:text-primary transition-colors">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {uc.description}
                  </p>
                </div>

                {(() => {
                  const tpl = ESCROW_TEMPLATES.find((t) => t.id === uc.templateId);
                  if (tpl) {
                    return (
                      <Link
                        to="/send"
                        search={{
                          template: tpl.id,
                          title: tpl.title,
                          price: tpl.suggestedPrice.replace(/,/g, ""),
                          currency: tpl.suggestedCurrency,
                          chain: tpl.suggestedChain,
                          token: tpl.tokenSymbol,
                          instructions: tpl.sampleInstructions,
                          description: `${tpl.summary}\n\nDeliverable Checklist:\n${tpl.checklist.map((c) => `- ${c}`).join("\n")}`,
                        }}
                        className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Use Template <ChevronRight className="size-3.5" />
                      </Link>
                    );
                  }
                  return (
                    <Link
                      to="/templates"
                      className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Use Template <ChevronRight className="size-3.5" />
                    </Link>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Enterprise Testimonials */}
      <section className="mt-20 surface-panel p-8 sm:p-12 rounded-3xl border border-border/80 shadow-2xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Trusted by Cross-Border Teams Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            From Silicon Valley startups to Swiss asset managers and Tokyo design studios.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card border border-border/70 flex flex-col justify-between space-y-4"
            >
              <p className="text-xs text-foreground/90 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-border/60">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-xs font-bold text-foreground">{t.author}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  <p className="text-[10px] text-primary font-mono">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mt-20 text-center surface-panel p-10 sm:p-16 rounded-3xl border border-primary/40 bg-gradient-to-b from-primary/10 via-card to-background shadow-2xl space-y-6">
        <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Ready to Deliver Confidential Assets Worldwide?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Create your first escrow room in under 60 seconds. Zero monthly subscription needed for
          test transfers.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20"
          >
            <Link to="/send">
              <Upload className="size-4 mr-2" /> Send Files Now
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-6 text-sm font-bold border-border/80"
          >
            <Link to="/templates">Browse Templates</Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
