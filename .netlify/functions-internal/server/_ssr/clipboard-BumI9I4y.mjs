//#region node_modules/.nitro/vite/services/ssr/assets/clipboard-BumI9I4y.js
/**
* Universal Fail-Safe Clipboard Copy
* Supports HTTP (LAN), HTTPS, iOS Safari, Android Chrome, and Desktop
*/
async function copyToClipboard(text) {
	if (!text) return false;
	if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {}
	if (typeof document !== "undefined") try {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.top = "-9999px";
		textArea.style.left = "-9999px";
		textArea.style.opacity = "0";
		textArea.setAttribute("readonly", "");
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		textArea.setSelectionRange(0, 99999);
		const successful = document.execCommand("copy");
		document.body.removeChild(textArea);
		return successful;
	} catch {
		return false;
	}
	return false;
}
//#endregion
export { copyToClipboard as t };
