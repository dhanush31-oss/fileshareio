import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/clipboard";
import { getCoinLogo } from "@/components/CoinIcons";
import {
  Check,
  ChevronDown,
  Coins,
  Copy,
  Eye,
  File,
  FileArchive,
  FileCode,
  FileImage,
  FileText,
  FolderLock,
  Layers,
  Plus,
  QrCode,
  Share2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Wallet,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/send")({
  head: () => ({
    meta: [
      { title: "Send Files Securely | Vaultdrop" },
      {
        name: "description",
        content:
          "Upload files, set your crypto price and wallet, and get a 6-digit room code to share with your buyer.",
      },
      { property: "og:title", content: "Send Files Securely | Vaultdrop" },
      {
        property: "og:description",
        content:
          "Upload files, set your crypto price and wallet, and get a 6-digit room code to share with your buyer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SendPage,
});

const NETWORKS = [
  { id: "Ethereum", label: "Ethereum", defaultToken: "ETH" },
  { id: "Solana", label: "Solana", defaultToken: "SOL" },
  { id: "Bitcoin", label: "Bitcoin", defaultToken: "BTC" },
  { id: "Base", label: "Base", defaultToken: "ETH" },
  { id: "Polygon", label: "Polygon", defaultToken: "MATIC" },
  { id: "BNB Chain", label: "BNB Smart Chain", defaultToken: "BNB" },
  { id: "Arbitrum", label: "Arbitrum", defaultToken: "ETH" },
  { id: "Optimism", label: "Optimism", defaultToken: "ETH" },
  { id: "Other", label: "Other / Custom Network", defaultToken: "USDT" },
];

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

const POPULAR_ASSETS = [
  { id: "ETH", symbol: "ETH", name: "Ethereum", network: "Ethereum", icon: "🔷", price: 2680 },
  { id: "USDT", symbol: "USDT", name: "Tether USD", network: "Ethereum", icon: "🟢", price: 1.0 },
  { id: "USDC", symbol: "USDC", name: "USD Coin", network: "Base", icon: "🔵", price: 1.0 },
  { id: "SOL", symbol: "SOL", name: "Solana", network: "Solana", icon: "🟣", price: 145 },
  { id: "BNB", symbol: "BNB", name: "BNB", network: "BNB Chain", icon: "🟡", price: 560 },
  { id: "BTC", symbol: "BTC", name: "Bitcoin", network: "Bitcoin", icon: "🟠", price: 62500 },
  { id: "POLYGON", symbol: "MATIC", name: "Polygon", network: "Polygon", icon: "🟣", price: 0.42 },
  { id: "CUSTOM", symbol: "OTHER", name: "Custom Asset", network: "Other", icon: "✨", price: 1.0 },
];

function getWalletBadge(address: string) {
  const clean = address.trim();
  if (!clean) return null;
  if (/^0x[a-fA-F0-9]{40}$/.test(clean)) {
    return {
      valid: true,
      label: "✓ Valid EVM Address (Ethereum · Base · Polygon · BNB · Arb)",
      color: "text-primary border-primary/40 bg-primary/10",
    };
  }
  if (/^[1-9A-HJ-NP-za-km-z]{32,44}$/.test(clean)) {
    return {
      valid: true,
      label: "✓ Valid Solana Address",
      color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    };
  }
  if (/^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(clean)) {
    return {
      valid: true,
      label: "✓ Valid Bitcoin Address",
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    };
  }
  return {
    valid: false,
    label: "Custom / Unchecked Format",
    color: "text-muted-foreground border-border bg-muted/40",
  };
}

function SendPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [network, setNetwork] = useState("Ethereum");
  const [customNetwork, setCustomNetwork] = useState("");
  const [currencyName, setCurrencyName] = useState("ETH");
  const [totalAmount, setTotalAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [activeTemplateName, setActiveTemplateName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get("template");
    const pTitle = urlParams.get("title");
    const pPrice = urlParams.get("price");
    const pCurrency = urlParams.get("currency");
    const pInstructions = urlParams.get("instructions");
    const pDescription = urlParams.get("description");

    if (pTitle) setTitle(pTitle);
    if (pPrice) setTotalAmount(pPrice);
    if (pCurrency) setCurrencyName(pCurrency);
    if (pInstructions) setInstructions(pInstructions);
    if (pDescription) setDescription(pDescription);
    if (templateId) {
      setActiveTemplateName(pTitle || "Custom Industry Template");
      toast.success("Loaded template parameters into escrow creator");
    }
  }, []);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    setFiles((prev) => {
      const merged = [...prev];
      for (const f of incoming) {
        if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f);
      }
      return merged;
    });
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  async function openFilePicker(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // 1. Modern Window File System Access API (Native macOS Finder / Windows Explorer)
    if (typeof window !== "undefined" && typeof (window as any).showOpenFilePicker === "function") {
      try {
        const handles = await (window as any).showOpenFilePicker({
          multiple: true,
        });
        const pickedFiles: File[] = [];
        for (const handle of handles) {
          if (handle.kind === "file") {
            const file = await handle.getFile();
            pickedFiles.push(file);
          }
        }
        if (pickedFiles.length > 0) {
          setFiles((prev) => {
            const merged = [...prev];
            for (const f of pickedFiles) {
              if (!merged.some((m) => m.name === f.name && m.size === f.size)) {
                merged.push(f);
              }
            }
            return merged;
          });
          return;
        }
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.warn("showOpenFilePicker notice:", err);
      }
    }

    // 2. Fallback: Native HTML input click
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    } else {
      const temp = document.createElement("input");
      temp.type = "file";
      temp.multiple = true;
      temp.onchange = (ev: any) => {
        addFiles(ev.target.files);
      };
      temp.click();
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please attach at least one file to create transfer");
      fileInputRef.current?.click();
      return;
    }

    if (!wallet.trim()) {
      toast.error("Please enter your receiving wallet address");
      return;
    }

    const effectiveWallet = wallet.trim();
    const effectiveAmount = totalAmount.trim() ? Number(totalAmount) : 0;
    const effectiveCurrency = currencyName.trim() || "ETH";
    const effectiveTitle = title.trim() || files[0]?.name || "Confidential File Transfer";

    setBusy(true);
    setUploadProgress(15);
    toast.loading("Encrypting files & storing in Supabase...", { id: "escrow-upload" });

    try {
      const serializedFiles: { name: string; base64: string; size: number; mimeType: string }[] =
        [];
      const totalCount = files.length;

      for (let i = 0; i < totalCount; i++) {
        const file = files[i];
        if (!file) continue;
        setUploadProgress(Math.round(((i + 0.5) / totalCount) * 50) + 15);

        const base64 = await fileToBase64(file);
        serializedFiles.push({
          name: file.name,
          base64,
          size: file.size,
          mimeType: file.type || "application/octet-stream",
        });

        setUploadProgress(Math.round(((i + 1) / totalCount) * 50) + 20);
      }

      setUploadProgress(75);
      const activeNetwork =
        network === "Other" && customNetwork.trim() ? customNetwork.trim() : network;

      // Smooth progress interval while awaiting server response
      const progressTimer = setInterval(() => {
        setUploadProgress((curr) => {
          if (curr === null || curr >= 92) return curr;
          return curr + 4;
        });
      }, 300);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: effectiveTitle,
            description: description.trim(),
            paymentInstructions: instructions.trim(),
            priceAmount: effectiveAmount,
            priceCurrency: effectiveCurrency.toUpperCase(),
            walletAddress: effectiveWallet,
            chain: activeNetwork,
            tokenSymbol: effectiveCurrency.toUpperCase(),
            cryptoAmount: effectiveAmount,
            files: serializedFiles,
          }),
        });

        clearInterval(progressTimer);
        setUploadProgress(95);

        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Failed to create escrow room");
        }

        setUploadProgress(100);
        setCode(data.roomCode);
        toast.success(`Escrow Room #${data.roomCode} created in Supabase!`, {
          id: "escrow-upload",
        });
      } finally {
        clearInterval(progressTimer);
      }
    } catch (err) {
      console.error("[SendPage] Error locking files & creating room:", err);
      toast.error(err instanceof Error ? err.message : "Failed to create room", {
        id: "escrow-upload",
      });
    } finally {
      setBusy(false);
      setUploadProgress(null);
    }
  }

  // Success state after room is created
  if (code) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = `${origin}/room/${code}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(shareUrl)}`;
    const shareText = `Unlock "${title || "files"}" on Vaultdrop: ${shareUrl}`;

    return (
      <AppShell>
        <div className="mx-auto max-w-lg surface-panel p-6 sm:p-8 text-center rounded-2xl border border-border/80 shadow-xl">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <Check className="size-6" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Transfer Link Created
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
            {files.length} file{files.length > 1 ? "s" : ""} uploaded securely. Share this 6-digit
            code with your recipient.
          </p>

          {/* 6-Digit Code Box */}
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Transfer Code
            </p>
            <div className="mt-2 font-mono text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-primary select-all">
              {code}
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button
                variant={copiedCode ? "default" : "outline"}
                size="sm"
                onClick={async () => {
                  const ok = await copyToClipboard(code);
                  if (ok) {
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                    toast.success("Transfer code copied!");
                  } else {
                    toast.error("Please copy the code manually");
                  }
                }}
                className="gap-1.5 font-semibold"
              >
                {copiedCode ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copiedCode ? "Copied!" : "Copy Code"}
              </Button>

              <Button
                variant={copiedUrl ? "default" : "outline"}
                size="sm"
                onClick={async () => {
                  const ok = await copyToClipboard(shareUrl);
                  if (ok) {
                    setCopiedUrl(true);
                    setTimeout(() => setCopiedUrl(false), 2000);
                    toast.success("Share link copied!");
                  } else {
                    toast.error("Please copy the link manually");
                  }
                }}
                className="gap-1.5 font-semibold"
              >
                {copiedUrl ? <Check className="size-3.5" /> : <Share2 className="size-3.5" />}
                {copiedUrl ? "Link Copied!" : "Copy Link"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQr(!showQr)}
                className="gap-1.5 font-semibold"
              >
                <QrCode className="size-3.5" /> {showQr ? "Hide QR" : "QR Code"}
              </Button>
            </div>
          </div>

          {/* QR Code view */}
          {showQr && (
            <div className="mt-4 rounded-xl border border-border bg-card p-4 flex flex-col items-center animate-in fade-in duration-200">
              <img src={qrUrl} alt="Transfer QR Code" className="size-44 rounded-lg bg-white p-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                Scan on phone to open transfer directly
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button
              asChild
              className="flex-1 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/room/$code" params={{ code }}>
                Open Transfer Room
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCode(null);
                setFiles([]);
                setTitle("");
                setDescription("");
                setTotalAmount("");
              }}
              className="flex-1 font-semibold"
            >
              Send More Files
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl w-full space-y-4 sm:space-y-6">
        <div>
          {activeTemplateName && (
            <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold">
              <Sparkles className="size-3.5" /> Template: {activeTemplateName}
            </div>
          )}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Create a File Transfer
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Upload your files, set your recipient requirements, and generate a secure 6-digit
            transfer code.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 sm:space-y-6 surface-panel p-4 sm:p-7 rounded-2xl border border-border/80 shadow-md"
        >
          {/* File Upload Zone */}
          <div className="space-y-3">
            <Label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Files to Send</span>
              {files.length > 0 && (
                <span className="text-xs text-muted-foreground font-normal">
                  {files.length} file{files.length > 1 ? "s" : ""} · {formatBytes(totalSize)}
                </span>
              )}
            </Label>

            <div
              role="button"
              tabIndex={0}
              onClick={openFilePicker}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFilePicker();
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 select-none ${
                isDragging
                  ? "border-primary bg-primary/10 scale-[1.01]"
                  : "border-border/80 bg-muted/20 hover:border-primary/60 hover:bg-muted/40"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />

              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary pointer-events-none">
                <UploadCloud className="size-6" />
              </div>
              <div className="pointer-events-none">
                <p className="text-sm font-semibold text-foreground">
                  Click to browse or drag & drop files
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Documents, code, images, archives — select multiple files
                </p>
              </div>
            </div>

            {/* Selected File List */}
            {files.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>Selected files ({files.length})</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-primary hover:underline font-medium text-xs"
                  >
                    <Plus className="size-3" /> Add more
                  </button>
                </div>

                <ul className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {files.map((f, i) => (
                    <li
                      key={`${f.name}-${i}`}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/60 px-3 py-2 text-sm transition-all hover:bg-card"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {getFileIcon(f.name)}
                        <span className="truncate text-xs font-medium text-foreground">
                          {f.name}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                        <span>{formatBytes(f.size)}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${f.name}`}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bundle Title & Description */}
          <div className="space-y-4 pt-2 border-t border-border/60">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-semibold">
                Transfer Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Design Assets & Source Code"
                className="bg-card text-xs font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-semibold flex justify-between">
                <span>Description (optional)</span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  Shown to recipient before downloading
                </span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add optional notes about the files in this transfer..."
                className="bg-card text-xs min-h-[4.5rem]"
              />
            </div>
          </div>

          {/* Clean & Professional Payment Station */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Coins className="size-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">
                    Payment & Receiving Terms
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Select an asset or specify custom token requirements
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: 1-Tap Quick Crypto Asset Chips */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>1. Select Asset</span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  Auto-sets network
                </span>
              </Label>
              <div className="grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 gap-2">
                {POPULAR_ASSETS.map((asset) => {
                  const isSelected = currencyName.toUpperCase() === asset.symbol.toUpperCase();
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => {
                        setCurrencyName(asset.symbol);
                        setNetwork(asset.network);
                      }}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 text-left ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/40 shadow-sm"
                          : "border-border/80 bg-muted/20 hover:border-border hover:bg-muted/40 text-foreground"
                      }`}
                    >
                      {getCoinLogo(asset.symbol, "size-5 shrink-0")}
                      <div className="min-w-0">
                        <p className="truncate font-bold leading-none">{asset.symbol}</p>
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {asset.name}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Network & Amount Section */}
            <div className="grid gap-3 sm:grid-cols-3">
              {/* Network */}
              <div className="space-y-1.5">
                <Label htmlFor="network" className="text-xs font-semibold text-foreground">
                  2. Network
                </Label>
                <select
                  id="network"
                  value={network}
                  onChange={(e) => {
                    setNetwork(e.target.value);
                    const match = NETWORKS.find((n) => n.id === e.target.value);
                    if (match && match.defaultToken) {
                      setCurrencyName(match.defaultToken);
                    }
                  }}
                  className="h-10 w-full rounded-xl border border-input bg-card px-3 text-xs font-medium transition-colors focus:border-primary focus:outline-none"
                >
                  {NETWORKS.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.label}
                    </option>
                  ))}
                </select>
                {network === "Other" && (
                  <Input
                    placeholder="Enter network name"
                    value={customNetwork}
                    onChange={(e) => setCustomNetwork(e.target.value)}
                    className="text-xs mt-1 h-8"
                  />
                )}
              </div>

              {/* Currency Name / Token Symbol */}
              <div className="space-y-1.5">
                <Label htmlFor="currencyName" className="text-xs font-semibold text-foreground">
                  Token Symbol
                </Label>
                <Input
                  id="currencyName"
                  value={currencyName}
                  onChange={(e) => setCurrencyName(e.target.value.toUpperCase())}
                  placeholder="e.g. ETH, USDT"
                  className="font-mono text-xs uppercase bg-card h-10 font-bold"
                />
              </div>

              {/* Total Amount & Live USD Estimate */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="totalAmount"
                  className="text-xs font-semibold text-foreground flex items-center justify-between"
                >
                  <span>Amount</span>
                  {totalAmount && !isNaN(Number(totalAmount)) && (
                    <span className="text-[10px] text-primary font-mono font-medium">
                      ≈ $
                      {(
                        Number(totalAmount) *
                        (POPULAR_ASSETS.find((a) => a.symbol === currencyName)?.price || 1.0)
                      ).toLocaleString()}{" "}
                      USD
                    </span>
                  )}
                </Label>
                <Input
                  id="totalAmount"
                  type="number"
                  min="0"
                  step="any"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="e.g. 8"
                  className="bg-card text-xs font-mono font-bold h-10"
                />
              </div>
            </div>

            {/* Step 3: Receiving Wallet Address */}
            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between">
                <Label htmlFor="wallet" className="text-xs font-semibold text-foreground">
                  3. Your Receiving Wallet Address
                </Label>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      if (text) {
                        setWallet(text.trim());
                        toast.success("Wallet address pasted!");
                      }
                    } catch {
                      toast.error("Please paste directly into the box");
                    }
                  }}
                  className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  <Copy className="size-3" /> Paste from Clipboard
                </button>
              </div>

              <div className="relative">
                <Input
                  id="wallet"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value.trim())}
                  placeholder="0x... or Solana / Bitcoin address"
                  className="font-mono text-xs bg-card h-10 pr-10"
                />
                <Wallet className="absolute right-3 top-2.5 size-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Address Validation Indicator */}
              {(() => {
                const badge = getWalletBadge(wallet);
                if (!badge) return null;
                return (
                  <div
                    className={`mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono ${badge.color}`}
                  >
                    <span>{badge.label}</span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Optional Extra Instructions */}
          <div className="rounded-xl border border-border/70">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-xs font-medium transition-colors hover:bg-muted/40"
            >
              <span>Additional Transfer Instructions (optional)</span>
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform duration-200 ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
            </button>
            {showAdvanced && (
              <div className="p-4 pt-0">
                <Textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Please include your transaction hash for instant verification..."
                  className="bg-card text-xs"
                />
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {busy && uploadProgress !== null && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  Uploading & Preparing Transfer…
                </span>
                <span className="font-mono font-bold text-primary text-sm">{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-200 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            onClick={(e) => {
              if (!busy) submit(e);
            }}
            className="w-full text-sm sm:text-base font-semibold h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer"
            disabled={busy}
          >
            {busy ? "Uploading Files…" : "Create Transfer Link"}
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
