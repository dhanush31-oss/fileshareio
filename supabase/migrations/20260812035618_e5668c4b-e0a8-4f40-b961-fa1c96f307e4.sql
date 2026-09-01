ALTER TABLE public.rooms
  ADD COLUMN IF NOT EXISTS wallet_address text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS chain text NOT NULL DEFAULT 'eth-mainnet',
  ADD COLUMN IF NOT EXISTS token_symbol text NOT NULL DEFAULT 'ETH',
  ADD COLUMN IF NOT EXISTS crypto_amount numeric NOT NULL DEFAULT 0;

ALTER TABLE public.payment_proofs
  ADD COLUMN IF NOT EXISTS tx_hash text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS chain_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS verified_amount numeric,
  ADD COLUMN IF NOT EXISTS verification_detail text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  room_id uuid REFERENCES public.rooms(id) ON DELETE CASCADE,
  kind text NOT NULL DEFAULT 'info',
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read own notifications" ON public.notifications;
CREATE POLICY "users read own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users update own notifications" ON public.notifications;
CREATE POLICY "users update own notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS notifications_user_created_idx ON public.notifications (user_id, created_at DESC);