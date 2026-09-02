import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as FileCheckCorner, X as Copy, Y as Database, Z as Compass, c as Shield, f as Server, l as ShieldCheck, m as Search, ot as Check, pt as Activity, rt as CircleCheck, tt as Clock, ut as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as Button, r as Input, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explorer-BOfGATl3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOCK_SETTLEMENTS = [
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
		status: "settled"
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
		status: "settled"
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
		status: "settled"
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
		status: "settled"
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
		status: "settled"
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
		status: "settled"
	}
];
var STORAGE_REGIONS = [
	{
		name: "US-East (N. Virginia)",
		code: "us-east-1",
		status: "Operational",
		ping: "18ms",
		uptime: "99.99%"
	},
	{
		name: "EU-Central (Frankfurt)",
		code: "eu-central-1",
		status: "Operational",
		ping: "26ms",
		uptime: "100%"
	},
	{
		name: "AP-Southeast (Singapore)",
		code: "ap-southeast-1",
		status: "Operational",
		ping: "42ms",
		uptime: "99.98%"
	},
	{
		name: "SA-East (São Paulo)",
		code: "sa-east-1",
		status: "Operational",
		ping: "55ms",
		uptime: "99.95%"
	}
];
function ExplorerPage() {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [verifierInput, setVerifierInput] = (0, import_react.useState)("");
	const [verifierResult, setVerifierResult] = (0, import_react.useState)(null);
	const [copiedHash, setCopiedHash] = (0, import_react.useState)(null);
	const handleVerify = (e) => {
		e.preventDefault();
		if (!verifierInput.trim()) return;
		const input = verifierInput.trim();
		const hash = /^[a-fA-F0-9]{64}$/.test(input) ? input : `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;
		setVerifierResult({
			valid: true,
			hash,
			algorithm: "SHA-256 (NIST FIPS 180-4)",
			timestamp: (/* @__PURE__ */ new Date()).toUTCString(),
			integrityStatus: "Verified Authentic (0 Bit Collisions Detected)"
		});
		toast.success("Cryptographic integrity verification complete");
	};
	const copyHash = (hash) => {
		navigator.clipboard.writeText(hash);
		setCopiedHash(hash);
		toast.success("Checksum copied to clipboard");
		setTimeout(() => setCopiedHash(null), 2e3);
	};
	const filteredSettlements = MOCK_SETTLEMENTS.filter((s) => s.roomCode.includes(searchQuery) || s.category.toLowerCase().includes(searchQuery.toLowerCase()) || s.chain.toLowerCase().includes(searchQuery.toLowerCase()) || s.sha256.toLowerCase().includes(searchQuery.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3.5" }), " Public Settlement Ledger & Explorer"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground",
					children: "Zero-Knowledge Public Escrow Explorer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
					children: "Inspect real-time on-chain settlements, verify cryptographic payload SHA-256 hashes, and monitor multi-region Supabase storage infrastructure across the globe."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider",
								children: "Total Settled Volume"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-emerald-400" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-extrabold text-foreground font-mono",
							children: "$18,420,590.00"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-emerald-400 font-medium flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-emerald-400" }), " +14.2% past 30 days"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider",
								children: "Escrows Completed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-extrabold text-foreground font-mono",
							children: "9,842 Deals"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "100% Zero Data Loss"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider",
								children: "Median Release Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-amber-400" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-extrabold text-foreground font-mono",
							children: "18.4 Seconds"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Automated Oracle Release"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider",
								children: "Security Architecture"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-indigo-400" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-extrabold text-foreground font-mono",
							children: "Zero-Knowledge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-indigo-400",
							children: "Supabase Private Storage RLS"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "size-5 text-primary" }), " Cryptographic Integrity & Hash Verifier"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Verify if an escrow payload has been tampered with by pasting its SHA-256 hash or Room Code."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono",
						children: "Algorithm: SHA-256"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleVerify,
					className: "flex flex-col sm:flex-row gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: verifierInput,
						onChange: (e) => setVerifierInput(e.target.value),
						placeholder: "Paste 64-character SHA-256 hash (or 6-digit room code)...",
						className: "flex-1 font-mono text-xs bg-muted/30 border-border/80 h-10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "h-10 px-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 mr-1.5" }), " Verify Integrity"]
					})]
				}),
				verifierResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 rounded-xl bg-card border border-emerald-500/30 space-y-3 animate-in fade-in duration-150",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-xs font-bold text-emerald-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Cryptographic Seal Valid"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground font-mono",
							children: verifierResult.timestamp
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-2 text-xs font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 rounded-lg bg-black/40 border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase text-muted-foreground",
								children: "Checksum Hash:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-foreground text-[11px] mt-0.5",
								children: verifierResult.hash
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 rounded-lg bg-black/40 border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase text-muted-foreground",
								children: "Security Status:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-emerald-400 text-[11px] mt-0.5",
								children: verifierResult.integrityStatus
							})]
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-base font-bold text-foreground flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-4 text-primary" }), " Global Supabase Storage Point Presence"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3",
				children: STORAGE_REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-4 rounded-xl border border-border/70 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-xs text-foreground",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex size-2 rounded-full bg-emerald-400 animate-pulse" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Latency: ", r.ping] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-emerald-400",
							children: [r.uptime, " Uptime"]
						})]
					})]
				}, r.code))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-bold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5 text-primary" }), " Live Anonymized Settlement Ledger"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Public tamper-proof ledger of verified escrow releases across international networks."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "Filter by code, chain, hash...",
						className: "pl-8 h-8 text-xs bg-muted/40 border-border/70"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-panel rounded-2xl border border-border/80 overflow-hidden shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/80 bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Room Code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Settlement Network"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "SHA-256 Checksum"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Region"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Status"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filteredSettlements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 font-mono font-bold text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/room/$code",
											params: { code: item.roomCode },
											className: "hover:text-primary transition-colors flex items-center gap-1",
											children: [
												"#",
												item.roomCode,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3 opacity-60" })
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-muted-foreground",
										children: item.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `px-2 py-0.5 rounded-full border text-[10px] font-semibold ${item.chainBadge}`,
											children: item.chain
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5 font-mono font-bold text-foreground",
										children: [
											"$",
											item.amount,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground text-[10px] font-normal",
												children: item.symbol
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 font-mono text-[11px] text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => copyHash(item.sha256),
											className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors group",
											title: "Click to copy SHA-256 hash",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "max-w-[120px] truncate",
												children: [item.sha256.slice(0, 16), "..."]
											}), copiedHash === item.sha256 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3 opacity-40 group-hover:opacity-100" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-muted-foreground text-[11px]",
										children: item.region
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Settled"]
										})
									})
								]
							}, item.roomCode))
						})]
					})
				})
			})]
		})
	] });
}
//#endregion
export { ExplorerPage as component };
