import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CodeXml, F as Film, J as Download, V as FileCodeCorner, a as Upload, b as Play, dt as ArrowRight, et as CloudUpload, g as RotateCcw, h as Scale, it as ChevronRight, j as Globe, k as Layers, pt as Activity, q as Earth, rt as CircleCheck, s as Sparkles, tt as Clock } from "../_libs/lucide-react.mjs";
import { n as Button, r as Input, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B6VN26Jw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GLOBAL_STATS = [
	{
		label: "Total Settled Volume",
		value: "$18.4M+",
		change: "+14.2% MoM",
		icon: Activity,
		color: "text-emerald-400"
	},
	{
		label: "Active Escrows Completed",
		value: "9,840+",
		change: "100% Delivery Rate",
		icon: CircleCheck,
		color: "text-primary"
	},
	{
		label: "Median Settlement Speed",
		value: "18.4s",
		change: "Automated Oracle",
		icon: Clock,
		color: "text-amber-400"
	},
	{
		label: "Supported Jurisdictions",
		value: "140+ Countries",
		change: "Multi-Currency",
		icon: Earth,
		color: "text-indigo-400"
	}
];
var USE_CASES = [
	{
		title: "SaaS Codebase & Repository Handover",
		category: "Software & Dev",
		icon: CodeXml,
		badge: "Agile Release",
		description: "Safely transfer private GitHub repos, environment secrets, and intellectual property upon invoice clearance."
	},
	{
		title: "3D VFX & 4K Studio Master Delivery",
		category: "Creative Media",
		icon: Film,
		badge: "High Bitrate",
		description: "Lock raw Blender / Unreal Engine 5 archives and ProRes master sequences behind verified client milestone payments."
	},
	{
		title: "Cross-Border Commercial M&A Data Room",
		category: "Legal & Corporate",
		icon: Scale,
		badge: "Confidential",
		description: "Share sensitive audit statements, cap tables, and legal agreements with full developer access audit logging."
	},
	{
		title: "Domain Name & Digital IP Transfers",
		category: "Digital Assets",
		icon: Globe,
		badge: "Zero-Fraud",
		description: "Lock domain auth codes and registrar transfer paperwork until wire or crypto escrow is permanently confirmed."
	}
];
var TESTIMONIALS = [
	{
		quote: "Vaultdrop transformed our offshore software deliverables. We deliver client repos with 100% confidence that code is unlocked only after milestone funds clear.",
		author: "Alexander Wright",
		role: "VP Engineering, Synapse Labs",
		location: "London, UK",
		avatar: "AW"
	},
	{
		quote: "As a VFX supervisor delivering 20GB 4K render passes to Hollywood agencies, Vaultdrop’s Supabase storage speed and instant release terminal are unmatched.",
		author: "Elena Rostova",
		role: "Lead Technical Director, Apex FX",
		location: "Zurich, Switzerland",
		avatar: "ER"
	},
	{
		quote: "The on-chain transaction hash verification saved our cross-border consulting agency dozens of hours previously wasted on fraudulent wire screenshots.",
		author: "Kenji Takahashi",
		role: "Managing Partner, Pacific Tech Capital",
		location: "Tokyo / Singapore",
		avatar: "KT"
	}
];
function LandingPage() {
	const navigate = useNavigate();
	const [roomCode, setRoomCode] = (0, import_react.useState)("");
	const [sandboxStep, setSandboxStep] = (0, import_react.useState)(1);
	const [sandboxSimulating, setSandboxSimulating] = (0, import_react.useState)(false);
	const handleOpenRoom = (e) => {
		e.preventDefault();
		const clean = roomCode.replace(/\D/g, "").slice(0, 6);
		if (clean.length === 6) navigate({
			to: "/room/$code",
			params: { code: clean }
		});
	};
	const advanceSandbox = () => {
		setSandboxSimulating(true);
		setTimeout(() => {
			setSandboxSimulating(false);
			setSandboxStep((prev) => prev < 4 ? prev + 1 : 1);
		}, 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary/20 via-blue-500/10 to-primary/20 border border-primary/40 text-primary text-xs font-extrabold uppercase tracking-wider shadow-sm animate-in fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 animate-pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "International Digital Asset Settlement & Escrow" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline text-muted-foreground font-normal",
							children: "|"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline font-mono text-[11px] text-foreground",
							children: "v2.4 Enterprise"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.1]",
					children: [
						"Confidential Digital Asset Escrow ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:inline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-gradient-to-r from-blue-400 via-primary to-indigo-400 bg-clip-text text-transparent",
							children: "for Global Enterprises & Creators."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal",
					children: "Upload source code repositories, 3D master renders, confidential data rooms, or digital IP. Assets are locked in private Supabase Storage and released instantly upon verified on-chain or wire settlement."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4 max-w-2xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-6 sm:p-8 rounded-3xl border border-border/80 shadow-2xl space-y-6 text-left relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-5 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col justify-between space-y-4 hover:border-primary/60 transition-colors group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30 group-hover:scale-105 transition-transform",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3.5 font-bold text-base text-foreground",
											children: "Send Files & Lock Escrow"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-1",
											children: "Upload multiple files to Supabase and generate an instant 6-digit room code with smart release rules."
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/send",
											children: ["Create Escrow Room ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 ml-1.5" })]
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-5 rounded-2xl border border-border/90 bg-card flex flex-col justify-between space-y-4 hover:border-border transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 items-center justify-center rounded-xl bg-muted text-foreground border border-border",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5 text-primary" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3.5 font-bold text-base text-foreground",
											children: "Unlock & Download"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-1",
											children: "Enter the 6-digit transfer code you received to inspect terms and unlock your assets."
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
										onSubmit: handleOpenRoom,
										className: "space-y-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: roomCode,
												onChange: (e) => {
													const val = e.target.value.replace(/\D/g, "").slice(0, 6);
													setRoomCode(val);
													if (val.length === 6) navigate({
														to: "/room/$code",
														params: { code: val }
													});
												},
												placeholder: "6-digit code",
												className: "text-center font-mono tracking-widest text-sm bg-muted/40 h-10 font-bold"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												disabled: roomCode.length !== 6,
												className: "h-10 px-5 font-bold bg-secondary text-secondary-foreground hover:bg-muted",
												children: "Open"
											})]
										})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5 text-primary" }), " Quick Start Templates:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors underline-offset-2 hover:underline",
											children: "SaaS Codebase"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors underline-offset-2 hover:underline",
											children: "3D VFX Media"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors underline-offset-2 hover:underline",
											children: "M&A Data Room"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "text-primary font-semibold hover:underline",
											children: "View All (8) →"
										})
									]
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4",
			children: GLOBAL_STATS.map((stat, idx) => {
				const Icon = stat.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-5 rounded-2xl border border-border/80 space-y-1 shadow-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold uppercase tracking-wider",
								children: stat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-4 ${stat.color}` })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-black text-foreground font-mono",
							children: stat.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xs font-semibold ${stat.color}`,
							children: stat.change
						})
					]
				}, idx);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-20 surface-panel p-6 sm:p-10 rounded-3xl border border-border/80 shadow-2xl space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3" }), " Interactive Sandbox"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight",
						children: "Test-Drive a 30-Second Escrow Cycle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-muted-foreground mt-1",
						children: "Experience the end-to-end cryptographic escrow flow right in your browser."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 bg-muted/50 p-1.5 rounded-xl border border-border/80 shrink-0",
					children: [
						1,
						2,
						3,
						4
					].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSandboxStep(step),
						className: `px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${sandboxStep === step ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: ["0", step]
					}, step))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 rounded-2xl bg-black/50 border border-border space-y-6",
				children: [
					sandboxStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-in fade-in duration-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-primary uppercase font-mono",
									children: "Step 1: Seller Uploads Payload"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono",
									children: "Supabase Storage"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-card border border-border/70 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCodeCorner, { className: "size-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-sm text-foreground",
										children: "saas_core_v3_production.zip"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-mono",
										children: "Size: 42.8 MB · SHA-256: 9f8a...31b0"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-emerald-400",
									children: "Locked in Escrow"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Room Code ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-primary font-bold",
										children: "#849201"
									}),
									" generated. File is safely stored in Supabase private bucket with 256-bit AES encryption."
								]
							})
						]
					}),
					sandboxStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-in fade-in duration-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-amber-400 uppercase font-mono",
									children: "Step 2: Buyer Enters Room & Reviews Terms"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono",
									children: "Awaiting Payment"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-card border border-border/70 space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Escrow Price:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground font-mono",
											children: "$4,500.00 USD (4,500 USDT)"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Settlement Address:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-foreground",
											children: "0x71C8492...4B91"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Download Access:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-400 font-semibold",
											children: "Locked (Pending Settlement)"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Buyer can view file name, size, and milestone checklist, but cannot download the raw file."
							})
						]
					}),
					sandboxStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-in fade-in duration-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-indigo-400 uppercase font-mono",
									children: "Step 3: Blockchain Oracle Verification"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono",
									children: "Covalent On-Chain"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-card border border-border/70 space-y-2 text-xs font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-emerald-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Tx Hash Verified: 0x9a8f...4102"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "42 Confirmations" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-[11px]",
									children: "Oracle matched 4,500 USDT ERC-20 transfer from buyer to seller wallet on Ethereum Mainnet."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Automated proof validates payment authenticity, or seller performs manual 1-click approval."
							})
						]
					}),
					sandboxStep === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-in fade-in duration-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-emerald-400 uppercase font-mono",
									children: "Step 4: Instant Supabase Download Release"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono",
									children: "Settlement Complete"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-sm text-emerald-400",
									children: "Room Status: Approved & Released"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground font-mono",
									children: "High-Speed Signed Supabase CDN URL active"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "font-bold bg-emerald-500 hover:bg-emerald-600 text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 mr-1" }), " Download .zip"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Buyer downloads files securely. Seller receives funds. Immutable audit log recorded in PostgreSQL."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setSandboxStep(1),
							className: "text-xs font-semibold border-border/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 mr-1" }), " Reset Simulation"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: advanceSandbox,
							disabled: sandboxSimulating,
							className: "text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90",
							children: sandboxStep === 4 ? "Start Over" : "Advance Step →"
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-20 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3" }), " Turnkey Blueprints"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight",
						children: "Engineered for High-Value International Deals"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-muted-foreground mt-1",
						children: "Select pre-configured escrow rules with verified milestone checklists and legal clauses."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "sm",
					className: "border-border/80 text-xs font-bold shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/templates",
						children: ["Explore All 8 Templates ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 ml-1" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: USE_CASES.map((uc, idx) => {
					const Icon = uc.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-6 rounded-2xl border border-border/80 hover:border-primary/50 transition-all flex flex-col justify-between space-y-4 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground",
									children: uc.badge
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm text-foreground mt-3 group-hover:text-primary transition-colors",
								children: uc.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1.5 leading-relaxed",
								children: uc.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/templates",
							className: "text-xs font-bold text-primary hover:underline inline-flex items-center gap-1",
							children: ["Use Template ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
						})]
					}, idx);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-20 surface-panel p-8 sm:p-12 rounded-3xl border border-border/80 shadow-2xl space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl font-extrabold text-foreground",
					children: "Trusted by Cross-Border Teams Worldwide"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm text-muted-foreground",
					children: "From Silicon Valley startups to Swiss asset managers and Tokyo design studios."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-3",
				children: TESTIMONIALS.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 rounded-2xl bg-card border border-border/70 flex flex-col justify-between space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-foreground/90 italic leading-relaxed",
						children: [
							"\"",
							t.quote,
							"\""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 pt-3 border-t border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs",
							children: t.avatar
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-foreground",
								children: t.author
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: t.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-primary font-mono",
								children: t.location
							})
						] })]
					})]
				}, idx))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-20 text-center surface-panel p-10 sm:p-16 rounded-3xl border border-primary/40 bg-gradient-to-b from-primary/10 via-card to-background shadow-2xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl sm:text-5xl font-black text-foreground tracking-tight",
					children: "Ready to Deliver Confidential Assets Worldwide?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm sm:text-base text-muted-foreground max-w-xl mx-auto",
					children: "Create your first escrow room in under 60 seconds. Zero monthly subscription needed for test transfers."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "h-12 px-8 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/send",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4 mr-2" }), " Send Files Now"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						className: "h-12 px-6 text-sm font-bold border-border/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/templates",
							children: "Browse Templates"
						})
					})]
				})
			]
		})
	] });
}
//#endregion
export { LandingPage as component };
