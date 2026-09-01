import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ensureSession } from "@/lib/session";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/clipboard";
import { getCoinLogo } from "@/components/CoinIcons";
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileLock2,
  FolderLock,
  Layers,
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Escrow Rooms | Vaultdrop" },
      {
        name: "description",
        content:
          "Track your escrow rooms, watch on-chain payment verifications, and release files after approval.",
      },
      { property: "og:title", content: "My Escrow Rooms | Vaultdrop" },
      {
        property: "og:description",
        content:
          "Track your escrow rooms, watch on-chain payment verifications, and release files after approval.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function getExplorerUrl(chain: string, txHash: string) {
  const c = (chain || "").toLowerCase();
  if (c.includes("base")) return `https://basescan.org/tx/${txHash}`;
  if (c.includes("polygon") || c.includes("matic")) return `https://polygonscan.com/tx/${txHash}`;
  if (c.includes("arbitrum") || c.includes("arb")) return `https://arbiscan.io/tx/${txHash}`;
  if (c.includes("optimism") || c.includes("op"))
    return `https://optimistic.etherscan.io/tx/${txHash}`;
  if (c.includes("bsc") || c.includes("bnb")) return `https://bscscan.com/tx/${txHash}`;
  return `https://etherscan.io/tx/${txHash}`;
}

function DashboardPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [joinCode, setJoinCode] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "action" | "active" | "approved">("all");
  const [recheckingId, setRecheckingId] = useState<string | null>(null);

  useEffect(() => {
    ensureSession();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      let token: string | undefined;
      try {
        const { data: sessionData } = await (
          await import("@/integrations/supabase/client")
        ).supabase.auth.getSession();
        token = sessionData.session?.access_token;
      } catch {
        // ignore
      }
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/dashboard", { headers });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load dashboard");
      return json;
    },
    refetchInterval: 5000,
  });

  const sellingRooms: any[] = data?.selling || [];
  const buyingRooms: any[] = data?.buying || [];
  const allProofs: any[] = data?.proofs || [];
  const notifications: any[] = data?.notifications || [];
  const unread = notifications.filter((n: any) => !n.read_at);

  async function clearNotifications() {
    await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_notifications_read" }),
    });
    qc.invalidateQueries({ queryKey: ["dashboard-data"] });
  }

  async function recheckProof(proofId: string) {
    setRecheckingId(proofId);
    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "recheck_proof", proofId }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Recheck failed");

      toast[json.verified ? "success" : "message"](
        json.detail || (json.verified ? "Payment confirmed on-chain!" : "Not found on-chain yet"),
      );
      qc.invalidateQueries({ queryKey: ["dashboard-data"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Recheck failed");
    } finally {
      setRecheckingId(null);
    }
  }

  async function act(proofId: string, approve: boolean) {
    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "review_proof", proofId, approve }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Action failed");

      toast.success(approve ? "Payment approved — files unlocked for buyer!" : "Payment rejected");
      qc.invalidateQueries({ queryKey: ["dashboard-data"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action failed");
    }
  }

  async function openProof(proofId: string) {
    try {
      const targetProof = allProofs.find((p: any) => p.id === proofId);
      if (targetProof?.proof_path) {
        const { supabase } = await import("@/integrations/supabase/client");
        const { data: signed } = await supabase.storage
          .from("payment-proofs")
          .createSignedUrl(targetProof.proof_path, 180);

        const url =
          signed?.signedUrl ||
          supabase.storage.from("payment-proofs").getPublicUrl(targetProof.proof_path).data
            .publicUrl;
        if (url) {
          window.open(url, "_blank", "noopener");
          return;
        }
      }
      toast.error("Proof screenshot not available");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to open proof");
    }
  }

  async function downloadOwn(roomId: string, code: string) {
    try {
      const res = await fetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unlock_download", roomId, code }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Download failed");

      json.files.forEach((f: { name: string; url: string }, i: number) => {
        setTimeout(() => window.open(f.url, "_blank", "noopener"), i * 400);
      });
      toast.success(
        json.files.length > 1 ? `Downloading ${json.files.length} files` : "Download started",
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Download failed");
    }
  }

  const pendingProofs = allProofs.filter((p: any) => p.status === "pending");
  const approvedRooms = sellingRooms.filter((r: any) => r.status === "approved");
  const awaitingPaymentRooms = sellingRooms.filter((r: any) => r.status === "awaiting_payment");

  let filteredSelling: any[] = sellingRooms;
  if (filterTab === "action") {
    filteredSelling = sellingRooms.filter((r: any) =>
      allProofs.some((p: any) => p.room_id === r.id && p.status === "pending"),
    );
  } else if (filterTab === "active") {
    filteredSelling = awaitingPaymentRooms;
  } else if (filterTab === "approved") {
    filteredSelling = approvedRooms;
  }

  return (
    <AppShell>
      <div className="space-y-5 sm:space-y-8 w-full">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Transfers & Deliveries
            </h1>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
              Monitor your active transfers, review incoming payment receipts, and manage downloads.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              asChild
              className="gap-1.5 shadow-sm font-semibold text-xs sm:text-sm w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link to="/send">
                <Plus className="size-4" /> New Transfer
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Summary Stat Cards */}
        <div className="grid gap-2.5 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="surface-panel p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Total Transfers
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground mt-0.5 sm:mt-1">
                {sellingRooms.length + buyingRooms.length}
              </p>
            </div>
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers className="size-4 sm:size-5" />
            </div>
          </div>

          <div className="surface-panel p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-amber-500/30 bg-amber-500/5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs text-amber-400 font-medium uppercase tracking-wider">
                Pending Review
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-0.5 sm:mt-1">
                {pendingProofs.length}
              </p>
            </div>
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
              <Clock className="size-4 sm:size-5" />
            </div>
          </div>

          <div className="surface-panel p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs text-emerald-400 font-medium uppercase tracking-wider">
                Completed Transfers
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-0.5 sm:mt-1">
                {approvedRooms.length}
              </p>
            </div>
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="size-4 sm:size-5" />
            </div>
          </div>
        </div>

        {/* Unread Notifications Banner */}
        {unread.length > 0 && (
          <div className="rounded-xl sm:rounded-2xl border border-primary/40 bg-primary/10 p-4 sm:p-5 shadow-sm space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                <Bell className="size-4 text-primary" /> {unread.length} New Update
                {unread.length > 1 ? "s" : ""}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearNotifications}
                className="text-xs h-7 px-2"
              >
                Mark all read
              </Button>
            </div>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              {unread.map((n: any) => (
                <li
                  key={n.id}
                  className="rounded-lg bg-card/80 p-2.5 sm:p-3 border border-border/60"
                >
                  <p className="font-medium text-foreground">{n.title}</p>
                  {n.body && <p className="text-muted-foreground mt-0.5">{n.body}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="border-b border-border/70 pb-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                filterTab === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              All ({sellingRooms.length})
            </button>
            <button
              onClick={() => setFilterTab("action")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1 ${
                filterTab === "action"
                  ? "bg-amber-500 text-black font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Action Needed ({pendingProofs.length})
            </button>
            <button
              onClick={() => setFilterTab("active")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                filterTab === "active"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Awaiting ({awaitingPaymentRooms.length})
            </button>
            <button
              onClick={() => setFilterTab("approved")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                filterTab === "approved"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Approved ({approvedRooms.length})
            </button>
          </div>
        </div>

        {/* Rooms Listing */}
        {isLoading ? (
          <div className="flex min-h-[30vh] items-center justify-center gap-2 text-muted-foreground text-sm">
            <RefreshCw className="size-5 animate-spin text-primary" />
            <span>Loading rooms…</span>
          </div>
        ) : filteredSelling.length === 0 ? (
          <div className="surface-panel p-12 text-center rounded-2xl border border-dashed border-border/80">
            <FileLock2 className="mx-auto size-10 text-muted-foreground/60 mb-3" />
            <h3 className="text-base font-semibold">No rooms match this filter</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Create a new escrow room or switch tabs to see your active deals.
            </p>
            <Button asChild size="sm" className="mt-5">
              <Link to="/send">Send Files</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSelling.map((room) => {
              const proofs = allProofs.filter((p) => p.room_id === room.id);
              const hasPendingProof = proofs.some((p) => p.status === "pending");

              return (
                <article
                  key={room.id}
                  className={`surface-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all ${
                    hasPendingProof
                      ? "border-amber-500/50 bg-amber-500/5 shadow-md ring-1 ring-amber-500/30"
                      : "border-border/80 bg-card hover:border-primary/40 shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-primary border border-border">
                          #{room.room_code}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(room.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground mt-1 break-words">
                        {room.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 break-words">
                        {room.file_name} · Asking{" "}
                        <span className="font-semibold text-foreground">
                          {room.crypto_amount} {room.token_symbol}
                        </span>{" "}
                        on <span className="font-medium text-foreground">{room.chain}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <StatusBadge status={room.status} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const ok = await copyToClipboard(room.room_code);
                          if (ok) {
                            toast.success("Room code copied!");
                          } else {
                            toast.error("Please copy the code manually");
                          }
                        }}
                        className="gap-1 font-mono text-xs h-8"
                      >
                        {room.room_code} <Copy className="size-3 text-primary" />
                      </Button>
                      <Button asChild size="sm" variant="ghost" className="h-8 px-2 text-xs">
                        <Link to="/room/$code" params={{ code: room.room_code }}>
                          <ArrowUpRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Payment Proofs Under Review */}
                  {proofs.length > 0 && (
                    <div className="mt-4 space-y-2.5 pt-4 border-t border-border/70">
                      <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Coins className="size-3.5 text-primary" /> Buyer Payment Submissions (
                        {proofs.length})
                      </p>
                      <ul className="space-y-2">
                        {proofs.map((p: any) => (
                          <li
                            key={p.id}
                            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl p-3 text-xs border ${
                              p.status === "pending"
                                ? "bg-amber-500/10 border-amber-500/30"
                                : "bg-muted/40 border-border"
                            }`}
                          >
                            <div className="min-w-0 space-y-1 w-full sm:w-auto">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Submitted {new Date(p.created_at).toLocaleTimeString()}
                                </span>
                                {p.chain_verified && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                                    <ShieldCheck className="size-3" /> On-Chain Confirmed
                                  </span>
                                )}
                                <StatusBadge status={p.status} />
                              </div>

                              {p.tx_hash && (
                                <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground break-all">
                                  <span>tx: {p.tx_hash}</span>
                                  <a
                                    href={getExplorerUrl(room.chain, p.tx_hash)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline inline-flex items-center shrink-0"
                                  >
                                    <ExternalLink className="size-3 ml-0.5" />
                                  </a>
                                </div>
                              )}
                              {p.verification_detail && (
                                <p className="text-[11px] text-muted-foreground break-words">
                                  {p.verification_detail}
                                </p>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
                              {p.proof_path && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openProof(p.id)}
                                  className="h-8 text-xs gap-1 flex-1 sm:flex-none"
                                >
                                  <Eye className="size-3.5" /> Proof
                                </Button>
                              )}

                              {!p.chain_verified && p.tx_hash && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  disabled={recheckingId === p.id}
                                  onClick={() => recheckProof(p.id)}
                                  className="h-8 text-xs gap-1 flex-1 sm:flex-none"
                                >
                                  <RefreshCw
                                    className={`size-3.5 ${recheckingId === p.id ? "animate-spin" : ""}`}
                                  />
                                  Recheck
                                </Button>
                              )}

                              {p.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => act(p.id, true)}
                                    className="h-8 text-xs gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex-1 sm:flex-none"
                                  >
                                    <Check className="size-3.5" /> Approve & Release
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => act(p.id, false)}
                                    className="h-8 text-xs gap-1"
                                  >
                                    <X className="size-3.5" /> Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => downloadOwn(room.id, room.room_code)}
                      className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <Download className="size-3.5" /> Download my files
                    </Button>
                    <Link
                      to="/room/$code"
                      params={{ code: room.room_code }}
                      className="text-primary hover:underline flex items-center gap-1 font-medium"
                    >
                      Open buyer view <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Buying Rooms Section */}
        {buyingRooms.length > 0 && (
          <section className="space-y-3 pt-6 border-t border-border/70">
            <h2 className="text-base font-bold text-foreground">Rooms You've Joined as Buyer</h2>
            <div className="grid gap-3">
              {buyingRooms.map((room) => (
                <article
                  key={room.id}
                  className="surface-panel p-4 rounded-xl border border-border/80 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <h3 className="font-semibold text-sm">{room.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      #{room.room_code} · {room.crypto_amount} {room.token_symbol} on {room.chain}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={room.status} />
                    <Button asChild size="sm" variant="outline" className="text-xs h-8">
                      <Link to="/room/$code" params={{ code: room.room_code }}>
                        Open Room
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
