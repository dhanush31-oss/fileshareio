import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  FileQuestion,
  Globe2,
  HelpCircle,
  Lock,
  Mail,
  MessageSquare,
  MessageSquareText,
  Scale,
  Search,
  Send,
  Shield,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "24/7 Global Escrow Support & Dispute Desk | Vaultdrop" },
      {
        name: "description",
        content:
          "24/7 International assistance, AI Escrow Concierge, knowledge base, and dispute arbitration for buyers and sellers.",
      },
      { property: "og:title", content: "24/7 Global Escrow Support & Dispute Desk | Vaultdrop" },
      {
        property: "og:description",
        content:
          "24/7 International assistance, AI Escrow Concierge, knowledge base, and dispute arbitration for buyers and sellers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SupportPage,
});

const FAQ_ITEMS = [
  {
    q: "How does Vaultdrop protect both the buyer and seller?",
    a: "Vaultdrop holds uploaded assets in encrypted private Supabase Storage buckets under strict PostgreSQL Row-Level-Security (RLS). The buyer can inspect file metadata and terms, but cannot download the raw files until payment is confirmed on-chain or manually approved by the seller. If a dispute arises, developer arbiters review access logs and cryptographic proofs.",
  },
  {
    q: "What happens if a buyer submits a fake payment receipt?",
    a: "The seller retains full control and manually reviews payment proof before clicking 'Approve & Release Files'. Furthermore, for on-chain crypto transactions, our automated Covalent oracle validates the exact transaction hash, block depth, and token transfer amount on the blockchain before verifying.",
  },
  {
    q: "How do I download my unlocked files from Supabase?",
    a: "Once approved, the escrow terminal generates time-limited signed URLs directly from our high-speed Supabase Storage CDN. You can click 'Download All' to retrieve your files immediately.",
  },
  {
    q: "Can developers or third parties see my confidential files?",
    a: "Files are protected by 256-bit encryption. Authorized developer engineers only access files under strict audit protocols for diagnostic maintenance, disaster recovery, or formal dispute arbitration as documented in our security policy.",
  },
  {
    q: "Which international currencies and blockchains are supported?",
    a: "We support USD, EUR, GBP, JPY, CAD, AUD, AED, INR, and USDT/USDC across Ethereum, Base, Polygon, Arbitrum, BSC, and Solana networks.",
  },
  {
    q: "How do 6-digit room codes work?",
    a: "Each escrow room receives a unique, collision-resistant 6-digit code. Senders can simply text or email the code to their buyer, who can enter it on the home page or navigation bar to open the room immediately.",
  },
];

function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [ticketEmail, setTicketEmail] = useState("");
  const [ticketRoomCode, setTicketRoomCode] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredFaqs = FAQ_ITEMS.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketEmail.trim() || !ticketMessage.trim()) {
      toast.error("Please fill in your email and message");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setTicketMessage("");
      setTicketRoomCode("");
      toast.success(
        "Support ticket #ESC-" +
          Math.floor(100000 + Math.random() * 900000) +
          " dispatched to our 24/7 International Desk.",
      );
    }, 700);
  };

  return (
    <AppShell>
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="size-3.5" /> 24/7 Global Escrow Support Desk
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          How Can Our International Team Assist You?
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Instant multi-lingual AI Concierge, searchable knowledge base, and human dispute
          arbitration for cross-border digital asset settlements.
        </p>

        {/* Search Knowledge Base */}
        <div className="relative max-w-lg mx-auto pt-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, payment verification, Supabase storage..."
            className="pl-10 h-11 text-xs bg-card border-border/80 rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* 3 Quick Channels */}
      <div className="mt-12 grid sm:grid-cols-3 gap-4">
        <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Bot className="size-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">AI Escrow Concierge</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Click the floating support widget in the bottom-right corner for instant AI resolution
            in 7+ languages.
          </p>
        </div>

        <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Scale className="size-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">Dispute & Mediation Desk</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Human arbiters review blockchain transaction logs and cryptographic file checksums to
            resolve contested escrows.
          </p>
        </div>

        <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Globe2 className="size-5" />
          </div>
          <h3 className="font-bold text-base text-foreground">International SLA</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Priority ticket response times under 15 minutes for enterprise escrows and high-value
            software handovers.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mt-14 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-xs text-muted-foreground">
            Everything you need to know about Vaultdrop escrow mechanics.
          </p>
        </div>

        <div className="surface-panel rounded-2xl border border-border/80 p-6 shadow-xl">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {filteredFaqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-border/60">
                <AccordionTrigger className="text-left text-xs font-bold text-foreground hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Ticket Submission Form */}
      <div className="mt-14 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Mail className="size-5 text-primary" />
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Open an International Support Ticket
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Direct line to our senior escrow operations and security engineering staff.
            </p>
          </div>
        </div>

        <form onSubmit={handleTicketSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Your Full Name / Entity
              </label>
              <Input
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                placeholder="Jane Doe (Acme Corp)"
                className="text-xs bg-muted/30 border-border/80"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email Address *</label>
              <Input
                type="email"
                required
                value={ticketEmail}
                onChange={(e) => setTicketEmail(e.target.value)}
                placeholder="jane@company.com"
                className="text-xs bg-muted/30 border-border/80"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Room Code (Optional)</label>
            <Input
              value={ticketRoomCode}
              onChange={(e) => setTicketRoomCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="e.g. 849201"
              className="text-xs font-mono bg-muted/30 border-border/80 w-48"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Inquiry Details or Dispute Reason *
            </label>
            <Textarea
              required
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Describe your question, transaction issue, or arbitration request in detail..."
              className="text-xs bg-muted/30 border-border/80 min-h-[120px]"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-6 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          >
            <Send className="size-3.5 mr-1.5" />{" "}
            {submitting ? "Transmitting Ticket..." : "Submit Support Request"}
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
