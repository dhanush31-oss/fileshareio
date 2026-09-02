import { n as createMiddleware } from "./server-DF64ikKK.mjs";
import { n as supabase } from "./client-BhPdVgWC.mjs";
import { t as renderErrorPage } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-1ZrcW_LM.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
var attachSupabaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
	let token;
	try {
		const { data } = await supabase.auth.getSession();
		token = data.session?.access_token;
	} catch {}
	let guestId = null;
	if (typeof window !== "undefined") {
		guestId = localStorage.getItem("vd_guest_id");
		if (!guestId) {
			guestId = crypto.randomUUID();
			localStorage.setItem("vd_guest_id", guestId);
		}
	}
	const headers = {};
	if (token) headers["Authorization"] = `Bearer ${token}`;
	if (guestId) headers["x-guest-id"] = guestId;
	return next({ headers });
});
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var startInstance = createStart(() => ({
	functionMiddleware: [attachSupabaseAuth],
	requestMiddleware: [errorMiddleware]
}));
//#endregion
export { startInstance };
