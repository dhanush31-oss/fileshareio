import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { _ as useParams, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as supabase } from "./client-BhPdVgWC.mjs";
import { B as FileCode, D as Lock, I as File, J as Download, K as ExternalLink, L as FileText, Q as Coins, W as FileArchive, X as Copy, _ as RefreshCw, et as CloudUpload, ft as ArrowDownToLine, l as ShieldCheck, ot as Check, v as QrCode, z as FileImage } from "../_libs/lucide-react.mjs";
import { n as Button, r as Input, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as StatusBadge } from "./StatusBadge-5AdMK70i.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as ensureSession } from "./router-DngNvJgu.mjs";
import { t as copyToClipboard } from "./clipboard-BumI9I4y.mjs";
import { n as getCoinLogo, t as Label } from "./CoinIcons-4IcO2swL.mjs";
import { t as Textarea } from "./textarea-Cg6jlwgh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/room._code-Cw2OVmqJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function getExplorerUrl(chain, walletOrTx, isTx = false) {
	const c = chain.toLowerCase();
	const path = isTx ? "tx" : "address";
	if (c.includes("base")) return `https://basescan.org/${path}/${walletOrTx}`;
	if (c.includes("polygon") || c.includes("matic")) return `https://polygonscan.com/${path}/${walletOrTx}`;
	if (c.includes("arbitrum") || c.includes("arb")) return `https://arbiscan.io/${path}/${walletOrTx}`;
	if (c.includes("optimism") || c.includes("op")) return `https://optimistic.etherscan.io/${path}/${walletOrTx}`;
	if (c.includes("bsc") || c.includes("bnb")) return `https://bscscan.com/${path}/${walletOrTx}`;
	return `https://etherscan.io/${path}/${walletOrTx}`;
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
function RoomPage() {
	const { code } = useParams({ from: "/_authenticated/room/$code" });
	const qc = useQueryClient();
	const [proofFile, setProofFile] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const [txHash, setTxHash] = (0, import_react.useState)("");
	const [unlockCode, setUnlockCode] = (0, import_react.useState)(code || "");
	const [copiedWallet, setCopiedWallet] = (0, import_react.useState)(false);
	const [showWalletQr, setShowWalletQr] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		ensureSession();
		const channel = supabase.channel(`room-live-${code}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "rooms",
			filter: `room_code=eq.${code}`
		}, () => {
			qc.invalidateQueries({ queryKey: ["room", code] });
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "payment_proofs"
		}, () => {
			qc.invalidateQueries({ queryKey: ["room", code] });
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [code, qc]);
	const roomQuery = useQuery({
		queryKey: ["room", code],
		queryFn: async () => {
			const res = await fetch(`/api/room?code=${encodeURIComponent(code)}`);
			const data = await res.json();
			if (!res.ok || !data.ok) throw new Error(data.error || "Room not found. Please verify the 6-digit code.");
			return data;
		},
		retry: 2,
		refetchInterval: 3e3
	});
	const room = roomQuery.data?.room;
	const fileList = roomQuery.data?.files || [];
	const proofList = roomQuery.data?.proofs || [];
	async function uploadProof(e) {
		e.preventDefault();
		if (!room) return;
		if (!txHash.trim() && !proofFile) {
			toast.error("Please provide either your Transaction Hash or a payment screenshot");
			return;
		}
		setBusy(true);
		try {
			let proofBase64;
			if (proofFile) proofBase64 = await fileToBase64(proofFile);
			const res = await fetch("/api/room", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "submit_proof",
					roomId: room.id,
					txHash: txHash.trim(),
					note: note.trim(),
					proofName: proofFile?.name || (txHash ? "Transaction Hash" : "Payment Proof"),
					proofBase64,
					mimeType: proofFile?.type || "image/png"
				})
			});
			const data = await res.json();
			if (!res.ok || !data.ok) throw new Error(data.error || "Payment submission failed");
			if (data.chainVerified) toast.success("Payment verified on-chain! The seller has been notified.");
			else {
				toast.success("Payment proof submitted to seller for approval.");
				if (txHash && data.detail) toast.message(data.detail);
			}
			setProofFile(null);
			setNote("");
			setTxHash("");
			qc.invalidateQueries({ queryKey: ["room", code] });
		} catch (err) {
			console.error("Proof submission error:", err);
			toast.error(err instanceof Error ? err.message : "Payment submission failed");
		} finally {
			setBusy(false);
		}
	}
	async function unlock(fileId) {
		if (!room) return;
		setDownloading(true);
		try {
			const res = await fetch("/api/room", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "unlock_download",
					roomId: room.id,
					code: unlockCode || code,
					fileId
				})
			});
			const data = await res.json();
			if (!res.ok || !data.ok) throw new Error(data.error || "Could not unlock files");
			data.files.forEach((f, i) => {
				setTimeout(() => window.open(f.url, "_blank", "noopener"), i * 400);
			});
			toast.success(data.files.length > 1 ? `Unlocked ${data.files.length} files!` : "Download link opened!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not unlock files");
		} finally {
			setDownloading(false);
		}
	}
	if (roomQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-medium",
			children: [
				"Opening Escrow Room ",
				code,
				"…"
			]
		})]
	}) });
	if (roomQuery.isError || !room) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel mx-auto max-w-md p-8 text-center rounded-2xl border border-border/80 shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold tracking-tight",
				children: "Room Unavailable"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: roomQuery.error instanceof Error ? roomQuery.error.message : "Room code not found. Please verify the 6-digit code."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Go Home"
				})
			})
		]
	}) });
	const isApproved = room.status === "approved";
	const isSubmitted = room.status === "payment_submitted";
	const hasProofs = proofList.length > 0;
	const walletQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=6&data=${room.wallet_address}`;
	const explorerUrl = getExplorerUrl(room.chain, room.wallet_address);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-4 sm:space-y-6 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted text-primary border border-border",
									children: ["Transfer #", room.room_code]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["Created ", new Date(room.created_at).toLocaleDateString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 text-xl sm:text-2xl font-bold tracking-tight text-foreground break-words",
								children: room.title
							}),
							room.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words",
								children: room.description
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: room.status })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-1.5 sm:p-2 rounded-lg border transition-all ${isApproved || isSubmitted ? "bg-primary/10 border-primary/40 text-primary font-semibold" : "bg-muted/40 border-primary/50 text-foreground font-semibold"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1. Payment" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-1.5 sm:p-2 rounded-lg border transition-all ${isApproved ? "bg-primary/10 border-primary/40 text-primary font-semibold" : isSubmitted ? "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold animate-pulse" : "bg-muted/20 border-border text-muted-foreground"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2. Verification Pending" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-1.5 sm:p-2 rounded-lg border transition-all ${isApproved ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400 font-bold shadow-sm" : "bg-muted/20 border-border text-muted-foreground opacity-60"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3. Ready to Download" })
							})
						]
					})
				})]
			}),
			!isApproved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-card shadow-sm space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-4 sm:size-5 text-primary" }), " Payment Instructions"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20",
							children: room.chain
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/30 bg-primary/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [getCoinLogo(room.token_symbol, "size-8 shrink-0"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground font-medium",
									children: "Exact Amount to Send:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xl sm:text-2xl font-extrabold text-primary font-mono mt-0.5",
									children: [
										room.crypto_amount,
										" ",
										room.token_symbol
									]
								}),
								room.price_amount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: [
										"(Approx. ",
										room.price_amount,
										" ",
										room.price_currency,
										")"
									]
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setShowWalletQr(!showWalletQr),
							className: "gap-1.5 text-xs self-start sm:self-auto border-primary/40 hover:bg-primary/10 text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5 text-primary" }),
								" ",
								showWalletQr ? "Hide QR" : "Wallet QR"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-xs text-muted-foreground",
							children: [
								"Seller's Receiving Wallet (",
								room.chain,
								"):"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 rounded-lg border border-border bg-muted/40 px-3 py-2.5 font-mono text-xs text-foreground break-all select-all min-w-0",
								children: room.wallet_address
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: copiedWallet ? "default" : "outline",
									size: "sm",
									onClick: async () => {
										if (await copyToClipboard(room.wallet_address)) {
											setCopiedWallet(true);
											setTimeout(() => setCopiedWallet(false), 2e3);
											toast.success("Wallet address copied!");
										} else toast.error("Please copy the wallet address manually");
									},
									className: "flex-1 sm:flex-none gap-1.5 h-9 font-semibold",
									children: [copiedWallet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-primary-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5 text-primary" }), copiedWallet ? "Copied" : "Copy Wallet"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: explorerUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center justify-center size-9 rounded-lg border border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0",
									title: "View on Block Explorer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })
								})]
							})]
						})]
					}),
					showWalletQr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 flex flex-col items-center animate-in fade-in duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: walletQrUrl,
							alt: "Wallet Address QR",
							className: "size-40 sm:size-44 rounded-lg bg-white p-2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-center text-muted-foreground",
							children: "Scan with MetaMask, Rainbow, or mobile wallet to pay"
						})]
					}),
					room.payment_instructions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground break-words",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: "Seller note: "
						}), room.payment_instructions]
					})
				]
			}),
			isSubmitted && !isApproved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-5 sm:p-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-foreground space-y-4 shadow-sm animate-in fade-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-5 animate-spin" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-sm sm:text-base text-foreground",
								children: "Payment Verification Pending"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30",
								children: "Phase 2 Active"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Your payment has been submitted and is awaiting sender review & approval. Once approved, this screen will automatically unlock your files."
						})] })]
					}),
					proofList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/70 bg-card/70 p-3.5 text-xs space-y-2 font-mono",
						children: [proofList[0].tx_hash && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground font-semibold",
								children: "Submitted TxHash:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary truncate max-w-full sm:max-w-xs",
								children: proofList[0].tx_hash
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Review Status:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber-400 font-semibold",
								children: "⏳ Awaiting Sender Approval"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-foreground font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-400" }), " Live Realtime Sync Active"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This page will automatically unlock your files once approved by the sender." })]
					})
				]
			}),
			!isApproved && !isSubmitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: uploadProof,
				className: "surface-panel space-y-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border/80 shadow-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm sm:text-base font-semibold text-foreground",
						children: "Submit Payment for Verification"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Send crypto to the address above, then submit your transaction hash to enter Phase 2."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 pt-2 border-t border-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "tx",
								className: "text-xs font-medium",
								children: "Transaction Hash (txHash)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "tx",
								value: txHash,
								onChange: (e) => setTxHash(e.target.value.trim()),
								placeholder: "0x... (paste transaction hash from wallet receipt)",
								className: "font-mono text-xs bg-card/60 h-10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Paste the transaction hash from your wallet receipt."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs font-medium",
								children: "Payment Screenshot / Receipt (optional)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "proof",
								className: "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground hover:border-primary/60 hover:bg-muted/40 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-4 text-primary" }), proofFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: proofFile.name
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click to attach screenshot proof (PNG, JPG, PDF)" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "proof",
								type: "file",
								accept: "image/*,application/pdf",
								className: "hidden",
								onChange: (e) => setProofFile(e.target.files?.[0] ?? null)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "note",
							className: "text-xs font-medium",
							children: "Note for Seller (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "note",
							value: note,
							onChange: (e) => setNote(e.target.value),
							placeholder: "e.g. Sent funds from my wallet",
							className: "bg-card/60 text-xs min-h-[3rem]"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							className: "w-full shadow-md font-semibold h-11 bg-primary hover:bg-primary/90 text-primary-foreground text-sm",
							children: busy ? "Submitting Verification…" : "Submit Payment for Verification"
						})
					})
				]
			}),
			hasProofs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-6 rounded-2xl border border-border/80 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm font-semibold text-foreground",
					children: [
						"Payment Submissions (",
						proofList.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2.5 text-xs",
					children: proofList.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border/70 bg-card p-3 space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: new Date(p.created_at).toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [p.chain_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " On-Chain Confirmed"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })]
								})]
							}),
							p.tx_hash && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["tx: ", p.tx_hash] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: getExplorerUrl(room.chain, p.tx_hash, true),
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-primary hover:underline inline-flex items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 ml-0.5" })
								})]
							}),
							p.verification_detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: p.verification_detail
							}),
							p.review_note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-foreground font-medium bg-muted/40 p-2 rounded",
								children: ["Seller Review: ", p.review_note]
							})
						]
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `surface-panel p-5 sm:p-7 rounded-2xl border transition-all duration-200 ${isApproved ? "border-border bg-card shadow-lg" : "border-border/80 bg-muted/20"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-base font-bold text-foreground",
						children: [isApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { className: "size-4 text-muted-foreground" }), isApproved ? "Files Ready for Download" : "Transfer Files"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground font-mono",
						children: [
							fileList.length || 1,
							" file",
							(fileList.length || 1) > 1 ? "s" : "",
							" ·",
							" ",
							formatBytes(room.file_size)
						]
					})]
				}), isApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4 animate-in fade-in duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-muted-foreground",
							children: "Payment verified. Click below to download the files via secure cloud delivery."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							onClick: () => unlock(),
							disabled: downloading,
							className: "w-full gap-2 font-semibold h-11 text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "size-4" }), downloading ? "Generating Download Links…" : "Download All Files"]
						}),
						fileList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Individual Files:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: fileList.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3 rounded-lg border border-border/80 bg-card p-3 text-sm hover:border-primary/50 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5 min-w-0",
										children: [getFileIcon(f.file_name), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-xs font-medium",
											children: f.file_name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex shrink-0 items-center gap-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBytes(f.file_size) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => unlock(f.id),
											className: "h-7 text-xs gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), " Get"]
										})]
									})]
								}, f.id))
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Files are held in private encrypted cloud storage and will be released immediately once the seller confirms the transfer."
				})]
			})
		]
	}) });
}
//#endregion
export { RoomPage as component };
