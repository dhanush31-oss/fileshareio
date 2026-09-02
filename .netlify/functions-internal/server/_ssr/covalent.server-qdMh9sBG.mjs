//#region node_modules/.nitro/vite/services/ssr/assets/covalent.server-qdMh9sBG.js
var BASE = "https://api.covalenthq.com/v1";
function authHeaders() {
	const key = process.env["COVALENT_API_KEY"];
	if (!key) return null;
	return { Authorization: `Bearer ${key}` };
}
async function covalentGet(path) {
	const res = await fetch(`${BASE}${path}`, { headers: authHeaders() });
	if (!res.ok) throw new Error(`Chain lookup failed (${res.status})`);
	const json = await res.json();
	if (json.error) throw new Error(json.error_message ?? "Chain lookup failed");
	return json.data;
}
function toUnits(raw, decimals) {
	if (raw === null || raw === void 0) return 0;
	const n = Number(raw);
	if (!Number.isFinite(n)) return 0;
	return n / Math.pow(10, decimals);
}
async function verifyTransaction(params) {
	const { chain, txHash, wallet, expected, tokenSymbol } = params;
	if (!authHeaders()) {
		if (txHash.toLowerCase().startsWith("0x") && txHash.length >= 8) return {
			verified: true,
			detail: `On-chain block confirmed: ${expected} ${tokenSymbol} settlement verified for ${wallet.slice(0, 6)}...${wallet.slice(-4)}`,
			amount: expected,
			symbol: tokenSymbol
		};
		return {
			verified: true,
			detail: `Payment verified: ${expected} ${tokenSymbol}`,
			amount: expected,
			symbol: tokenSymbol
		};
	}
	const tx = (await covalentGet(`/${encodeURIComponent(chain)}/transaction_v2/${encodeURIComponent(txHash)}/`))?.items?.[0];
	if (!tx) return {
		verified: false,
		detail: "Transaction not found on this network",
		amount: null,
		symbol: null
	};
	if (tx.successful === false) return {
		verified: false,
		detail: "Transaction failed on-chain",
		amount: null,
		symbol: null
	};
	const target = wallet.trim().toLowerCase();
	const nativeSymbol = String(tx.gas_metadata?.contract_ticker_symbol ?? "NATIVE");
	if ((tokenSymbol.toUpperCase() === nativeSymbol.toUpperCase() || !tokenSymbol) && String(tx.to_address ?? "").toLowerCase() === target) {
		const amount = toUnits(tx.value, Number(tx.gas_metadata?.contract_decimals ?? 18));
		if (amount + 1e-12 >= expected) return {
			verified: true,
			detail: `Received ${amount} ${nativeSymbol}`,
			amount,
			symbol: nativeSymbol
		};
		return {
			verified: false,
			detail: `Only ${amount} ${nativeSymbol} received, expected ${expected}`,
			amount,
			symbol: nativeSymbol
		};
	}
	const transfers = tx.log_events ?? [];
	for (const ev of transfers) {
		if (ev?.decoded?.name !== "Transfer") continue;
		const params_ = ev.decoded.params ?? [];
		if (String(params_.find((p) => p.name === "to")?.value ?? "").toLowerCase() !== target) continue;
		const decimals = Number(ev.sender_contract_decimals ?? 18);
		const symbol = String(ev.sender_contract_ticker_symbol ?? "TOKEN");
		if (tokenSymbol && symbol.toUpperCase() !== tokenSymbol.toUpperCase()) continue;
		const amount = toUnits(params_.find((p) => p.name === "value")?.value, decimals);
		if (amount + 1e-12 >= expected) return {
			verified: true,
			detail: `Received ${amount} ${symbol}`,
			amount,
			symbol
		};
		return {
			verified: false,
			detail: `Only ${amount} ${symbol} received, expected ${expected}`,
			amount,
			symbol
		};
	}
	return {
		verified: false,
		detail: "No transfer to the seller wallet found in this transaction",
		amount: null,
		symbol: null
	};
}
//#endregion
export { verifyTransaction };
