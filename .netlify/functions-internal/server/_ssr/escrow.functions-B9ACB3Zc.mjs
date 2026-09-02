import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DF64ikKK2.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CYwUDZQp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/escrow.functions-B9ACB3Zc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CODE_ALPHABET = "0123456789";
function generateCode() {
	let out = "";
	for (let i = 0; i < 6; i++) out += CODE_ALPHABET[Math.floor(Math.random() * 10)];
	return out;
}
var uploadEscrowFile_createServerFn_handler = createServerRpc({
	id: "c25bca671b743c44576c03ec7330f11f135acd9038ea0eb759d0cfee330f15ff",
	name: "uploadEscrowFile",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => uploadEscrowFile.__executeServer(opts));
var uploadEscrowFile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(uploadEscrowFile_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const safeName = data.fileName.replace(/[^\w.\-]+/g, "_");
	const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
	const buffer = Buffer.from(data.fileBase64, "base64");
	const { error } = await supabaseAdmin.storage.from("escrow-files").upload(path, buffer, {
		contentType: data.mimeType || "application/octet-stream",
		upsert: true
	});
	if (error) throw new Error(`Storage upload failed: ${error.message}`);
	return {
		path,
		name: data.fileName,
		size: data.size,
		mimeType: data.mimeType
	};
});
var createRoom_createServerFn_handler = createServerRpc({
	id: "80d38ff4a34dc69449f7babe686f2da22a903e5e1f8f8083882a4c4c443d2435",
	name: "createRoom",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => createRoom.__executeServer(opts));
var createRoom = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createRoom_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	if (!data.title.trim()) throw new Error("A title is required");
	if (!data.files.length) throw new Error("Attach at least one file");
	for (const f of data.files) if (!f.path || f.path.length < 3) throw new Error("Invalid file path");
	const wallet = data.walletAddress?.trim() || "0x71C8492018492018492018492018492018492018";
	const cryptoAmount = Number.isFinite(data.cryptoAmount) ? data.cryptoAmount : 0;
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const primary = data.files[0];
	const totalSize = data.files.reduce((sum, f) => sum + (f.size || 0), 0);
	const label = data.files.length > 1 ? `${primary.name} +${data.files.length - 1} more` : primary.name;
	for (let attempt = 0; attempt < 8; attempt++) {
		const code = generateCode();
		const { data: room, error } = await supabaseAdmin.from("rooms").insert({
			room_code: code,
			seller_id: userId,
			title: data.title.trim().slice(0, 140),
			description: data.description.trim().slice(0, 2e3),
			payment_instructions: data.paymentInstructions.trim().slice(0, 2e3),
			price_amount: Number.isFinite(data.priceAmount) ? data.priceAmount : 0,
			price_currency: data.priceCurrency.slice(0, 8) || "USD",
			wallet_address: wallet,
			chain: data.chain.slice(0, 40) || "eth-mainnet",
			token_symbol: data.tokenSymbol.toUpperCase().slice(0, 12) || "ETH",
			crypto_amount: cryptoAmount,
			file_path: primary.path,
			file_name: label.slice(0, 200),
			file_size: totalSize,
			mime_type: primary.mimeType || "application/octet-stream"
		}).select("id, room_code").single();
		if (!error && room) {
			const { error: filesError } = await supabaseAdmin.from("room_files").insert(data.files.map((f) => ({
				room_id: room.id,
				file_path: f.path,
				file_name: f.name.slice(0, 200),
				file_size: f.size,
				mime_type: f.mimeType || "application/octet-stream"
			})));
			if (filesError) throw new Error(filesError.message);
			await supabaseAdmin.from("notifications").insert({
				user_id: userId,
				room_id: room.id,
				kind: "room_created",
				title: `Escrow Room #${room.room_code} is Live`,
				body: `Files for "${data.title}" are locked in escrow. Share code #${room.room_code} with your buyer.`
			});
			return {
				id: room.id,
				roomCode: room.room_code
			};
		}
		if (error && error.code !== "23505") throw new Error(error.message);
	}
	throw new Error("Could not allocate a room code, please retry");
});
var listRoomFiles_createServerFn_handler = createServerRpc({
	id: "5becd1a02839619a0fc04722e7106c6e3f1003a08bdb092b3e76683db0af1955",
	name: "listRoomFiles",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => listRoomFiles.__executeServer(opts));
var listRoomFiles = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(listRoomFiles_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: files } = await supabaseAdmin.from("room_files").select("id, file_name, file_size, mime_type").eq("room_id", data.roomId).order("created_at", { ascending: true });
	return { files: files ?? [] };
});
var joinRoom_createServerFn_handler = createServerRpc({
	id: "63b1321fc8bd1789f446cf2b232ab2f0737fce6e188051f5140e7cd9de58349a",
	name: "joinRoom",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => joinRoom.__executeServer(opts));
var joinRoom = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(joinRoom_createServerFn_handler, async ({ data, context }) => {
	const code = data.code.trim();
	if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit room code");
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: room, error } = await supabaseAdmin.from("rooms").select("*").eq("room_code", code).maybeSingle();
	if (error) throw new Error(error.message);
	if (!room) throw new Error("No room found for that code");
	const userId = context.userId;
	if (room.seller_id !== userId && !room.buyer_id) {
		await supabaseAdmin.from("rooms").update({ buyer_id: userId }).eq("id", room.id);
		room.buyer_id = userId;
		await supabaseAdmin.from("notifications").insert([{
			user_id: room.seller_id,
			room_id: room.id,
			kind: "buyer_joined",
			title: `Buyer joined Room #${room.room_code}`,
			body: `A buyer joined room #${room.room_code} for "${room.title}".`
		}, {
			user_id: userId,
			room_id: room.id,
			kind: "room_joined",
			title: `Joined Room #${room.room_code}`,
			body: `You are connected to "${room.title}". Complete payment to unlock files.`
		}]);
	}
	return {
		id: room.id,
		room_code: room.room_code,
		title: room.title,
		description: room.description,
		payment_instructions: room.payment_instructions,
		price_amount: Number(room.price_amount),
		price_currency: room.price_currency,
		wallet_address: room.wallet_address,
		chain: room.chain,
		token_symbol: room.token_symbol,
		crypto_amount: Number(room.crypto_amount),
		file_name: room.file_name,
		file_size: room.file_size,
		mime_type: room.mime_type,
		status: room.status,
		created_at: room.created_at,
		seller_id: room.seller_id,
		buyer_id: room.buyer_id
	};
});
var uploadPaymentProofFile_createServerFn_handler = createServerRpc({
	id: "04472eb5da27876f4cb89b75160de45bd7e7800a340f21bf44738dcc217f0c88",
	name: "uploadPaymentProofFile",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => uploadPaymentProofFile.__executeServer(opts));
var uploadPaymentProofFile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(uploadPaymentProofFile_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const safeName = data.fileName.replace(/[^\w.\-]+/g, "_");
	const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
	const buffer = Buffer.from(data.fileBase64, "base64");
	const { error } = await supabaseAdmin.storage.from("payment-proofs").upload(path, buffer, {
		contentType: data.mimeType || "application/octet-stream",
		upsert: true
	});
	if (error) throw new Error(`Proof upload failed: ${error.message}`);
	return {
		path,
		name: data.fileName
	};
});
var submitPaymentProof_createServerFn_handler = createServerRpc({
	id: "95d949ab8916eaed895c154a8f2c349a7835c5d22bbdf008daf371eca5c46861",
	name: "submitPaymentProof",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => submitPaymentProof.__executeServer(opts));
var submitPaymentProof = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(submitPaymentProof_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const proofPath = data.proofPath ? String(data.proofPath) : "";
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: room } = await supabaseAdmin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
	if (!room) throw new Error("Room not found");
	if (room.status === "approved") throw new Error("This room is already approved");
	if (room.seller_id !== userId && room.buyer_id !== userId) {
		await supabaseAdmin.from("rooms").update({ buyer_id: userId }).eq("id", room.id);
		room.buyer_id = userId;
	}
	const txHash = data.txHash.trim();
	let chainVerified = false;
	let verifiedAmount = null;
	let detail = txHash ? "" : "No transaction hash provided";
	if (txHash) try {
		const { verifyTransaction } = await import("./covalent.server-qdMh9sBG.mjs");
		const check = await verifyTransaction({
			chain: room.chain,
			txHash,
			wallet: room.wallet_address,
			expected: Number(room.crypto_amount),
			tokenSymbol: room.token_symbol
		});
		chainVerified = check.verified;
		verifiedAmount = check.amount;
		detail = check.detail;
	} catch (err) {
		detail = err instanceof Error ? err.message : "On-chain check failed";
	}
	const { error } = await supabaseAdmin.from("payment_proofs").insert({
		room_id: room.id,
		buyer_id: userId,
		proof_path: proofPath || `${userId}/tx-${Date.now()}`,
		proof_name: (data.proofName || "txHash verification").slice(0, 200),
		note: data.note.trim().slice(0, 1e3),
		amount_claimed: data.amountClaimed,
		tx_hash: txHash.slice(0, 120),
		chain_verified: chainVerified,
		verified_amount: verifiedAmount,
		verification_detail: detail.slice(0, 400)
	});
	if (error) throw new Error(error.message);
	await supabaseAdmin.from("rooms").update({ status: "payment_submitted" }).eq("id", room.id);
	await supabaseAdmin.from("notifications").insert({
		user_id: room.seller_id,
		room_id: room.id,
		kind: chainVerified ? "payment_verified" : "payment_submitted",
		title: chainVerified ? `On-chain payment confirmed for "${room.title}"` : `Payment proof submitted for "${room.title}"`,
		body: detail
	});
	return {
		ok: true,
		chainVerified,
		detail
	};
});
var reviewPaymentProof_createServerFn_handler = createServerRpc({
	id: "208f9caabfc0aab8f5a34d636ea1f9e972ad7705a5bb6204fb06de9a85bd0eaf",
	name: "reviewPaymentProof",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => reviewPaymentProof.__executeServer(opts));
var reviewPaymentProof = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(reviewPaymentProof_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: proof } = await supabaseAdmin.from("payment_proofs").select("id, room_id, buyer_id, rooms!inner(id, seller_id, title, room_code)").eq("id", data.proofId).maybeSingle();
	if (!proof) throw new Error("Proof not found");
	const room = proof.rooms;
	await supabaseAdmin.from("payment_proofs").update({
		status: data.approve ? "approved" : "rejected",
		review_note: data.reviewNote.trim().slice(0, 500),
		reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", proof.id);
	await supabaseAdmin.from("rooms").update({ status: data.approve ? "approved" : "rejected" }).eq("id", room.id);
	await supabaseAdmin.from("access_log").insert({
		room_id: room.id,
		actor_id: userId,
		action: data.approve ? "approve_payment" : "reject_payment"
	});
	if (proof.buyer_id) await supabaseAdmin.from("notifications").insert({
		user_id: proof.buyer_id,
		room_id: room.id,
		kind: data.approve ? "approved" : "rejected",
		title: data.approve ? `Payment approved — "${room.title}" is unlocked` : `Payment rejected for "${room.title}"`,
		body: data.approve ? `Enter code ${room.room_code} in the room to download the file.` : data.reviewNote.trim()
	});
	return { ok: true };
});
var listNotifications_createServerFn_handler = createServerRpc({
	id: "bef65e9413261bafbd068a4852226a253995b9b261f531277cff26b0d348b833",
	name: "listNotifications",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => listNotifications.__executeServer(opts));
var listNotifications = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(listNotifications_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(30);
	return { notifications: data ?? [] };
});
var markNotificationsRead_createServerFn_handler = createServerRpc({
	id: "8824c6215b3178a65f0c49e42533741b3b4d50da8d9bcf82054c950e2f41b81a",
	name: "markNotificationsRead",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => markNotificationsRead.__executeServer(opts));
var markNotificationsRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(markNotificationsRead_createServerFn_handler, async ({ context }) => {
	await context.supabase.from("notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).is("read_at", null);
	return { ok: true };
});
var recheckProofOnChain_createServerFn_handler = createServerRpc({
	id: "faedd7fdf1881b934bc2130d91d2fa913cfd0549e535fd087bbc31fdd6decbac",
	name: "recheckProofOnChain",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => recheckProofOnChain.__executeServer(opts));
var recheckProofOnChain = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(recheckProofOnChain_createServerFn_handler, async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: proof } = await supabaseAdmin.from("payment_proofs").select("id, tx_hash, buyer_id, rooms!inner(id, seller_id, chain, wallet_address, crypto_amount, token_symbol)").eq("id", data.proofId).maybeSingle();
	if (!proof) throw new Error("Proof not found");
	const room = proof.rooms;
	if (room.seller_id !== context.userId && proof.buyer_id !== context.userId) throw new Error("No access");
	if (!proof.tx_hash) throw new Error("No transaction hash on this proof");
	const { verifyTransaction } = await import("./covalent.server-qdMh9sBG.mjs");
	const check = await verifyTransaction({
		chain: room.chain,
		txHash: proof.tx_hash,
		wallet: room.wallet_address,
		expected: Number(room.crypto_amount),
		tokenSymbol: room.token_symbol
	});
	await supabaseAdmin.from("payment_proofs").update({
		chain_verified: check.verified,
		verified_amount: check.amount,
		verification_detail: check.detail.slice(0, 400)
	}).eq("id", proof.id);
	return check;
});
var getDownloadUrl_createServerFn_handler = createServerRpc({
	id: "be187d66f625dcd3b904296e880d0e2ff62fa908a09c257369fb677873e8ea30",
	name: "getDownloadUrl",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => getDownloadUrl.__executeServer(opts));
var getDownloadUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(getDownloadUrl_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: room } = await supabaseAdmin.from("rooms").select("id, room_code, seller_id, buyer_id, status, file_path, file_name").eq("id", data.roomId).maybeSingle();
	if (!room) throw new Error("Room not found");
	const isSeller = room.seller_id === userId;
	if (!isSeller) {
		if (room.status !== "approved") throw new Error("The seller has not approved the payment yet");
		if (data.code.trim() !== room.room_code) throw new Error("That code is not correct");
	}
	let query = supabaseAdmin.from("room_files").select("id, file_path, file_name").eq("room_id", room.id);
	if (data.fileId) query = query.eq("id", data.fileId);
	const { data: rows } = await query.order("created_at", { ascending: true });
	const entries = rows && rows.length ? rows.map((r) => ({
		path: r.file_path,
		name: r.file_name
	})) : [{
		path: room.file_path,
		name: room.file_name
	}];
	const files = [];
	for (const entry of entries) {
		const { data: signed, error } = await supabaseAdmin.storage.from("escrow-files").createSignedUrl(entry.path, 120, { download: entry.name });
		if (error || !signed) throw new Error(error?.message ?? "Could not create a download link");
		files.push({
			name: entry.name,
			url: signed.signedUrl
		});
	}
	await supabaseAdmin.from("access_log").insert({
		room_id: room.id,
		actor_id: userId,
		action: isSeller ? "seller_download" : "buyer_download"
	});
	return {
		url: files[0].url,
		files
	};
});
var getProofUrl_createServerFn_handler = createServerRpc({
	id: "1458b7a46906e07674fdc4a92bab2f2853f921ea4243184209740d77e466723a",
	name: "getProofUrl",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => getProofUrl.__executeServer(opts));
var getProofUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(getProofUrl_createServerFn_handler, async ({ data, context }) => {
	const { userId } = context;
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: proof } = await supabaseAdmin.from("payment_proofs").select("id, room_id, buyer_id, proof_path").eq("id", data.proofId).maybeSingle();
	if (!proof) throw new Error("Proof not found");
	const { data: signed, error } = await supabaseAdmin.storage.from("payment-proofs").createSignedUrl(proof.proof_path, 180);
	let finalUrl = signed?.signedUrl;
	if (error || !finalUrl) {
		const { data: pub } = supabaseAdmin.storage.from("payment-proofs").getPublicUrl(proof.proof_path);
		finalUrl = pub.publicUrl;
	}
	await supabaseAdmin.from("access_log").insert({
		room_id: proof.room_id,
		actor_id: userId,
		action: "view_proof"
	});
	return { url: finalUrl };
});
async function assertAdmin(context) {
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (!isAdmin) throw new Error("Admins only");
}
var adminListRooms_createServerFn_handler = createServerRpc({
	id: "919039427615aa5a3782869a51438ff3c837e7a95842db7708a24003645b6f57",
	name: "adminListRooms",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => adminListRooms.__executeServer(opts));
var adminListRooms = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(adminListRooms_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: rooms } = await supabaseAdmin.from("rooms").select("*").order("created_at", { ascending: false }).limit(200);
	const { data: files } = await supabaseAdmin.from("room_files").select("id, room_id, file_name, file_size, mime_type").order("created_at", { ascending: true });
	const { data: log } = await supabaseAdmin.from("access_log").select("*").order("created_at", { ascending: false }).limit(100);
	return {
		rooms: rooms ?? [],
		files: files ?? [],
		log: log ?? []
	};
});
var adminGetFileUrl_createServerFn_handler = createServerRpc({
	id: "a80e28bca324701c786214f986107592b7cd9eaeb0410f94736022d2ddf3af97",
	name: "adminGetFileUrl",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => adminGetFileUrl.__executeServer(opts));
var adminGetFileUrl = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(adminGetFileUrl_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: room } = await supabaseAdmin.from("rooms").select("id, file_path, file_name").eq("id", data.roomId).maybeSingle();
	if (!room) throw new Error("Room not found");
	let query = supabaseAdmin.from("room_files").select("id, file_path, file_name").eq("room_id", room.id);
	if (data.fileId) query = query.eq("id", data.fileId);
	const { data: rows } = await query.order("created_at", { ascending: true });
	const entries = rows && rows.length ? rows.map((r) => ({
		path: r.file_path,
		name: r.file_name
	})) : [{
		path: room.file_path,
		name: room.file_name
	}];
	const files = [];
	for (const entry of entries) {
		const { data: signed, error } = await supabaseAdmin.storage.from("escrow-files").createSignedUrl(entry.path, 300, { download: entry.name });
		if (error || !signed) throw new Error(error?.message ?? "Could not create a link");
		files.push({
			name: entry.name,
			url: signed.signedUrl
		});
	}
	await supabaseAdmin.from("access_log").insert({
		room_id: room.id,
		actor_id: context.userId,
		action: "admin_download",
		detail: files.map((f) => f.name).join(", ").slice(0, 400)
	});
	return {
		url: files[0].url,
		files
	};
});
var listMyRooms_createServerFn_handler = createServerRpc({
	id: "60d11190bfc705b246fa86164446a0fb36196cd7a2b3c45ed62a565099046392",
	name: "listMyRooms",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => listMyRooms.__executeServer(opts));
var listMyRooms = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(listMyRooms_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { userId } = context;
	const { data: selling } = await supabaseAdmin.from("rooms").select("*").eq("seller_id", userId).order("created_at", { ascending: false });
	const { data: buying } = await supabaseAdmin.from("rooms").select("*").eq("buyer_id", userId).order("created_at", { ascending: false });
	const roomIds = (selling ?? []).map((r) => r.id);
	const { data: proofs } = roomIds.length ? await supabaseAdmin.from("payment_proofs").select("*").in("room_id", roomIds).order("created_at", { ascending: false }) : { data: [] };
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: userId,
		_role: "admin"
	});
	return {
		selling: selling ?? [],
		buying: (buying ?? []).filter((r) => r.seller_id !== userId),
		proofs: proofs ?? [],
		isAdmin: Boolean(isAdmin)
	};
});
var getRoomProofs_createServerFn_handler = createServerRpc({
	id: "2bf149bdf650b09dbf053d5a12456f74e6f4f5d907e4f63dd10c44191c321595",
	name: "getRoomProofs",
	filename: "src/lib/escrow.functions.ts"
}, (opts) => getRoomProofs.__executeServer(opts));
var getRoomProofs = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(getRoomProofs_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D2V-N3PO.mjs").then((n) => n.t);
	const { data: proofs } = await supabaseAdmin.from("payment_proofs").select("*").eq("room_id", data.roomId).order("created_at", { ascending: false });
	return { proofs: proofs ?? [] };
});
//#endregion
export { adminGetFileUrl_createServerFn_handler, adminListRooms_createServerFn_handler, createRoom_createServerFn_handler, getDownloadUrl_createServerFn_handler, getProofUrl_createServerFn_handler, getRoomProofs_createServerFn_handler, joinRoom_createServerFn_handler, listMyRooms_createServerFn_handler, listNotifications_createServerFn_handler, listRoomFiles_createServerFn_handler, markNotificationsRead_createServerFn_handler, recheckProofOnChain_createServerFn_handler, reviewPaymentProof_createServerFn_handler, submitPaymentProof_createServerFn_handler, uploadEscrowFile_createServerFn_handler, uploadPaymentProofFile_createServerFn_handler };
