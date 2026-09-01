import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "How does the escrow flow work?",
  "My payment says pending — why?",
  "Which networks can I pay on?",
  "How do I unlock my files?",
];

export function SupportAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/support-chat",
        headers: async () => {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSignedIn(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setSignedIn(Boolean(session)),
    );
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    setInput("");
    void sendMessage({ text: value });
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close support chat" : "Open support chat"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex size-13 items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/40",
          open && "rotate-90 scale-95",
        )}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-5 z-50 flex w-[min(24rem,calc(100vw-2.5rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl transition-all duration-300",
          open
            ? "pointer-events-auto max-h-[32rem] translate-y-0 scale-100 opacity-100"
            : "pointer-events-none max-h-0 translate-y-3 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border/70 bg-muted/40 px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Bot className="size-4.5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">Vault Assist</p>
            <p className="truncate text-xs text-muted-foreground">
              {signedIn ? "Connected to your account" : "General help · sign in for account help"}
            </p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                Ask me anything about sending files, crypto payments, or unlocking a room.
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="rounded-full border border-border/80 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts
              .filter((p): p is { type: "text"; text: string } => p.type === "text")
              .map((p) => p.text)
              .join("");
            if (!text) return null;
            return (
              <div
                key={m.id}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm border border-border/70 bg-muted/40 text-foreground",
                  )}
                >
                  {text}
                </div>
              </div>
            );
          })}

          {busy && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" /> Vault Assist is thinking…
            </p>
          )}
          {error && (
            <p className="text-xs text-destructive">
              Couldn't reach support right now. Please try again.
            </p>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="flex items-center gap-2 border-t border-border/70 bg-muted/20 px-3 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary/60"
          />
          <Button
            type="submit"
            size="icon"
            className="size-9 shrink-0"
            disabled={busy || !input.trim()}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
