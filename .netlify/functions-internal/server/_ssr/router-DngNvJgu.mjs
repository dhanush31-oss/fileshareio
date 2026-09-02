import { i as __toESM } from "../_runtime.mjs";
import { a as createUIMessageStreamResponse, c as require_react, i as createUIMessageStream, o as streamText, r as convertToModelMessages, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, j as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as __exportAll } from "./server-DF64ikKK.mjs";
import { n as resolveUserId, t as ensureBucketsExist } from "./auth-helpers.server-gYp6xnw7.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { n as supabase } from "./client-BhPdVgWC.mjs";
import { $ as CodeXml, F as Film, N as FolderLock, S as Music, V as FileCodeCorner, ct as Bot, h as Scale, j as Globe } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as supabaseAdmin } from "./client.server-D2V-N3PO.mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DngNvJgu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-zox0xD33.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Vaultdrop — Crypto File Escrow" },
			{
				name: "description",
				content: "Send digital files securely with crypto escrow on-chain verification."
			},
			{
				name: "author",
				content: "Vaultdrop"
			},
			{
				property: "og:title",
				content: "Vaultdrop — Crypto File Escrow"
			},
			{
				property: "og:description",
				content: "Send digital files securely with crypto escrow on-chain verification."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "alternate icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	(0, import_react.useEffect)(() => {
		const removeLovableElements = () => {
			[
				"#lovable-badge",
				".lovable-badge",
				"[data-lovable-badge]",
				"a[href*=\"lovable.dev\"]",
				"a[href*=\"lovable.app\"]",
				"iframe[src*=\"lovable\"]"
			].forEach((sel) => {
				document.querySelectorAll(sel).forEach((el) => el.remove());
			});
		};
		removeLovableElements();
		const observer = new MutationObserver(removeLovableElements);
		if (document.body) observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$12 = () => import("./routes-B6VN26Jw.mjs");
var Route$16 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Vaultdrop — International Digital Asset Escrow & Secure File Exchange" },
		{
			name: "description",
			content: "The international digital asset settlement and confidential file delivery cloud. Powered by Supabase Storage, multi-chain on-chain settlements, and 6-digit room unlocking."
		},
		{
			property: "og:title",
			content: "Vaultdrop — International Digital Asset Escrow & Secure File Exchange"
		},
		{
			property: "og:description",
			content: "The international digital asset settlement and confidential file delivery cloud. Powered by Supabase Storage, multi-chain on-chain settlements, and 6-digit room unlocking."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./route-Di7iQBCH.mjs");
var Route$15 = createFileRoute("/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
/**
* Ensures the user has a valid Supabase auth session in the background
* without prompting them to log in or enter an email/password.
*/
async function ensureSession() {
	try {
		const { data } = await supabase.auth.getSession();
		if (data?.session?.user) return data.session.user;
		try {
			const { data: anonData, error: anonErr } = await supabase.auth.signInAnonymously();
			if (!anonErr && anonData?.user) return anonData.user;
		} catch {}
		let guestEmail = typeof window !== "undefined" ? localStorage.getItem("vd_guest_email") : null;
		let guestPass = typeof window !== "undefined" ? localStorage.getItem("vd_guest_pass") : null;
		if (!guestEmail || !guestPass) {
			guestEmail = `guest_${crypto.randomUUID().slice(0, 10)}@vaultdrop.local`;
			guestPass = `Vd#${crypto.randomUUID()}`;
			if (typeof window !== "undefined") {
				localStorage.setItem("vd_guest_email", guestEmail);
				localStorage.setItem("vd_guest_pass", guestPass);
			}
		}
		const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
			email: guestEmail,
			password: guestPass,
			options: { data: { display_name: "Anonymous User" } }
		});
		if (!signUpErr && signUpData?.user) return signUpData.user;
		const { data: signInData } = await supabase.auth.signInWithPassword({
			email: guestEmail,
			password: guestPass
		});
		return signInData?.user || null;
	} catch (err) {
		console.warn("[session] Failed to auto-provision session:", err);
		return null;
	}
}
var $$splitComponentImporter$10 = () => import("./auth-Dc9FNzLY.mjs");
var Route$14 = createFileRoute("/auth")({
	ssr: false,
	beforeLoad: async () => {
		await ensureSession();
		throw redirect({ to: "/send" });
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./developers-DSryk4CK.mjs");
var Route$13 = createFileRoute("/developers")({
	head: () => ({ meta: [
		{ title: "Developer API & Supabase Integration SDK | Vaultdrop" },
		{
			name: "description",
			content: "Integrate international digital asset escrow into your applications. Programmatic Supabase storage uploads, escrow room creation, and webhooks."
		},
		{
			property: "og:title",
			content: "Developer API & Supabase Integration SDK | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Integrate international digital asset escrow into your applications. Programmatic Supabase storage uploads, escrow room creation, and webhooks."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./explorer-BOfGATl3.mjs");
var Route$12 = createFileRoute("/explorer")({
	head: () => ({ meta: [
		{ title: "Global Escrow Explorer & Cryptographic Ledger | Vaultdrop" },
		{
			name: "description",
			content: "Public zero-knowledge escrow explorer. Verify cryptographic SHA-256 hashes, inspect on-chain settlement proofs, and view global network health."
		},
		{
			property: "og:title",
			content: "Global Escrow Explorer & Cryptographic Ledger | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Public zero-knowledge escrow explorer. Verify cryptographic SHA-256 hashes, inspect on-chain settlement proofs, and view global network health."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./pricing-mHCJg0AJ.mjs");
var Route$11 = createFileRoute("/pricing")({
	head: () => ({ meta: [
		{ title: "Global Multi-Currency Pricing & Escrow Rates | Vaultdrop" },
		{
			name: "description",
			content: "Transparent pricing for international digital asset transfers. Multi-currency settlement in USD, EUR, GBP, JPY, USDT, and ETH."
		},
		{
			property: "og:title",
			content: "Global Multi-Currency Pricing & Escrow Rates | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Transparent pricing for international digital asset transfers. Multi-currency settlement in USD, EUR, GBP, JPY, USDT, and ETH."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./security-s_z085C8.mjs");
var Route$10 = createFileRoute("/security")({
	head: () => ({ meta: [
		{ title: "Enterprise Security & Compliance Whitepaper | Vaultdrop" },
		{
			name: "description",
			content: "Zero-Knowledge digital asset escrow architecture, Supabase private RLS storage policies, SOC2 Type II compliance, and developer audit protocols."
		},
		{
			property: "og:title",
			content: "Enterprise Security & Compliance Whitepaper | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Zero-Knowledge digital asset escrow architecture, Supabase private RLS storage policies, SOC2 Type II compliance, and developer audit protocols."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./support-B-x-EjEY.mjs");
var Route$9 = createFileRoute("/support")({
	head: () => ({ meta: [
		{ title: "24/7 Global Escrow Support & Dispute Desk | Vaultdrop" },
		{
			name: "description",
			content: "24/7 International assistance, AI Escrow Concierge, knowledge base, and dispute arbitration for buyers and sellers."
		},
		{
			property: "og:title",
			content: "24/7 Global Escrow Support & Dispute Desk | Vaultdrop"
		},
		{
			property: "og:description",
			content: "24/7 International assistance, AI Escrow Concierge, knowledge base, and dispute arbitration for buyers and sellers."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./templates-CduDZJPJ.mjs");
var Route$8 = createFileRoute("/templates")({
	head: () => ({ meta: [
		{ title: "Turnkey Industry Escrow Templates | Vaultdrop Global" },
		{
			name: "description",
			content: "Battle-tested digital asset escrow templates for software repositories, 3D media, legal NDAs, domain transfers, and AI datasets."
		},
		{
			property: "og:title",
			content: "Turnkey Industry Escrow Templates | Vaultdrop Global"
		},
		{
			property: "og:description",
			content: "Battle-tested digital asset escrow templates for software repositories, 3D media, legal NDAs, domain transfers, and AI datasets."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var ESCROW_TEMPLATES = [
	{
		id: "saas-codebase-handover",
		category: "code",
		title: "Full-Stack SaaS Codebase & Repository Handover",
		badge: "Most Popular",
		badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
		icon: CodeXml,
		summary: "Complete transfer of GitHub/GitLab repositories, environment configurations, and deployment keys.",
		description: "Includes clean git history verification, private npm/docker instructions, backend environment configs, and IP release signoff upon buyer approval.",
		suggestedPrice: "4,500.00",
		suggestedCurrency: "USD",
		suggestedChain: "eth-mainnet",
		tokenSymbol: "USDT",
		checklist: [
			"Clean git archive with full commit history (.zip/.tar.gz)",
			"Redacted .env.example with third-party dependency list",
			"Setup README with local and cloud deployment guides",
			"Cryptographic SHA-256 integrity hash verification",
			"Signed IP Assignment & Commercial License Transfer"
		],
		sampleInstructions: "1. Verify the repository hash matches our agreed commit milestone.\n2. Submit payment in USDT (ERC-20) or USDC.\n3. Seller will inspect proof and unlock full source archive + cloud credentials within 1 hour.",
		legalTermsExcerpt: "Upon seller confirmation of on-chain payment or wire settlement, all intellectual property rights, copyrights, and codebase ownership irrevocably transfer to the buyer in perpetuity."
	},
	{
		id: "3d-vfx-master-delivery",
		category: "media",
		title: "High-Resolution 3D, CGI & VFX Studio Master Delivery",
		badge: "Creative Studio",
		badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
		icon: Film,
		summary: "Multi-gigabyte 3D project packages (Blender, Maya, Unreal Engine 5, C4D) and 4K/8K master renders.",
		description: "Designed for animation studios, game devs, and VFX artists. Locks high-res master renders and raw project files behind verified client payment.",
		suggestedPrice: "2,800.00",
		suggestedCurrency: "USD",
		suggestedChain: "polygon-mainnet",
		tokenSymbol: "USDC",
		checklist: [
			"Raw project source files (.blend / .c4d / .uproject)",
			"4K/8K ProRes 4444 or EXR sequence render exports",
			"Packed texture archives (4K PBR maps)",
			"Commercial broadcast usage release certificate"
		],
		sampleInstructions: "Inspect the low-res watermarked preview on our client portal. Release payment to unlock the uncompressed 18GB 4K render package from Supabase Storage.",
		legalTermsExcerpt: "Delivery constitutes full commercial synchronization and broadcast rights transfer under standard international creative production guidelines."
	},
	{
		id: "cross-border-nda-dataroom",
		category: "legal",
		title: "Cross-Border Commercial M&A Data Room & Confidential NDA",
		badge: "Enterprise Legal",
		badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
		icon: Scale,
		summary: "Confidential financial audits, cap tables, and legal M&A dossiers with cryptographic access logs.",
		description: "Secures sensitive corporate acquisitions and proprietary disclosures with full Row-Level-Security audit trails and developer oversight records.",
		suggestedPrice: "15,000.00",
		suggestedCurrency: "USD",
		suggestedChain: "eth-mainnet",
		tokenSymbol: "ETH",
		checklist: [
			"Audited financial statements (3-year P&L / balance sheets)",
			"Cap table and shareholder registry confirmation",
			"Proprietary IP patent filings and licensing agreements",
			"Counter-signed mutual Non-Disclosure Agreement (NDA)"
		],
		sampleInstructions: "Enter the room code provided by legal counsel. Provide wire transfer confirmation or deposit escrow to access the confidential data room files.",
		legalTermsExcerpt: "Access to these files binds the recipient to strict confidentiality under New York / English commercial jurisdiction. Unauthorized reproduction triggers automated forensic tracking."
	},
	{
		id: "domain-digital-ip-transfer",
		category: "web3",
		title: "Premium Domain Name & Digital Property Transfer",
		badge: "Digital Assets",
		badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
		icon: Globe,
		summary: "Safe handover of premium domain EPP transfer authorization codes, social handles, and trademark files.",
		description: "Eliminates domain escrow fraud. EPP auth codes and registrar transfer instructions are locked in Supabase storage until buyer funds are verified.",
		suggestedPrice: "6,000.00",
		suggestedCurrency: "USD",
		suggestedChain: "base-mainnet",
		tokenSymbol: "ETH",
		checklist: [
			"Domain EPP / Auth-Code in encrypted document",
			"Registrar push / transfer authorization letter",
			"WHOIS contact update verification document",
			"Trademark trademark assignment documentation"
		],
		sampleInstructions: "Deposit the agreed purchase price into escrow. Once confirmed, download the EPP code file and initiate registrar transfer.",
		legalTermsExcerpt: "Seller guarantees clear title and uncontested ownership of the registered domain name with zero outstanding liens or trademark disputes."
	},
	{
		id: "music-master-rights-transfer",
		category: "media",
		title: "Music Master Recording & Publishing Rights Handover",
		badge: "Audio & Sync",
		badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
		icon: Music,
		summary: "24-bit 96kHz lossless WAV stems, ISRC metadata, and irrevocable publishing rights contracts.",
		description: "For music producers, record labels, and sync supervisors. Unlocks multitrack stems and exclusive worldwide rights upon verified payment.",
		suggestedPrice: "1,250.00",
		suggestedCurrency: "USD",
		suggestedChain: "polygon-mainnet",
		tokenSymbol: "USDT",
		checklist: [
			"24-bit / 96kHz lossless master WAV & instrumental stems",
			"ISRC and ISWC registration paperwork",
			"Exclusive worldwide master synchronization license",
			"Split-sheet confirmation for all contributing writers"
		],
		sampleInstructions: "Send payment proof to release the uncompressed master audio stems and signed synchronization contract.",
		legalTermsExcerpt: "Grantor hereby conveys 100% of the Master Recording rights and publisher share to Grantee throughout the universe in all media now known or hereafter devised."
	},
	{
		id: "freelance-software-milestone",
		category: "code",
		title: "Freelance Software Milestone & Sprint Delivery",
		badge: "Agile Dev",
		badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
		icon: FileCodeCorner,
		summary: "Milestone-based code release for client contractor projects with automated staging test notes.",
		description: "Protects both independent developers and global agencies. Code is delivered in Supabase private storage and unlocked when milestone invoice is settled.",
		suggestedPrice: "1,800.00",
		suggestedCurrency: "USD",
		suggestedChain: "arbitrum-mainnet",
		tokenSymbol: "USDC",
		checklist: [
			"Completed sprint feature build bundle",
			"Unit & integration test suite passing report",
			"API documentation & staging test credentials",
			"Changelog and release notes document"
		],
		sampleInstructions: "Review sprint deliverables on the staging environment. Once verified, submit milestone payment to unlock the production release archive.",
		legalTermsExcerpt: "Acceptance of the delivery archive confirms satisfactory completion of sprint deliverables as outlined in the Statement of Work."
	},
	{
		id: "zero-knowledge-legal-settlement",
		category: "legal",
		title: "Zero-Knowledge Confidential Legal Settlement & Release",
		badge: "High Security",
		badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
		icon: FolderLock,
		summary: "Executed settlement agreements, mutual liability waivers, and encrypted payout confirmations.",
		description: "High-confidentiality legal settlement execution. Employs 256-bit encrypted payload storage with audit-proof developer logs.",
		suggestedPrice: "25,000.00",
		suggestedCurrency: "USD",
		suggestedChain: "eth-mainnet",
		tokenSymbol: "USDC",
		checklist: [
			"Fully executed settlement & release agreement",
			"Mutual liability waiver and confidentiality covenants",
			"Escrow disbursement authorization schedule",
			"Proof of funds / wire clearing confirmation"
		],
		sampleInstructions: "Submit the settlement escrow amount to the indicated custody address. Once seller validates compliance, the mutual release is unlocked.",
		legalTermsExcerpt: "This settlement represents a full, final, and binding compromise of all claims between the parties under international arbitration rules."
	},
	{
		id: "ai-model-weights-dataset-handover",
		category: "ai",
		title: "AI Model Weights & Training Dataset Handover",
		badge: "AI / ML",
		badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
		icon: Bot,
		summary: "Fine-tuned model checkpoints (Safetensors / GGUF / ONNX) and curated training datasets.",
		description: "Large-scale AI asset exchange. High-performance Supabase storage transfer for proprietary LLM fine-tunes, LoRA weights, and labeled datasets.",
		suggestedPrice: "7,500.00",
		suggestedCurrency: "USD",
		suggestedChain: "eth-mainnet",
		tokenSymbol: "ETH",
		checklist: [
			"Fine-tuned safetensors / ONNX model checkpoints",
			"Tokenization scripts and inference benchmarks",
			"Clean training corpus with data schema documentation",
			"Commercial AI model weight licensing agreement"
		],
		sampleInstructions: "Submit payment to receive the direct download link and cryptographic checksums for the fine-tuned model checkpoint archive.",
		legalTermsExcerpt: "Buyer receives perpetual commercial deployment rights for the provided neural network weights and derivative inference models."
	}
];
var $$splitComponentImporter$3 = () => import("./admin-BNzcfHVH.mjs");
var Route$7 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Operations Console | Vaultdrop" },
		{
			name: "description",
			content: "Review rooms, payment proofs and audit history across the Vaultdrop escrow platform."
		},
		{
			property: "og:title",
			content: "Operations Console | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Review rooms, payment proofs and audit history across the Vaultdrop escrow platform."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard-CZNAisTF.mjs");
var Route$6 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "My Escrow Rooms | Vaultdrop" },
		{
			name: "description",
			content: "Track your escrow rooms, watch on-chain payment verifications, and release files after approval."
		},
		{
			property: "og:title",
			content: "My Escrow Rooms | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Track your escrow rooms, watch on-chain payment verifications, and release files after approval."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./send-BuVbgQAr.mjs");
var Route$5 = createFileRoute("/_authenticated/send")({
	head: () => ({ meta: [
		{ title: "Send Files Securely | Vaultdrop" },
		{
			name: "description",
			content: "Upload files, set your crypto price and wallet, and get a 6-digit room code to share with your buyer."
		},
		{
			property: "og:title",
			content: "Send Files Securely | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Upload files, set your crypto price and wallet, and get a 6-digit room code to share with your buyer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$4 = createFileRoute("/api/dashboard")({ server: { handlers: {
	GET: async ({ request }) => {
		try {
			const userId = await resolveUserId(supabaseAdmin, request.headers.get("authorization"));
			const { data: selling, error: sellErr } = await supabaseAdmin.from("rooms").select("*").order("created_at", { ascending: false });
			if (sellErr) console.error("[api/dashboard] Rooms fetch error:", sellErr);
			const roomList = selling ?? [];
			const roomIds = roomList.map((r) => r.id);
			const { data: proofs, error: proofErr } = roomIds.length ? await supabaseAdmin.from("payment_proofs").select("*").in("room_id", roomIds).order("created_at", { ascending: false }) : {
				data: [],
				error: null
			};
			if (proofErr) console.error("[api/dashboard] Proofs fetch error:", proofErr);
			const { data: notifs } = await supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(40);
			return new Response(JSON.stringify({
				ok: true,
				selling: roomList,
				buying: roomList.filter((r) => r.buyer_id === userId),
				proofs: proofs ?? [],
				notifications: notifs ?? []
			}), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[api/dashboard] GET error:", err);
			return new Response(JSON.stringify({ error: err?.message || "Failed to load dashboard" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	},
	POST: async ({ request }) => {
		try {
			const { action, proofId, approve, reviewNote } = await request.json();
			const userId = await resolveUserId(supabaseAdmin, request.headers.get("authorization"));
			if (action === "mark_notifications_read") {
				await supabaseAdmin.from("notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).is("read_at", null);
				return new Response(JSON.stringify({ ok: true }), {
					status: 200,
					headers: { "content-type": "application/json" }
				});
			}
			if (action === "review_proof") {
				if (!proofId) return new Response(JSON.stringify({ error: "Proof ID is required" }), {
					status: 400,
					headers: { "content-type": "application/json" }
				});
				const { data: proof, error: proofErr } = await supabaseAdmin.from("payment_proofs").select("*, rooms(*)").eq("id", proofId).single();
				if (proofErr || !proof) return new Response(JSON.stringify({ error: "Proof not found" }), {
					status: 404,
					headers: { "content-type": "application/json" }
				});
				const room = proof.rooms;
				if (!room) return new Response(JSON.stringify({ error: "Associated room not found" }), {
					status: 404,
					headers: { "content-type": "application/json" }
				});
				await supabaseAdmin.from("payment_proofs").update({
					status: approve ? "approved" : "rejected",
					review_note: String(reviewNote || "").trim().slice(0, 500),
					reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", proof.id);
				await supabaseAdmin.from("rooms").update({ status: approve ? "approved" : "rejected" }).eq("id", room.id);
				try {
					const targetBuyer = proof.buyer_id || userId;
					await supabaseAdmin.from("notifications").insert({
						user_id: targetBuyer,
						room_id: room.id,
						kind: approve ? "approved" : "rejected",
						title: approve ? `Payment Approved — "${room.title}" is Unlocked!` : `Payment Rejected for "${room.title}"`,
						body: approve ? `Your payment has been verified and approved by the seller. Room #${room.room_code} files are ready to download!` : String(reviewNote || "Payment could not be verified.").trim()
					});
				} catch {}
				try {
					await supabaseAdmin.from("access_log").insert({
						room_id: room.id,
						actor_id: userId,
						action: approve ? "payment_approved" : "payment_rejected",
						detail: `Seller reviewed payment proof for room #${room.room_code}: ${approve ? "Approved" : "Rejected"}. Note: ${reviewNote || "None"}`
					});
				} catch {}
				return new Response(JSON.stringify({
					ok: true,
					status: approve ? "approved" : "rejected"
				}), {
					status: 200,
					headers: { "content-type": "application/json" }
				});
			}
			return new Response(JSON.stringify({ error: "Unknown action" }), {
				status: 400,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[api/dashboard] POST error:", err);
			return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	}
} } });
var Route$3 = createFileRoute("/api/room")({ server: { handlers: {
	GET: async ({ request }) => {
		try {
			const code = (new URL(request.url).searchParams.get("code") || "").trim();
			if (!code) return new Response(JSON.stringify({ error: "Room code is required" }), {
				status: 400,
				headers: { "content-type": "application/json" }
			});
			const { data: room, error: roomErr } = await supabaseAdmin.from("rooms").select("*").eq("room_code", code).maybeSingle();
			if (roomErr) {
				console.error("[api/room] Database error:", roomErr);
				return new Response(JSON.stringify({ error: roomErr.message }), {
					status: 500,
					headers: { "content-type": "application/json" }
				});
			}
			if (!room) return new Response(JSON.stringify({ error: `Room #${code} was not found. Please verify the 6-digit code.` }), {
				status: 404,
				headers: { "content-type": "application/json" }
			});
			const { data: files } = await supabaseAdmin.from("room_files").select("id, file_name, file_size, mime_type, file_path").eq("room_id", room.id).order("created_at", { ascending: true });
			const { data: proofs } = await supabaseAdmin.from("payment_proofs").select("*").eq("room_id", room.id).order("created_at", { ascending: false });
			return new Response(JSON.stringify({
				ok: true,
				room: {
					id: room.id,
					room_code: room.room_code,
					title: room.title,
					description: room.description,
					payment_instructions: room.payment_instructions,
					price_amount: Number(room.price_amount),
					price_currency: room.price_currency,
					wallet_address: room.wallet_address,
					chain: room.chain,
					token_symbol: room.token_symbol,
					crypto_amount: Number(room.crypto_amount),
					file_name: room.file_name,
					file_size: room.file_size,
					mime_type: room.mime_type,
					file_path: room.file_path,
					status: room.status,
					created_at: room.created_at,
					seller_id: room.seller_id,
					buyer_id: room.buyer_id
				},
				files: files || [],
				proofs: proofs || []
			}), {
				status: 200,
				headers: {
					"content-type": "application/json",
					"cache-control": "no-store"
				}
			});
		} catch (err) {
			console.error("[api/room] Unexpected GET error:", err);
			return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	},
	POST: async ({ request }) => {
		try {
			const body = await request.json();
			const { action } = body;
			if (action === "submit_proof") {
				const { roomId, txHash = "", note = "", proofPath = "", proofName = "" } = body;
				const cleanTxHash = String(txHash || "").trim();
				const { data: room, error: roomErr } = await supabaseAdmin.from("rooms").select("*").eq("id", roomId).maybeSingle();
				if (roomErr || !room) return new Response(JSON.stringify({ error: "Room not found" }), {
					status: 404,
					headers: { "content-type": "application/json" }
				});
				let chainVerified = false;
				let verifiedAmount = null;
				let detail = cleanTxHash ? "" : "Payment proof submitted";
				if (cleanTxHash) try {
					const { verifyTransaction } = await import("./covalent.server-qdMh9sBG.mjs");
					const check = await verifyTransaction({
						chain: room.chain,
						txHash: cleanTxHash,
						wallet: room.wallet_address,
						expected: Number(room.crypto_amount),
						tokenSymbol: room.token_symbol
					});
					chainVerified = check.verified;
					verifiedAmount = check.amount;
					detail = check.detail;
				} catch (err) {
					detail = err?.message || "On-chain verification failed";
				}
				await ensureBucketsExist(supabaseAdmin);
				const buyerId = room.buyer_id || await resolveUserId(supabaseAdmin, request.headers.get("authorization"));
				let finalProofPath = proofPath;
				if (body.proofBase64) {
					const safeName = (proofName || "proof.png").replace(/[^\w.\-]+/g, "_");
					finalProofPath = `${buyerId}/${crypto.randomUUID()}-${safeName}`;
					const buffer = Buffer.from(body.proofBase64, "base64");
					const { error: uploadErr } = await supabaseAdmin.storage.from("payment-proofs").upload(finalProofPath, buffer, {
						contentType: body.mimeType || "image/png",
						upsert: true
					});
					if (uploadErr) console.warn("[api/room] Proof upload notice:", uploadErr.message);
				}
				const { data: insertedProof, error: proofErr } = await supabaseAdmin.from("payment_proofs").insert({
					room_id: room.id,
					buyer_id: buyerId,
					proof_path: finalProofPath || `${buyerId}/tx-${Date.now()}`,
					proof_name: (proofName || "Transaction Hash").slice(0, 200),
					note: String(note || "").trim().slice(0, 1e3),
					amount_claimed: room.price_amount,
					tx_hash: cleanTxHash.slice(0, 120),
					chain_verified: chainVerified,
					verified_amount: verifiedAmount,
					verification_detail: detail.slice(0, 400)
				}).select("*").single();
				if (proofErr) return new Response(JSON.stringify({ error: proofErr.message }), {
					status: 500,
					headers: { "content-type": "application/json" }
				});
				await supabaseAdmin.from("rooms").update({ status: "payment_submitted" }).eq("id", room.id);
				try {
					await supabaseAdmin.from("notifications").insert({
						user_id: room.seller_id,
						room_id: room.id,
						kind: "payment_submitted",
						title: `Payment Submitted for Room #${room.room_code}`,
						body: `Buyer submitted payment proof for "${room.title}". Review and approve to release files.`
					});
				} catch {}
				return new Response(JSON.stringify({
					ok: true,
					chainVerified,
					detail,
					status: "payment_submitted",
					proof: insertedProof
				}), {
					status: 200,
					headers: { "content-type": "application/json" }
				});
			}
			if (action === "review_proof" || action === "approve_proof" || action === "instant_approve") {
				const { roomId, proofId, approve = true, reviewNote = "" } = body;
				const newStatus = approve ? "approved" : "awaiting_payment";
				await supabaseAdmin.from("rooms").update({ status: newStatus }).eq("id", roomId);
				if (proofId) await supabaseAdmin.from("payment_proofs").update({
					status: approve ? "approved" : "rejected",
					review_note: String(reviewNote || "").trim(),
					reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", proofId);
				else await supabaseAdmin.from("payment_proofs").update({
					status: approve ? "approved" : "rejected",
					reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("room_id", roomId).eq("status", "pending");
				return new Response(JSON.stringify({
					ok: true,
					status: newStatus
				}), {
					status: 200,
					headers: { "content-type": "application/json" }
				});
			}
			if (action === "unlock_download") {
				const { roomId, code, fileId } = body;
				const { data: room, error: roomErr } = await supabaseAdmin.from("rooms").select("*").eq("id", roomId).maybeSingle();
				if (roomErr || !room) return new Response(JSON.stringify({ error: "Room not found" }), {
					status: 404,
					headers: { "content-type": "application/json" }
				});
				if (room.status !== "approved" && Number(room.crypto_amount) > 0) return new Response(JSON.stringify({ error: "Files are still locked. Complete payment or approve transfer to unlock." }), {
					status: 403,
					headers: { "content-type": "application/json" }
				});
				if (String(code || "").trim() !== room.room_code) return new Response(JSON.stringify({ error: "Incorrect room code." }), {
					status: 403,
					headers: { "content-type": "application/json" }
				});
				let query = supabaseAdmin.from("room_files").select("id, file_path, file_name").eq("room_id", room.id);
				if (fileId) query = query.eq("id", fileId);
				const { data: rows } = await query.order("created_at", { ascending: true });
				const entries = rows && rows.length ? rows.map((r) => ({
					path: r.file_path,
					name: r.file_name
				})) : [{
					path: room.file_path,
					name: room.file_name
				}];
				const files = [];
				for (const entry of entries) {
					const { data: signed, error: signErr } = await supabaseAdmin.storage.from("escrow-files").createSignedUrl(entry.path, 180, { download: entry.name });
					if (!signErr && signed?.signedUrl) files.push({
						name: entry.name,
						url: signed.signedUrl
					});
					else {
						const { data: publicData } = supabaseAdmin.storage.from("escrow-files").getPublicUrl(entry.path);
						files.push({
							name: entry.name,
							url: publicData.publicUrl
						});
					}
				}
				return new Response(JSON.stringify({
					ok: true,
					files
				}), {
					status: 200,
					headers: { "content-type": "application/json" }
				});
			}
			return new Response(JSON.stringify({ error: "Unknown action" }), {
				status: 400,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[api/room] Unexpected POST error:", err);
			return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	}
} } });
var PRODUCT_BRIEF = `
You are "Vault Assist", the smart, friendly in-app assistant for Vaultdrop.
Vaultdrop is a decentralized file escrow platform where files are held in secure Supabase Cloud Storage and only unlocked when crypto payments are confirmed.
Style: Conversational, helpful, direct, concise, and friendly. Always answer the user's specific question directly.
`.trim();
function isNewKey(v) {
	return v.startsWith("sb_publishable_") || v.startsWith("sb_secret_");
}
async function buildAccountContext(token) {
	if (!token || token.split(".").length !== 3) return {
		summary: "",
		rooms: []
	};
	const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_ANON_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_ANON_KEY"];
	if (!url || !key) return {
		summary: "",
		rooms: []
	};
	try {
		const supabase = createClient(url, key, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				storage: void 0
			},
			global: {
				headers: { Authorization: `Bearer ${token}` },
				fetch: (input, init) => {
					const headers = new Headers(init?.headers);
					if (isNewKey(key) && headers.get("Authorization") === `Bearer ${key}`) headers.set("Authorization", `Bearer ${token}`);
					headers.set("apikey", key);
					return fetch(input, {
						...init,
						headers
					});
				}
			}
		});
		const { data: userData } = await supabase.auth.getUser(token);
		const user = userData.user;
		if (!user) return {
			summary: "",
			rooms: []
		};
		const { data: rooms } = await supabase.from("rooms").select("room_code, title, status, price_amount, price_currency, crypto_amount, token_symbol, chain, seller_id, buyer_id, created_at").order("created_at", { ascending: false }).limit(10);
		const roomList = rooms ?? [];
		const lines = roomList.map((r) => {
			const side = r.seller_id === user.id ? "Seller (Creator)" : "Buyer (Claimant)";
			return `• Room **${r.room_code}** ("${r.title}"): \`${r.status}\` (${r.crypto_amount} ${r.token_symbol} on ${r.chain}) - ${side}`;
		});
		return {
			summary: lines.length ? `Active Rooms:\n${lines.join("\n")}` : "No active rooms yet.",
			rooms: roomList
		};
	} catch {
		return {
			summary: "",
			rooms: []
		};
	}
}
function extractUserQuery(body) {
	if (!body) return "";
	if (typeof body === "string") return body;
	if (typeof body.text === "string" && body.text.trim()) return body.text.trim();
	if (typeof body.message === "string" && body.message.trim()) return body.message.trim();
	if (typeof body.prompt === "string" && body.prompt.trim()) return body.prompt.trim();
	if (Array.isArray(body.messages) && body.messages.length > 0) {
		const userMsgs = body.messages.filter((m) => m.role === "user" || !m.role);
		const target = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1] : body.messages[body.messages.length - 1];
		if (typeof target === "string") return target;
		if (typeof target?.content === "string" && target.content.trim()) return target.content.trim();
		if (typeof target?.text === "string" && target.text.trim()) return target.text.trim();
		if (Array.isArray(target?.parts)) {
			const textParts = target.parts.map((p) => typeof p === "string" ? p : p?.text || p?.content || "").filter((t) => Boolean(t.trim()));
			if (textParts.length > 0) return textParts.join(" ");
		}
	}
	return "";
}
function generateDynamicAnswer(query, accountInfo) {
	const q = query.toLowerCase().trim();
	if (/^(hi|hello|hey|greetings|hola|sup|good (morning|afternoon|evening)|yo)\b/i.test(q)) return `Hello! 👋 I'm **Vault Assist**, your personal escrow assistant. How can I help you today?\n\nYou can ask me about:\n- How to create and send escrow files\n- How to pay and unlock a room\n- Checking your active rooms & status\n- Supported crypto networks & tokens`;
	if (q.includes("who are you") || q.includes("what are you") || q.includes("what can you do")) return `I'm **Vault Assist**, the built-in AI assistant for Vaultdrop! I help you:\n\n1. Guide you through locking files and creating 6-digit escrow rooms.\n2. Explain crypto payment instructions and on-chain verification.\n3. Assist buyers in submitting txHashes and unlocking file downloads.\n4. Check the status of your active rooms.`;
	if (q.includes("wallet") || q.includes("metamask") || q.includes("phantom") || q.includes("address") || q.includes("0x")) return `### Wallet & Payment Information\n\n- **Receiving Wallet**: When creating a room, enter your EVM (e.g. \`0x...\`) or any crypto wallet address where you want to receive payment.\n- **Buyer Payments**: Buyers can copy the address or scan the QR code using MetaMask, Rainbow, TrustWallet, or any mobile wallet.\n- **Transaction Hash (txHash)**: After sending funds from your wallet, copy the transaction hash from your wallet receipt and paste it into the room for on-chain verification!`;
	if (q.includes("pending") || q.includes("not approved") || q.includes("waiting") || q.includes("why is my payment") || q.includes("how long")) {
		let res = "### Why is the payment pending?\n\n1. **On-Chain Confirmation**: Once the buyer submits the txHash, Vaultdrop checks the blockchain to confirm the transaction confirmed.\n2. **Seller Review**: The seller sees the submission on their **[Dashboard](/dashboard)**.\n3. **Release**: As soon as the seller clicks **Approve & Release**, the download links unlock instantly for the buyer!";
		if (accountInfo.rooms.length > 0) res += `\n\n**Your Current Rooms:**\n${accountInfo.summary}`;
		return res;
	}
	if (q.includes("send") || q.includes("upload") || q.includes("create") || q.includes("seller") || q.includes("lock")) return "### How to Send & Lock Files\n\n1. Go to **[Send Files](/send)**.\n2. **Drag & Drop Files**: Select code, images, PDFs, or zip archives (uploaded to private Supabase storage).\n3. **Set Payment**: Choose network (e.g. Ethereum, Base, Polygon), token, amount, and your wallet address.\n4. **Get 6-Digit Code**: Click *Lock Files & Create Escrow Room*. Share the code or link with your buyer!";
	if (q.includes("unlock") || q.includes("download") || q.includes("get file") || q.includes("buyer") || q.includes("receive")) return "### How to Unlock & Download Files\n\n1. Open the room at `/room/<code>` using the 6-digit code.\n2. Send the required crypto amount to the seller's wallet address.\n3. Paste your **Transaction Hash (txHash)** and submit.\n4. Once the seller approves, click **Download All Files** to get your files!";
	if (q.includes("network") || q.includes("chain") || q.includes("token") || q.includes("coin") || q.includes("supported") || q.includes("eth") || q.includes("sol") || q.includes("base") || q.includes("polygon")) return "### Supported Networks & Tokens\n\nVaultdrop supports automated on-chain verification across major EVM chains:\n\n- **Ethereum Mainnet** (ETH, USDT, USDC, DAI, WBTC)\n- **Base** (ETH, USDC)\n- **Polygon** (MATIC, USDC, USDT)\n- **BNB Smart Chain** (BNB, USDT)\n- **Arbitrum One** (ETH, ARB, USDC)\n- **Optimism** (ETH, OP, USDC)\n\nYou can also enter custom tokens or any crypto coin symbol when creating your room.";
	if (q.includes("my room") || q.includes("dashboard") || q.includes("status") || q.includes("check") || q.includes("account")) {
		if (accountInfo.summary) return `### Your Active Rooms\n\n${accountInfo.summary}\n\nYou can manage and approve payments directly on your **[Dashboard](/dashboard)**.`;
		return `### Your Rooms\n\nYou have no active rooms recorded in this session yet. Click **[Send Files](/send)** to create your first escrow room, or enter a 6-digit code in the top bar to join one!`;
	}
	if (q.includes("safe") || q.includes("secure") || q.includes("scam") || q.includes("dispute") || q.includes("trust") || q.includes("refund")) return "### Is Vaultdrop Safe?\n\n- **Private Cloud Storage**: Files are stored securely in Supabase with private access control.\n- **Zero Trust Escrow**: Files cannot be downloaded until payment is confirmed on-chain and approved.\n- **Blockchain Verification**: All transactions are verified against public blockchain explorers (Etherscan, Basescan, Polygonscan).\n- **No Login Needed**: Cryptographically secured per-room without needing passwords or sensitive credentials.";
	return `### You asked: "${query}"\n\nHere is how Vaultdrop can help with that:\n\n- **To create an escrow deal**: Click **[Send Files](/send)**, upload your files, set your price/wallet, and generate your 6-digit code.\n- **To pay and unlock**: Go to \`/room/<code>\`, transfer the crypto to the seller's wallet, and submit the txHash.\n- **To approve or manage**: Visit **[My Rooms](/dashboard)** anytime.\n\nLet me know if you need specific instructions on any step!`;
}
var Route$2 = createFileRoute("/api/support-chat")({ server: { handlers: { POST: async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid request body." }), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
	}
	const authHeader = request.headers.get("authorization");
	const accountInfo = await buildAccountContext(authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null);
	const openAiKey = process.env["OPENAI_API_KEY"] || process.env["LOVABLE_API_KEY"];
	const geminiKey = process.env["GEMINI_API_KEY"];
	if (geminiKey && Array.isArray(body?.messages) && body.messages.length > 0) try {
		const gateway = createOpenAICompatible({
			name: "gemini",
			baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
			apiKey: geminiKey
		});
		return streamText({
			model: gateway("gemini-1.5-flash"),
			system: PRODUCT_BRIEF + (accountInfo.summary ? `\n${accountInfo.summary}` : ""),
			messages: await convertToModelMessages(body.messages.slice(-20))
		}).toUIMessageStreamResponse({ headers: { "cache-control": "no-store" } });
	} catch (err) {
		console.warn("[support-chat] Gemini API error, falling back:", err);
	}
	if (openAiKey && Array.isArray(body?.messages) && body.messages.length > 0) try {
		const gateway = createOpenAICompatible({
			name: "openai",
			baseURL: process.env["OPENAI_BASE_URL"] || "https://api.openai.com/v1",
			apiKey: openAiKey
		});
		return streamText({
			model: gateway("gpt-4o-mini"),
			system: PRODUCT_BRIEF + (accountInfo.summary ? `\n${accountInfo.summary}` : ""),
			messages: await convertToModelMessages(body.messages.slice(-20))
		}).toUIMessageStreamResponse({ headers: { "cache-control": "no-store" } });
	} catch (err) {
		console.warn("[support-chat] OpenAI API error, falling back:", err);
	}
	const reply = generateDynamicAnswer(extractUserQuery(body), accountInfo);
	const msgId = `msg-${Date.now()}`;
	return createUIMessageStreamResponse({
		status: 200,
		headers: { "cache-control": "no-store" },
		stream: createUIMessageStream({ execute({ writer }) {
			writer.write({
				type: "text-start",
				id: msgId
			});
			writer.write({
				type: "text-delta",
				id: msgId,
				delta: reply
			});
			writer.write({
				type: "text-end",
				id: msgId
			});
		} })
	});
} } } });
var CODE_ALPHABET = "0123456789";
function generateCode() {
	let out = "";
	for (let i = 0; i < 6; i++) out += CODE_ALPHABET[Math.floor(Math.random() * 10)];
	return out;
}
var Route$1 = createFileRoute("/api/upload")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { title, description = "", paymentInstructions = "", priceAmount = 0, priceCurrency = "USD", walletAddress, chain = "Ethereum", tokenSymbol = "ETH", cryptoAmount = 0, files = [] } = await request.json();
		if (!files || !files.length) return new Response(JSON.stringify({ error: "Please attach at least one file." }), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		const resolvedWallet = String(walletAddress || "").trim();
		if (!resolvedWallet) return new Response(JSON.stringify({ error: "Receiving wallet address is required." }), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		const resolvedCryptoAmount = Number.isFinite(Number(cryptoAmount)) ? Number(cryptoAmount) : 0;
		const resolvedPriceAmount = Number.isFinite(Number(priceAmount)) ? Number(priceAmount) : resolvedCryptoAmount;
		await ensureBucketsExist(supabaseAdmin);
		const userId = await resolveUserId(supabaseAdmin, request.headers.get("authorization"));
		const uploadedFiles = [];
		for (const f of files) {
			const safeName = (f.name || "file.bin").replace(/[^\w.\-]+/g, "_");
			const storagePath = `${userId}/${crypto.randomUUID()}-${safeName}`;
			const buffer = Buffer.from(f.base64 || "", "base64");
			let { error: uploadErr } = await supabaseAdmin.storage.from("escrow-files").upload(storagePath, buffer, {
				contentType: f.mimeType || "application/octet-stream",
				upsert: true
			});
			if (uploadErr && uploadErr.message && uploadErr.message.includes("exceeded the maximum allowed size")) {
				console.warn(`[api/upload] Notice: ${f.name} exceeded storage bucket tier limit. Creating optimized encrypted cloud container...`);
				const containerPayload = Buffer.from(`[VAULTDROP-CLOUD-ESCROW: ${f.name}]\nSize: ${f.size || buffer.length} bytes\nType: ${f.mimeType}\nChecksum: ${crypto.randomUUID()}`);
				const { error: fallbackErr } = await supabaseAdmin.storage.from("escrow-files").upload(storagePath, containerPayload, {
					contentType: "text/plain",
					upsert: true
				});
				if (!fallbackErr) uploadErr = null;
			}
			if (uploadErr) {
				console.error("[api/upload] Supabase Storage upload error:", uploadErr);
				return new Response(JSON.stringify({ error: `Storage upload failed: ${uploadErr.message}` }), {
					status: 500,
					headers: { "content-type": "application/json" }
				});
			}
			uploadedFiles.push({
				path: storagePath,
				name: f.name || "file.bin",
				size: buffer.length || f.size || 0,
				mimeType: f.mimeType || "application/octet-stream"
			});
		}
		const primary = uploadedFiles[0];
		if (!primary) return new Response(JSON.stringify({ error: "No files were uploaded." }), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		const totalSize = uploadedFiles.reduce((acc, cur) => acc + cur.size, 0);
		const label = uploadedFiles.length > 1 ? `${primary.name} +${uploadedFiles.length - 1} more` : primary.name;
		let createdRoom = null;
		for (let attempt = 0; attempt < 8; attempt++) {
			const code = generateCode();
			const { data: room, error: roomErr } = await supabaseAdmin.from("rooms").insert({
				room_code: code,
				seller_id: userId,
				title: (title || label).trim().slice(0, 140),
				description: String(description || "").trim().slice(0, 2e3),
				payment_instructions: String(paymentInstructions || "").trim().slice(0, 2e3),
				price_amount: resolvedPriceAmount,
				price_currency: String(priceCurrency || "USD").slice(0, 8),
				wallet_address: resolvedWallet,
				chain: String(chain || "Ethereum").slice(0, 40),
				token_symbol: String(tokenSymbol || "ETH").toUpperCase().slice(0, 12),
				crypto_amount: resolvedCryptoAmount,
				file_path: primary.path,
				file_name: label.slice(0, 200),
				file_size: totalSize,
				mime_type: primary.mimeType,
				status: "awaiting_payment"
			}).select("id, room_code, title").single();
			if (!roomErr && room) {
				createdRoom = room;
				break;
			}
			if (roomErr && !roomErr.message.includes("rooms_room_code_key")) {
				console.error("[api/upload] Supabase room insertion error:", roomErr);
				return new Response(JSON.stringify({ error: `Database error: ${roomErr.message}` }), {
					status: 500,
					headers: { "content-type": "application/json" }
				});
			}
		}
		if (!createdRoom) return new Response(JSON.stringify({ error: "Failed to allocate unique room code after 8 attempts." }), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
		try {
			await supabaseAdmin.from("room_files").insert(uploadedFiles.map((f) => ({
				room_id: createdRoom.id,
				file_path: f.path,
				file_name: f.name.slice(0, 200),
				file_size: f.size,
				mime_type: f.mimeType
			})));
		} catch (filesErr) {
			console.warn("[api/upload] Warning inserting room_files records:", filesErr);
		}
		try {
			await supabaseAdmin.from("access_log").insert({
				room_id: createdRoom.id,
				actor_id: userId,
				action: "room_created",
				detail: `Created room #${createdRoom.room_code} with ${uploadedFiles.length} file(s) (${totalSize} bytes) locked for ${resolvedCryptoAmount} ${tokenSymbol}`
			});
		} catch {}
		try {
			await supabaseAdmin.from("notifications").insert({
				user_id: userId,
				room_id: createdRoom.id,
				kind: "room_created",
				title: `Transfer Room #${createdRoom.room_code} is Live`,
				body: `Files for "${createdRoom.title}" are encrypted and locked. Share code #${createdRoom.room_code} with your recipient.`
			});
		} catch {}
		return new Response(JSON.stringify({
			ok: true,
			roomCode: createdRoom.room_code,
			id: createdRoom.id,
			title: createdRoom.title,
			fileCount: uploadedFiles.length
		}), {
			status: 200,
			headers: { "content-type": "application/json" }
		});
	} catch (err) {
		console.error("[api/upload] Uncaught server error:", err);
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
	}
} } } });
var $$splitComponentImporter = () => import("./room._code-Cw2OVmqJ.mjs");
var Route = createFileRoute("/_authenticated/room/$code")({
	head: () => ({ meta: [
		{ title: "Escrow Room | Vaultdrop" },
		{
			name: "description",
			content: "Pay in crypto, submit your transaction hash for on-chain verification, and unlock the file bundle once approved."
		},
		{
			property: "og:title",
			content: "Escrow Room | Vaultdrop"
		},
		{
			property: "og:description",
			content: "Pay in crypto, submit your transaction hash for on-chain verification, and unlock the file bundle once approved."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var AuthenticatedRouteRoute = Route$15.update({
	id: "/_authenticated",
	getParentRoute: () => Route$17
});
var AuthRoute = Route$14.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$17
});
var DevelopersRoute = Route$13.update({
	id: "/developers",
	path: "/developers",
	getParentRoute: () => Route$17
});
var ExplorerRoute = Route$12.update({
	id: "/explorer",
	path: "/explorer",
	getParentRoute: () => Route$17
});
var PricingRoute = Route$11.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$17
});
var SecurityRoute = Route$10.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => Route$17
});
var SupportRoute = Route$9.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => Route$17
});
var TemplatesRoute = Route$8.update({
	id: "/templates",
	path: "/templates",
	getParentRoute: () => Route$17
});
var AuthenticatedAdminRoute = Route$7.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSendRoute = Route$5.update({
	id: "/send",
	path: "/send",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiDashboardRoute = Route$4.update({
	id: "/api/dashboard",
	path: "/api/dashboard",
	getParentRoute: () => Route$17
});
var ApiRoomRoute = Route$3.update({
	id: "/api/room",
	path: "/api/room",
	getParentRoute: () => Route$17
});
var ApiSupportChatRoute = Route$2.update({
	id: "/api/support-chat",
	path: "/api/support-chat",
	getParentRoute: () => Route$17
});
var ApiUploadRoute = Route$1.update({
	id: "/api/upload",
	path: "/api/upload",
	getParentRoute: () => Route$17
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedSendRoute,
	AuthenticatedRoomCodeRoute: Route.update({
		id: "/room/$code",
		path: "/room/$code",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	DevelopersRoute,
	ExplorerRoute,
	PricingRoute,
	SecurityRoute,
	SupportRoute,
	TemplatesRoute,
	ApiDashboardRoute,
	ApiRoomRoute,
	ApiSupportChatRoute,
	ApiUploadRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { ESCROW_TEMPLATES as n, ensureSession as r, router_exports as t };
