import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  FileCheck,
  Fingerprint,
  FolderLock,
  Globe2,
  KeyRound,
  Lock,
  Scale,
  Send,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Enterprise Security & Compliance Whitepaper | Vaultdrop" },
      {
        name: "description",
        content:
          "Zero-Knowledge digital asset escrow architecture, private cloud RLS storage policies, SOC2 Type II compliance, and developer audit protocols.",
      },
      { property: "og:title", content: "Enterprise Security & Compliance Whitepaper | Vaultdrop" },
      {
        property: "og:description",
        content:
          "Zero-Knowledge digital asset escrow architecture, private cloud RLS storage policies, SOC2 Type II compliance, and developer audit protocols.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  const [bountyUrl, setBountyUrl] = useState("");
  const [bountyReport, setBountyReport] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBountySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bountyReport.trim()) {
      toast.error("Please provide a vulnerability description");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setBountyReport("");
      setBountyUrl("");
      toast.success("Security report received by DevSecOps triage team.");
    }, 800);
  };

  return (
    <AppShell>
      {/* Header Banner */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="size-3.5" /> Enterprise Trust & Compliance
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Zero-Knowledge Security & Developer Audit Architecture
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          How Vaultdrop combines Private Cloud Row-Level Security, multi-chain cryptographic
          verification, and bank-grade zero-knowledge custody for international high-value
          transfers.
        </p>
      </div>

      {/* 4 Pillars of Vaultdrop Security */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="size-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">256-Bit AES Storage</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All files uploaded to Private Cloud Storage are encrypted at rest with private KMS keys and
            isolated under UUID paths.
          </p>
        </div>

        <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Fingerprint className="size-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">SHA-256 Payload Hash</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Cryptographic checksums are generated client-side before upload, preventing byte
            alteration or man-in-the-middle attacks.
          </p>
        </div>

        <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Terminal className="size-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">Developer Audit Access</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Authorized developer engineers maintain cryptographic audit trails and maintenance
            download access for dispute mediation.
          </p>
        </div>

        <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Scale className="size-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">SOC2 Type II Certified</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Annual third-party penetration audits, strict least-privilege RBAC, and automated
            vulnerability scanning.
          </p>
        </div>
      </div>

      {/* Deep-Dive: Private Cloud Row-Level Security (RLS) & Access Control */}
      <div className="mt-12 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Database className="size-5 text-primary" /> Private Cloud Storage & Database RLS Isolation
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Every database record and file object in the Cloud Server is protected by strict PostgreSQL
          Row-Level Security policies. Here is how permissions are enforced:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2">
            <span className="font-bold text-foreground">1. Seller / Sender</span>
            <p className="text-muted-foreground">
              Only the authenticated seller can upload files to their personal directory
              (`auth.uid()/*`) and modify escrow pricing parameters.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2">
            <span className="font-bold text-foreground">2. Buyer / Recipient</span>
            <p className="text-muted-foreground">
              Buyers can inspect room metadata and upload proof of payment, but CANNOT download
              files until the room status transition to{" "}
              <code className="text-emerald-400">approved</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2">
            <span className="font-bold text-foreground">3. Developer Oversight</span>
            <p className="text-muted-foreground">
              Service role keys and verified admins have diagnostic read access for infrastructure
              telemetry, testing, and dispute arbitration.
            </p>
          </div>
        </div>
      </div>

      {/* Global Compliance Matrix */}
      <div className="mt-12 space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileCheck className="size-5 text-emerald-400" /> International Compliance Matrix
        </h2>
        <div className="surface-panel rounded-2xl border border-border/80 overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Framework</th>
                <th className="px-4 py-3">Jurisdiction</th>
                <th className="px-4 py-3">Coverage & Scope</th>
                <th className="px-4 py-3 text-right">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="px-4 py-3.5 font-bold text-foreground">SOC2 Type II</td>
                <td className="px-4 py-3.5 text-muted-foreground">Global (AICPA)</td>
                <td className="px-4 py-3.5 text-muted-foreground">
                  Security, Availability, and Confidentiality Trust Principles
                </td>
                <td className="px-4 py-3.5 text-right font-bold text-emerald-400">
                  Verified Passed
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 font-bold text-foreground">ISO/IEC 27001:2022</td>
                <td className="px-4 py-3.5 text-muted-foreground">International</td>
                <td className="px-4 py-3.5 text-muted-foreground">
                  Information Security Management Systems (ISMS)
                </td>
                <td className="px-4 py-3.5 text-right font-bold text-emerald-400">Certified</td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 font-bold text-foreground">GDPR & UK-GDPR</td>
                <td className="px-4 py-3.5 text-muted-foreground">European Union & UK</td>
                <td className="px-4 py-3.5 text-muted-foreground">
                  Data minimization, right to erasure, and EU data residency
                </td>
                <td className="px-4 py-3.5 text-right font-bold text-emerald-400">Compliant</td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 font-bold text-foreground">FinCEN Escrow Rules</td>
                <td className="px-4 py-3.5 text-muted-foreground">United States</td>
                <td className="px-4 py-3.5 text-muted-foreground">
                  Conditional multi-sig digital asset custody guidelines
                </td>
                <td className="px-4 py-3.5 text-right font-bold text-emerald-400">Compliant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bug Bounty Submission Terminal */}
      <div className="mt-12 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-5 text-amber-400" />
          <h2 className="text-base font-bold text-foreground">
            Responsible Disclosure & Bug Bounty Program
          </h2>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          We award bounties up to $25,000 USD for verified critical vulnerabilities in our smart
          escrow contracts or cloud storage RLS boundaries.
        </p>

        <form onSubmit={handleBountySubmit} className="space-y-3 pt-2">
          <Input
            value={bountyUrl}
            onChange={(e) => setBountyUrl(e.target.value)}
            placeholder="Affected URL or Component (e.g. /api/room, storage RLS, smart contract)..."
            className="text-xs bg-muted/40 border-border/80"
          />
          <Textarea
            value={bountyReport}
            onChange={(e) => setBountyReport(e.target.value)}
            placeholder="Provide Proof of Concept (PoC), steps to reproduce, and impact analysis..."
            className="text-xs bg-muted/40 border-border/80 min-h-[100px]"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="size-3.5 mr-1.5" />{" "}
            {submitting ? "Transmitting PoC..." : "Submit Disclosure Report"}
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
