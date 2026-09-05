import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Bot,
  Box,
  CheckCircle2,
  Code2,
  Coins,
  Copy,
  ExternalLink,
  Eye,
  FileCheck,
  FileCode2,
  FileSpreadsheet,
  Film,
  FolderLock,
  Globe,
  Globe2,
  Layers,
  Lock,
  Music,
  Scale,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Turnkey Industry Escrow Templates | Vaultdrop Global" },
      {
        name: "description",
        content:
          "Battle-tested digital asset escrow templates for software repositories, 3D media, legal NDAs, domain transfers, and AI datasets.",
      },
      { property: "og:title", content: "Turnkey Industry Escrow Templates | Vaultdrop Global" },
      {
        property: "og:description",
        content:
          "Battle-tested digital asset escrow templates for software repositories, 3D media, legal NDAs, domain transfers, and AI datasets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplatesPage,
});

import type { LucideIcon } from "lucide-react";

export interface EscrowTemplate {
  id: string;
  category: "code" | "media" | "legal" | "web3" | "ai";
  title: string;
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
  summary: string;
  description: string;
  suggestedPrice: string;
  suggestedCurrency: string;
  suggestedChain: string;
  tokenSymbol: string;
  checklist: string[];
  sampleInstructions: string;
  legalTermsExcerpt: string;
}

