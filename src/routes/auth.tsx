import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { ensureSession } from "@/lib/session";
import { AppShell } from "@/components/AppShell";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    await ensureSession();
    throw redirect({ to: "/send" });
  },
  component: AuthRedirect,
});

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    ensureSession().then(() => {
      navigate({ to: "/send" });
    });
  }, [navigate]);

  return (
    <AppShell>
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span>Opening Vaultdrop…</span>
        </div>
      </div>
    </AppShell>
  );
}
