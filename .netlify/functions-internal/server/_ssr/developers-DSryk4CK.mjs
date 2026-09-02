import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { $ as CodeXml, X as Copy, Y as Database, b as Play, f as Server, o as Terminal, ot as Check, r as Webhook, t as Zap } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/developers-DSryk4CK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CODE_EXAMPLES = {
	typescript: `// 1. Upload Encrypted Asset directly to Supabase & Create Escrow Room
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function createEscrowDelivery() {
  const fileBuffer = Buffer.from("/* confidential source archive */");
  const fileName = "saas-codebase-v2.zip";
  const storagePath = \`\${userId}/\${crypto.randomUUID()}-\${fileName}\`;

  // Upload to private Supabase 'escrow-files' bucket
  const { error: uploadError } = await supabase.storage
    .from("escrow-files")
    .upload(storagePath, fileBuffer, { contentType: "application/zip" });

  if (uploadError) throw uploadError;

  // Insert room in Supabase with conditional settlement
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
	python: `# Python SDK - Automated Escrow Delivery & Signed Supabase Download
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
	go: `// Go - Programmatic Supabase Escrow Room Polling
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
}`
};
var SUPABASE_SCHEMA_SNIPPET = `-- Supabase PostgreSQL Schema with Row Level Security (RLS)
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

-- Supabase Storage Bucket & RLS Policy
INSERT INTO storage.buckets (id, name, public) VALUES ('escrow-files', 'escrow-files', false);

CREATE POLICY "seller reads and uploads own files"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'escrow-files' AND (storage.foldername(name))[1] = auth.uid()::text);`;
function DevelopersPage() {
	const [selectedLang, setSelectedLang] = (0, import_react.useState)("typescript");
	const [copiedKey, setCopiedKey] = (0, import_react.useState)(null);
	const [playgroundEndpoint, setPlaygroundEndpoint] = (0, import_react.useState)("create_room");
	const [playgroundLoading, setPlaygroundLoading] = (0, import_react.useState)(false);
	const [playgroundResponse, setPlaygroundResponse] = (0, import_react.useState)(null);
	const copySnippet = (code, key) => {
		navigator.clipboard.writeText(code);
		setCopiedKey(key);
		toast.success("Snippet copied to clipboard");
		setTimeout(() => setCopiedKey(null), 2e3);
	};
	const runPlayground = () => {
		setPlaygroundLoading(true);
		setTimeout(() => {
			setPlaygroundLoading(false);
			if (playgroundEndpoint === "create_room") setPlaygroundResponse(JSON.stringify({
				ok: true,
				roomCode: "948201",
				status: "awaiting_payment",
				escrowUrl: "https://vaultdrop.io/room/948201",
				storageBucket: "escrow-files",
				signedTtl: "3600 seconds after approval"
			}, null, 2));
			else if (playgroundEndpoint === "get_room") setPlaygroundResponse(JSON.stringify({
				ok: true,
				room: {
					room_code: "948201",
					title: "Enterprise SaaS Handover",
					status: "approved",
					crypto_amount: 4500,
					token_symbol: "USDT",
					chain: "eth-mainnet",
					file_count: 2,
					unlocked_download_urls: ["https://fgoyomqbzccmbnntzwko.supabase.co/storage/v1/object/sign/escrow-files/..."]
				}
			}, null, 2));
			else setPlaygroundResponse(JSON.stringify({
				ok: true,
				chain_verified: true,
				oracle: "Covalent GoldRush Engine",
				tx_hash: "0x89f...32a",
				block_height: 19842010,
				confirmations: 42,
				status: "payment_approved"
			}, null, 2));
			toast.success("API Playground test executed");
		}, 600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-3.5" }), " Developer Platform & Supabase SDK"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground",
					children: "Build Programmatic Escrow Workflows"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
					children: "Full REST API and Supabase Storage integration for automating high-value file deliveries, on-chain smart release conditions, and signed download URLs."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid sm:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-sm text-foreground",
							children: "Supabase Storage Backend"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Direct integration with private `escrow-files` and `payment-proofs` buckets with cryptographic RLS isolation."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-sm text-foreground",
							children: "On-Chain Oracle Engine"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Live blockchain listener monitors EVM & Solana networks via Covalent GoldRush API for zero-fraud settlements."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Webhook, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-sm text-foreground",
							children: "Real-Time Webhooks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Instant HTTPS webhook events for `room.created`, `proof.submitted`, `payment.verified`, and `file.downloaded`."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 surface-panel rounded-2xl border border-border/80 overflow-hidden shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-6 py-4 border-b border-border/80 bg-muted/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-foreground",
						children: "Multi-Language Escrow SDK Snippet"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1",
					children: [
						"typescript",
						"python",
						"curl",
						"go"
					].map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedLang(lang),
						className: `px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-colors ${selectedLang === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
						children: lang
					}, lang))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative p-6 bg-black/60 font-mono text-xs text-muted-foreground overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => copySnippet(CODE_EXAMPLES[selectedLang], "sdk"),
					className: "absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/80 border border-border/80 text-foreground text-xs hover:bg-muted transition-colors",
					children: [copiedKey === "sdk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy Code" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "text-foreground/90 whitespace-pre leading-relaxed",
					children: CODE_EXAMPLES[selectedLang]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-bold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-5 text-primary" }), " Interactive REST API Playground"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-1",
					children: "Simulate API requests and view real-time Supabase JSON responses."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: playgroundEndpoint,
						onChange: (e) => setPlaygroundEndpoint(e.target.value),
						className: "px-3 py-1.5 rounded-xl bg-muted/60 border border-border text-xs font-mono font-semibold text-foreground focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "create_room",
								children: "POST /api/room (Create Escrow)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "get_room",
								children: "GET /api/room (Inspect & Download)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "verify_proof",
								children: "POST /api/room (Verify Tx Hash)"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: runPlayground,
						disabled: playgroundLoading,
						className: "text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 mr-1" }),
							" ",
							playgroundLoading ? "Running..." : "Test Endpoint"
						]
					})]
				})]
			}), playgroundResponse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-xl bg-black/70 border border-border/80 space-y-2 animate-in fade-in duration-150",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground font-mono",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-emerald-400 font-bold",
						children: "200 OK (application/json)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Latency: 38ms" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "text-xs font-mono text-emerald-300 overflow-x-auto p-2 leading-relaxed",
					children: playgroundResponse
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-foreground",
							children: "PostgreSQL & Supabase Storage Blueprint"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => copySnippet(SUPABASE_SCHEMA_SNIPPET, "schema"),
						className: "text-xs font-semibold border-border/80",
						children: [copiedKey === "schema" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-400 mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5 mr-1" }), "Copy SQL Schema"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Execute this SQL in your Supabase SQL Editor to instantly provision identical tables, types, and private storage policies for testing or staging deployments."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "p-4 rounded-xl bg-black/60 border border-border font-mono text-[11px] text-muted-foreground overflow-x-auto leading-relaxed max-h-60",
					children: SUPABASE_SCHEMA_SNIPPET
				})
			]
		})
	] });
}
//#endregion
export { DevelopersPage as component };
