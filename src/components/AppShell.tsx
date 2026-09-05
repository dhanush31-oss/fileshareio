import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SupportAgent } from "@/components/SupportAgent";
import { VaultdropLogo } from "@/components/VaultdropLogo";
import {
  ArrowUpRight,
  Code2,
  Compass,
  FileCode2,
  Folder,
  Globe2,
  KeyRound,
  Layers,
  Lock,
  Menu,
  MessageSquareText,
  Percent,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Upload,
  X,
  Zap,
} from "lucide-react";

export type SupportedLocale = "EN" | "ES" | "DE" | "FR" | "ZH" | "JA" | "AR";

export const LOCALES: { code: SupportedLocale; label: string; flag: string; native: string }[] = [
  { code: "EN", label: "English (US)", flag: "🇺🇸", native: "English" },
  { code: "ES", label: "Español", flag: "🇪🇸", native: "Español" },
  { code: "DE", label: "Deutsch", flag: "🇩🇪", native: "Deutsch" },
  { code: "FR", label: "Français", flag: "🇫🇷", native: "Français" },
  { code: "ZH", label: "中文 (简体)", flag: "🇨🇳", native: "简体中文" },
  { code: "JA", label: "日本語", flag: "🇯🇵", native: "日本語" },
  { code: "AR", label: "العربية", flag: "🇦🇪", native: "العربية" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [quickCode, setQuickCode] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [cloudLatency, setCloudLatency] = useState<number | null>(24);

  useEffect(() => {
    const saved = localStorage.getItem("vaultdrop_locale") as SupportedLocale;
    if (saved && LOCALES.some((l) => l.code === saved)) {
      setCurrentLocale(saved);
    }
  }, []);

  const changeLocale = (loc: SupportedLocale) => {
    setCurrentLocale(loc);
    localStorage.setItem("vaultdrop_locale", loc);
    setShowLangMenu(false);
  };

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    const clean = quickCode.replace(/\D/g, "").slice(0, 6);
    if (clean.length === 6) {
      navigate({ to: "/room/$code", params: { code: clean } });
      setQuickCode("");
      setShowMobileNav(false);
    }
  }

  const activeLocaleObj = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground font-sans">
      {/* Top International Announcement Ticker */}
      <div className="bg-gradient-to-r from-primary/15 via-accent/20 to-primary/15 border-b border-primary/20 px-3 py-1.5 text-center text-xs font-medium text-muted-foreground flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="size-3" /> Live Escrow Network
        </span>
        <span className="hidden sm:inline">
          Zero-Knowledge cryptographic delivery & multi-chain escrow across 140+ countries.
        </span>
        <span className="sm:hidden">Cross-border file escrow live</span>
        <Link
          to="/explorer"
          className="text-primary hover:underline font-semibold inline-flex items-center gap-0.5 ml-1"
        >
          View Explorer <ArrowUpRight className="size-3" />
        </Link>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 gap-2 sm:gap-4 w-full">
          {/* Left: Logo & Brand */}
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <VaultdropLogo size={36} />
          </Link>

          {/* Center: Desktop Navigation Links (Centered in header) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs font-medium text-muted-foreground mx-auto">
            <Link
              to="/templates"
              activeProps={{ className: "text-foreground bg-muted font-semibold shadow-sm" }}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Layers className="size-3.5" /> Templates
            </Link>
            <Link
              to="/explorer"
              activeProps={{ className: "text-foreground bg-muted font-semibold shadow-sm" }}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Compass className="size-3.5" /> Explorer
            </Link>
            <Link
              to="/security"
              activeProps={{ className: "text-foreground bg-muted font-semibold shadow-sm" }}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <ShieldCheck className="size-3.5" /> Security
            </Link>
            <Link
              to="/pricing"
              activeProps={{ className: "text-foreground bg-muted font-semibold shadow-sm" }}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Percent className="size-3.5" /> Pricing
            </Link>
            <Link
              to="/support"
              activeProps={{ className: "text-foreground bg-muted font-semibold shadow-sm" }}
              className="px-2.5 xl:px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <MessageSquareText className="size-3.5" /> Support
            </Link>
          </nav>

          {/* Right Action Bar: Enter Code + Language + My Transfers + Send Files */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0 ml-auto lg:ml-0">
            {/* Quick 6-Digit Room Code Unlock Form (Between Support & EN Language) */}
            <form
              onSubmit={handleJoin}
              className="hidden md:flex items-center gap-1.5 bg-muted/40 hover:bg-muted/60 px-2 sm:px-2.5 py-1 rounded-xl border border-border/80 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 transition-all shadow-inner shrink-0"
            >
              <KeyRound className="size-3.5 text-primary shrink-0" />
              <Input
                value={quickCode}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setQuickCode(clean);
                  if (clean.length === 6) {
                    navigate({ to: "/room/$code", params: { code: clean } });
                    setQuickCode("");
                  }
                }}
                placeholder="Enter 6-digit code"
                className="h-7 w-24 sm:w-28 text-center text-xs font-mono font-medium tracking-wider bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 placeholder:text-muted-foreground/70"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all rounded-lg"
                disabled={quickCode.length !== 6}
              >
                Join
              </Button>
            </form>

            {/* Language Selector Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border border-border/70 bg-card/60 hover:bg-muted text-xs font-medium text-foreground transition-colors shrink-0"
                title="Select International Language"
              >
                <span className="text-sm">{activeLocaleObj.flag}</span>
                <span className="font-mono text-[11px] font-semibold">
                  {activeLocaleObj.code}
                </span>
              </button>

              {showLangMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setShowLangMenu(false)}
                >
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Select Region / Language
                  </div>
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLocale(l.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors ${
                        currentLocale === l.code
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      <span className="text-[10px] opacity-70 font-mono">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* My Transfers Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:flex h-8.5 px-2.5 sm:px-3 text-xs font-medium gap-1.5 border-border/80 shrink-0"
            >
              <Link to="/dashboard">
                <Folder className="size-3.5 text-muted-foreground" />
                <span>My Transfers</span>
              </Link>
            </Button>

            {/* Send Files CTA */}
            <Button
              asChild
              size="sm"
              className="h-8.5 px-2.5 sm:px-3.5 md:px-4 text-xs font-bold gap-1.5 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-md shadow-primary/20 border-0 shrink-0"
            >
              <Link to="/send">
                <Upload className="size-3.5 shrink-0" />
                <span>Send Files</span>
              </Link>
            </Button>

            {/* Mobile / Tablet Menu Toggle Button (Shows on < lg) */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="lg:hidden h-8.5 w-8.5 p-0 shrink-0"
            >
              {showMobileNav ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {showMobileNav && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-xl px-4 sm:px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
            {/* Quick 6-digit Code for mobile */}
            <form
              onSubmit={handleJoin}
              className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border border-border"
            >
              <KeyRound className="size-4 text-primary ml-2" />
              <Input
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter 6-digit room code"
                className="h-8 flex-1 text-center font-mono tracking-widest text-sm bg-transparent border-0"
              />
              <Button
                type="submit"
                size="sm"
                className="h-8 px-4 text-xs font-bold"
                disabled={quickCode.length !== 6}
              >
                Unlock
              </Button>
            </form>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link
                to="/send"
                onClick={() => setShowMobileNav(false)}
                className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center gap-2 font-bold"
              >
                <Upload className="size-4" /> Send Files
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setShowMobileNav(false)}
                className="p-2.5 rounded-lg bg-muted text-foreground flex items-center gap-2"
              >
                <Folder className="size-4" /> My Transfers
              </Link>
              <Link
                to="/templates"
                onClick={() => setShowMobileNav(false)}
                className="p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <Layers className="size-4" /> Escrow Templates
              </Link>
              <Link
                to="/explorer"
                onClick={() => setShowMobileNav(false)}
                className="p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <Compass className="size-4" /> Public Explorer
              </Link>
              <Link
                to="/security"
                onClick={() => setShowMobileNav(false)}
                className="p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <ShieldCheck className="size-4" /> Security Architecture
              </Link>
              <Link
                to="/pricing"
                onClick={() => setShowMobileNav(false)}
                className="p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <Percent className="size-4" /> Global Pricing
              </Link>
              <Link
                to="/support"
                onClick={() => setShowMobileNav(false)}
                className="p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2 col-span-2"
              >
                <MessageSquareText className="size-4" /> 24/7 Support AI
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10">{children}</main>

      {/* Enterprise Global Footer */}
      <footer className="mt-auto border-t border-border/60 bg-card/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Column 1: Brand & Infrastructure */}
            <div className="sm:col-span-2 space-y-4">
              <Link to="/">
                <VaultdropLogo size={32} />
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                The international digital asset settlement and confidential escrow cloud. Powered by
                Encrypted Private Cloud Storage, Zero-Knowledge cryptographic verification, and multi-network
                on-chain settlements for global clients.
              </p>

              {/* Cloud Server Telemetry Pill */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Cloud Storage Server: Operational ({cloudLatency}ms)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-mono">
                  <Globe2 className="size-3" />
                  <span>4 Global Cloud Vault Regions</span>
                </div>
              </div>
            </div>

            {/* Column 2: Escrow Solutions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Solutions
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/templates" className="hover:text-primary transition-colors">
                    SaaS Codebase Handover
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-primary transition-colors">
                    3D & VFX Master Archives
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-primary transition-colors">
                    Cross-Border NDA Data Rooms
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-primary transition-colors">
                    Domain & IP Escrow
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-primary transition-colors">
                    Music Master Rights
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-primary transition-colors">
                    AI Dataset Weights
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform & Tech */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/send" className="hover:text-primary transition-colors">
                    Send Files & Create Room
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-primary transition-colors">
                    Transfers Command Center
                  </Link>
                </li>
                <li>
                  <Link to="/explorer" className="hover:text-primary transition-colors">
                    Public Escrow Ledger
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-primary transition-colors">
                    Escrow Blueprints
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-primary transition-colors">
                    Security & Zero-Knowledge
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-primary transition-colors">
                    24/7 Support Desk
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Compliance & Global */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Compliance & Trust
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link to="/pricing" className="hover:text-primary transition-colors">
                    Global Multi-Currency Plans
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-primary transition-colors">
                    SOC2 Type II & ISO 27001
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-primary transition-colors">
                    GDPR & Data Sovereignty
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-primary transition-colors">
                    24/7 AI Concierge
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-primary transition-colors">
                    Dispute Resolution Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    Encrypted Cloud Infrastructure <ArrowUpRight className="size-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="size-3.5 text-primary" />
              <span>
                © {new Date().getFullYear()} Vaultdrop International Inc. Bank-grade 256-bit AES
                encryption & on-chain settlement.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/security" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/security" className="hover:text-foreground transition-colors">
                Terms of Escrow
              </Link>
              <Link to="/support" className="hover:text-foreground transition-colors">
                Contact International Desk
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating 24/7 AI Support Agent Drawer */}
      <SupportAgent />
    </div>
  );
}
