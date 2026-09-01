import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { resolveUserId } from "@/integrations/supabase/auth-helpers.server";

export const Route = createFileRoute("/api/dashboard")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const userId = await resolveUserId(supabaseAdmin, request.headers.get("authorization"));

          // 1. Fetch selling rooms
          const { data: selling, error: sellErr } = await supabaseAdmin
            .from("rooms")
            .select("*")
            .order("created_at", { ascending: false });

          if (sellErr) console.error("[api/dashboard] Rooms fetch error:", sellErr);

          const roomList = selling ?? [];
          const roomIds = roomList.map((r) => r.id);

          // 2. Fetch proofs for all rooms
          const { data: proofs, error: proofErr } = roomIds.length
            ? await supabaseAdmin
                .from("payment_proofs")
                .select("*")
                .in("room_id", roomIds)
                .order("created_at", { ascending: false })
            : { data: [], error: null };
          if (proofErr) console.error("[api/dashboard] Proofs fetch error:", proofErr);

          // 3. Fetch notifications
          const { data: notifs } = await supabaseAdmin
            .from("notifications")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(40);

          return new Response(
            JSON.stringify({
              ok: true,
              selling: roomList,
              buying: roomList.filter((r) => r.buyer_id === userId),
              proofs: proofs ?? [],
              notifications: notifs ?? [],
            }),
            {
              status: 200,
              headers: { "content-type": "application/json" },
            },
          );
        } catch (err: any) {
          console.error("[api/dashboard] GET error:", err);
          return new Response(
            JSON.stringify({ error: err?.message || "Failed to load dashboard" }),
            {
              status: 500,
              headers: { "content-type": "application/json" },
            },
          );
        }
      },

      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { action, proofId, approve, reviewNote } = body;
          const userId = await resolveUserId(supabaseAdmin, request.headers.get("authorization"));

          if (action === "mark_notifications_read") {
            await supabaseAdmin
              .from("notifications")
              .update({ read_at: new Date().toISOString() })
              .is("read_at", null);
            return new Response(JSON.stringify({ ok: true }), {
              status: 200,
              headers: { "content-type": "application/json" },
            });
          }

          if (action === "review_proof") {
            if (!proofId) {
              return new Response(JSON.stringify({ error: "Proof ID is required" }), {
                status: 400,
                headers: { "content-type": "application/json" },
              });
            }

            const { data: proof, error: proofErr } = await supabaseAdmin
              .from("payment_proofs")
              .select("*, rooms(*)")
              .eq("id", proofId)
              .single();

            if (proofErr || !proof) {
              return new Response(JSON.stringify({ error: "Proof not found" }), {
                status: 404,
                headers: { "content-type": "application/json" },
              });
            }

            const room = proof.rooms as any;
            if (!room) {
              return new Response(JSON.stringify({ error: "Associated room not found" }), {
                status: 404,
                headers: { "content-type": "application/json" },
              });
            }

            await supabaseAdmin
              .from("payment_proofs")
              .update({
                status: approve ? "approved" : "rejected",
                review_note: String(reviewNote || "")
                  .trim()
                  .slice(0, 500),
                reviewed_at: new Date().toISOString(),
              })
              .eq("id", proof.id);

            await supabaseAdmin
              .from("rooms")
              .update({ status: approve ? "approved" : "rejected" })
              .eq("id", room.id);

            // Notify buyer
            try {
              const targetBuyer = proof.buyer_id || userId;
              await supabaseAdmin.from("notifications").insert({
                user_id: targetBuyer,
                room_id: room.id,
                kind: approve ? "approved" : "rejected",
                title: approve
                  ? `Payment Approved — "${room.title}" is Unlocked!`
                  : `Payment Rejected for "${room.title}"`,
                body: approve
                  ? `Your payment has been verified and approved by the seller. Room #${room.room_code} files are ready to download!`
                  : String(reviewNote || "Payment could not be verified.").trim(),
              });
            } catch {
              // ignore
            }

            // Audit log
            try {
              await supabaseAdmin.from("access_log").insert({
                room_id: room.id,
                actor_id: userId,
                action: approve ? "payment_approved" : "payment_rejected",
                detail: `Seller reviewed payment proof for room #${room.room_code}: ${approve ? "Approved" : "Rejected"}. Note: ${reviewNote || "None"}`,
              });
            } catch {
              // ignore
            }

            return new Response(
              JSON.stringify({ ok: true, status: approve ? "approved" : "rejected" }),
              {
                status: 200,
                headers: { "content-type": "application/json" },
              },
            );
          }

          return new Response(JSON.stringify({ error: "Unknown action" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        } catch (err: any) {
          console.error("[api/dashboard] POST error:", err);
          return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
