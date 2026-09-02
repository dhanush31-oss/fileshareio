import { n as __exportAll } from "../_runtime.mjs";
import { r as __exportAll$1 } from "./server-DF64ikKK.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BhPdVgWC.js
var client_BhPdVgWC_exports = /* @__PURE__ */ __exportAll({
	n: () => supabase,
	t: () => client_exports
});
var client_exports = /* @__PURE__ */ __exportAll$1({ supabase: () => supabase });
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
		if (!headers.has("Authorization")) headers.set("Authorization", `Bearer ${supabaseKey}`);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function createSupabaseClient() {
	const SUPABASE_URL = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "sb_publishable_HmEs9ZmaLfcocZMB0eXpwQ_5o7-1X6T",
		"VITE_SUPABASE_PROJECT_ID": "bpeovumhxpgnwcirpgjl",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_HmEs9ZmaLfcocZMB0eXpwQ_5o7-1X6T",
		"VITE_SUPABASE_URL": "https://bpeovumhxpgnwcirpgjl.supabase.co"
	}["VITE_SUPABASE_URL"] || process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "sb_publishable_HmEs9ZmaLfcocZMB0eXpwQ_5o7-1X6T",
		"VITE_SUPABASE_PROJECT_ID": "bpeovumhxpgnwcirpgjl",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_HmEs9ZmaLfcocZMB0eXpwQ_5o7-1X6T",
		"VITE_SUPABASE_URL": "https://bpeovumhxpgnwcirpgjl.supabase.co"
	}["VITE_SUPABASE_PUBLISHABLE_KEY"] || {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "sb_publishable_HmEs9ZmaLfcocZMB0eXpwQ_5o7-1X6T",
		"VITE_SUPABASE_PROJECT_ID": "bpeovumhxpgnwcirpgjl",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_HmEs9ZmaLfcocZMB0eXpwQ_5o7-1X6T",
		"VITE_SUPABASE_URL": "https://bpeovumhxpgnwcirpgjl.supabase.co"
	}["VITE_SUPABASE_ANON_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_ANON_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_ANON_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL / VITE_SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY / VITE_SUPABASE_ANON_KEY"] : []].join(", ")}. Please check your .env file.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
		auth: {
			storage: typeof window !== "undefined" ? localStorage : void 0,
			persistSession: true,
			autoRefreshToken: true
		}
	});
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as n, client_BhPdVgWC_exports as t };
