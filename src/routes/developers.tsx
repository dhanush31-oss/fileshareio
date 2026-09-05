import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Eye,
  FileCode,
  FileJson,
  Layers,
  Play,
  Server,
  Sparkles,
  Terminal,
  Webhook,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Developer API & Cloud SDK | Vaultdrop" },
      {
        name: "description",
        content:
          "Integrate international digital asset escrow into your applications. Programmatic cloud storage uploads, escrow room creation, and webhooks.",
      },
      { property: "og:title", content: "Developer API & Cloud SDK | Vaultdrop" },
      {
        property: "og:description",
        content:
          "Integrate international digital asset escrow into your applications. Programmatic cloud storage uploads, escrow room creation, and webhooks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DevelopersPage,
});

const CODE_EXAMPLES = {
  typescript: `// 1. Upload Encrypted Asset to Private Cloud Storage & Create Escrow Room
import { createClient } from "@vaultdrop/cloud-sdk";

const cloud = createClient(
  process.env.CLOUD_SERVER_URL!,
  process.env.CLOUD_SERVICE_ROLE_KEY!
);

async function createEscrowDelivery() {
  const fileBuffer = Buffer.from("/* confidential source archive */");
  const fileName = "saas-codebase-v2.zip";
  const storagePath = \`\${userId}/\${crypto.randomUUID()}-\${fileName}\`;

  // Upload to private cloud 'escrow-files' bucket
  const { error: uploadError } = await cloud.storage
    .from("escrow-files")
    .upload(storagePath, fileBuffer, { contentType: "application/zip" });

  if (uploadError) throw uploadError;

  // Insert room in cloud database with conditional settlement
  const res = await fetch("https://api.vaultdrop.io/api/room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "create",
      title: "Enterprise SaaS Microservice Handover",
      walletAddress: "0x71C...394B",
      chain: "eth-mainnet",
      tokenSymbol: "USDT",
      cryptoAmount: 4500,
      priceAmount: 4500,
      priceCurrency: "USD",
      files: [{ path: storagePath, name: fileName, size: fileBuffer.length }]
    })
  });

  const { roomCode } = await res.json();
  console.log("Secure Room Code Generated:", roomCode); // e.g. 849201
}`,

  python: `# Python SDK - Automated Escrow Delivery & Signed Cloud Download
import requests
import base64

API_URL = "https://api.vaultdrop.io/api"

# 1. Base64 Upload File
with open("dataset_v1.tar.gz", "rb") as f:
    encoded = base64.b64encode(f.read()).decode("utf-8")

upload_res = requests.post(f"{API_URL}/upload", json={
    "fileName": "dataset_v1.tar.gz",
    "mimeType": "application/gzip",
    "fileBase64": encoded,
    "size": 18400000
})
file_data = upload_res.json()

# 2. Create Escrow Room
room_res = requests.post(f"{API_URL}/room", json={
    "action": "create",
    "title": "LLM Fine-Tuned Weights v1",
    "walletAddress": "0x429...120C",
    "chain": "polygon-mainnet",
    "tokenSymbol": "USDC",
    "cryptoAmount": 2800,
    "files": [file_data]
})

print("Room Code:", room_res.json()["roomCode"])`,

  curl: `# cURL - Create Room via HTTP REST API
curl -X POST https://api.vaultdrop.io/api/room \\
  -H "Content-Type: application/json" \\
  -d '{
    "action": "create",
    "title": "Commercial M&A Data Room",
    "walletAddress": "0x123...abc",
    "chain": "eth-mainnet",
    "tokenSymbol": "ETH",
    "cryptoAmount": 5.5,
    "priceAmount": 15000,
    "priceCurrency": "USD",
    "files": [{
      "path": "seller_id/nda_dossier.pdf",
      "name": "nda_dossier.pdf",
      "size": 4200000,
      "mimeType": "application/pdf"
    }]
  }'`,

  go: `// Go - Programmatic Cloud Escrow Room Polling
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type RoomQuery struct {
	Code string \`json:"code"\`
}

func main() {
	reqBody, _ := json.Marshal(RoomQuery{Code: "849201"})
	resp, err := http.Post("https://api.vaultdrop.io/api/room", "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("Room response status:", resp.Status)
}`,
};

