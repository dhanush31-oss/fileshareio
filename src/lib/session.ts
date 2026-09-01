import { supabase } from "@/integrations/supabase/client";

/**
 * Ensures the user has a valid Supabase auth session in the background
 * without prompting them to log in or enter an email/password.
 */
export async function ensureSession() {
  try {
    const { data } = await supabase.auth.getSession();
    if (data?.session?.user) {
      return data.session.user;
    }

    // Try anonymous sign-in if enabled in Supabase
    try {
      const { data: anonData, error: anonErr } = await supabase.auth.signInAnonymously();
      if (!anonErr && anonData?.user) {
        return anonData.user;
      }
    } catch {
      // Continue to local guest fallback
    }

    // Fallback: create persistent local guest account in Supabase
    let guestEmail = typeof window !== "undefined" ? localStorage.getItem("vd_guest_email") : null;
    let guestPass = typeof window !== "undefined" ? localStorage.getItem("vd_guest_pass") : null;

    if (!guestEmail || !guestPass) {
      const randomId = crypto.randomUUID().slice(0, 10);
      guestEmail = `guest_${randomId}@vaultdrop.local`;
      guestPass = `Vd#${crypto.randomUUID()}`;
      if (typeof window !== "undefined") {
        localStorage.setItem("vd_guest_email", guestEmail);
        localStorage.setItem("vd_guest_pass", guestPass);
      }
    }

    // Try sign up first
    const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
      email: guestEmail,
      password: guestPass,
      options: {
        data: { display_name: "Anonymous User" },
      },
    });

    if (!signUpErr && signUpData?.user) {
      return signUpData.user;
    }

    // If user already exists, sign in
    const { data: signInData } = await supabase.auth.signInWithPassword({
      email: guestEmail,
      password: guestPass,
    });

    return signInData?.user || null;
  } catch (err) {
    console.warn("[session] Failed to auto-provision session:", err);
    return null;
  }
}
