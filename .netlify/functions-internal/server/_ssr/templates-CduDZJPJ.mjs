import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CodeXml, F as Film, G as Eye, ct as Bot, dt as ArrowRight, h as Scale, j as Globe, k as Layers, m as Search, rt as CircleCheck, s as Sparkles, u as ShieldAlert } from "../_libs/lucide-react.mjs";
import { n as Button, r as Input, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { n as ESCROW_TEMPLATES } from "./router-DngNvJgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-CduDZJPJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TemplatesPage() {
	useNavigate();
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [previewTemplate, setPreviewTemplate] = (0, import_react.useState)(null);
	const filtered = ESCROW_TEMPLATES.filter((t) => {
		const matchesCat = selectedCategory === "all" || t.category === selectedCategory;
		const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.summary.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCat && matchesSearch;
	});
	const handleUseTemplate = (tpl) => {
		const params = new URLSearchParams({
			template: tpl.id,
			title: tpl.title,
			price: tpl.suggestedPrice.replace(/,/g, ""),
			currency: tpl.suggestedCurrency,
			chain: tpl.suggestedChain,
			token: tpl.tokenSymbol,
			instructions: tpl.sampleInstructions,
			description: `${tpl.summary}\n\nDeliverable Checklist:\n${tpl.checklist.map((c) => `- ${c}`).join("\n")}`
		});
		if (typeof window !== "undefined") window.location.href = `/send?${params.toString()}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-3xl mx-auto space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), " Turnkey Industry Escrow Blueprints"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground",
					children: "Ready-to-Use Escrow Templates for International Deals"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto",
					children: "Launch secure, legally sound digital asset escrows in under 60 seconds. Pre-configured with deliverable checklists, milestone rules, and cryptographic verification standards."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/60 p-3 rounded-2xl border border-border/80 shadow-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-1.5 w-full sm:w-auto",
				children: [
					{
						id: "all",
						label: "All Templates",
						icon: Sparkles
					},
					{
						id: "code",
						label: "Software & Code",
						icon: CodeXml
					},
					{
						id: "media",
						label: "3D & VFX Media",
						icon: Film
					},
					{
						id: "legal",
						label: "Legal & M&A",
						icon: Scale
					},
					{
						id: "web3",
						label: "Domains & Web3",
						icon: Globe
					},
					{
						id: "ai",
						label: "AI Models & Data",
						icon: Bot
					}
				].map((tab) => {
					const Icon = tab.icon;
					const active = selectedCategory === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedCategory(tab.id),
						className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
					}, tab.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full sm:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: searchQuery,
					onChange: (e) => setSearchQuery(e.target.value),
					placeholder: "Search templates & rules...",
					className: "pl-9 h-9 text-xs bg-muted/40 border-border/70"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: filtered.map((tpl) => {
				const Icon = tpl.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group surface-panel p-6 rounded-2xl border border-border/80 hover:border-primary/50 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-primary/5 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${tpl.badgeColor}`,
								children: tpl.badge
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug",
							children: tpl.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground leading-relaxed",
							children: tpl.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-4 border-t border-border/60 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Included Deliverables:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-1 text-xs text-foreground/90",
								children: [tpl.checklist.slice(0, 3).map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: item
									})]
								}, idx)), tpl.checklist.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-[11px] text-muted-foreground italic pl-5",
									children: [
										"+",
										tpl.checklist.length - 3,
										" more verification checkpoints"
									]
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 pt-4 border-t border-border/60 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setPreviewTemplate(tpl),
							className: "flex-1 text-xs font-semibold border-border/80 hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 mr-1" }), " Inspect Terms"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => handleUseTemplate(tpl),
							className: "flex-1 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
							children: ["Use Template ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 ml-1" })]
						})]
					})]
				}, tpl.id);
			})
		}),
		filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-panel mt-8 p-12 text-center rounded-2xl max-w-md mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-8 text-muted-foreground mx-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-bold text-foreground",
					children: "No templates match your filter"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Try adjusting your search keywords or switch category filter."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => {
						setSelectedCategory("all");
						setSearchQuery("");
					},
					className: "mt-4 text-xs font-semibold",
					children: "Reset Filters"
				})
			]
		}),
		previewTemplate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border p-6 shadow-2xl space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${previewTemplate.badgeColor}`,
								children: previewTemplate.badge
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-mono text-muted-foreground uppercase",
								children: ["Template ID: ", previewTemplate.id]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold text-foreground mt-1",
							children: previewTemplate.title
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setPreviewTemplate(null),
							className: "h-8 w-8 p-0 rounded-full",
							children: "✕"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-muted/40 p-4 rounded-xl border border-border/70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-foreground mb-1",
									children: "Overview & Scope"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground leading-relaxed",
									children: previewTemplate.description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-foreground mb-2",
								children: "Escrow Milestone Checklist:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid sm:grid-cols-2 gap-2",
								children: previewTemplate.checklist.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 p-2 rounded-lg bg-card border border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/90",
										children: item
									})]
								}, idx))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-foreground mb-2",
								children: "Pre-Configured Buyer Instructions:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "p-3.5 rounded-xl bg-black/40 border border-border font-mono text-[11px] text-muted-foreground whitespace-pre-wrap",
								children: previewTemplate.sampleInstructions
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border/70 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-bold text-foreground mb-1 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-4 text-primary" }), " Binding Escrow Contract Clause:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "italic text-muted-foreground bg-primary/5 p-3 rounded-xl border border-primary/20 leading-relaxed",
									children: [
										"\"",
										previewTemplate.legalTermsExcerpt,
										"\""
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-4 border-t border-border/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setPreviewTemplate(null),
							className: "text-xs font-semibold",
							children: "Close"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => {
								const tpl = previewTemplate;
								setPreviewTemplate(null);
								handleUseTemplate(tpl);
							},
							className: "text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
							children: ["Use This Template in Escrow Room ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 ml-1" })]
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { TemplatesPage as component };