export const ESCROW_TEMPLATES: EscrowTemplate[] = [
  {
    id: "saas-codebase-handover",
    category: "code",
    title: "Full-Stack SaaS Codebase & Repository Handover",
    badge: "Most Popular",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: Code2,
    summary:
      "Complete transfer of GitHub/GitLab repositories, environment configurations, and deployment keys.",
    description:
      "Includes clean git history verification, private npm/docker instructions, backend environment configs, and IP release signoff upon buyer approval.",
    suggestedPrice: "4,500.00",
    suggestedCurrency: "USD",
    suggestedChain: "eth-mainnet",
    tokenSymbol: "USDT",
    checklist: [
      "Clean git archive with full commit history (.zip/.tar.gz)",
      "Redacted .env.example with third-party dependency list",
      "Setup README with local and cloud deployment guides",
      "Cryptographic SHA-256 integrity hash verification",
      "Signed IP Assignment & Commercial License Transfer",
    ],
    sampleInstructions:
      "1. Verify the repository hash matches our agreed commit milestone.\n2. Submit payment in USDT (ERC-20) or USDC.\n3. Seller will inspect proof and unlock full source archive + cloud credentials within 1 hour.",
    legalTermsExcerpt:
      "Upon seller confirmation of on-chain payment or wire settlement, all intellectual property rights, copyrights, and codebase ownership irrevocably transfer to the buyer in perpetuity.",
  },
  {
    id: "3d-vfx-master-delivery",
    category: "media",
    title: "High-Resolution 3D, CGI & VFX Studio Master Delivery",
    badge: "Creative Studio",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: Film,
    summary:
      "Multi-gigabyte 3D project packages (Blender, Maya, Unreal Engine 5, C4D) and 4K/8K master renders.",
    description:
      "Designed for animation studios, game devs, and VFX artists. Locks high-res master renders and raw project files behind verified client payment.",
    suggestedPrice: "2,800.00",
    suggestedCurrency: "USD",
    suggestedChain: "polygon-mainnet",
    tokenSymbol: "USDC",
    checklist: [
      "Raw project source files (.blend / .c4d / .uproject)",
      "4K/8K ProRes 4444 or EXR sequence render exports",
      "Packed texture archives (4K PBR maps)",
      "Commercial broadcast usage release certificate",
    ],
    sampleInstructions:
      "Inspect the low-res watermarked preview on our client portal. Release payment to unlock the uncompressed 18GB 4K render package from Supabase Storage.",
    legalTermsExcerpt:
      "Delivery constitutes full commercial synchronization and broadcast rights transfer under standard international creative production guidelines.",
  },
  {
    id: "cross-border-nda-dataroom",
    category: "legal",
    title: "Cross-Border Commercial M&A Data Room & Confidential NDA",
    badge: "Enterprise Legal",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: Scale,
    summary:
      "Confidential financial audits, cap tables, and legal M&A dossiers with cryptographic access logs.",
    description:
      "Secures sensitive corporate acquisitions and proprietary disclosures with full Row-Level-Security audit trails and developer oversight records.",
    suggestedPrice: "15,000.00",
    suggestedCurrency: "USD",
    suggestedChain: "eth-mainnet",
    tokenSymbol: "ETH",
    checklist: [
      "Audited financial statements (3-year P&L / balance sheets)",
      "Cap table and shareholder registry confirmation",
      "Proprietary IP patent filings and licensing agreements",
      "Counter-signed mutual Non-Disclosure Agreement (NDA)",
    ],
    sampleInstructions:
      "Enter the room code provided by legal counsel. Provide wire transfer confirmation or deposit escrow to access the confidential data room files.",
    legalTermsExcerpt:
      "Access to these files binds the recipient to strict confidentiality under New York / English commercial jurisdiction. Unauthorized reproduction triggers automated forensic tracking.",
  },
  {
    id: "domain-digital-ip-transfer",
    category: "web3",
    title: "Premium Domain Name & Digital Property Transfer",
    badge: "Digital Assets",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: Globe,
    summary:
      "Safe handover of premium domain EPP transfer authorization codes, social handles, and trademark files.",
    description:
      "Eliminates domain escrow fraud. EPP auth codes and registrar transfer instructions are locked in Supabase storage until buyer funds are verified.",
    suggestedPrice: "6,000.00",
    suggestedCurrency: "USD",
    suggestedChain: "base-mainnet",
    tokenSymbol: "ETH",
    checklist: [
      "Domain EPP / Auth-Code in encrypted document",
      "Registrar push / transfer authorization letter",
      "WHOIS contact update verification document",
      "Trademark trademark assignment documentation",
    ],
    sampleInstructions:
      "Deposit the agreed purchase price into escrow. Once confirmed, download the EPP code file and initiate registrar transfer.",
    legalTermsExcerpt:
      "Seller guarantees clear title and uncontested ownership of the registered domain name with zero outstanding liens or trademark disputes.",
  },
  {
    id: "music-master-rights-transfer",
    category: "media",
    title: "Music Master Recording & Publishing Rights Handover",
    badge: "Audio & Sync",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: Music,
    summary:
      "24-bit 96kHz lossless WAV stems, ISRC metadata, and irrevocable publishing rights contracts.",
    description:
      "For music producers, record labels, and sync supervisors. Unlocks multitrack stems and exclusive worldwide rights upon verified payment.",
    suggestedPrice: "1,250.00",
    suggestedCurrency: "USD",
    suggestedChain: "polygon-mainnet",
    tokenSymbol: "USDT",
    checklist: [
      "24-bit / 96kHz lossless master WAV & instrumental stems",
      "ISRC and ISWC registration paperwork",
      "Exclusive worldwide master synchronization license",
      "Split-sheet confirmation for all contributing writers",
    ],
    sampleInstructions:
      "Send payment proof to release the uncompressed master audio stems and signed synchronization contract.",
    legalTermsExcerpt:
      "Grantor hereby conveys 100% of the Master Recording rights and publisher share to Grantee throughout the universe in all media now known or hereafter devised.",
  },
  {
    id: "freelance-software-milestone",
    category: "code",
    title: "Freelance Software Milestone & Sprint Delivery",
    badge: "Agile Dev",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    icon: FileCode2,
    summary:
      "Milestone-based code release for client contractor projects with automated staging test notes.",
    description:
      "Protects both independent developers and global agencies. Code is delivered in Supabase private storage and unlocked when milestone invoice is settled.",
    suggestedPrice: "1,800.00",
    suggestedCurrency: "USD",
    suggestedChain: "arbitrum-mainnet",
    tokenSymbol: "USDC",
    checklist: [
      "Completed sprint feature build bundle",
      "Unit & integration test suite passing report",
      "API documentation & staging test credentials",
      "Changelog and release notes document",
    ],
    sampleInstructions:
      "Review sprint deliverables on the staging environment. Once verified, submit milestone payment to unlock the production release archive.",
    legalTermsExcerpt:
      "Acceptance of the delivery archive confirms satisfactory completion of sprint deliverables as outlined in the Statement of Work.",
  },
  {
    id: "zero-knowledge-legal-settlement",
    category: "legal",
    title: "Zero-Knowledge Confidential Legal Settlement & Release",
    badge: "High Security",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    icon: FolderLock,
    summary:
      "Executed settlement agreements, mutual liability waivers, and encrypted payout confirmations.",
    description:
      "High-confidentiality legal settlement execution. Employs 256-bit encrypted payload storage with audit-proof developer logs.",
    suggestedPrice: "25,000.00",
    suggestedCurrency: "USD",
    suggestedChain: "eth-mainnet",
    tokenSymbol: "USDC",
    checklist: [
      "Fully executed settlement & release agreement",
      "Mutual liability waiver and confidentiality covenants",
      "Escrow disbursement authorization schedule",
      "Proof of funds / wire clearing confirmation",
    ],
    sampleInstructions:
      "Submit the settlement escrow amount to the indicated custody address. Once seller validates compliance, the mutual release is unlocked.",
    legalTermsExcerpt:
      "This settlement represents a full, final, and binding compromise of all claims between the parties under international arbitration rules.",
  },
  {
    id: "ai-model-weights-dataset-handover",
    category: "ai",
    title: "AI Model Weights & Training Dataset Handover",
    badge: "AI / ML",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    icon: Bot,
    summary:
      "Fine-tuned model checkpoints (Safetensors / GGUF / ONNX) and curated training datasets.",
    description:
      "Large-scale AI asset exchange. High-performance Supabase storage transfer for proprietary LLM fine-tunes, LoRA weights, and labeled datasets.",
    suggestedPrice: "7,500.00",
    suggestedCurrency: "USD",
    suggestedChain: "eth-mainnet",
    tokenSymbol: "ETH",
    checklist: [
      "Fine-tuned safetensors / ONNX model checkpoints",
      "Tokenization scripts and inference benchmarks",
      "Clean training corpus with data schema documentation",
      "Commercial AI model weight licensing agreement",
    ],
    sampleInstructions:
      "Submit payment to receive the direct download link and cryptographic checksums for the fine-tuned model checkpoint archive.",
    legalTermsExcerpt:
      "Buyer receives perpetual commercial deployment rights for the provided neural network weights and derivative inference models.",
  },
];

function TemplatesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<EscrowTemplate | null>(null);

  const filtered = ESCROW_TEMPLATES.filter((t) => {
    const matchesCat = selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUseTemplate = (tpl: EscrowTemplate) => {
    navigate({
      to: "/send",
      search: {
        template: tpl.id,
        title: tpl.title,
        price: tpl.suggestedPrice.replace(/,/g, ""),
        currency: tpl.suggestedCurrency,
        chain: tpl.suggestedChain,
        token: tpl.tokenSymbol,
        instructions: tpl.sampleInstructions,
        description: `${tpl.summary}\n\nDeliverable Checklist:\n${tpl.checklist.map((c) => `- ${c}`).join("\n")}`,
      },
    });
  };

  return (
    <AppShell>
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
          <Layers className="size-3.5" /> Turnkey Industry Escrow Blueprints
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          Ready-to-Use Escrow Templates for International Deals
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Launch secure, legally sound digital asset escrows in under 60 seconds. Pre-configured
          with deliverable checklists, milestone rules, and cryptographic verification standards.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-card/60 p-3 rounded-2xl border border-border/80 shadow-md">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "all", label: "All Templates", icon: Sparkles },
            { id: "code", label: "Software & Code", icon: Code2 },
            { id: "media", label: "3D & VFX Media", icon: Film },
            { id: "legal", label: "Legal & M&A", icon: Scale },
            { id: "web3", label: "Domains & Web3", icon: Globe },
            { id: "ai", label: "AI Models & Data", icon: Bot },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates & rules..."
            className="pl-9 h-9 text-xs bg-muted/40 border-border/70"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <div
              key={tpl.id}
              className="group surface-panel p-4 sm:p-6 rounded-2xl border border-border/80 hover:border-primary/50 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-primary/5 relative"
            >
              <div>
                {/* Header Top */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                    <Icon className="size-4 sm:size-5" />
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${tpl.badgeColor}`}
                  >
                    {tpl.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {tpl.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs text-muted-foreground leading-relaxed">
                  {tpl.summary}
                </p>

                {/* Checklist Preview */}
                <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-border/60 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Included Deliverables:
                  </p>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {tpl.checklist.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="flex-1 break-words leading-snug">{item}</span>
                      </li>
                    ))}
                    {tpl.checklist.length > 3 && (
                      <li className="text-[11px] text-muted-foreground italic pl-5">
                        +{tpl.checklist.length - 3} more verification checkpoints
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPreviewTemplate(tpl)}
                  className="w-full sm:flex-1 text-xs font-semibold border-border/80 hover:bg-muted h-9"
                >
                  <Eye className="size-3.5 mr-1" /> Inspect Terms
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUseTemplate(tpl)}
                  className="w-full sm:flex-1 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-9"
                >
                  Use Template <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="surface-panel mt-8 p-12 text-center rounded-2xl max-w-md mx-auto">
          <ShieldAlert className="size-8 text-muted-foreground mx-auto" />
          <h3 className="mt-3 font-bold text-foreground">No templates match your filter</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search keywords or switch category filter.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-xs font-semibold"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Preview Modal for Legal Terms & Contract */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="surface-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${previewTemplate.badgeColor}`}
                  >
                    {previewTemplate.badge}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Template ID: {previewTemplate.id}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground mt-1">{previewTemplate.title}</h2>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPreviewTemplate(null)}
                className="h-8 w-8 p-0 rounded-full"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-muted/40 p-4 rounded-xl border border-border/70">
                <h4 className="font-bold text-foreground mb-1">Overview & Scope</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {previewTemplate.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-2">Escrow Milestone Checklist:</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {previewTemplate.checklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-card border border-border/60"
                    >
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                      <span className="text-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-2">
                  Pre-Configured Buyer Instructions:
                </h4>
                <pre className="p-3.5 rounded-xl bg-black/40 border border-border font-mono text-[11px] text-muted-foreground whitespace-pre-wrap">
                  {previewTemplate.sampleInstructions}
                </pre>
              </div>

              <div className="border-t border-border/70 pt-4">
                <h4 className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                  <Scale className="size-4 text-primary" /> Binding Escrow Contract Clause:
                </h4>
                <p className="italic text-muted-foreground bg-primary/5 p-3 rounded-xl border border-primary/20 leading-relaxed">
                  "{previewTemplate.legalTermsExcerpt}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/70">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewTemplate(null)}
                className="text-xs font-semibold"
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const tpl = previewTemplate;
                  setPreviewTemplate(null);
                  handleUseTemplate(tpl);
                }}
                className="text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              >
                Use This Template in Escrow Room <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
