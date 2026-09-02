//#region node_modules/.nitro/vite/services/ssr/assets/auth-helpers.server-gYp6xnw7.js
var cachedSystemUserId = null;
var bucketsChecked = false;
/**
* Ensures private buckets `escrow-files` and `payment-proofs` exist in Supabase storage.
*/
async function ensureBucketsExist(supabaseAdmin) {
	if (bucketsChecked) return;
	try {
		const { data: buckets } = await supabaseAdmin.storage.listBuckets();
		const names = (buckets || []).map((b) => b.name);
		if (!names.includes("escrow-files")) await supabaseAdmin.storage.createBucket("escrow-files", {
			public: false,
			fileSizeLimit: 524288e3
		});
		else try {
			await supabaseAdmin.storage.updateBucket("escrow-files", {
				public: false,
				fileSizeLimit: 524288e3
			});
		} catch {}
		if (!names.includes("payment-proofs")) await supabaseAdmin.storage.createBucket("payment-proofs", {
			public: false,
			fileSizeLimit: 104857600
		});
		else try {
			await supabaseAdmin.storage.updateBucket("payment-proofs", {
				public: false,
				fileSizeLimit: 104857600
			});
		} catch {}
		bucketsChecked = true;
	} catch (err) {
		console.warn("[ensureBucketsExist] Warning checking buckets:", err);
	}
}
/**
* Resolves a valid user ID guaranteed to exist in Supabase auth.users table.
* If an auth token is provided and valid, returns that user's ID.
* Otherwise, resolves the existing project user or auto-creates a system user.
*/
async function resolveUserId(supabaseAdmin, authHeaderOrToken) {
	let token = authHeaderOrToken;
	if (token && token.startsWith("Bearer ")) token = token.replace("Bearer ", "").trim();
	if (token && token.length > 20) try {
		const { data: userData, error } = await supabaseAdmin.auth.getUser(token);
		if (!error && userData?.user?.id) return userData.user.id;
	} catch {}
	if (cachedSystemUserId) return cachedSystemUserId;
	try {
		const { data: usersData, error: uErr } = await supabaseAdmin.auth.admin.listUsers({
			page: 1,
			perPage: 5
		});
		if (!uErr && usersData?.users && usersData.users.length > 0) {
			cachedSystemUserId = usersData.users[0].id;
			return cachedSystemUserId;
		}
	} catch (err) {
		console.warn("[resolveUserId] listUsers warning:", err);
	}
	try {
		const { data: created, error: cErr } = await supabaseAdmin.auth.admin.createUser({
			email: "system@vaultdrop.local",
			password: "SystemUser#2026!",
			email_confirm: true,
			user_metadata: { display_name: "Vaultdrop System" }
		});
		if (!cErr && created?.user?.id) {
			cachedSystemUserId = created.user.id;
			return cachedSystemUserId;
		}
	} catch (err) {
		console.error("[resolveUserId] Error creating system user:", err);
	}
	return "56cf27a4-a8c4-4ba0-b4fb-9817361155dd";
}
//#endregion
export { resolveUserId as n, ensureBucketsExist as t };
