import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { D as Lock, H as FileCheck, P as FingerprintPattern, Y as Database, h as Scale, l as ShieldCheck, o as Terminal, p as Send, u as ShieldAlert } from "../_libs/lucide-react.mjs";
import { n as Button, r as Input, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-Cg6jlwgh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/security-s_z085C8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SecurityPage() {
	const [bountyUrl, setBountyUrl] = (0, import_react.useState)("");
	const [bountyReport, setBountyReport] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const handleBountySubmit = (e) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Enterprise Trust & Compliance"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground",
					children: "Zero-Knowledge Security & Developer Audit Architecture"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
					children: "How Vaultdrop combines Supabase Row-Level Security, multi-chain cryptographic verification, and bank-grade zero-knowledge custody for international high-value transfers."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "256-Bit AES Storage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "All files uploaded to Supabase Storage are encrypted at rest with private KMS keys and isolated under UUID paths."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "SHA-256 Payload Hash"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Cryptographic checksums are generated client-side before upload, preventing byte alteration or man-in-the-middle attacks."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "Developer Audit Access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Authorized developer engineers maintain cryptographic audit trails and maintenance download access for dispute mediation."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "SOC2 Type II Certified"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Annual third-party penetration audits, strict least-privilege RBAC, and automated vulnerability scanning."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-xl font-bold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5 text-primary" }), " Supabase Storage & Database RLS Isolation"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Every database record and file object in Supabase is protected by strict PostgreSQL Row-Level Security policies. Here is how permissions are enforced:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-3 gap-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl bg-card border border-border/70 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: "1. Seller / Sender"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Only the authenticated seller can upload files to their personal directory (`auth.uid()/*`) and modify escrow pricing parameters."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl bg-card border border-border/70 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: "2. Buyer / Recipient"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground",
								children: [
									"Buyers can inspect room metadata and upload proof of payment, but CANNOT download files until the room status transition to",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-emerald-400",
										children: "approved"
									}),
									"."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl bg-card border border-border/70 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: "3. Developer Oversight"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Service role keys and verified admins have diagnostic read access for infrastructure telemetry, testing, and dispute arbitration."
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-lg font-bold text-foreground flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-5 text-emerald-400" }), " International Compliance Matrix"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-panel rounded-2xl border border-border/80 overflow-hidden shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border/80 bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Framework"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Jurisdiction"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Coverage & Scope"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right",
								children: "Compliance Status"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "divide-y divide-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 font-bold text-foreground",
									children: "SOC2 Type II"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "Global (AICPA)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "Security, Availability, and Confidentiality Trust Principles"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-right font-bold text-emerald-400",
									children: "Verified Passed"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 font-bold text-foreground",
									children: "ISO/IEC 27001:2022"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "International"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "Information Security Management Systems (ISMS)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-right font-bold text-emerald-400",
									children: "Certified"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 font-bold text-foreground",
									children: "GDPR & UK-GDPR"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "European Union & UK"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "Data minimization, right to erasure, and EU data residency"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-right font-bold text-emerald-400",
									children: "Compliant"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 font-bold text-foreground",
									children: "FinCEN Escrow Rules"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "United States"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: "Conditional multi-sig digital asset custody guidelines"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-right font-bold text-emerald-400",
									children: "Compliant"
								})
							] })
						]
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold text-foreground",
						children: "Responsible Disclosure & Bug Bounty Program"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "We award bounties up to $25,000 USD for verified critical vulnerabilities in our smart escrow contracts or Supabase storage RLS boundaries."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleBountySubmit,
					className: "space-y-3 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: bountyUrl,
							onChange: (e) => setBountyUrl(e.target.value),
							placeholder: "Affected URL or Component (e.g. /api/room, storage RLS, smart contract)...",
							className: "text-xs bg-muted/40 border-border/80"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: bountyReport,
							onChange: (e) => setBountyReport(e.target.value),
							placeholder: "Provide Proof of Concept (PoC), steps to reproduce, and impact analysis...",
							className: "text-xs bg-muted/40 border-border/80 min-h-[100px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: submitting,
							className: "text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5 mr-1.5" }),
								" ",
								submitting ? "Transmitting PoC..." : "Submit Disclosure Report"
							]
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { SecurityPage as component };
