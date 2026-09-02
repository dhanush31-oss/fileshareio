import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-CQNRbcL4.mjs";
import { r as ensureSession } from "./router-DngNvJgu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Dc9FNzLY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthRedirect() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		ensureSession().then(() => {
			navigate({ to: "/send" });
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Opening Vaultdrop…" })]
		})
	}) });
}
//#endregion
export { AuthRedirect as component };
