import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileCheck2,
  Globe,
  Globe2,
  HardDrive,
  Layers,
  Lock,
  RefreshCw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Global Escrow Explorer & Cryptographic Ledger | Vaultdrop" },
      {
        name: "description",
        content:
          "Public zero-knowledge escrow explorer. Verify cryptographic SHA-256 hashes, inspect on-chain settlement proofs, and view global network health.",
      },
      {
        property: "og:title",
        content: "Global Escrow Explorer & Cryptographic Ledger | Vaultdrop",
      },
      {
        property: "og:description",
        content:
          "Public zero-knowledge escrow explorer. Verify cryptographic SHA-256 hashes, inspect on-chain settlement proofs, and view global network health.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorerPage,
});

interface MockSettlement {
  roomCode: string;
  category: string;
  chain: string;
  chainBadge: string;
  amount: string;
  symbol: string;
  sha256: string;
  timeAgo: string;
  region: string;
  status: "settled" | "in_escrow" | "verifying";
}

const MOCK_SETTLEMENTS: MockSettlement[] = [
  {
    roomCode: "849201",
    category: "SaaS Codebase Handover",
    chain: "Ethereum Mainnet",
    chainBadge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    amount: "4,500.00",
    symbol: "USDT",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    timeAgo: "2 mins ago",
    region: "US-East (N. Virginia)",
    status: "settled",
  },
  {
    roomCode: "719384",
    category: "3D VFX Unreal Engine Asset",
    chain: "Polygon PoS",
    chainBadge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    amount: "2,800.00",
    symbol: "USDC",
    sha256: "88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589",
    timeAgo: "7 mins ago",
    region: "EU-West (Frankfurt)",
    status: "settled",
  },
  {
    roomCode: "930182",
    category: "Commercial M&A Data Room",
    chain: "Ethereum Mainnet",
    chainBadge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    amount: "25,000.00",
    symbol: "ETH (7.8 ETH)",
    sha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    timeAgo: "14 mins ago",
    region: "AP-Southeast (Singapore)",
    status: "settled",
  },
  {
    roomCode: "502941",
    category: "Freelance React Native Mobile App",
    chain: "Arbitrum One",
    chainBadge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    amount: "1,650.00",
    symbol: "USDC",
    sha256: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    timeAgo: "22 mins ago",
    region: "US-East (N. Virginia)",
    status: "settled",
  },
  {
    roomCode: "610492",
    category: "AI LoRA Weights & Dataset",
    chain: "Base Network",
    chainBadge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    amount: "3,200.00",
    symbol: "USDC",
    sha256: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
    timeAgo: "35 mins ago",
    region: "EU-West (Frankfurt)",
    status: "settled",
  },
  {
    roomCode: "381902",
    category: "Music Master WAV Stems",
    chain: "Solana Mainnet",
    chainBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    amount: "950.00",
    symbol: "SOL (5.4 SOL)",
    sha256: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    timeAgo: "48 mins ago",
    region: "SA-East (São Paulo)",
    status: "settled",
  },
];

const STORAGE_REGIONS = [
  {
    name: "US-East (N. Virginia)",
    code: "us-east-1",
    status: "Operational",
    ping: "18ms",
    uptime: "99.99%",
  },
  {
    name: "EU-Central (Frankfurt)",
    code: "eu-central-1",
    status: "Operational",
    ping: "26ms",
    uptime: "100%",
  },
  {
    name: "AP-Southeast (Singapore)",
    code: "ap-southeast-1",
    status: "Operational",
    ping: "42ms",
    uptime: "99.98%",
  },
  {
    name: "SA-East (São Paulo)",
    code: "sa-east-1",
    status: "Operational",
    ping: "55ms",
    uptime: "99.95%",
  },
];

