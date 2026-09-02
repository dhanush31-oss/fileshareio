import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, n as DefaultChatTransport, s as require_jsx_runtime, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as supabase } from "./client-BhPdVgWC.mjs";
import { A as KeyRound, C as MessageSquareText, D as Lock, M as Folder, O as LoaderCircle, T as Menu, Z as Compass, a as Upload, c as Shield, ct as Bot, k as Layers, l as ShieldCheck, n as X, o as Terminal, p as Send, q as Earth, s as Sparkles, ut as ArrowUpRight, w as MessageCircle, x as Percent } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CQNRbcL4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var SUGGESTIONS = [
	"How does the escrow flow work?",
	"My payment says pending — why?",
	"Which networks can I pay on?",
	"How do I unlock my files?"
];
function SupportAgent() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [signedIn, setSignedIn] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const transport = (0, import_react.useMemo)(() => new DefaultChatTransport({
		api: "/api/support-chat",
		headers: async () => {
			const { data } = await supabase.auth.getSession();
			const token = data.session?.access_token;
			return token ? { Authorization: `Bearer ${token}` } : {};
		}
	}), []);
	const { messages, sendMessage, status, error } = useChat({ transport });
	const busy = status === "submitted" || status === "streaming";
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getSession().then(({ data }) => {
			if (active) setSignedIn(Boolean(data.session));
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(Boolean(session)));
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, busy]);
	function submit(text) {
		const value = text.trim();
		if (!value || busy) return;
		setInput("");
		sendMessage({ text: value });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": open ? "Close support chat" : "Open support chat",
		onClick: () => setOpen((v) => !v),
		className: cn("fixed bottom-5 right-5 z-50 flex size-13 items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/40", open && "rotate-90 scale-95"),
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed bottom-24 right-5 z-50 flex w-[min(24rem,calc(100vw-2.5rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl transition-all duration-300", open ? "pointer-events-auto max-h-[32rem] translate-y-0 scale-100 opacity-100" : "pointer-events-none max-h-0 translate-y-3 scale-95 opacity-0"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border/70 bg-muted/40 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold leading-tight",
						children: "Vault Assist"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: signedIn ? "Connected to your account" : "General help · sign in for account help"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 space-y-3 overflow-y-auto px-4 py-4",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 size-4 shrink-0 text-primary" }), "Ask me anything about sending files, crypto payments, or unlocking a room."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => submit(s),
								className: "rounded-full border border-border/80 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
								children: s
							}, s))
						})]
					}),
					messages.map((m) => {
						const text = m.parts.filter((p) => p.type === "text").map((p) => p.text).join("");
						if (!text) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("flex", m.role === "user" ? "justify-end" : "justify-start"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed", m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border border-border/70 bg-muted/40 text-foreground"),
								children: text
							})
						}, m.id);
					}),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), " Vault Assist is thinking…"]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-destructive",
						children: "Couldn't reach support right now. Please try again."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					submit(input);
				},
				className: "flex items-center gap-2 border-t border-border/70 bg-muted/20 px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Type your question…",
					className: "h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary/60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					className: "size-9 shrink-0",
					disabled: busy || !input.trim(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		]
	})] });
}
function VaultdropLogo({ className, size = 38, showText = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3 group shrink-0 select-none", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative shrink-0 flex items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: `${size}px`,
					height: `${size}px`
				},
				className: "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
					style: {
						width: `${Math.round(size * .48)}px`,
						height: `${Math.round(size * .48)}px`
					},
					className: "text-white stroke-[2.4]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute -top-1 -right-1 flex size-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full size-3 bg-emerald-400 border-2 border-background shadow-sm" })]
			})]
		}), showText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-extrabold tracking-tight text-foreground text-base sm:text-lg",
					children: "Vaultdrop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-950/80 text-sky-400 border border-blue-500/30 uppercase tracking-wider font-sans shadow-sm",
					children: "GLOBAL"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] text-muted-foreground font-mono -mt-0.5 tracking-tight font-medium",
				children: "International Escrow Cloud"
			})]
		})]
	});
}
var LOCALES = [
	{
		code: "EN",
		label: "English (US)",
		flag: "🇺🇸",
		native: "English"
	},
	{
		code: "ES",
		label: "Español",
		flag: "🇪🇸",
		native: "Español"
	},
	{
		code: "DE",
		label: "Deutsch",
		flag: "🇩🇪",
		native: "Deutsch"
	},
	{
		code: "FR",
		label: "Français",
		flag: "🇫🇷",
		native: "Français"
	},
	{
		code: "ZH",
		label: "中文 (简体)",
		flag: "🇨🇳",
		native: "简体中文"
	},
	{
		code: "JA",
		label: "日本語",
		flag: "🇯🇵",
		native: "日本語"
	},
	{
		code: "AR",
		label: "العربية",
		flag: "🇦🇪",
		native: "العربية"
	}
];
function AppShell({ children }) {
	const navigate = useNavigate();
	const [quickCode, setQuickCode] = (0, import_react.useState)("");
	const [showMobileNav, setShowMobileNav] = (0, import_react.useState)(false);
	const [currentLocale, setCurrentLocale] = (0, import_react.useState)("EN");
	const [showLangMenu, setShowLangMenu] = (0, import_react.useState)(false);
	const [supabaseLatency, setSupabaseLatency] = (0, import_react.useState)(24);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("vaultdrop_locale");
		if (saved && LOCALES.some((l) => l.code === saved)) setCurrentLocale(saved);
	}, []);
	const changeLocale = (loc) => {
		setCurrentLocale(loc);
		localStorage.setItem("vaultdrop_locale", loc);
		setShowLangMenu(false);
	};
	function handleJoin(e) {
		e.preventDefault();
		const clean = quickCode.replace(/\D/g, "").slice(0, 6);
		if (clean.length === 6) {
			navigate({
				to: "/room/$code",
				params: { code: clean }
			});
			setQuickCode("");
			setShowMobileNav(false);
		}
	}
	const activeLocaleObj = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-r from-primary/15 via-accent/20 to-primary/15 border-b border-primary/20 px-3 py-1.5 text-center text-xs font-medium text-muted-foreground flex items-center justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Live Escrow Network"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Zero-Knowledge cryptographic delivery & multi-chain escrow across 140+ countries."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sm:hidden",
						children: "Cross-border file escrow live"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/explorer",
						className: "text-primary hover:underline font-semibold inline-flex items-center gap-0.5 ml-1",
						children: ["View Explorer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 gap-3 sm:gap-4 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 lg:gap-6 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultdropLogo, { size: 36 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden xl:flex items-center gap-1 text-xs font-medium text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/templates",
									activeProps: { className: "text-foreground bg-muted font-semibold" },
									className: "px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), " Templates"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/explorer",
									activeProps: { className: "text-foreground bg-muted font-semibold" },
									className: "px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3.5" }), " Explorer"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/developers",
									activeProps: { className: "text-foreground bg-muted font-semibold" },
									className: "px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-3.5" }), " Developers & API"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/security",
									activeProps: { className: "text-foreground bg-muted font-semibold" },
									className: "px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Security"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/pricing",
									activeProps: { className: "text-foreground bg-muted font-semibold" },
									className: "px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "size-3.5" }), " Pricing"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/support",
									activeProps: { className: "text-foreground bg-muted font-semibold" },
									className: "px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-3.5" }), " Support"]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 sm:gap-2.5 md:gap-3 shrink-0 ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleJoin,
								className: "hidden 2xl:flex items-center gap-1.5 bg-muted/40 px-2 py-1 rounded-xl border border-border/80 focus-within:border-primary/60 transition-colors shadow-inner shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3.5 text-muted-foreground ml-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: quickCode,
										onChange: (e) => {
											const clean = e.target.value.replace(/\D/g, "").slice(0, 6);
											setQuickCode(clean);
											if (clean.length === 6) {
												navigate({
													to: "/room/$code",
													params: { code: clean }
												});
												setQuickCode("");
											}
										},
										placeholder: "6-digit code",
										className: "h-7 w-24 text-center text-xs font-mono tracking-widest bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "sm",
										variant: "ghost",
										className: "h-7 px-2.5 text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all rounded-lg",
										disabled: quickCode.length !== 6,
										children: "Unlock"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setShowLangMenu(!showLangMenu),
									className: "flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border/70 bg-card/60 hover:bg-muted text-xs font-medium text-foreground transition-colors shrink-0",
									title: "Select International Language",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: activeLocaleObj.flag
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline font-mono text-[11px]",
										children: activeLocaleObj.code
									})]
								}), showLangMenu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100",
									onMouseLeave: () => setShowLangMenu(false),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
										children: "Select Region / Language"
									}), LOCALES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => changeLocale(l.code),
										className: `w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors ${currentLocale === l.code ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.flag }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.label })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] opacity-70 font-mono",
											children: l.code
										})]
									}, l.code))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								className: "hidden sm:flex h-8.5 px-3 text-xs font-medium gap-1.5 border-border/80 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/dashboard",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "My Transfers" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "h-8.5 px-3.5 sm:px-4 text-xs font-bold gap-1.5 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-md shadow-primary/20 border-0 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/send",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send Files" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: () => setShowMobileNav(!showMobileNav),
								className: "xl:hidden h-8.5 w-8.5 p-0 shrink-0",
								children: showMobileNav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})
						]
					})]
				}), showMobileNav && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "xl:hidden border-t border-border bg-card/95 backdrop-blur-xl px-4 sm:px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleJoin,
						className: "flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4 text-primary ml-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: quickCode,
								onChange: (e) => setQuickCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
								placeholder: "Enter 6-digit room code",
								className: "h-8 flex-1 text-center font-mono tracking-widest text-sm bg-transparent border-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								className: "h-8 px-4 text-xs font-bold",
								disabled: quickCode.length !== 6,
								children: "Unlock"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 text-xs font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/send",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center gap-2 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Send Files"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg bg-muted text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-4" }), " My Transfers"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/templates",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" }), " Escrow Templates"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/explorer",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " Public Explorer"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/developers",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4" }), " API & Supabase SDK"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/security",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), " Security Architecture"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pricing",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "size-4" }), " Global Pricing"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/support",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-4" }), " 24/7 Support AI"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin",
								onClick: () => setShowMobileNav(false),
								className: "p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2 col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 text-amber-400" }), " Developer Operations Console"]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-3 sm:px-6 py-6 sm:py-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-auto border-t border-border/60 bg-card/50 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 md:grid-cols-5 gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultdropLogo, { size: 32 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed max-w-sm",
										children: "The international digital asset settlement and confidential escrow cloud. Powered by Supabase Storage, Zero-Knowledge cryptographic verification, and multi-network on-chain settlements for global clients."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Supabase Storage: Operational (",
												supabaseLatency,
												"ms)"
											] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4 Global Vault Regions" })]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-foreground uppercase tracking-wider",
									children: "Solutions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-2 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors",
											children: "SaaS Codebase Handover"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors",
											children: "3D & VFX Master Archives"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors",
											children: "Cross-Border NDA Data Rooms"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors",
											children: "Domain & IP Escrow"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors",
											children: "Music Master Rights"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/templates",
											className: "hover:text-primary transition-colors",
											children: "AI Dataset Weights"
										}) })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-foreground uppercase tracking-wider",
									children: "Platform"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-2 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/send",
											className: "hover:text-primary transition-colors",
											children: "Send Files & Create Room"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/dashboard",
											className: "hover:text-primary transition-colors",
											children: "Transfers Command Center"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/explorer",
											className: "hover:text-primary transition-colors",
											children: "Public Escrow Ledger"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/developers",
											className: "hover:text-primary transition-colors",
											children: "REST API & Supabase SDK"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/security",
											className: "hover:text-primary transition-colors",
											children: "Security & Zero-Knowledge"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin",
											className: "hover:text-amber-400 transition-colors flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " Developer Console"]
										}) })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-foreground uppercase tracking-wider",
									children: "Compliance & Trust"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-2 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/pricing",
											className: "hover:text-primary transition-colors",
											children: "Global Multi-Currency Plans"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/security",
											className: "hover:text-primary transition-colors",
											children: "SOC2 Type II & ISO 27001"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/security",
											className: "hover:text-primary transition-colors",
											children: "GDPR & Data Sovereignty"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/support",
											className: "hover:text-primary transition-colors",
											children: "24/7 AI Concierge"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/support",
											className: "hover:text-primary transition-colors",
											children: "Dispute Resolution Policy"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://supabase.com",
											target: "_blank",
											rel: "noreferrer",
											className: "hover:text-primary transition-colors inline-flex items-center gap-1",
											children: ["Supabase Infrastructure ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" })]
										}) })
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Vaultdrop International Inc. Bank-grade 256-bit AES encryption & on-chain settlement."
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/security",
									className: "hover:text-foreground transition-colors",
									children: "Privacy Policy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/security",
									className: "hover:text-foreground transition-colors",
									children: "Terms of Escrow"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/support",
									className: "hover:text-foreground transition-colors",
									children: "Contact International Desk"
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportAgent, {})
		]
	});
}
//#endregion
export { cn as i, Button as n, Input as r, AppShell as t };
