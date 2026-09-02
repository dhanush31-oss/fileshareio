import { s as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-5AdMK70i.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	awaiting_payment: "Awaiting payment",
	payment_submitted: "Payment submitted",
	approved: "Approved",
	rejected: "Rejected",
	cancelled: "Cancelled",
	pending: "Pending review"
};
var TONES = {
	awaiting_payment: "bg-muted text-muted-foreground",
	payment_submitted: "bg-warning/15 text-warning",
	approved: "bg-success/15 text-success",
	rejected: "bg-destructive/15 text-destructive",
	cancelled: "bg-muted text-muted-foreground",
	pending: "bg-warning/15 text-warning"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONES[status] ?? "bg-muted text-muted-foreground"}`,
		children: LABELS[status] ?? status
	});
}
//#endregion
export { StatusBadge as t };
