import { n as createMiddleware } from "./server-DF64ikKK.mjs";
import { i as getRequest } from "./server-DF64ikKK2.mjs";
import { n as resolveUserId, t as ensureBucketsExist } from "./auth-helpers.server-gYp6xnw7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-CYwUDZQp.js
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	await ensureBucketsExist(supabaseAdmin);
	const authHeader = getRequest()?.headers?.get("authorization");
	const userId = await resolveUserId(supabaseAdmin, authHeader);
	return next({ context: {
		supabase: supabaseAdmin,
		userId,
		claims: { sub: userId }
	} });
});
//#endregion
export { requireSupabaseAuth as t };
