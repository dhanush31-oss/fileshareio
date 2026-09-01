import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminListRooms, adminGetFileUrl } from "@/lib/escrow.functions";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronDown, Download, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Operations Console | Vaultdrop" },
      {
        name: "description",
        content:
          "Review rooms, payment proofs and audit history across the Vaultdrop escrow platform.",
      },
      { property: "og:title", content: "Operations Console | Vaultdrop" },
      {
        property: "og:description",
        content:
          "Review rooms, payment proofs and audit history across the Vaultdrop escrow platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const list = useServerFn(adminListRooms);
  const fileUrl = useServerFn(adminGetFileUrl);
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-rooms"],
    queryFn: () => list({ data: undefined }),
    retry: false,
  });

  async function open(roomId: string, fileId?: string) {
    try {
      const res = await fileUrl({ data: { roomId, fileId } });
      res.files.forEach((f, i) => {
        setTimeout(() => window.open(f.url, "_blank", "noopener"), i * 400);
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }

  if (isError) {
    return (
      <AppShell>
        <div className="surface-panel mx-auto max-w-md p-8 text-center">
          <ShieldAlert className="mx-auto size-6 text-muted-foreground" />
          <h1 className="mt-3 font-semibold">Admins only</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "You do not have access to this area."}
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold tracking-tight">Operations console</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Full read and download access to every room's files for maintenance, support and dispute
        resolution.
      </p>

      {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading…</p>}

      <div className="mt-8 space-y-3">
        {data?.rooms.map((r) => {
          const files = (data.files ?? []).filter((f) => f.room_id === r.id);
          const isOpen = expanded === r.id;
          return (
            <article key={r.id} className="surface-panel overflow-hidden">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : r.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/30"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{r.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    <span className="font-mono">{r.room_code}</span> · {files.length || 1} file
                    {(files.length || 1) > 1 ? "s" : ""} ·{" "}
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="flex items-center gap-3">
                  <StatusBadge status={r.status} />
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 border-t border-border/70 px-4 py-4">
                    {(files.length
                      ? files
                      : [{ id: "", file_name: r.file_name, file_size: r.file_size }]
                    ).map((f) => (
                      <div
                        key={f.id || r.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/30 px-3 py-2 text-sm"
                      >
                        <span className="truncate">{f.file_name}</span>
                        <span className="flex items-center gap-3 text-xs text-muted-foreground">
                          {(Number(f.file_size) / 1024).toFixed(0)} KB
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => open(r.id, f.id || undefined)}
                          >
                            <Download /> Download
                          </Button>
                        </span>
                      </div>
                    ))}
                    <Button size="sm" variant="ghost" onClick={() => open(r.id)}>
                      <Download /> Download everything
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Recent activity
      </h2>
      <ul className="mt-4 space-y-2 text-sm">
        {data?.log.map((l) => (
          <li key={l.id} className="surface-panel flex justify-between gap-4 px-4 py-3">
            <span>{l.action}</span>
            <span className="text-muted-foreground">{new Date(l.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
