import { createFileRoute } from "@tanstack/react-router";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
} from "ai";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const PRODUCT_BRIEF = `
You are "Vault Assist", the smart, friendly in-app assistant for Vaultdrop.
Vaultdrop is a decentralized file escrow platform where files are held in secure Private Cloud Storage and only unlocked when crypto payments are confirmed.
Style: Conversational, helpful, direct, concise, and friendly. Always answer the user's specific question directly.
`.trim();

function isNewKey(v: string) {
  return v.startsWith("sb_publishable_") || v.startsWith("sb_secret_");
}

async function buildAccountContext(
  token: string | null,
): Promise<{ summary: string; rooms: any[] }> {
  if (!token || token.split(".").length !== 3) return { summary: "", rooms: [] };
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["SUPABASE_ANON_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["VITE_SUPABASE_ANON_KEY"];
  if (!url || !key) return { summary: "", rooms: [] };

  try {
    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        headers: { Authorization: `Bearer ${token}` },
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (isNewKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data: userData } = await supabase.auth.getUser(token);
    const user = userData.user;
    if (!user) return { summary: "", rooms: [] };

    const { data: rooms } = await supabase
      .from("rooms")
      .select(
        "room_code, title, status, price_amount, price_currency, crypto_amount, token_symbol, chain, seller_id, buyer_id, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(10);

    const roomList = rooms ?? [];
    const lines = roomList.map((r) => {
      const side = r.seller_id === user.id ? "Seller (Creator)" : "Buyer (Claimant)";
      return `• Room **${r.room_code}** ("${r.title}"): \`${r.status}\` (${r.crypto_amount} ${r.token_symbol} on ${r.chain}) - ${side}`;
    });

    const summary = lines.length ? `Active Rooms:\n${lines.join("\n")}` : "No active rooms yet.";
    return { summary, rooms: roomList };
  } catch {
    return { summary: "", rooms: [] };
  }
}

function extractUserQuery(body: any): string {
  if (!body) return "";
  if (typeof body === "string") return body;
  if (typeof body.text === "string" && body.text.trim()) return body.text.trim();
  if (typeof body.message === "string" && body.message.trim()) return body.message.trim();
  if (typeof body.prompt === "string" && body.prompt.trim()) return body.prompt.trim();

  if (Array.isArray(body.messages) && body.messages.length > 0) {
    const userMsgs = body.messages.filter((m: any) => m.role === "user" || !m.role);
    const target =
      userMsgs.length > 0 ? userMsgs[userMsgs.length - 1] : body.messages[body.messages.length - 1];

    if (typeof target === "string") return target;
    if (typeof target?.content === "string" && target.content.trim()) return target.content.trim();
    if (typeof target?.text === "string" && target.text.trim()) return target.text.trim();

    if (Array.isArray(target?.parts)) {
      const textParts = target.parts
        .map((p: any) => (typeof p === "string" ? p : p?.text || p?.content || ""))
        .filter((t: string) => Boolean(t.trim()));
      if (textParts.length > 0) return textParts.join(" ");
    }
  }

  return "";
}

function generateDynamicAnswer(
  query: string,
  accountInfo: { summary: string; rooms: any[] },
): string {
  const q = query.toLowerCase().trim();

  // 1. Greetings & Identity
  if (/^(hi|hello|hey|greetings|hola|sup|good (morning|afternoon|evening)|yo)\b/i.test(q)) {
    return `Hello! 👋 I'm **Vault Assist**, your personal escrow assistant. How can I help you today?\n\nYou can ask me about:\n- How to create and send escrow files\n- How to pay and unlock a room\n- Checking your active rooms & status\n- Supported crypto networks & tokens`;
  }

  if (q.includes("who are you") || q.includes("what are you") || q.includes("what can you do")) {
    return `I'm **Vault Assist**, the built-in AI assistant for Vaultdrop! I help you:\n\n1. Guide you through locking files and creating 6-digit escrow rooms.\n2. Explain crypto payment instructions and on-chain verification.\n3. Assist buyers in submitting txHashes and unlocking file downloads.\n4. Check the status of your active rooms.`;
  }

  // 2. Wallet & Address questions
  if (
    q.includes("wallet") ||
    q.includes("metamask") ||
    q.includes("phantom") ||
    q.includes("address") ||
    q.includes("0x")
  ) {
    return `### Wallet & Payment Information\n\n- **Receiving Wallet**: When creating a room, enter your EVM (e.g. \`0x...\`) or any crypto wallet address where you want to receive payment.\n- **Buyer Payments**: Buyers can copy the address or scan the QR code using MetaMask, Rainbow, TrustWallet, or any mobile wallet.\n- **Transaction Hash (txHash)**: After sending funds from your wallet, copy the transaction hash from your wallet receipt and paste it into the room for on-chain verification!`;
  }

  // 3. Pending payment / Approval questions
  if (
    q.includes("pending") ||
    q.includes("not approved") ||
    q.includes("waiting") ||
    q.includes("why is my payment") ||
    q.includes("how long")
  ) {
    let res =
      `### Why is the payment pending?\n\n` +
      `1. **On-Chain Confirmation**: Once the buyer submits the txHash, Vaultdrop checks the blockchain to confirm the transaction confirmed.\n` +
      `2. **Seller Review**: The seller sees the submission on their **[Dashboard](/dashboard)**.\n` +
      `3. **Release**: As soon as the seller clicks **Approve & Release**, the download links unlock instantly for the buyer!`;
    if (accountInfo.rooms.length > 0) {
      res += `\n\n**Your Current Rooms:**\n${accountInfo.summary}`;
    }
    return res;
  }

  // 4. How to Send / Upload / Create room
  if (
    q.includes("send") ||
    q.includes("upload") ||
    q.includes("create") ||
    q.includes("seller") ||
    q.includes("lock")
  ) {
    return (
      `### How to Send & Lock Files\n\n` +
      `1. Go to **[Send Files](/send)**.\n` +
      `2. **Drag & Drop Files**: Select code, images, PDFs, or zip archives (uploaded to private cloud storage).\n` +
      `3. **Set Payment**: Choose network (e.g. Ethereum, Base, Polygon), token, amount, and your wallet address.\n` +
      `4. **Get 6-Digit Code**: Click *Lock Files & Create Escrow Room*. Share the code or link with your buyer!`
    );
  }

  // 5. How to Unlock / Download files
  if (
    q.includes("unlock") ||
    q.includes("download") ||
    q.includes("get file") ||
    q.includes("buyer") ||
    q.includes("receive")
  ) {
    return (
      `### How to Unlock & Download Files\n\n` +
      `1. Open the room at \`/room/<code>\` using the 6-digit code.\n` +
      `2. Send the required crypto amount to the seller's wallet address.\n` +
      `3. Paste your **Transaction Hash (txHash)** and submit.\n` +
      `4. Once the seller approves, click **Download All Files** to get your files!`
    );
  }

  // 6. Networks & Tokens
  if (
    q.includes("network") ||
    q.includes("chain") ||
    q.includes("token") ||
    q.includes("coin") ||
    q.includes("supported") ||
    q.includes("eth") ||
    q.includes("sol") ||
    q.includes("base") ||
    q.includes("polygon")
  ) {
    return (
      `### Supported Networks & Tokens\n\n` +
      `Vaultdrop supports automated on-chain verification across major EVM chains:\n\n` +
      `- **Ethereum Mainnet** (ETH, USDT, USDC, DAI, WBTC)\n` +
      `- **Base** (ETH, USDC)\n` +
      `- **Polygon** (MATIC, USDC, USDT)\n` +
      `- **BNB Smart Chain** (BNB, USDT)\n` +
      `- **Arbitrum One** (ETH, ARB, USDC)\n` +
      `- **Optimism** (ETH, OP, USDC)\n\n` +
      `You can also enter custom tokens or any crypto coin symbol when creating your room.`
    );
  }

  // 7. My Rooms / Status check
  if (
    q.includes("my room") ||
    q.includes("dashboard") ||
    q.includes("status") ||
    q.includes("check") ||
    q.includes("account")
  ) {
    if (accountInfo.summary) {
      return `### Your Active Rooms\n\n${accountInfo.summary}\n\nYou can manage and approve payments directly on your **[Dashboard](/dashboard)**.`;
    }
    return `### Your Rooms\n\nYou have no active rooms recorded in this session yet. Click **[Send Files](/send)** to create your first escrow room, or enter a 6-digit code in the top bar to join one!`;
  }

  // 8. Safety, Escrow & Disputes
  if (
    q.includes("safe") ||
    q.includes("secure") ||
    q.includes("scam") ||
    q.includes("dispute") ||
    q.includes("trust") ||
    q.includes("refund")
  ) {
    return (
      `### Is Vaultdrop Safe?\n\n` +
      `- **Private Cloud Storage**: Files are stored securely in encrypted private cloud storage with granular access control.\n` +
      `- **Zero Trust Escrow**: Files cannot be downloaded until payment is confirmed on-chain and approved.\n` +
      `- **Blockchain Verification**: All transactions are verified against public blockchain explorers (Etherscan, Basescan, Polygonscan).\n` +
      `- **No Login Needed**: Cryptographically secured per-room without needing passwords or sensitive credentials.`
    );
  }

  // Fallback direct conversational response
  return (
    `### You asked: "${query}"\n\n` +
    `Here is how Vaultdrop can help with that:\n\n` +
    `- **To create an escrow deal**: Click **[Send Files](/send)**, upload your files, set your price/wallet, and generate your 6-digit code.\n` +
    `- **To pay and unlock**: Go to \`/room/<code>\`, transfer the crypto to the seller's wallet, and submit the txHash.\n` +
    `- **To approve or manage**: Visit **[My Rooms](/dashboard)** anytime.\n\n` +
    `Let me know if you need specific instructions on any step!`
  );
}

export const Route = createFileRoute("/api/support-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: any;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid request body." }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const authHeader = request.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
        const accountInfo = await buildAccountContext(token);

        const openAiKey = process.env["OPENAI_API_KEY"] || process.env["LOVABLE_API_KEY"];
        const geminiKey = process.env["GEMINI_API_KEY"];

        // If Gemini API Key is present, call Google Gemini via OpenAI compatible endpoint
        if (geminiKey && Array.isArray(body?.messages) && body.messages.length > 0) {
          try {
            const gateway = createOpenAICompatible({
              name: "gemini",
              baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
              apiKey: geminiKey,
            });

            const result = streamText({
              model: gateway("gemini-1.5-flash"),
              system: PRODUCT_BRIEF + (accountInfo.summary ? `\n${accountInfo.summary}` : ""),
              messages: await convertToModelMessages(body.messages.slice(-20)),
            });

            return result.toUIMessageStreamResponse({
              headers: { "cache-control": "no-store" },
            });
          } catch (err) {
            console.warn("[support-chat] Gemini API error, falling back:", err);
          }
        }

        // If OpenAI API Key is present, call OpenAI
        if (openAiKey && Array.isArray(body?.messages) && body.messages.length > 0) {
          try {
            const gateway = createOpenAICompatible({
              name: "openai",
              baseURL: process.env["OPENAI_BASE_URL"] || "https://api.openai.com/v1",
              apiKey: openAiKey,
            });

            const result = streamText({
              model: gateway("gpt-4o-mini"),
              system: PRODUCT_BRIEF + (accountInfo.summary ? `\n${accountInfo.summary}` : ""),
              messages: await convertToModelMessages(body.messages.slice(-20)),
            });

            return result.toUIMessageStreamResponse({
              headers: { "cache-control": "no-store" },
            });
          } catch (err) {
            console.warn("[support-chat] OpenAI API error, falling back:", err);
          }
        }

        // Built-in smart conversational assistant
        const queryText = extractUserQuery(body);
        const reply = generateDynamicAnswer(queryText, accountInfo);
        const msgId = `msg-${Date.now()}`;

        return createUIMessageStreamResponse({
          status: 200,
          headers: { "cache-control": "no-store" },
          stream: createUIMessageStream({
            execute({ writer }) {
              writer.write({
                type: "text-start",
                id: msgId,
              });
              writer.write({
                type: "text-delta",
                id: msgId,
                delta: reply,
              });
              writer.write({
                type: "text-end",
                id: msgId,
              });
            },
          }),
        });
      },
    },
  },
});