const SUPABASE_SCHEMA_SNIPPET = `-- Private Cloud Database Schema with Row Level Security (RLS)
CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text NOT NULL UNIQUE,
  seller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  buyer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  price_amount numeric(12,2) NOT NULL DEFAULT 0,
  price_currency text NOT NULL DEFAULT 'USD',
  wallet_address text NOT NULL DEFAULT '',
  chain text NOT NULL DEFAULT 'eth-mainnet',
  token_symbol text NOT NULL DEFAULT 'ETH',
  crypto_amount numeric NOT NULL DEFAULT 0,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  mime_type text NOT NULL DEFAULT 'application/octet-stream',
  status public.room_status NOT NULL DEFAULT 'awaiting_payment',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Cloud Storage Bucket & RLS Policy
INSERT INTO storage.buckets (id, name, public) VALUES ('escrow-files', 'escrow-files', false);

CREATE POLICY "seller reads and uploads own files"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'escrow-files' AND (storage.foldername(name))[1] = auth.uid()::text);`;

function DevelopersPage() {
  const [selectedLang, setSelectedLang] = useState<"typescript" | "python" | "curl" | "go">(
    "typescript",
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Playground State
  const [playgroundEndpoint, setPlaygroundEndpoint] = useState<
    "create_room" | "get_room" | "verify_proof"
  >("create_room");
  const [playgroundLoading, setPlaygroundLoading] = useState(false);
  const [playgroundResponse, setPlaygroundResponse] = useState<string | null>(null);

  const copySnippet = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    toast.success("Snippet copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runPlayground = () => {
    setPlaygroundLoading(true);
    setTimeout(() => {
      setPlaygroundLoading(false);
      if (playgroundEndpoint === "create_room") {
        setPlaygroundResponse(
          JSON.stringify(
            {
              ok: true,
              roomCode: "948201",
              status: "awaiting_payment",
              escrowUrl: "https://vaultdrop.io/room/948201",
              storageBucket: "escrow-files",
              signedTtl: "3600 seconds after approval",
            },
            null,
            2,
          ),
        );
      } else if (playgroundEndpoint === "get_room") {
        setPlaygroundResponse(
          JSON.stringify(
            {
              ok: true,
              room: {
                room_code: "948201",
                title: "Enterprise SaaS Handover",
                status: "approved",
                crypto_amount: 4500,
                token_symbol: "USDT",
                chain: "eth-mainnet",
                file_count: 2,
                unlocked_download_urls: [
                  "https://vault.cloud.vaultdrop.io/storage/v1/object/sign/escrow-files/...",
                ],
              },
            },
            null,
            2,
          ),
        );
      } else {
        setPlaygroundResponse(
          JSON.stringify(
            {
              ok: true,
              chain_verified: true,
              oracle: "Covalent GoldRush Engine",
              tx_hash: "0x89f...32a",
              block_height: 19842010,
              confirmations: 42,
              status: "payment_approved",
            },
            null,
            2,
          ),
        );
      }
      toast.success("API Playground test executed");
    }, 600);
  };

  return (
    <AppShell>
      {/* Developer Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
          <Terminal className="size-3.5" /> Developer Platform & Cloud SDK
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Build Programmatic Escrow Workflows
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Full REST API and Private Cloud Storage integration for automating high-value file deliveries,
          on-chain smart release conditions, and signed download URLs.
        </p>
      </div>

      {/* 3 Core Architecture Pillars */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="surface-panel p-5 rounded-2xl border border-border/80 space-y-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Database className="size-5" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Private Cloud Storage Engine</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Direct integration with private `escrow-files` and `payment-proofs` buckets with
            cryptographic RLS isolation.
          </p>
        </div>

        <div className="surface-panel p-5 rounded-2xl border border-border/80 space-y-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Zap className="size-5" />
          </div>
          <h3 className="font-bold text-sm text-foreground">On-Chain Oracle Engine</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Live blockchain listener monitors EVM & Solana networks via Covalent GoldRush API for
            zero-fraud settlements.
          </p>
        </div>

        <div className="surface-panel p-5 rounded-2xl border border-border/80 space-y-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Webhook className="size-5" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Real-Time Webhooks</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Instant HTTPS webhook events for `room.created`, `proof.submitted`, `payment.verified`,
            and `file.downloaded`.
          </p>
        </div>
      </div>

      {/* Code SDK Generator Section */}
      <div className="mt-12 surface-panel rounded-2xl border border-border/80 overflow-hidden shadow-xl">
        {/* Header with Lang Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 border-b border-border/80 bg-muted/30">
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-primary" />
            <span className="text-xs font-bold text-foreground">
              Multi-Language Escrow SDK Snippet
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {(["typescript", "python", "curl", "go"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-colors ${
                  selectedLang === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Code Content */}
        <div className="relative p-4 sm:p-6 bg-black/60 font-mono text-xs text-muted-foreground overflow-x-auto">
          <button
            type="button"
            onClick={() => copySnippet(CODE_EXAMPLES[selectedLang], "sdk")}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/90 border border-border/80 text-foreground text-xs hover:bg-muted transition-colors shadow-md"
          >
            {copiedKey === "sdk" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span>Copy Code</span>
          </button>
          <pre className="text-foreground/90 whitespace-pre leading-relaxed pt-8 sm:pt-0">
            {CODE_EXAMPLES[selectedLang]}
          </pre>
        </div>
      </div>

      {/* Interactive API Playground */}
      <div className="mt-12 surface-panel p-5 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Server className="size-5 text-primary" /> Interactive REST API Playground
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Simulate API requests and view real-time Cloud API JSON responses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={playgroundEndpoint}
              onChange={(e) =>
                setPlaygroundEndpoint(e.target.value as "create_room" | "get_room" | "verify_proof")
              }
              className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border text-xs font-mono font-semibold text-foreground focus:outline-none"
            >
              <option value="create_room">POST /api/room (Create Escrow)</option>
              <option value="get_room">GET /api/room (Inspect & Download)</option>
              <option value="verify_proof">POST /api/room (Verify Tx Hash)</option>
            </select>
            <Button
              size="sm"
              onClick={runPlayground}
              disabled={playgroundLoading}
              className="text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Play className="size-3.5 mr-1" />{" "}
              {playgroundLoading ? "Running..." : "Test Endpoint"}
            </Button>
          </div>
        </div>

        {playgroundResponse && (
          <div className="p-4 rounded-xl bg-black/70 border border-border/80 space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="text-emerald-400 font-bold">200 OK (application/json)</span>
              <span>Latency: 38ms</span>
            </div>
            <pre className="text-xs font-mono text-emerald-300 overflow-x-auto p-2 leading-relaxed">
              {playgroundResponse}
            </pre>
          </div>
        )}
      </div>

      {/* Schema Blueprint Section */}
      <div className="mt-12 surface-panel p-5 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="size-5 text-emerald-400" />
            <h2 className="text-base font-bold text-foreground">
              PostgreSQL & Cloud Storage Blueprint
            </h2>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copySnippet(SUPABASE_SCHEMA_SNIPPET, "schema")}
            className="text-xs font-semibold border-border/80 self-start sm:self-auto"
          >
            {copiedKey === "schema" ? (
              <Check className="size-3.5 text-emerald-400 mr-1" />
            ) : (
              <Copy className="size-3.5 mr-1" />
            )}
            Copy SQL Schema
          </Button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Execute this SQL in your Cloud Database Editor to instantly provision identical tables,
          types, and private storage policies for testing or staging deployments.
        </p>
        <pre className="p-4 rounded-xl bg-black/60 border border-border font-mono text-[11px] text-muted-foreground overflow-x-auto leading-relaxed max-h-60">
          {SUPABASE_SCHEMA_SNIPPET}
        </pre>
      </div>
    </AppShell>
  );
}
