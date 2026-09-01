# File-for-Payment Escrow App

A seller (User A) uploads a file and gets a room code. A buyer (User B) enters the code, pays, and uploads proof. The seller approves, and only then can the buyer download the file.

## One change from your brief

Silent, undisclosed developer access to users' private files is not something I'll build. Instead the app gets a **disclosed admin role**: platform admins can view and download any uploaded file for maintenance, dispute resolution, and auditing — same capability you asked for — with a short, plain notice on the upload screen and in the terms text ("Platform administrators can access uploaded files for support, moderation, and dispute resolution"). Every admin file access is written to an audit log.

## Backend (Lovable Cloud)

Storage bucket `escrow-files` (private, no public URLs). Downloads only ever happen through short-lived signed URLs minted server-side after an authorization check.

Tables:

- `rooms` — id, room_code (6 chars, unique), seller_id, title, description, price_amount, price_currency, file_path, file_name, file_size, mime_type, status (`awaiting_payment` | `payment_submitted` | `approved` | `rejected` | `cancelled`), buyer_id, created_at, expires_at
- `payment_proofs` — id, room_id, buyer_id, proof_path, note, amount_claimed, status (`pending` | `approved` | `rejected`), reviewed_at, review_note
- `user_roles` — id, user_id, role enum (`admin` | `user`), unique(user_id, role), plus a `has_role()` security-definer function
- `access_log` — id, room_id, actor_id, action (`download_file` | `admin_download` | `view_proof` …), created_at

Row-level security, in short:

- Seller sees and manages own rooms; buyer sees a room only after joining it by code.
- File bytes are never readable directly from storage by either party — the storage policies allow only the service role, and access flows through server functions.
- Admins (`has_role(auth.uid(),'admin')`) can read all rooms, proofs, and files.
- Every table gets explicit grants alongside its policies.

## Server functions

| Function                             | Who          | Does                                                                                                   |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------ |
| `createRoom`                         | seller       | upload file, generate unique 6-digit code, create room                                                 |
| `joinRoom`                           | buyer        | look up room by code, return safe metadata only (title, price, seller handle, status — never the file) |
| `submitPaymentProof`                 | buyer        | upload screenshot, set room to `payment_submitted`                                                     |
| `reviewPaymentProof`                 | seller       | approve or reject; approval flips room to `approved`                                                   |
| `getDownloadUrl`                     | buyer        | only if room approved and caller is the buyer → 60-second signed URL, logged                           |
| `getProofUrl`                        | seller/admin | signed URL for the payment screenshot                                                                  |
| `adminListRooms` / `adminGetFileUrl` | admin only   | full oversight, each call written to `access_log`                                                      |

Every mutation re-checks the caller server-side; the code alone never unlocks a file without the approved state and matching buyer.

## Payments

Phase 1 uses the manual flow you described: the buyer pays out-of-band, uploads a screenshot, the seller approves. That's the core loop and needs no gateway.

Phase 2 (optional, after phase 1 works) swaps in Lovable's built-in Stripe payments so a real checkout marks the room paid automatically, with the screenshot flow kept as a fallback for non-card methods.

## Frontend

- `/` — landing: what the escrow does, "Send a file" and "I have a code" entries
- `/auth` — email sign-in/sign-up
- `/send` — upload form (file, title, price, notes) → success screen showing the room code to share
- `/room/$code` — buyer view: item details, payment instructions, proof upload, status, and the download button once approved
- `/dashboard` — seller view: rooms list, pending proofs, screenshot preview, approve/reject
- `/admin` — admin-only: all rooms, file and proof download, access log

Design: dark, high-trust "vault" aesthetic — deep slate surfaces, a single amber/gold accent for the code and approval actions, monospace room codes, clear status badges. All tokens in `src/styles.css`, no hardcoded colors in components.

## Build order

1. Enable Lovable Cloud, migration for tables, roles, policies, grants, storage bucket
2. Auth page + route protection
3. Design system + landing page
4. Upload/create-room flow with code generation
5. Buyer join-by-code + proof upload
6. Seller dashboard + approve/reject
7. Gated download with signed URLs + audit logging
8. Admin console with disclosure notice
9. Optional Stripe checkout
