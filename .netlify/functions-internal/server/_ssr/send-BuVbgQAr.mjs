import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as FileCode, I as File, L as FileText, Q as Coins, W as FileArchive, X as Copy, at as ChevronDown, d as Share2, et as CloudUpload, i as Wallet, n as X, ot as Check, s as Sparkles, v as QrCode, y as Plus, z as FileImage } from "../_libs/lucide-react.mjs";
import { n as Button, r as Input, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as copyToClipboard } from "./clipboard-BumI9I4y.mjs";
import { n as getCoinLogo, t as Label } from "./CoinIcons-4IcO2swL.mjs";
import { t as Textarea } from "./textarea-Cg6jlwgh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-BuVbgQAr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NETWORKS = [
	{
		id: "Ethereum",
		label: "Ethereum",
		defaultToken: "ETH"
	},
	{
		id: "Solana",
		label: "Solana",
		defaultToken: "SOL"
	},
	{
		id: "Bitcoin",
		label: "Bitcoin",
		defaultToken: "BTC"
	},
	{
		id: "Base",
		label: "Base",
		defaultToken: "ETH"
	},
	{
		id: "Polygon",
		label: "Polygon",
		defaultToken: "MATIC"
	},
	{
		id: "BNB Chain",
		label: "BNB Smart Chain",
		defaultToken: "BNB"
	},
	{
		id: "Arbitrum",
		label: "Arbitrum",
		defaultToken: "ETH"
	},
	{
		id: "Optimism",
		label: "Optimism",
		defaultToken: "ETH"
	},
	{
		id: "Other",
		label: "Other / Custom Network",
		defaultToken: "USDT"
	}
];
function getFileIcon(filename) {
	const ext = filename.split(".").pop()?.toLowerCase() || "";
	if ([
		"jpg",
		"jpeg",
		"png",
		"gif",
		"webp",
		"svg"
	].includes(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-4 text-emerald-400" });
	if ([
		"js",
		"ts",
		"tsx",
		"jsx",
		"py",
		"rs",
		"go",
		"cpp",
		"json",
		"html",
		"css"
	].includes(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-4 text-blue-400" });
	if ([
		"zip",
		"rar",
		"tar",
		"gz",
		"7z"
	].includes(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileArchive, { className: "size-4 text-amber-400" });
	if ([
		"pdf",
		"doc",
		"docx",
		"txt",
		"md"
	].includes(ext)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-purple-400" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { className: "size-4 text-muted-foreground" });
}
function formatBytes(bytes) {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
function fileToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const res = reader.result;
			resolve((res.includes(",") ? res.split(",")[1] : res) || "");
		};
		reader.onerror = (err) => reject(err);
		reader.readAsDataURL(file);
	});
}
var POPULAR_ASSETS = [
	{
		id: "ETH",
		symbol: "ETH",
		name: "Ethereum",
		network: "Ethereum",
		icon: "🔷",
		price: 2680
	},
	{
		id: "USDT",
		symbol: "USDT",
		name: "Tether USD",
		network: "Ethereum",
		icon: "🟢",
		price: 1
	},
	{
		id: "USDC",
		symbol: "USDC",
		name: "USD Coin",
		network: "Base",
		icon: "🔵",
		price: 1
	},
	{
		id: "SOL",
		symbol: "SOL",
		name: "Solana",
		network: "Solana",
		icon: "🟣",
		price: 145
	},
	{
		id: "BNB",
		symbol: "BNB",
		name: "BNB",
		network: "BNB Chain",
		icon: "🟡",
		price: 560
	},
	{
		id: "BTC",
		symbol: "BTC",
		name: "Bitcoin",
		network: "Bitcoin",
		icon: "🟠",
		price: 62500
	},
	{
		id: "POLYGON",
		symbol: "MATIC",
		name: "Polygon",
		network: "Polygon",
		icon: "🟣",
		price: .42
	},
	{
		id: "CUSTOM",
		symbol: "OTHER",
		name: "Custom Asset",
		network: "Other",
		icon: "✨",
		price: 1
	}
];
function getWalletBadge(address) {
	const clean = address.trim();
	if (!clean) return null;
	if (/^0x[a-fA-F0-9]{40}$/.test(clean)) return {
		valid: true,
		label: "✓ Valid EVM Address (Ethereum · Base · Polygon · BNB · Arb)",
		color: "text-primary border-primary/40 bg-primary/10"
	};
	if (/^[1-9A-HJ-NP-za-km-z]{32,44}$/.test(clean)) return {
		valid: true,
		label: "✓ Valid Solana Address",
		color: "text-purple-400 border-purple-500/40 bg-purple-500/10"
	};
	if (/^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(clean)) return {
		valid: true,
		label: "✓ Valid Bitcoin Address",
		color: "text-amber-400 border-amber-500/40 bg-amber-500/10"
	};
	return {
		valid: false,
		label: "Custom / Unchecked Format",
		color: "text-muted-foreground border-border bg-muted/40"
	};
}
function SendPage() {
	const [files, setFiles] = (0, import_react.useState)([]);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [instructions, setInstructions] = (0, import_react.useState)("");
	const [network, setNetwork] = (0, import_react.useState)("Ethereum");
	const [customNetwork, setCustomNetwork] = (0, import_react.useState)("");
	const [currencyName, setCurrencyName] = (0, import_react.useState)("ETH");
	const [totalAmount, setTotalAmount] = (0, import_react.useState)("");
	const [wallet, setWallet] = (0, import_react.useState)("");
	const [showAdvanced, setShowAdvanced] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [uploadProgress, setUploadProgress] = (0, import_react.useState)(null);
	const [code, setCode] = (0, import_react.useState)(null);
	const [copiedCode, setCopiedCode] = (0, import_react.useState)(false);
	const [copiedUrl, setCopiedUrl] = (0, import_react.useState)(false);
	const [showQr, setShowQr] = (0, import_react.useState)(false);
	const [activeTemplateName, setActiveTemplateName] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
	function addFiles(list) {
		if (!list) return;
		const incoming = Array.from(list);
		setFiles((prev) => {
			const merged = [...prev];
			for (const f of incoming) if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f);
			return merged;
		});
	}
	function handleDragOver(e) {
		e.preventDefault();
		setIsDragging(true);
	}
	function handleDragLeave(e) {
		e.preventDefault();
		setIsDragging(false);
	}
	function handleDrop(e) {
		e.preventDefault();
		setIsDragging(false);
		addFiles(e.dataTransfer.files);
	}
	async function submit(e) {
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
			const serializedFiles = [];
			const totalCount = files.length;
			for (let i = 0; i < totalCount; i++) {
				const file = files[i];
				if (!file) continue;
				setUploadProgress(Math.round((i + .5) / totalCount * 50) + 15);
				const base64 = await fileToBase64(file);
				serializedFiles.push({
					name: file.name,
					base64,
					size: file.size,
					mimeType: file.type || "application/octet-stream"
				});
				setUploadProgress(Math.round((i + 1) / totalCount * 50) + 20);
			}
			setUploadProgress(75);
			const activeNetwork = network === "Other" && customNetwork.trim() ? customNetwork.trim() : network;
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
						files: serializedFiles
					})
				});
				clearInterval(progressTimer);
				setUploadProgress(95);
				const data = await res.json();
				if (!res.ok || !data.ok) throw new Error(data.error || "Failed to create escrow room");
				setUploadProgress(100);
				setCode(data.roomCode);
				toast.success(`Escrow Room #${data.roomCode} created in Supabase!`, { id: "escrow-upload" });
			} finally {
				clearInterval(progressTimer);
			}
		} catch (err) {
			console.error("[SendPage] Error locking files & creating room:", err);
			toast.error(err instanceof Error ? err.message : "Failed to create room", { id: "escrow-upload" });
		} finally {
			setBusy(false);
			setUploadProgress(null);
		}
	}
	if (code) {
		const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/room/${code}`;
		const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(shareUrl)}`;
		`${title || "files"}${shareUrl}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg surface-panel p-6 sm:p-8 text-center rounded-2xl border border-border/80 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground",
					children: "Transfer Link Created"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1.5 text-xs sm:text-sm text-muted-foreground",
					children: [
						files.length,
						" file",
						files.length > 1 ? "s" : "",
						" uploaded securely. Share this 6-digit code with your recipient."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
							children: "Transfer Code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-mono text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-primary select-all",
							children: code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap justify-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: copiedCode ? "default" : "outline",
									size: "sm",
									onClick: async () => {
										if (await copyToClipboard(code)) {
											setCopiedCode(true);
											setTimeout(() => setCopiedCode(false), 2e3);
											toast.success("Transfer code copied!");
										} else toast.error("Please copy the code manually");
									},
									className: "gap-1.5 font-semibold",
									children: [copiedCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copiedCode ? "Copied!" : "Copy Code"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: copiedUrl ? "default" : "outline",
									size: "sm",
									onClick: async () => {
										if (await copyToClipboard(shareUrl)) {
											setCopiedUrl(true);
											setTimeout(() => setCopiedUrl(false), 2e3);
											toast.success("Share link copied!");
										} else toast.error("Please copy the link manually");
									},
									className: "gap-1.5 font-semibold",
									children: [copiedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), copiedUrl ? "Link Copied!" : "Copy Link"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setShowQr(!showQr),
									className: "gap-1.5 font-semibold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5" }),
										" ",
										showQr ? "Hide QR" : "QR Code"
									]
								})
							]
						})
					]
				}),
				showQr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-xl border border-border bg-card p-4 flex flex-col items-center animate-in fade-in duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: qrUrl,
						alt: "Transfer QR Code",
						className: "size-44 rounded-lg bg-white p-2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Scan on phone to open transfer directly"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col sm:flex-row gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "flex-1 font-semibold bg-primary text-primary-foreground hover:bg-primary/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/room/$code",
							params: { code },
							children: "Open Transfer Room"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							setCode(null);
							setFiles([]);
							setTitle("");
							setDescription("");
							setTotalAmount("");
						},
						className: "flex-1 font-semibold",
						children: "Send More Files"
					})]
				})
			]
		}) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl w-full space-y-4 sm:space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			activeTemplateName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }),
					" Template: ",
					activeTemplateName
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground",
				children: "Create a File Transfer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs sm:text-sm text-muted-foreground",
				children: "Upload your files, set your recipient requirements, and generate a secure 6-digit transfer code."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4 sm:space-y-6 surface-panel p-4 sm:p-7 rounded-2xl border border-border/80 shadow-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-xs sm:text-sm font-semibold flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Files to Send" }), files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground font-normal",
								children: [
									files.length,
									" file",
									files.length > 1 ? "s" : "",
									" · ",
									formatBytes(totalSize)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onDragOver: handleDragOver,
							onDragLeave: handleDragLeave,
							onDrop: handleDrop,
							onClick: () => fileInputRef.current?.click(),
							className: `flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${isDragging ? "border-primary bg-primary/10 scale-[1.01]" : "border-border/80 bg-muted/20 hover:border-primary/60 hover:bg-muted/40"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: "Click to browse or drag & drop files"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Documents, code, images, archives — select multiple files"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							type: "file",
							multiple: true,
							className: "hidden",
							onChange: (e) => {
								addFiles(e.target.files);
								e.target.value = "";
							}
						}),
						files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Selected files (",
									files.length,
									")"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => fileInputRef.current?.click(),
									className: "flex items-center gap-1 text-primary hover:underline font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " Add more"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "max-h-48 overflow-y-auto space-y-1.5 pr-1",
								children: files.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/60 px-3 py-2 text-sm transition-all hover:bg-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5 min-w-0",
										children: [getFileIcon(f.name), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-xs font-medium text-foreground",
											children: f.name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex shrink-0 items-center gap-3 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBytes(f.size) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Remove ${f.name}`,
											className: "text-muted-foreground hover:text-destructive transition-colors",
											onClick: () => setFiles((prev) => prev.filter((_, idx) => idx !== i)),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
										})]
									})]
								}, `${f.name}-${i}`))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 pt-2 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "title",
							className: "text-xs font-semibold",
							children: "Transfer Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "e.g. Design Assets & Source Code",
							className: "bg-card text-xs font-medium"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "description",
							className: "text-xs font-semibold flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Description (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground font-normal",
								children: "Shown to recipient before downloading"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "description",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Add optional notes about the files in this transfer...",
							className: "bg-card text-xs min-h-[4.5rem]"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs sm:text-sm font-bold text-foreground",
									children: "Payment & Receiving Terms"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Select an asset or specify custom token requirements"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs font-semibold text-foreground flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1. Select Asset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground font-normal",
									children: "Auto-sets network"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 gap-2",
								children: POPULAR_ASSETS.map((asset) => {
									const isSelected = currencyName.toUpperCase() === asset.symbol.toUpperCase();
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setCurrencyName(asset.symbol);
											setNetwork(asset.network);
										},
										className: `flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 text-left ${isSelected ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/40 shadow-sm" : "border-border/80 bg-muted/20 hover:border-border hover:bg-muted/40 text-foreground"}`,
										children: [getCoinLogo(asset.symbol, "size-5 shrink-0"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-bold leading-none",
												children: asset.symbol
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground truncate mt-0.5",
												children: asset.name
											})]
										})]
									}, asset.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "network",
											className: "text-xs font-semibold text-foreground",
											children: "2. Network"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											id: "network",
											value: network,
											onChange: (e) => {
												setNetwork(e.target.value);
												const match = NETWORKS.find((n) => n.id === e.target.value);
												if (match && match.defaultToken) setCurrencyName(match.defaultToken);
											},
											className: "h-10 w-full rounded-xl border border-input bg-card px-3 text-xs font-medium transition-colors focus:border-primary focus:outline-none",
											children: NETWORKS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: n.id,
												children: n.label
											}, n.id))
										}),
										network === "Other" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Enter network name",
											value: customNetwork,
											onChange: (e) => setCustomNetwork(e.target.value),
											className: "text-xs mt-1 h-8"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "currencyName",
										className: "text-xs font-semibold text-foreground",
										children: "Token Symbol"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "currencyName",
										value: currencyName,
										onChange: (e) => setCurrencyName(e.target.value.toUpperCase()),
										placeholder: "e.g. ETH, USDT",
										className: "font-mono text-xs uppercase bg-card h-10 font-bold"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "totalAmount",
										className: "text-xs font-semibold text-foreground flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Amount" }), totalAmount && !isNaN(Number(totalAmount)) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-primary font-mono font-medium",
											children: [
												"≈ $",
												(Number(totalAmount) * (POPULAR_ASSETS.find((a) => a.symbol === currencyName)?.price || 1)).toLocaleString(),
												" ",
												"USD"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "totalAmount",
										type: "number",
										min: "0",
										step: "any",
										value: totalAmount,
										onChange: (e) => setTotalAmount(e.target.value),
										placeholder: "e.g. 8",
										className: "bg-card text-xs font-mono font-bold h-10"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 pt-2 border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "wallet",
										className: "text-xs font-semibold text-foreground",
										children: "3. Your Receiving Wallet Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: async () => {
											try {
												const text = await navigator.clipboard.readText();
												if (text) {
													setWallet(text.trim());
													toast.success("Wallet address pasted!");
												}
											} catch {
												toast.error("Please paste directly into the box");
											}
										},
										className: "text-[11px] text-primary hover:underline flex items-center gap-1 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), " Paste from Clipboard"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "wallet",
										value: wallet,
										onChange: (e) => setWallet(e.target.value.trim()),
										placeholder: "0x... or Solana / Bitcoin address",
										className: "font-mono text-xs bg-card h-10 pr-10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "absolute right-3 top-2.5 size-4 text-muted-foreground pointer-events-none" })]
								}),
								(() => {
									const badge = getWalletBadge(wallet);
									if (!badge) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono ${badge.color}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: badge.label })
									});
								})()
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border/70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowAdvanced((v) => !v),
						className: "flex w-full items-center justify-between px-4 py-3 text-xs font-medium transition-colors hover:bg-muted/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Additional Transfer Instructions (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-4 text-muted-foreground transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}` })]
					}), showAdvanced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 pt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: instructions,
							onChange: (e) => setInstructions(e.target.value),
							placeholder: "e.g. Please include your transaction hash for instant verification...",
							className: "bg-card text-xs"
						})
					})]
				}),
				busy && uploadProgress !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2.5 animate-in fade-in duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary animate-pulse" }), "Uploading & Preparing Transfer…"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-bold text-primary text-sm",
							children: [uploadProgress, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-primary transition-all duration-200 ease-out",
							style: { width: `${uploadProgress}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					onClick: (e) => {
						if (!busy) submit(e);
					},
					className: "w-full text-sm sm:text-base font-semibold h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer",
					disabled: busy,
					children: busy ? "Uploading Files…" : "Create Transfer Link"
				})
			]
		})]
	}) });
}
//#endregion
export { SendPage as component };
