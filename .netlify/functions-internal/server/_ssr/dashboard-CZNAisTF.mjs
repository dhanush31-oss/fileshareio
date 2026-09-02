import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Eye, J as Download, K as ExternalLink, Q as Coins, R as FileLock, X as Copy, _ as RefreshCw, k as Layers, l as ShieldCheck, lt as Bell, n as X, ot as Check, rt as CircleCheck, tt as Clock, ut as ArrowUpRight, y as Plus } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as StatusBadge } from "./StatusBadge-5AdMK70i.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as ensureSession } from "./router-DngNvJgu.mjs";
import { t as copyToClipboard } from "./clipboard-BumI9I4y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CZNAisTF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getExplorerUrl(chain, txHash) {
	const c = (chain || "").toLowerCase();
	if (c.includes("base")) return `https://basescan.org/tx/${txHash}`;
	if (c.includes("polygon") || c.includes("matic")) return `https://polygonscan.com/tx/${txHash}`;
	if (c.includes("arbitrum") || c.includes("arb")) return `https://arbiscan.io/tx/${txHash}`;
	if (c.includes("optimism") || c.includes("op")) return `https://optimistic.etherscan.io/tx/${txHash}`;
	if (c.includes("bsc") || c.includes("bnb")) return `https://bscscan.com/tx/${txHash}`;
	return `https://etherscan.io/tx/${txHash}`;
}
function DashboardPage() {
	useNavigate();
	const qc = useQueryClient();
	const [joinCode, setJoinCode] = (0, import_react.useState)("");
	const [filterTab, setFilterTab] = (0, import_react.useState)("all");
	const [recheckingId, setRecheckingId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		ensureSession();
	}, []);
	const { data, isLoading } = useQuery({
		queryKey: ["dashboard-data"],
		queryFn: async () => {
			let token;
			try {
				const { data: sessionData } = await (await import("./client-BhPdVgWC.mjs").then((n) => n.t).then((n) => n.t)).supabase.auth.getSession();
				token = sessionData.session?.access_token;
			} catch {}
			const headers = {};
			if (token) headers["Authorization"] = `Bearer ${token}`;
			const res = await fetch("/api/dashboard", { headers });
			const json = await res.json();
			if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load dashboard");
			return json;
		},
		refetchInterval: 5e3
	});
	const sellingRooms = data?.selling || [];
	const buyingRooms = data?.buying || [];
	const allProofs = data?.proofs || [];
	const unread = (data?.notifications || []).filter((n) => !n.read_at);
	async function clearNotifications() {
		await fetch("/api/dashboard", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: "mark_notifications_read" })
		});
		qc.invalidateQueries({ queryKey: ["dashboard-data"] });
	}
	async function recheckProof(proofId) {
		setRecheckingId(proofId);
		try {
			const res = await fetch("/api/dashboard", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "recheck_proof",
					proofId
				})
			});
			const json = await res.json();
			if (!res.ok || !json.ok) throw new Error(json.error || "Recheck failed");
			toast[json.verified ? "success" : "message"](json.detail || (json.verified ? "Payment confirmed on-chain!" : "Not found on-chain yet"));
			qc.invalidateQueries({ queryKey: ["dashboard-data"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Recheck failed");
		} finally {
			setRecheckingId(null);
		}
	}
	async function act(proofId, approve) {
		try {
			const res = await fetch("/api/dashboard", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "review_proof",
					proofId,
					approve
				})
			});
			const json = await res.json();
			if (!res.ok || !json.ok) throw new Error(json.error || "Action failed");
			toast.success(approve ? "Payment approved — files unlocked for buyer!" : "Payment rejected");
			qc.invalidateQueries({ queryKey: ["dashboard-data"] });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Action failed");
		}
	}
	async function openProof(proofId) {
		try {
			const targetProof = allProofs.find((p) => p.id === proofId);
			if (targetProof?.proof_path) {
				const { supabase } = await import("./client-BhPdVgWC.mjs").then((n) => n.t).then((n) => n.t);
				const { data: signed } = await supabase.storage.from("payment-proofs").createSignedUrl(targetProof.proof_path, 180);
				const url = signed?.signedUrl || supabase.storage.from("payment-proofs").getPublicUrl(targetProof.proof_path).data.publicUrl;
				if (url) {
					window.open(url, "_blank", "noopener");
					return;
				}
			}
			toast.error("Proof screenshot not available");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to open proof");
		}
	}
	async function downloadOwn(roomId, code) {
		try {
			const res = await fetch("/api/room", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "unlock_download",
					roomId,
					code
				})
			});
			const json = await res.json();
			if (!res.ok || !json.ok) throw new Error(json.error || "Download failed");
			json.files.forEach((f, i) => {
				setTimeout(() => window.open(f.url, "_blank", "noopener"), i * 400);
			});
			toast.success(json.files.length > 1 ? `Downloading ${json.files.length} files` : "Download started");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Download failed");
		}
	}
	const pendingProofs = allProofs.filter((p) => p.status === "pending");
	const approvedRooms = sellingRooms.filter((r) => r.status === "approved");
	const awaitingPaymentRooms = sellingRooms.filter((r) => r.status === "awaiting_payment");
	let filteredSelling = sellingRooms;
	if (filterTab === "action") filteredSelling = sellingRooms.filter((r) => allProofs.some((p) => p.room_id === r.id && p.status === "pending"));
	else if (filterTab === "active") filteredSelling = awaitingPaymentRooms;
	else if (filterTab === "approved") filteredSelling = approvedRooms;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 sm:space-y-8 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground",
					children: "Transfers & Deliveries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground",
					children: "Monitor your active transfers, review incoming payment receipts, and manage downloads."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 w-full sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "gap-1.5 shadow-sm font-semibold text-xs sm:text-sm w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/send",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New Transfer"]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2.5 sm:gap-4 grid-cols-1 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border shadow-sm flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider",
							children: "Total Transfers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl sm:text-2xl font-extrabold text-foreground mt-0.5 sm:mt-1",
							children: sellingRooms.length + buyingRooms.length
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 sm:size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4 sm:size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-amber-500/30 bg-amber-500/5 shadow-sm flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] sm:text-xs text-amber-400 font-medium uppercase tracking-wider",
							children: "Pending Review"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl sm:text-2xl font-extrabold text-amber-400 mt-0.5 sm:mt-1",
							children: pendingProofs.length
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 sm:size-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 sm:size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-sm flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] sm:text-xs text-emerald-400 font-medium uppercase tracking-wider",
							children: "Completed Transfers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl sm:text-2xl font-extrabold text-emerald-400 mt-0.5 sm:mt-1",
							children: approvedRooms.length
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 sm:size-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 sm:size-5" })
						})]
					})
				]
			}),
			unread.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl sm:rounded-2xl border border-primary/40 bg-primary/10 p-4 sm:p-5 shadow-sm space-y-2.5 sm:space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-primary" }),
							" ",
							unread.length,
							" New Update",
							unread.length > 1 ? "s" : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: clearNotifications,
						className: "text-xs h-7 px-2",
						children: "Mark all read"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1.5 sm:space-y-2 text-xs",
					children: unread.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg bg-card/80 p-2.5 sm:p-3 border border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: n.title
						}), n.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-0.5",
							children: n.body
						})]
					}, n.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border/70 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilterTab("all"),
							className: `px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${filterTab === "all" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [
								"All (",
								sellingRooms.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilterTab("action"),
							className: `px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1 ${filterTab === "action" ? "bg-amber-500 text-black font-semibold shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [
								"Action Needed (",
								pendingProofs.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilterTab("active"),
							className: `px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${filterTab === "active" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [
								"Awaiting (",
								awaitingPaymentRooms.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setFilterTab("approved"),
							className: `px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${filterTab === "approved" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [
								"Approved (",
								approvedRooms.length,
								")"
							]
						})
					]
				})
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[30vh] items-center justify-center gap-2 text-muted-foreground text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading rooms…" })]
			}) : filteredSelling.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-12 text-center rounded-2xl border border-dashed border-border/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileLock, { className: "mx-auto size-10 text-muted-foreground/60 mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: "No rooms match this filter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1 max-w-sm mx-auto",
						children: "Create a new escrow room or switch tabs to see your active deals."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/send",
							children: "Send Files"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: filteredSelling.map((room) => {
					const proofs = allProofs.filter((p) => p.room_id === room.id);
					const hasPendingProof = proofs.some((p) => p.status === "pending");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `surface-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all ${hasPendingProof ? "border-amber-500/50 bg-amber-500/5 shadow-md ring-1 ring-amber-500/30" : "border-border/80 bg-card hover:border-primary/40 shadow-sm"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-primary border border-border",
												children: ["#", room.room_code]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: new Date(room.created_at).toLocaleDateString()
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base sm:text-lg font-bold tracking-tight text-foreground mt-1 break-words",
											children: room.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground mt-0.5 break-words",
											children: [
												room.file_name,
												" · Asking",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold text-foreground",
													children: [
														room.crypto_amount,
														" ",
														room.token_symbol
													]
												}),
												" ",
												"on ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-foreground",
													children: room.chain
												})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 shrink-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: room.status }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: async () => {
												if (await copyToClipboard(room.room_code)) toast.success("Room code copied!");
												else toast.error("Please copy the code manually");
											},
											className: "gap-1 font-mono text-xs h-8",
											children: [
												room.room_code,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3 text-primary" })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											variant: "ghost",
											className: "h-8 px-2 text-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/room/$code",
												params: { code: room.room_code },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
											})
										})
									]
								})]
							}),
							proofs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2.5 pt-4 border-t border-border/70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-semibold text-foreground flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-3.5 text-primary" }),
										" Buyer Payment Submissions (",
										proofs.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: proofs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl p-3 text-xs border ${p.status === "pending" ? "bg-amber-500/10 border-amber-500/30" : "bg-muted/40 border-border"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 space-y-1 w-full sm:w-auto",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-medium text-foreground",
															children: ["Submitted ", new Date(p.created_at).toLocaleTimeString()]
														}),
														p.chain_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " On-Chain Confirmed"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })
													]
												}),
												p.tx_hash && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground break-all",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["tx: ", p.tx_hash] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: getExplorerUrl(room.chain, p.tx_hash),
														target: "_blank",
														rel: "noopener noreferrer",
														className: "text-primary hover:underline inline-flex items-center shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 ml-0.5" })
													})]
												}),
												p.verification_detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground break-words",
													children: p.verification_detail
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto",
											children: [
												p.proof_path && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => openProof(p.id),
													className: "h-8 text-xs gap-1 flex-1 sm:flex-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), " Proof"]
												}),
												!p.chain_verified && p.tx_hash && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "ghost",
													disabled: recheckingId === p.id,
													onClick: () => recheckProof(p.id),
													className: "h-8 text-xs gap-1 flex-1 sm:flex-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${recheckingId === p.id ? "animate-spin" : ""}` }), "Recheck"]
												}),
												p.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													onClick: () => act(p.id, true),
													className: "h-8 text-xs gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex-1 sm:flex-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Approve & Release"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "destructive",
													onClick: () => act(p.id, false),
													className: "h-8 text-xs gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " Reject"]
												})] })
											]
										})]
									}, p.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => downloadOwn(room.id, room.room_code),
									className: "h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Download my files"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/room/$code",
									params: { code: room.room_code },
									className: "text-primary hover:underline flex items-center gap-1 font-medium",
									children: ["Open buyer view ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
								})]
							})
						]
					}, room.id);
				})
			}),
			buyingRooms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 pt-6 border-t border-border/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold text-foreground",
					children: "Rooms You've Joined as Buyer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: buyingRooms.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface-panel p-4 rounded-xl border border-border/80 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: room.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"#",
								room.room_code,
								" · ",
								room.crypto_amount,
								" ",
								room.token_symbol,
								" on ",
								room.chain
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: room.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								className: "text-xs h-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/room/$code",
									params: { code: room.room_code },
									children: "Open Room"
								})
							})]
						})]
					}, room.id))
				})]
			})
		]
	}) });
}
//#endregion
export { DashboardPage as component };
