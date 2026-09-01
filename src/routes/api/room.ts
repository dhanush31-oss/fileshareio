import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { resolveUserId, ensureBucketsExist } from "@/integrations/supabase/auth-helpers.server";

export const Route = createFileRoute("/api/room")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const code = (url.searchParams.get("code") || "").trim();

          if (!code) {
            return new Response(JSON.stringify({ error: "Room code is required" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }

          // 1. Fetch the room from Supabase database
          const { data: room, error: roomErr } = await supabaseAdmin
            .from("rooms")
            .select("*")
            .eq("room_code", code)
            .maybeSingle();

          if (roomErr) {
            console.error("[api/room] Database error:", roomErr);
            return new Response(JSON.stringify({ error: roomErr.message }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }

          if (!room) {
            return new Response(
              JSON.stringify({
                error: `Room #${code} was not found. Please verify the 6-digit code.`,
              }),
              {
                status: 404,
                headers: { "content-type": "application/json" },
              },
            );
          }

          // 2. Fetch associated files from room_files
          const { data: files } = await supabaseAdmin
            .from("room_files")
            .select("id, file_name, file_size, mime_type, file_path")
            .eq("room_id", room.id)
            .order("created_at", { ascending: true });

          // 3. Fetch payment proofs
          const { data: proofs } = await supabaseAdmin
            .from("payment_proofs")
            .select("*")
            .eq("room_id", room.id)
            .order("created_at", { ascending: false });

          return new Response(
            JSON.stringify({
              ok: true,
              room: {
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
                file_path: room.file_path,
                status: room.status,
                created_at: room.created_at,
                seller_id: room.seller_id,
                buyer_id: room.buyer_id,
              },
              files: files || [],
              proofs: proofs || [],
            }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "cache-control": "no-store",
              },
            },
          );
        } catch (err: any) {
          console.error("[api/room] Unexpected GET error:", err);
          return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { action } = body;

          // Action 1: Submit payment proof
          if (action === "submit_proof") {
            const { roomId, txHash = "", note = "", proofPath = "", proofName = "" } = body;
            const cleanTxHash = String(txHash || "").trim();

            const { data: room, error: roomErr } = await supabaseAdmin
              .from("rooms")
              .select("*")
              .eq("id", roomId)
              .maybeSingle();

            if (roomErr || !room) {
              return new Response(JSON.stringify({ error: "Room not found" }), {
                status: 404,
                headers: { "content-type": "application/json" },
              });
            }

            let chainVerified = false;
            let verifiedAmount: number | null = null;
            let detail = cleanTxHash ? "" : "Payment proof submitted";

            if (cleanTxHash) {
              try {
                const { verifyTransaction } = await import("@/lib/covalent.server");
                const check = await verifyTransaction({
                  chain: room.chain,
                  txHash: cleanTxHash,
                  wallet: room.wallet_address,
                  expected: Number(room.crypto_amount),
                  tokenSymbol: room.token_symbol,
                });
                chainVerified = check.verified;
                verifiedAmount = check.amount;
                detail = check.detail;
              } catch (err: any) {
                detail = err?.message || "On-chain verification failed";
              }
            }

            await ensureBucketsExist(supabaseAdmin);
            const buyerId =
              room.buyer_id ||
              (await resolveUserId(supabaseAdmin, request.headers.get("authorization")));
            let finalProofPath = proofPath;

            if (body.proofBase64) {
              const safeName = (proofName || "proof.png").replace(/[^\w.\-]+/g, "_");
              finalProofPath = `${buyerId}/${crypto.randomUUID()}-${safeName}`;
              const buffer = Buffer.from(body.proofBase64, "base64");
              const { error: uploadErr } = await supabaseAdmin.storage
                .from("payment-proofs")
                .upload(finalProofPath, buffer, {
                  contentType: body.mimeType || "image/png",
                  upsert: true,
                });
              if (uploadErr) {
                console.warn("[api/room] Proof upload notice:", uploadErr.message);
              }
            }

            const { data: insertedProof, error: proofErr } = await supabaseAdmin
              .from("payment_proofs")
              .insert({
                room_id: room.id,
                buyer_id: buyerId,
                proof_path: finalProofPath || `${buyerId}/tx-${Date.now()}`,
                proof_name: (proofName || "Transaction Hash").slice(0, 200),
                note: String(note || "")
                  .trim()
                  .slice(0, 1000),
                amount_claimed: room.price_amount,
                tx_hash: cleanTxHash.slice(0, 120),
                chain_verified: chainVerified,
                verified_amount: verifiedAmount,
                verification_detail: detail.slice(0, 400),
              })
              .select("*")
              .single();

            if (proofErr) {
              return new Response(JSON.stringify({ error: proofErr.message }), {
                status: 500,
                headers: { "content-type": "application/json" },
              });
            }

            // Always set room status to "payment_submitted" pending sender approval
            await supabaseAdmin
              .from("rooms")
              .update({ status: "payment_submitted" })
              .eq("id", room.id);

            // Notify seller
            try {
              await supabaseAdmin.from("notifications").insert({
                user_id: room.seller_id,
                room_id: room.id,
                kind: "payment_submitted",
                title: `Payment Submitted for Room #${room.room_code}`,
                body: `Buyer submitted payment proof for "${room.title}". Review and approve to release files.`,
              });
            } catch {
              // ignore
            }

            return new Response(
              JSON.stringify({
                ok: true,
                chainVerified,
                detail,
                status: "payment_submitted",
                proof: insertedProof,
              }),
              {
                status: 200,
                headers: { "content-type": "application/json" },
              },
            );
          }

          // Action 2: Seller Review / Approve Proof
          if (action === "review_proof" || action === "approve_proof" || action === "instant_approve") {
            const { roomId, proofId, approve = true, reviewNote = "" } = body;
            const newStatus = approve ? "approved" : "awaiting_payment";

            await supabaseAdmin.from("rooms").update({ status: newStatus }).eq("id", roomId);

            if (proofId) {
              await supabaseAdmin
                .from("payment_proofs")
                .update({
                  status: approve ? "approved" : "rejected",
                  review_note: String(reviewNote || "").trim(),
                  reviewed_at: new Date().toISOString(),
                })
                .eq("id", proofId);
            } else {
              // Update all pending proofs for this room
              await supabaseAdmin
                .from("payment_proofs")
                .update({
                  status: approve ? "approved" : "rejected",
                  reviewed_at: new Date().toISOString(),
                })
                .eq("room_id", roomId)
                .eq("status", "pending");
            }

            return new Response(
              JSON.stringify({ ok: true, status: newStatus }),
              {
                status: 200,
                headers: { "content-type": "application/json" },
              },
            );
          }

          // Action 2: Get download URLs for unlocked files
          if (action === "unlock_download") {
            const { roomId, code, fileId } = body;
            const { data: room, error: roomErr } = await supabaseAdmin
              .from("rooms")
              .select("*")
              .eq("id", roomId)
              .maybeSingle();

            if (roomErr || !room) {
              return new Response(JSON.stringify({ error: "Room not found" }), {
                status: 404,
                headers: { "content-type": "application/json" },
              });
            }

            if (room.status !== "approved" && Number(room.crypto_amount) > 0) {
              return new Response(
                JSON.stringify({
                  error: "Files are still locked. Complete payment or approve transfer to unlock.",
                }),
                {
                  status: 403,
                  headers: { "content-type": "application/json" },
                },
              );
            }

            if (String(code || "").trim() !== room.room_code) {
              return new Response(JSON.stringify({ error: "Incorrect room code." }), {
                status: 403,
                headers: { "content-type": "application/json" },
              });
            }

            let query = supabaseAdmin
              .from("room_files")
              .select("id, file_path, file_name")
              .eq("room_id", room.id);
            if (fileId) query = query.eq("id", fileId);
            const { data: rows } = await query.order("created_at", { ascending: true });

            const entries =
              rows && rows.length
                ? rows.map((r) => ({ path: r.file_path, name: r.file_name }))
                : [{ path: room.file_path, name: room.file_name }];

            const files: { name: string; url: string }[] = [];
            for (const entry of entries) {
              const { data: signed, error: signErr } = await supabaseAdmin.storage
                .from("escrow-files")
                .createSignedUrl(entry.path, 180, { download: entry.name });

              if (!signErr && signed?.signedUrl) {
                files.push({ name: entry.name, url: signed.signedUrl });
              } else {
                // Fallback to public URL if bucket is public
                const { data: publicData } = supabaseAdmin.storage
                  .from("escrow-files")
                  .getPublicUrl(entry.path);
                files.push({ name: entry.name, url: publicData.publicUrl });
              }
            }

            return new Response(JSON.stringify({ ok: true, files }), {
              status: 200,
              headers: { "content-type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ error: "Unknown action" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        } catch (err: any) {
          console.error("[api/room] Unexpected POST error:", err);
          return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
