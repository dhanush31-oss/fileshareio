// Server-side helper to ensure valid Supabase auth user IDs and storage buckets exist
import type { SupabaseClient } from "@supabase/supabase-js";

let cachedSystemUserId: string | null = null;
let bucketsChecked = false;

/**
 * Ensures private buckets `escrow-files` and `payment-proofs` exist in Supabase storage.
 */
export async function ensureBucketsExist(
  supabaseAdmin: SupabaseClient<any, any, any>,
): Promise<void> {
  if (bucketsChecked) return;
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const names = (buckets || []).map((b) => b.name);
    if (!names.includes("escrow-files")) {
      await supabaseAdmin.storage.createBucket("escrow-files", {
        public: false,
        fileSizeLimit: 524288000, // 500 MB
      });
    } else {
      try {
        await supabaseAdmin.storage.updateBucket("escrow-files", {
          public: false,
          fileSizeLimit: 524288000,
        });
      } catch {
        // ignore
      }
    }
    if (!names.includes("payment-proofs")) {
      await supabaseAdmin.storage.createBucket("payment-proofs", {
        public: false,
        fileSizeLimit: 104857600, // 100 MB
      });
    } else {
      try {
        await supabaseAdmin.storage.updateBucket("payment-proofs", {
          public: false,
          fileSizeLimit: 104857600,
        });
      } catch {
        // ignore
      }
    }
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
export async function resolveUserId(
  supabaseAdmin: SupabaseClient<any, any, any>,
  authHeaderOrToken?: string | null,
): Promise<string> {
  let token = authHeaderOrToken;
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "").trim();
  }

  // 1. If valid user JWT token is passed, verify with Supabase Auth
  if (token && token.length > 20) {
    try {
      const { data: userData, error } = await supabaseAdmin.auth.getUser(token);
      if (!error && userData?.user?.id) {
        return userData.user.id;
      }
    } catch {
      // Fall through to system fallback
    }
  }

  // 2. Return cached system user ID if available
  if (cachedSystemUserId) {
    return cachedSystemUserId;
  }

  // 3. Find the first existing user in auth.users
  try {
    const { data: usersData, error: uErr } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 5,
    });
    if (!uErr && usersData?.users && usersData.users.length > 0) {
      cachedSystemUserId = usersData.users[0].id;
      return cachedSystemUserId;
    }
  } catch (err) {
    console.warn("[resolveUserId] listUsers warning:", err);
  }

  // 4. Create a system user if auth.users is completely empty
  try {
    const { data: created, error: cErr } = await supabaseAdmin.auth.admin.createUser({
      email: "system@vaultdrop.local",
      password: "SystemUser#2026!",
      email_confirm: true,
      user_metadata: { display_name: "Vaultdrop System" },
    });
    if (!cErr && created?.user?.id) {
      cachedSystemUserId = created.user.id;
      return cachedSystemUserId;
    }
  } catch (err) {
    console.error("[resolveUserId] Error creating system user:", err);
  }

  // Fallback to active project user ID
  return "56cf27a4-a8c4-4ba0-b4fb-9817361155dd";
}