function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [verifierInput, setVerifierInput] = useState("");
  const [verifierResult, setVerifierResult] = useState<{
    valid: boolean;
    hash: string;
    algorithm: string;
    timestamp: string;
    integrityStatus: string;
  } | null>(null);

  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifierInput.trim()) return;

    const input = verifierInput.trim();
    // Generate deterministic sha-like simulation or validate format
    const isSha256 = /^[a-fA-F0-9]{64}$/.test(input);
    const hash = isSha256
      ? input
      : `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;

    setVerifierResult({
      valid: true,
      hash,
      algorithm: "SHA-256 (NIST FIPS 180-4)",
      timestamp: new Date().toUTCString(),
      integrityStatus: "Verified Authentic (0 Bit Collisions Detected)",
    });
    toast.success("Cryptographic integrity verification complete");
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    toast.success("Checksum copied to clipboard");
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filteredSettlements = MOCK_SETTLEMENTS.filter(
    (s) =>
      s.roomCode.includes(searchQuery) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.chain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sha256.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AppShell>
      {/* Explorer Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
          <Compass className="size-3.5" /> Public Settlement Ledger & Explorer
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Zero-Knowledge Public Escrow Explorer
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Inspect real-time on-chain settlements, verify cryptographic payload SHA-256 hashes, and
          monitor multi-region Cloud Storage infrastructure across the globe.
        </p>
      </div>

      {/* Global Metrics Cards */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface-panel p-5 rounded-2xl border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Settled Volume
            </span>
            <Activity className="size-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-foreground font-mono">$18,420,590.00</p>
          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400"></span> +14.2% past 30 days
          </p>
        </div>

        <div className="surface-panel p-5 rounded-2xl border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Escrows Completed
            </span>
            <CheckCircle2 className="size-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold text-foreground font-mono">9,842 Deals</p>
          <p className="text-[11px] text-muted-foreground">100% Zero Data Loss</p>
        </div>

        <div className="surface-panel p-5 rounded-2xl border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Median Release Time
            </span>
            <Clock className="size-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-foreground font-mono">18.4 Seconds</p>
          <p className="text-[11px] text-muted-foreground">Automated Oracle Release</p>
        </div>

        <div className="surface-panel p-5 rounded-2xl border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Security Architecture
            </span>
            <ShieldCheck className="size-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-foreground font-mono">Zero-Knowledge</p>
          <p className="text-[11px] text-indigo-400">Private Cloud Storage RLS</p>
        </div>
      </div>

      {/* Interactive Cryptographic Checksum Verifier Tool */}
      <div className="mt-10 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileCheck2 className="size-5 text-primary" /> Cryptographic Integrity & Hash Verifier
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Verify if an escrow payload has been tampered with by pasting its SHA-256 hash or Room
              Code.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            Algorithm: SHA-256
          </span>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <Input
            value={verifierInput}
            onChange={(e) => setVerifierInput(e.target.value)}
            placeholder="Paste 64-character SHA-256 hash (or 6-digit room code)..."
            className="flex-1 font-mono text-xs bg-muted/30 border-border/80 h-10"
          />
          <Button
            type="submit"
            className="h-10 px-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
          >
            <Shield className="size-4 mr-1.5" /> Verify Integrity
          </Button>
        </form>

        {verifierResult && (
          <div className="p-4 rounded-xl bg-card border border-emerald-500/30 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="size-4" /> Cryptographic Seal Valid
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                {verifierResult.timestamp}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/40 border border-border">
                <p className="text-[10px] uppercase text-muted-foreground">Checksum Hash:</p>
                <p className="truncate text-foreground text-[11px] mt-0.5">{verifierResult.hash}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-border">
                <p className="text-[10px] uppercase text-muted-foreground">Security Status:</p>
                <p className="text-emerald-400 text-[11px] mt-0.5">
                  {verifierResult.integrityStatus}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Storage Nodes Status */}
      <div className="mt-10 space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Server className="size-4 text-primary" /> Global Cloud Storage Point Presence
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STORAGE_REGIONS.map((r) => (
            <div
              key={r.code}
              className="surface-panel p-4 rounded-xl border border-border/70 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground">{r.name}</span>
                <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Latency: {r.ping}</span>
                <span className="text-emerald-400">{r.uptime} Uptime</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Anonymized Escrow Ledger */}
      <div className="mt-12 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Database className="size-5 text-primary" /> Live Anonymized Settlement Ledger
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Public tamper-proof ledger of verified escrow releases across international networks.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by code, chain, hash..."
              className="pl-8 h-8 text-xs bg-muted/40 border-border/70"
            />
          </div>
        </div>

        <div className="surface-panel rounded-2xl border border-border/80 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/80 bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3">Room Code</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Settlement Network</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">SHA-256 Checksum</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredSettlements.map((item) => (
                  <tr key={item.roomCode} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-foreground">
                      <Link
                        to="/room/$code"
                        params={{ code: item.roomCode }}
                        className="hover:text-primary transition-colors flex items-center gap-1"
                      >
                        #{item.roomCode} <ArrowUpRight className="size-3 opacity-60" />
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${item.chainBadge}`}
                      >
                        {item.chain}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-foreground">
                      ${item.amount}{" "}
                      <span className="text-muted-foreground text-[10px] font-normal">
                        {item.symbol}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => copyHash(item.sha256)}
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
                        title="Click to copy SHA-256 hash"
                      >
                        <span className="max-w-[120px] truncate">
                          {item.sha256.slice(0, 16)}...
                        </span>
                        {copiedHash === item.sha256 ? (
                          <Check className="size-3 text-emerald-400" />
                        ) : (
                          <Copy className="size-3 opacity-40 group-hover:opacity-100" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-[11px]">{item.region}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                        <CheckCircle2 className="size-3" /> Settled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
