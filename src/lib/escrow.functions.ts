import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CODE_ALPHABET = "0123456789";

function generateCode() {
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

export type RoomSummary = {
  id: string;
  room_code: string;
  title: string;
  description: string;
  payment_instructions: string;
  price_amount: number;
  price_currency: string;
  wallet_address: string;
  chain: string;
  token_symbol: string;
  crypto_amount: number;

  file_name: string;
  file_size: number;
  mime_type: string;
  status: string;
  created_at: string;
  seller_id: string;
  buyer_id: string | null;
};

export type RoomFile = {
  id: string;
  file_name: string;
  file_size: number;
  mime_type: string;
};

export const uploadEscrowFile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: { fileName: string; fileBase64: string; mimeType: string; size: number }) => input,
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const safeName = data.fileName.replace(/[^\w.\-]+/g, "_");
    const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
    const buffer = Buffer.from(data.fileBase64, "base64");

    const { error } = await supabaseAdmin.storage.from("escrow-files").upload(path, buffer, {
      contentType: data.mimeType || "application/octet-stream",
      upsert: true,
    });

    if (error) throw new Error(`Storage upload failed: ${error.message}`);
    return { path, name: data.fileName, size: data.size, mimeType: data.mimeType };
  });

export const createRoom = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      title: string;
      description: string;
      paymentInstructions: string;
      priceAmount: number;
      priceCurrency: string;
      walletAddress: string;
      chain: string;
      tokenSymbol: string;
      cryptoAmount: number;
      files: { path: string; name: string; size: number; mimeType: string }[];
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;
    if (!data.title.trim()) throw new Error("A title is required");
    if (!data.files.length) throw new Error("Attach at least one file");
    for (const f of data.files) {
      if (!f.path || f.path.length < 3) throw new Error("Invalid file path");
    }
    const wallet = data.walletAddress?.trim() || "0x71C8492018492018492018492018492018492018";
    const cryptoAmount = Number.isFinite(data.cryptoAmount) ? data.cryptoAmount : 0;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const primary = data.files[0]!;
    const totalSize = data.files.reduce((sum, f) => sum + (f.size || 0), 0);
    const label =
      data.files.length > 1 ? `${primary.name} +${data.files.length - 1} more` : primary.name;

    for (let attempt = 0; attempt < 8; attempt++) {
      const code = generateCode();
      const { data: room, error } = await supabaseAdmin
        .from("rooms")
        .insert({
          room_code: code,
          seller_id: userId,
          title: data.title.trim().slice(0, 140),
          description: data.description.trim().slice(0, 2000),
          payment_instructions: data.paymentInstructions.trim().slice(0, 2000),
          price_amount: Number.isFinite(data.priceAmount) ? data.priceAmount : 0,
          price_currency: data.priceCurrency.slice(0, 8) || "USD",
          wallet_address: wallet,
          chain: data.chain.slice(0, 40) || "eth-mainnet",
          token_symbol: data.tokenSymbol.toUpperCase().slice(0, 12) || "ETH",
          crypto_amount: cryptoAmount,
          file_path: primary.path,
          file_name: label.slice(0, 200),
          file_size: totalSize,
          mime_type: primary.mimeType || "application/octet-stream",
        })
        .select("id, room_code")
        .single();

      if (!error && room) {
        const { error: filesError } = await supabaseAdmin.from("room_files").insert(
          data.files.map((f) => ({
            room_id: room.id,
            file_path: f.path,
            file_name: f.name.slice(0, 200),
            file_size: f.size,
            mime_type: f.mimeType || "application/octet-stream",
          })),
        );
        if (filesError) throw new Error(filesError.message);

        await supabaseAdmin.from("notifications").insert({
          user_id: userId,
          room_id: room.id,
          kind: "room_created",
          title: `Escrow Room #${room.room_code} is Live`,
          body: `Files for "${data.title}" are locked in escrow. Share code #${room.room_code} with your buyer.`,
        });

        return { id: room.id, roomCode: room.room_code };
      }
      if (error && error.code !== "23505") throw new Error(error.message);
    }
    throw new Error("Could not allocate a room code, please retry");
  });

