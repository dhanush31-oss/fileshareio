import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as Mail, at as ChevronDown, ct as Bot, h as Scale, m as Search, nt as CircleQuestionMark, p as Send, q as Earth } from "../_libs/lucide-react.mjs";
import { i as cn, n as Button, r as Input, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-Cg6jlwgh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-B-x-EjEY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var FAQ_ITEMS = [
	{
		q: "How does Vaultdrop protect both the buyer and seller?",
		a: "Vaultdrop holds uploaded assets in encrypted private Supabase Storage buckets under strict PostgreSQL Row-Level-Security (RLS). The buyer can inspect file metadata and terms, but cannot download the raw files until payment is confirmed on-chain or manually approved by the seller. If a dispute arises, developer arbiters review access logs and cryptographic proofs."
	},
	{
		q: "What happens if a buyer submits a fake payment receipt?",
		a: "The seller retains full control and manually reviews payment proof before clicking 'Approve & Release Files'. Furthermore, for on-chain crypto transactions, our automated Covalent oracle validates the exact transaction hash, block depth, and token transfer amount on the blockchain before verifying."
	},
	{
		q: "How do I download my unlocked files from Supabase?",
		a: "Once approved, the escrow terminal generates time-limited signed URLs directly from our high-speed Supabase Storage CDN. You can click 'Download All' to retrieve your files immediately."
	},
	{
		q: "Can developers or third parties see my confidential files?",
		a: "Files are protected by 256-bit encryption. Authorized developer engineers only access files under strict audit protocols for diagnostic maintenance, disaster recovery, or formal dispute arbitration as documented in our security policy."
	},
	{
		q: "Which international currencies and blockchains are supported?",
		a: "We support USD, EUR, GBP, JPY, CAD, AUD, AED, INR, and USDT/USDC across Ethereum, Base, Polygon, Arbitrum, BSC, and Solana networks."
	},
	{
		q: "How do 6-digit room codes work?",
		a: "Each escrow room receives a unique, collision-resistant 6-digit code. Senders can simply text or email the code to their buyer, who can enter it on the home page or navigation bar to open the room immediately."
	}
];
function SupportPage() {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [ticketName, setTicketName] = (0, import_react.useState)("");
	const [ticketEmail, setTicketEmail] = (0, import_react.useState)("");
	const [ticketRoomCode, setTicketRoomCode] = (0, import_react.useState)("");
	const [ticketMessage, setTicketMessage] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const filteredFaqs = FAQ_ITEMS.filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()));
	const handleTicketSubmit = (e) => {
		e.preventDefault();
		if (!ticketEmail.trim() || !ticketMessage.trim()) {
			toast.error("Please fill in your email and message");
			return;
		}
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
			setTicketMessage("");
			setTicketRoomCode("");
			toast.success("Support ticket #ESC-" + Math.floor(1e5 + Math.random() * 9e5) + " dispatched to our 24/7 International Desk.");
		}, 700);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-3xl mx-auto space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-3.5" }), " 24/7 Global Escrow Support Desk"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground",
					children: "How Can Our International Team Assist You?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
					children: "Instant multi-lingual AI Concierge, searchable knowledge base, and human dispute arbitration for cross-border digital asset settlements."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-lg mx-auto pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "Search questions, payment verification, Supabase storage...",
						className: "pl-10 h-11 text-xs bg-card border-border/80 rounded-xl shadow-md"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 grid sm:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "AI Escrow Concierge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Click the floating support widget in the bottom-right corner for instant AI resolution in 7+ languages."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "Dispute & Mediation Desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Human arbiters review blockchain transaction logs and cryptographic file checksums to resolve contested escrows."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-base text-foreground",
							children: "International SLA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Priority ticket response times under 15 minutes for enterprise escrows and high-value software handovers."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 max-w-3xl mx-auto space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-foreground",
					children: "Frequently Asked Questions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Everything you need to know about Vaultdrop escrow mechanics."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-panel rounded-2xl border border-border/80 p-6 shadow-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full space-y-2",
					children: filteredFaqs.map((faq, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: `item-${idx}`,
						className: "border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-left text-xs font-bold text-foreground hover:no-underline hover:text-primary",
							children: faq.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: faq.a
						})]
					}, idx))
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 surface-panel p-6 sm:p-8 rounded-2xl border border-border/80 shadow-xl max-w-3xl mx-auto space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold text-foreground",
					children: "Open an International Support Ticket"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Direct line to our senior escrow operations and security engineering staff."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleTicketSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Your Full Name / Entity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: ticketName,
								onChange: (e) => setTicketName(e.target.value),
								placeholder: "Jane Doe (Acme Corp)",
								className: "text-xs bg-muted/30 border-border/80"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Email Address *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								required: true,
								value: ticketEmail,
								onChange: (e) => setTicketEmail(e.target.value),
								placeholder: "jane@company.com",
								className: "text-xs bg-muted/30 border-border/80"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-foreground",
							children: "Room Code (Optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: ticketRoomCode,
							onChange: (e) => setTicketRoomCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
							placeholder: "e.g. 849201",
							className: "text-xs font-mono bg-muted/30 border-border/80 w-48"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-foreground",
							children: "Inquiry Details or Dispute Reason *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							required: true,
							value: ticketMessage,
							onChange: (e) => setTicketMessage(e.target.value),
							placeholder: "Describe your question, transaction issue, or arbitration request in detail...",
							className: "text-xs bg-muted/30 border-border/80 min-h-[120px]"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: submitting,
						className: "w-full sm:w-auto px-6 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5 mr-1.5" }),
							" ",
							submitting ? "Transmitting Ticket..." : "Submit Support Request"
						]
					})
				]
			})]
		})
	] });
}
//#endregion
export { SupportPage as component };
