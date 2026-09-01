// Server-side auth middleware for TanStack Start Server Functions
import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { resolveUserId, ensureBucketsExist } from "./auth-helpers.server";

export const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { supabaseAdmin } = await import("./client.server");
    await ensureBucketsExist(supabaseAdmin);

    const request = getRequest();
    const authHeader = request?.headers?.get("authorization");
    const userId = await resolveUserId(supabaseAdmin, authHeader);

    return next({
      context: {
        supabase: supabaseAdmin,
        userId,
        claims: { sub: userId },
      },
    });
  },
);