export const listRoomFiles = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { roomId: string }) => input)
  .handler(async ({ data }): Promise<{ files: RoomFile[] }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: files } = await supabaseAdmin
      .from("room_files")
      .select("id, file_name, file_size, mime_type")
      .eq("room_id", data.roomId)
      .order("created_at", { ascending: true });
    return { files: (files ?? []) as RoomFile[] };
  });

export const joinRoom = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { code: string }) => input)
  .handler(async ({ data, context }): Promise<RoomSummary> => {
    const code = data.code.trim();
    if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit room code");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: room, error } = await supabaseAdmin
      .from("rooms")
      .select("*")
      .eq("room_code", code)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!room) throw new Error("No room found for that code");

    const userId = context.userId;
    if (room.seller_id !== userId && !room.buyer_id) {
      await supabaseAdmin.from("rooms").update({ buyer_id: userId }).eq("id", room.id);
      room.buyer_id = userId;

      await supabaseAdmin.from("notifications").insert([
        {
          user_id: room.seller_id,
          room_id: room.id,
          kind: "buyer_joined",
          title: `Buyer joined Room #${room.room_code}`,
          body: `A buyer joined room #${room.room_code} for "${room.title}".`,
        },
        {
          user_id: userId,
          room_id: room.id,
          kind: "room_joined",
          title: `Joined Room #${room.room_code}`,
          body: `You are connected to "${room.title}". Complete payment to unlock files.`,
        },
      ]);
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
      buyer_id: room.buyer_id,
    };
  });

export const uploadPaymentProofFile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { fileName: string; fileBase64: string; mimeType: string }) => input)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const safeName = data.fileName.replace(/[^\w.\-]+/g, "_");
    const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
    const buffer = Buffer.from(data.fileBase64, "base64");

    const { error } = await supabaseAdmin.storage.from("payment-proofs").upload(path, buffer, {
      contentType: data.mimeType || "application/octet-stream",
      upsert: true,
    });

    if (error) throw new Error(`Proof upload failed: ${error.message}`);
    return { path, name: data.fileName };
  });

export const submitPaymentProof = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      roomId: string;
      proofPath?: string | null;
      proofName?: string | null;
      note: string;
      txHash: string;
      amountClaimed: number | null;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const proofPath = data.proofPath ? String(data.proofPath) : "";

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: room } = await supabaseAdmin
      .from("rooms")
      .select("*")
      .eq("id", data.roomId)
      .maybeSingle();

    if (!room) throw new Error("Room not found");
    if (room.status === "approved") throw new Error("This room is already approved");
    if (room.seller_id !== userId && room.buyer_id !== userId) {
      await supabaseAdmin.from("rooms").update({ buyer_id: userId }).eq("id", room.id);
      room.buyer_id = userId;
    }

    const txHash = data.txHash.trim();
    let chainVerified = false;
    let verifiedAmount: number | null = null;
    let detail = txHash ? "" : "No transaction hash provided";

    if (txHash) {
      try {
        const { verifyTransaction } = await import("@/lib/covalent.server");
        const check = await verifyTransaction({
          chain: room.chain,
          txHash,
          wallet: room.wallet_address,
          expected: Number(room.crypto_amount),
          tokenSymbol: room.token_symbol,
        });
        chainVerified = check.verified;
        verifiedAmount = check.amount;
        detail = check.detail;
      } catch (err) {
        detail = err instanceof Error ? err.message : "On-chain check failed";
      }
    }

    const { error } = await supabaseAdmin.from("payment_proofs").insert({
      room_id: room.id,
      buyer_id: userId,
      proof_path: proofPath || `${userId}/tx-${Date.now()}`,
      proof_name: (data.proofName || "txHash verification").slice(0, 200),
      note: data.note.trim().slice(0, 1000),
      amount_claimed: data.amountClaimed,
      tx_hash: txHash.slice(0, 120),
      chain_verified: chainVerified,
      verified_amount: verifiedAmount,
      verification_detail: detail.slice(0, 400),
    });
    if (error) throw new Error(error.message);

    await supabaseAdmin.from("rooms").update({ status: "payment_submitted" }).eq("id", room.id);

    await supabaseAdmin.from("notifications").insert({
      user_id: room.seller_id,
      room_id: room.id,
      kind: chainVerified ? "payment_verified" : "payment_submitted",
      title: chainVerified
        ? `On-chain payment confirmed for "${room.title}"`
        : `Payment proof submitted for "${room.title}"`,
      body: detail,
    });

    return { ok: true, chainVerified, detail };
  });

