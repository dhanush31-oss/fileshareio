import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DF64ikKK2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CYwUDZQp.mjs";
import { J as Download, at as ChevronDown, u as ShieldAlert } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { t as StatusBadge } from "./StatusBadge-5AdMK70i.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BNzcfHVH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("c25bca671b743c44576c03ec7330f11f135acd9038ea0eb759d0cfee330f15ff"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("80d38ff4a34dc69449f7babe686f2da22a903e5e1f8f8083882a4c4c443d2435"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("5becd1a02839619a0fc04722e7106c6e3f1003a08bdb092b3e76683db0af1955"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("63b1321fc8bd1789f446cf2b232ab2f0737fce6e188051f5140e7cd9de58349a"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("04472eb5da27876f4cb89b75160de45bd7e7800a340f21bf44738dcc217f0c88"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("95d949ab8916eaed895c154a8f2c349a7835c5d22bbdf008daf371eca5c46861"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("208f9caabfc0aab8f5a34d636ea1f9e972ad7705a5bb6204fb06de9a85bd0eaf"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("bef65e9413261bafbd068a4852226a253995b9b261f531277cff26b0d348b833"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("8824c6215b3178a65f0c49e42533741b3b4d50da8d9bcf82054c950e2f41b81a"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("faedd7fdf1881b934bc2130d91d2fa913cfd0549e535fd087bbc31fdd6decbac"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("be187d66f625dcd3b904296e880d0e2ff62fa908a09c257369fb677873e8ea30"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("1458b7a46906e07674fdc4a92bab2f2853f921ea4243184209740d77e466723a"));
var adminListRooms = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("919039427615aa5a3782869a51438ff3c837e7a95842db7708a24003645b6f57"));
var adminGetFileUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("a80e28bca324701c786214f986107592b7cd9eaeb0410f94736022d2ddf3af97"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("60d11190bfc705b246fa86164446a0fb36196cd7a2b3c45ed62a565099046392"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("2bf149bdf650b09dbf053d5a12456f74e6f4f5d907e4f63dd10c44191c321595"));
function AdminPage() {
	const list = useServerFn(adminListRooms);
	const fileUrl = useServerFn(adminGetFileUrl);
	const [expanded, setExpanded] = (0, import_react.useState)(null);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["admin-rooms"],
		queryFn: () => list({ data: void 0 }),
		retry: false
	});
	async function open(roomId, fileId) {
		try {
			(await fileUrl({ data: {
				roomId,
				fileId
			} })).files.forEach((f, i) => {
				setTimeout(() => window.open(f.url, "_blank", "noopener"), i * 400);
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed");
		}
	}
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel mx-auto max-w-md p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto size-6 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-semibold",
				children: "Admins only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "You do not have access to this area."
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Operations console"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted-foreground",
			children: "Full read and download access to every room's files for maintenance, support and dispute resolution."
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted-foreground",
			children: "Loading…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-3",
			children: data?.rooms.map((r) => {
				const files = (data.files ?? []).filter((f) => f.room_id === r.id);
				const isOpen = expanded === r.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "surface-panel overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setExpanded(isOpen ? null : r.id),
						className: "flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: r.room_code
									}),
									" · ",
									files.length || 1,
									" file",
									(files.length || 1) > 1 ? "s" : "",
									" ·",
									" ",
									new Date(r.created_at).toLocaleDateString()
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}` })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 border-t border-border/70 px-4 py-4",
								children: [(files.length ? files : [{
									id: "",
									file_name: r.file_name,
									file_size: r.file_size
								}]).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/30 px-3 py-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: f.file_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-3 text-xs text-muted-foreground",
										children: [
											(Number(f.file_size) / 1024).toFixed(0),
											" KB",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => open(r.id, f.id || void 0),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Download"]
											})
										]
									})]
								}, f.id || r.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => open(r.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Download everything"]
								})]
							})
						})
					})]
				}, r.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
			children: "Recent activity"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-2 text-sm",
			children: data?.log.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "surface-panel flex justify-between gap-4 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.action }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: new Date(l.created_at).toLocaleString()
				})]
			}, l.id))
		})
	] });
}
//#endregion
export { AdminPage as component };
