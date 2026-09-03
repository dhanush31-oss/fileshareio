import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ensureSession } from "@/lib/session";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/clipboard";
import { getCoinLogo } from "@/components/CoinIcons";
import {
  ArrowDownToLine,
  Check,
  Coins,
  Copy,
  Download,
  ExternalLink,
  File,
  FileArchive,
  FileCode,
  FileImage,
  FileText,
  Lock,
  QrCode,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  UploadCloud,
  Wallet,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/room/$code")({
  head: () => ({
    meta: [
      { title: "Escrow Room | Vaultdrop" },
      {
        name: "description",
        content:
          "Pay in crypto, submit your transaction hash for on-chain verification, and unlock the file bundle once approved.",
      },
      { property: "og:title", content: "Escrow Room | Vaultdrop" },
      {
        property: "og:description",
        content:
          "Pay in crypto, submit your transaction hash for on-chain verification, and unlock the file bundle once approved.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoomPage,
});

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
    return <FileImage className="size-4 text-emerald-400" />;
  }
  if (["js", "ts", "tsx", "jsx", "py", "rs", "go", "cpp", "json", "html", "css"].includes(ext)) {
    return <FileCode className="size-4 text-blue-400" />;
  }
  if (["zip", "rar", "tar", "gz", "7z"].includes(ext)) {
    return <FileArchive className="size-4 text-amber-400" />;
  }
  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) {
    return <FileText className="size-4 text-purple-400" />;
  }
  return <File className="size-4 text-muted-foreground" />;
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getExplorerUrl(chain: string, walletOrTx: string, isTx = false) {
  const c = chain.toLowerCase();
  const path = isTx ? "tx" : "address";
  if (c.includes("base")) return `https://basescan.org/${path}/${walletOrTx}`;
  if (c.includes("polygon") || c.includes("matic"))
    return `https://polygonscan.com/${path}/${walletOrTx}`;
  if (c.includes("arbitrum") || c.includes("arb"))
    return `https://arbiscan.io/${path}/${walletOrTx}`;
  if (c.includes("optimism") || c.includes("op"))
    return `https://optimistic.etherscan.io/${path}/${walletOrTx}`;
  if (c.includes("bsc") || c.includes("bnb")) return `https://bscscan.com/${path}/${walletOrTx}`;
  return `https://etherscan.io/${path}/${walletOrTx}`;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      const base64 = res.includes(",") ? res.split(",")[1] : res;
      resolve(base64 || "");
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

function RoomPage() {
  const { code } = useParams({ from: "/_authenticated/room/$code" });
  const qc = useQueryClient();

  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [txHash, setTxHash] = useState("");
  const [unlockCode, setUnlockCode] = useState(code || "");
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [showWalletQr, setShowWalletQr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (proofFile) {
      const url = URL.createObjectURL(proofFile);
      setProofPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setProofPreviewUrl(null);
    }
  }, [proofFile]);

  useEffect(() => {
    ensureSession();

    // Subscribe to realtime room and payment updates
    const channel = supabase
      .channel(`room-live-${code}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `room_code=eq.${code}` },
        () => {
          qc.invalidateQueries({ queryKey: ["room", code] });
        },
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "payment_proofs" }, () => {
        qc.invalidateQueries({ queryKey: ["room", code] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [code, qc]);

  const roomQuery = useQuery({
    queryKey: ["room", code],
    queryFn: async () => {
      const res = await fetch(`/api/room?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Room not found. Please verify the 6-digit code.");
      }
      return data;
    },
    retry: 2,
    refetchInterval: 3000,
  });

  const room = roomQuery.data?.room;
  const fileList = roomQuery.data?.files || [];
  const proofList = roomQuery.data?.proofs || [];

  async function uploadProof(e: React.FormEvent) {
    e.preventDefault();
    if (!room) return;

    if (!proofFile) {
      toast.error("Please upload a payment screenshot / receipt photo");
      return;
    }

    setBusy(true);
    try {
      const proofBase64 = await fileToBase64(proofFile);

      const res = await fetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_proof",
          roomId: room.id,
          txHash: txHash.trim(),
          note: note.trim(),
          proofName: proofFile.name,
          proofBase64,
          mimeType: proofFile.type || "image/png",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Payment submission failed");
      }

      if (data.chainVerified) {
        toast.success("Payment verified on-chain! The seller has been notified.");
      } else {
        toast.success("Payment proof submitted to seller for approval.");
        if (txHash && data.detail) toast.message(data.detail);
      }

      setProofFile(null);
      setNote("");
      setTxHash("");

      qc.invalidateQueries({ queryKey: ["room", code] });
    } catch (err) {
      console.error("Proof submission error:", err);
      toast.error(err instanceof Error ? err.message : "Payment submission failed");
    } finally {
      setBusy(false);
    }
  }

  async function unlock(fileId?: string) {
    if (!room) return;
    setDownloading(true);
    try {
      const res = await fetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "unlock_download",
          roomId: room.id,
          code: unlockCode || code,
          fileId,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not unlock files");
      }

      data.files.forEach((f: { name: string; url: string }, i: number) => {
        setTimeout(() => window.open(f.url, "_blank", "noopener"), i * 400);
      });
      toast.success(
        data.files.length > 1 ? `Unlocked ${data.files.length} files!` : "Download link opened!",
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not unlock files");
    } finally {
      setDownloading(false);
    }
  }

  if (roomQuery.isLoading) {
    return (
      <AppShell>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted-foreground">
          <RefreshCw className="size-6 animate-spin text-primary" />
          <p className="text-sm font-medium">Opening Escrow Room {code}…</p>
        </div>
      </AppShell>
    );
  }

  if (roomQuery.isError || !room) {
    return (
      <AppShell>
        <div className="surface-panel mx-auto max-w-md p-8 text-center rounded-2xl border border-border/80 shadow-lg">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 mb-3">
            <Lock className="size-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Room Unavailable</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {roomQuery.error instanceof Error
              ? roomQuery.error.message
              : "Room code not found. Please verify the 6-digit code."}
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const isApproved = room.status === "approved";
  const isSubmitted = room.status === "payment_submitted";
  const hasProofs = proofList.length > 0;

  const walletQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=6&data=${room.wallet_address}`;
  const explorerUrl = getExplorerUrl(room.chain, room.wallet_address);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6 w-full">
        {/* Top Status & Timeline Stepper */}
        <div className="surface-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted text-primary border border-border">
                  Transfer #{room.room_code}
                </span>
                <span className="text-xs text-muted-foreground">
                  Created {new Date(room.created_at).toLocaleDateString()}
                </span>
              </div>
              <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-foreground break-words">
                {room.title}
              </h1>
              {room.description && (
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                  {room.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={room.status} />
            </div>
          </div>

          {/* Step Timeline */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-border/60">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-xs">
              <div
                className={`p-1.5 sm:p-2 rounded-lg border transition-all ${
                  isApproved || isSubmitted
                    ? "bg-primary/10 border-primary/40 text-primary font-semibold"
                    : "bg-muted/40 border-primary/50 text-foreground font-semibold"
                }`}
              >
                <span>1. Payment</span>
              </div>
              <div
                className={`p-1.5 sm:p-2 rounded-lg border transition-all ${
                  isApproved
                    ? "bg-primary/10 border-primary/40 text-primary font-semibold"
                    : isSubmitted
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold animate-pulse"
                      : "bg-muted/20 border-border text-muted-foreground"
                }`}
              >
                <span>2. Verification Pending</span>
              </div>
              <div
                className={`p-1.5 sm:p-2 rounded-lg border transition-all ${
                  isApproved
                    ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400 font-bold shadow-sm"
                    : "bg-muted/20 border-border text-muted-foreground opacity-60"
                }`}
              >
                <span>3. Ready to Download</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Requirements (If not yet approved) */}
        {!isApproved && (
          <div className="surface-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground">
                <Coins className="size-4 sm:size-5 text-primary" /> Payment Instructions
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
                {room.chain}
              </span>
            </div>

            {/* Required Amount Card */}
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                {getCoinLogo(room.token_symbol, "size-8 shrink-0")}
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Exact Amount to Send:</p>
                  <div className="text-xl sm:text-2xl font-extrabold text-primary font-mono mt-0.5">
                    {room.crypto_amount} {room.token_symbol}
                  </div>
                  {room.price_amount > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      (Approx. {room.price_amount} {room.price_currency})
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWalletQr(!showWalletQr)}
                className="gap-1.5 text-xs self-start sm:self-auto border-primary/40 hover:bg-primary/10 text-foreground"
              >
                <QrCode className="size-3.5 text-primary" />{" "}
                {showWalletQr ? "Hide QR" : "Wallet QR"}
              </Button>
            </div>

            {/* Receiving Wallet Address */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Seller's Receiving Wallet ({room.chain}):
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 rounded-lg border border-border bg-muted/40 px-3 py-2.5 font-mono text-xs text-foreground break-all select-all min-w-0">
                  {room.wallet_address}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant={copiedWallet ? "default" : "outline"}
                    size="sm"
                    onClick={async () => {
                      const ok = await copyToClipboard(room.wallet_address);
                      if (ok) {
                        setCopiedWallet(true);
                        setTimeout(() => setCopiedWallet(false), 2000);
                        toast.success("Wallet address copied!");
                      } else {
                        toast.error("Please copy the wallet address manually");
                      }
                    }}
                    className="flex-1 sm:flex-none gap-1.5 h-9 font-semibold"
                  >
                    {copiedWallet ? (
                      <Check className="size-3.5 text-primary-foreground" />
                    ) : (
                      <Copy className="size-3.5 text-primary" />
                    )}
                    {copiedWallet ? "Copied" : "Copy Wallet"}
                  </Button>
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                    title="View on Block Explorer"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Wallet QR Code dropdown */}
            {showWalletQr && (
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center animate-in fade-in duration-200">
                <img
                  src={walletQrUrl}
                  alt="Wallet Address QR"
                  className="size-40 sm:size-44 rounded-lg bg-white p-2"
                />
                <p className="mt-2 text-xs text-center text-muted-foreground">
                  Scan with MetaMask, Rainbow, or mobile wallet to pay
                </p>
              </div>
            )}

            {room.payment_instructions && (
              <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground break-words">
                <span className="font-semibold text-foreground">Seller note: </span>
                {room.payment_instructions}
              </div>
            )}
          </div>
        )}

        {/* Payment Verification Pending Banner (When payment has been submitted & awaiting approval) */}
        {isSubmitted && !isApproved && (
          <div className="surface-panel p-5 sm:p-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-foreground space-y-4 shadow-sm animate-in fade-in">
            <div className="flex items-center gap-3.5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <RefreshCw className="size-5 animate-spin" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                    Payment Verification Pending
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Phase 2 Active
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your payment has been submitted and is awaiting sender review & approval. Once approved, this screen will automatically unlock your files.
                </p>
              </div>
            </div>

            {proofList.length > 0 && (
              <div className="rounded-xl border border-border/70 bg-card/70 p-3.5 text-xs space-y-2 font-mono">
                {proofList[0].tx_hash && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-muted-foreground">
                    <span className="text-foreground font-semibold">Submitted TxHash:</span>
                    <span className="text-primary truncate max-w-full sm:max-w-xs">{proofList[0].tx_hash}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Review Status:</span>
                  <span className="text-amber-400 font-semibold">⏳ Awaiting Sender Approval</span>
                </div>
              </div>
            )}

            {/* Live Polling Status Note */}
            <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 text-foreground font-medium">
                <ShieldCheck className="size-4 text-emerald-400" /> Live Realtime Sync Active
              </span>
              <span>This page will automatically unlock your files once approved by the sender.</span>
            </div>
          </div>
        )}

        {/* Submit Proof & Transaction Hash (Only if not submitted and not approved) */}
        {!isApproved && !isSubmitted && (
          <form
            onSubmit={uploadProof}
            className="surface-panel space-y-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border/80 shadow-md"
          >
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-foreground">
                Submit Payment for Verification
              </h2>
              <p className="text-xs text-muted-foreground">
                Send crypto to the address above, then submit your transaction hash to enter Phase 2.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <Label htmlFor="tx" className="text-xs font-medium">
                Transaction Hash (txHash)
              </Label>
              <Input
                id="tx"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value.trim())}
                placeholder="0x... (paste transaction hash from wallet receipt)"
                className="font-mono text-xs bg-card/60 h-10"
              />
              <p className="text-[11px] text-muted-foreground">
                Paste the transaction hash from your wallet receipt.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
                Payment Screenshot / Receipt <span className="text-destructive font-bold">* (Required)</span>
              </Label>
              
              {!proofPreviewUrl ? (
                <label
                  htmlFor="proof"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-5 text-xs text-muted-foreground hover:border-primary hover:bg-primary/10 transition-all text-center"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <UploadCloud className="size-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Click to upload payment screenshot</span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">PNG, JPG, JPEG, WEBP or PDF receipt</p>
                  </div>
                </label>
              ) : (
                <div className="relative rounded-xl border border-primary/40 bg-card p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {proofFile?.type.startsWith("image/") && proofPreviewUrl ? (
                      <img
                        src={proofPreviewUrl}
                        alt="Payment Proof Preview"
                        className="size-14 rounded-lg object-cover border border-border bg-black/40 shrink-0"
                      />
                    ) : (
                      <div className="flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 border border-primary/20">
                        <FileImage className="size-6" />
                      </div>
                    )}
                    <div className="min-w-0 text-xs">
                      <p className="font-semibold text-foreground truncate">{proofFile?.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {proofFile ? formatBytes(proofFile.size) : ""} · Ready for seller review
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setProofFile(null)}
                    className="text-xs text-destructive hover:bg-destructive/10 shrink-0 h-8 px-2"
                  >
                    <X className="size-4 mr-1" /> Remove
                  </Button>
                </div>
              )}

              <input
                id="proof"
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                required
                onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="note" className="text-xs font-medium">
                Note for Seller (optional)
              </Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Sent funds from my wallet"
                className="bg-card/60 text-xs min-h-[3rem]"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={busy}
                className="w-full shadow-md font-semibold h-11 bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
              >
                {busy ? "Submitting Verification…" : "Submit Payment for Verification"}
              </Button>
            </div>
          </form>
        )}

        {/* Submissions Log */}
        {hasProofs && (
          <div className="surface-panel p-6 rounded-2xl border border-border/80 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">
              Payment Submissions ({proofList.length})
            </h2>
            <ul className="space-y-2.5 text-xs">
              {proofList.map((p: any) => (
                <li
                  key={p.id}
                  className="rounded-lg border border-border/70 bg-card p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">
                      {new Date(p.created_at).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      {p.chain_verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                          <ShieldCheck className="size-3" /> On-Chain Confirmed
                        </span>
                      )}
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                  {p.tx_hash && (
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground truncate">
                      <span>tx: {p.tx_hash}</span>
                      <a
                        href={getExplorerUrl(room.chain, p.tx_hash, true)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center"
                      >
                        <ExternalLink className="size-3 ml-0.5" />
                      </a>
                    </div>
                  )}
                  {p.verification_detail && (
                    <p className="text-[11px] text-muted-foreground">{p.verification_detail}</p>
                  )}
                  {p.review_note && (
                    <p className="text-[11px] text-foreground font-medium bg-muted/40 p-2 rounded">
                      Seller Review: {p.review_note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Download Section */}
        <div
          className={`surface-panel p-5 sm:p-7 rounded-2xl border transition-all duration-200 ${
            isApproved ? "border-border bg-card shadow-lg" : "border-border/80 bg-muted/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
              {isApproved ? (
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="size-4" />
                </span>
              ) : (
                <File className="size-4 text-muted-foreground" />
              )}
              {isApproved ? "Files Ready for Download" : "Transfer Files"}
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              {fileList.length || 1} file{(fileList.length || 1) > 1 ? "s" : ""} ·{" "}
              {formatBytes(room.file_size)}
            </span>
          </div>

          {isApproved ? (
            <div className="mt-4 space-y-4 animate-in fade-in duration-200">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Payment verified. Click below to download the files via secure cloud delivery.
              </p>

              <Button
                size="lg"
                onClick={() => unlock()}
                disabled={downloading}
                className="w-full gap-2 font-semibold h-11 text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
              >
                <ArrowDownToLine className="size-4" />
                {downloading ? "Generating Download Links…" : "Download All Files"}
              </Button>

              {fileList.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-medium text-muted-foreground">Individual Files:</p>
                  <ul className="space-y-2">
                    {fileList.map((f: any) => (
                      <li
                        key={f.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/80 bg-card p-3 text-sm hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {getFileIcon(f.file_name)}
                          <span className="truncate text-xs font-medium">{f.file_name}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatBytes(f.file_size)}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => unlock(f.id)}
                            className="h-7 text-xs gap-1"
                          >
                            <Download className="size-3" /> Get
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              Files are held in private encrypted cloud storage and will be released immediately
              once the seller confirms the transfer.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