export const reviewPaymentProof = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { proofId: string; approve: boolean; reviewNote: string }) => input)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: proof } = await supabaseAdmin
      .from("payment_proofs")
      .select("id, room_id, buyer_id, rooms!inner(id, seller_id, title, room_code)")
      .eq("id", data.proofId)
      .maybeSingle();

    if (!proof) throw new Error("Proof not found");
    const room = proof.rooms as unknown as {
      id: string;
      seller_id: string;
      title: string;
      room_code: string;
    };

    await supabaseAdmin
      .from("payment_proofs")
      .update({
        status: data.approve ? "approved" : "rejected",
        review_note: data.reviewNote.trim().slice(0, 500),
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", proof.id);

    await supabaseAdmin
      .from("rooms")
      .update({ status: data.approve ? "approved" : "rejected" })
      .eq("id", room.id);

    await supabaseAdmin.from("access_log").insert({
      room_id: room.id,
      actor_id: userId,
      action: data.approve ? "approve_payment" : "reject_payment",
    });

    if (proof.buyer_id) {
      await supabaseAdmin.from("notifications").insert({
        user_id: proof.buyer_id,
        room_id: room.id,
        kind: data.approve ? "approved" : "rejected",
        title: data.approve
          ? `Payment approved — "${room.title}" is unlocked`
          : `Payment rejected for "${room.title}"`,
        body: data.approve
          ? `Enter code ${room.room_code} in the room to download the file.`
          : data.reviewNote.trim(),
      });
    }

    return { ok: true };
  });

export const listNotifications = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30);
    return { notifications: data ?? [] };
  });

export const markNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await context.supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .is("read_at", null);
    return { ok: true };
  });

export const recheckProofOnChain = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { proofId: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: proof } = await supabaseAdmin
      .from("payment_proofs")
      .select(
        "id, tx_hash, buyer_id, rooms!inner(id, seller_id, chain, wallet_address, crypto_amount, token_symbol)",
      )
      .eq("id", data.proofId)
      .maybeSingle();
    if (!proof) throw new Error("Proof not found");
    const room = proof.rooms as unknown as {
      id: string;
      seller_id: string;
      chain: string;
      wallet_address: string;
      crypto_amount: number;
      token_symbol: string;
    };
    if (room.seller_id !== context.userId && proof.buyer_id !== context.userId) {
      throw new Error("No access");
    }
    if (!proof.tx_hash) throw new Error("No transaction hash on this proof");

    const { verifyTransaction } = await import("@/lib/covalent.server");
    const check = await verifyTransaction({
      chain: room.chain,
      txHash: proof.tx_hash,
      wallet: room.wallet_address,
      expected: Number(room.crypto_amount),
      tokenSymbol: room.token_symbol,
    });

    await supabaseAdmin
      .from("payment_proofs")
      .update({
        chain_verified: check.verified,
        verified_amount: check.amount,
        verification_detail: check.detail.slice(0, 400),
      })
      .eq("id", proof.id);

    return check;
  });

export const getDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { roomId: string; code: string; fileId?: string | undefined }) => input)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: room } = await supabaseAdmin
      .from("rooms")
      .select("id, room_code, seller_id, buyer_id, status, file_path, file_name")
      .eq("id", data.roomId)
      .maybeSingle();

    if (!room) throw new Error("Room not found");

    const isSeller = room.seller_id === userId;
    if (!isSeller) {
      if (room.status !== "approved")
        throw new Error("The seller has not approved the payment yet");
      if (data.code.trim() !== room.room_code) throw new Error("That code is not correct");
    }

    let query = supabaseAdmin
      .from("room_files")
      .select("id, file_path, file_name")
      .eq("room_id", room.id);
    if (data.fileId) query = query.eq("id", data.fileId);
    const { data: rows } = await query.order("created_at", { ascending: true });

    const entries =
      rows && rows.length
        ? rows.map((r) => ({ path: r.file_path, name: r.file_name }))
        : [{ path: room.file_path, name: room.file_name }];

    const files: { name: string; url: string }[] = [];
    for (const entry of entries) {
      const { data: signed, error } = await supabaseAdmin.storage
        .from("escrow-files")
        .createSignedUrl(entry.path, 120, { download: entry.name });
      if (error || !signed) throw new Error(error?.message ?? "Could not create a download link");
      files.push({ name: entry.name, url: signed.signedUrl });
    }

    await supabaseAdmin.from("access_log").insert({
      room_id: room.id,
      actor_id: userId,
      action: isSeller ? "seller_download" : "buyer_download",
    });

    return { url: files[0]!.url, files };
  });

export const getProofUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { proofId: string }) => input)
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: proof } = await supabaseAdmin
      .from("payment_proofs")
      .select("id, room_id, buyer_id, proof_path")
      .eq("id", data.proofId)
      .maybeSingle();

    if (!proof) throw new Error("Proof not found");

    const { data: signed, error } = await supabaseAdmin.storage
      .from("payment-proofs")
      .createSignedUrl(proof.proof_path, 180);

    let finalUrl = signed?.signedUrl;
    if (error || !finalUrl) {
      const { data: pub } = supabaseAdmin.storage
        .from("payment-proofs")
        .getPublicUrl(proof.proof_path);
      finalUrl = pub.publicUrl;
    }

    await supabaseAdmin.from("access_log").insert({
      room_id: proof.room_id,
      actor_id: userId,
      action: "view_proof",
    });

    return { url: finalUrl };
  });

async function assertAdmin(context: { userId: string; supabase: any }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Admins only");
}

export const adminListRooms = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rooms } = await supabaseAdmin
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    const { data: files } = await supabaseAdmin
      .from("room_files")
      .select("id, room_id, file_name, file_size, mime_type")
      .order("created_at", { ascending: true });
    const { data: log } = await supabaseAdmin
      .from("access_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    return { rooms: rooms ?? [], files: files ?? [], log: log ?? [] };
  });

export const adminGetFileUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { roomId: string; fileId?: string | undefined }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: room } = await supabaseAdmin
      .from("rooms")
      .select("id, file_path, file_name")
      .eq("id", data.roomId)
      .maybeSingle();
    if (!room) throw new Error("Room not found");

    let query = supabaseAdmin
      .from("room_files")
      .select("id, file_path, file_name")
      .eq("room_id", room.id);
    if (data.fileId) query = query.eq("id", data.fileId);
    const { data: rows } = await query.order("created_at", { ascending: true });

    const entries =
      rows && rows.length
        ? rows.map((r) => ({ path: r.file_path, name: r.file_name }))
        : [{ path: room.file_path, name: room.file_name }];

    const files: { name: string; url: string }[] = [];
    for (const entry of entries) {
      const { data: signed, error } = await supabaseAdmin.storage
        .from("escrow-files")
        .createSignedUrl(entry.path, 300, { download: entry.name });
      if (error || !signed) throw new Error(error?.message ?? "Could not create a link");
      files.push({ name: entry.name, url: signed.signedUrl });
    }

    await supabaseAdmin.from("access_log").insert({
      room_id: room.id,
      actor_id: context.userId,
      action: "admin_download",
      detail: files
        .map((f) => f.name)
        .join(", ")
        .slice(0, 400),
    });

    return { url: files[0]!.url, files };
  });

export const listMyRooms = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { userId } = context;

    const { data: selling } = await supabaseAdmin
      .from("rooms")
      .select("*")
      .eq("seller_id", userId)
      .order("created_at", { ascending: false });

    const { data: buying } = await supabaseAdmin
      .from("rooms")
      .select("*")
      .eq("buyer_id", userId)
      .order("created_at", { ascending: false });

    const roomIds = (selling ?? []).map((r) => r.id);
    const { data: proofs } = roomIds.length
      ? await supabaseAdmin
          .from("payment_proofs")
          .select("*")
          .in("room_id", roomIds)
          .order("created_at", { ascending: false })
      : { data: [] };

    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    return {
      selling: selling ?? [],
      buying: (buying ?? []).filter((r) => r.seller_id !== userId),
      proofs: proofs ?? [],
      isAdmin: Boolean(isAdmin),
    };
  });

export const getRoomProofs = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { roomId: string }) => input)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: proofs } = await supabaseAdmin
      .from("payment_proofs")
      .select("*")
      .eq("room_id", data.roomId)
      .order("created_at", { ascending: false });
    return { proofs: proofs ?? [] };
  });
