-- ============================================================================
-- Complete Supabase Schema for Keyhold / Vaultdrop
-- Run this script in the Supabase Dashboard -> SQL Editor
-- ============================================================================

-- 1. Custom Types & Enums
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.room_status AS ENUM (
    'awaiting_payment',
    'payment_submitted',
    'approved',
    'rejected',
    'cancelled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.proof_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. User Roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

DROP POLICY IF EXISTS "users read own roles" ON public.user_roles;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "admins read all roles" ON public.user_roles;
CREATE POLICY "admins read all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 3. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read own profile" ON public.profiles;
CREATE POLICY "read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "admins read profiles" ON public.profiles;
CREATE POLICY "admins read profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "update own profile" ON public.profiles;
CREATE POLICY "update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Trigger for auto-creating profile and user role upon auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Rooms Table (Escrow Rooms)
CREATE TABLE IF NOT EXISTS public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code text NOT NULL UNIQUE,
  seller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  buyer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  payment_instructions text NOT NULL DEFAULT '',
  price_amount numeric(12,2) NOT NULL DEFAULT 0,
  price_currency text NOT NULL DEFAULT 'USD',
  wallet_address text NOT NULL DEFAULT '',
  chain text NOT NULL DEFAULT 'eth-mainnet',
  token_symbol text NOT NULL DEFAULT 'ETH',
  crypto_amount numeric NOT NULL DEFAULT 0,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  mime_type text NOT NULL DEFAULT 'application/octet-stream',
  status public.room_status NOT NULL DEFAULT 'awaiting_payment',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.rooms TO authenticated;
GRANT ALL ON public.rooms TO service_role;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "seller reads own rooms" ON public.rooms;
CREATE POLICY "seller reads own rooms" ON public.rooms FOR SELECT TO authenticated USING (auth.uid() = seller_id);

DROP POLICY IF EXISTS "buyer reads joined rooms" ON public.rooms;
CREATE POLICY "buyer reads joined rooms" ON public.rooms FOR SELECT TO authenticated USING (auth.uid() = buyer_id);

DROP POLICY IF EXISTS "seller creates own rooms" ON public.rooms;
CREATE POLICY "seller creates own rooms" ON public.rooms FOR INSERT TO authenticated WITH CHECK (auth.uid() = seller_id);

DROP POLICY IF EXISTS "admins read all rooms" ON public.rooms;
CREATE POLICY "admins read all rooms" ON public.rooms FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "seller updates own rooms" ON public.rooms;
CREATE POLICY "seller updates own rooms" ON public.rooms FOR UPDATE TO authenticated USING (auth.uid() = seller_id) WITH CHECK (auth.uid() = seller_id);

CREATE INDEX IF NOT EXISTS rooms_seller_idx ON public.rooms(seller_id);
CREATE INDEX IF NOT EXISTS rooms_buyer_idx ON public.rooms(buyer_id);
CREATE INDEX IF NOT EXISTS rooms_code_idx ON public.rooms(room_code);

-- Updated_at trigger for rooms
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS rooms_touch_updated_at ON public.rooms;
CREATE TRIGGER rooms_touch_updated_at BEFORE UPDATE ON public.rooms
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 5. Room Files Table (Bundle files in a room)
CREATE TABLE IF NOT EXISTS public.room_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  mime_type text NOT NULL DEFAULT 'application/octet-stream',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS room_files_room_id_idx ON public.room_files(room_id);

GRANT SELECT, INSERT ON public.room_files TO authenticated;
GRANT ALL ON public.room_files TO service_role;
ALTER TABLE public.room_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Room participants can view files" ON public.room_files;
CREATE POLICY "Room participants can view files"
ON public.room_files FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.rooms r
  WHERE r.id = room_files.room_id
    AND (r.seller_id = auth.uid() OR r.buyer_id = auth.uid())
));

DROP POLICY IF EXISTS "Seller can insert room files" ON public.room_files;
CREATE POLICY "Seller can insert room files"
ON public.room_files FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.rooms r
  WHERE r.id = room_files.room_id
    AND r.seller_id = auth.uid()
));

DROP POLICY IF EXISTS "Admins can view all room files" ON public.room_files;
CREATE POLICY "Admins can view all room files"
ON public.room_files FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Payment Proofs Table
CREATE TABLE IF NOT EXISTS public.payment_proofs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  proof_path text NOT NULL,
  proof_name text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  amount_claimed numeric(12,2),
  tx_hash text NOT NULL DEFAULT '',
  chain_verified boolean NOT NULL DEFAULT false,
  verified_amount numeric,
  verification_detail text NOT NULL DEFAULT '',
  status public.proof_status NOT NULL DEFAULT 'pending',
  review_note text NOT NULL DEFAULT '',
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.payment_proofs TO authenticated;
GRANT ALL ON public.payment_proofs TO service_role;
ALTER TABLE public.payment_proofs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "buyer reads own proofs" ON public.payment_proofs;
CREATE POLICY "buyer reads own proofs" ON public.payment_proofs FOR SELECT TO authenticated USING (auth.uid() = buyer_id);

DROP POLICY IF EXISTS "buyer inserts own proofs" ON public.payment_proofs;
CREATE POLICY "buyer inserts own proofs" ON public.payment_proofs FOR INSERT TO authenticated WITH CHECK (auth.uid() = buyer_id);

DROP POLICY IF EXISTS "seller reads room proofs" ON public.payment_proofs;
CREATE POLICY "seller reads room proofs" ON public.payment_proofs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.rooms r WHERE r.id = room_id AND r.seller_id = auth.uid()));

DROP POLICY IF EXISTS "admins read all proofs" ON public.payment_proofs;
CREATE POLICY "admins read all proofs" ON public.payment_proofs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS payment_proofs_room_idx ON public.payment_proofs(room_id);

-- 7. Notifications Table
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
GRANT SELECT, INSERT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read own notifications" ON public.notifications;
CREATE POLICY "users read own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users update own notifications" ON public.notifications;
CREATE POLICY "users update own notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS notifications_user_created_idx ON public.notifications (user_id, created_at DESC);

-- 8. Access Log (Audit Trail)
CREATE TABLE IF NOT EXISTS public.access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.rooms(id) ON DELETE SET NULL,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  detail text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.access_log TO authenticated;
GRANT ALL ON public.access_log TO service_role;
ALTER TABLE public.access_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins read access log" ON public.access_log;
CREATE POLICY "admins read access log" ON public.access_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 9. Storage Buckets Setup
-- Create private storage buckets for sender files and payment proofs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('escrow-files', 'escrow-files', false, 104857600, null), -- 100MB per file default
  ('payment-proofs', 'payment-proofs', false, 20971520, null)  -- 20MB per proof default
ON CONFLICT (id) DO UPDATE SET
  public = false;

-- 10. Storage RLS Policies
-- Allow authenticated users to upload their own escrow files under folder matching their auth.uid()
DROP POLICY IF EXISTS "upload own escrow files" ON storage.objects;
CREATE POLICY "upload own escrow files" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'escrow-files' AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "read own or room escrow files" ON storage.objects;
CREATE POLICY "read own or room escrow files" ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'escrow-files' AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM public.rooms r
      WHERE r.file_path = storage.objects.name
        AND (r.seller_id = auth.uid() OR (r.buyer_id = auth.uid() AND r.status = 'approved'))
    )
    OR EXISTS (
      SELECT 1 FROM public.room_files rf
      JOIN public.rooms r ON r.id = rf.room_id
      WHERE rf.file_path = storage.objects.name
        AND (r.seller_id = auth.uid() OR (r.buyer_id = auth.uid() AND r.status = 'approved'))
    )
  )
);

-- Allow authenticated users to upload their payment proofs under folder matching their auth.uid()
DROP POLICY IF EXISTS "upload own payment proofs" ON storage.objects;
CREATE POLICY "upload own payment proofs" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'payment-proofs' AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "read payment proofs" ON storage.objects;
CREATE POLICY "read payment proofs" ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'payment-proofs' AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM public.payment_proofs pp
      JOIN public.rooms r ON r.id = pp.room_id
      WHERE pp.proof_path = storage.objects.name
        AND (pp.buyer_id = auth.uid() OR r.seller_id = auth.uid())
    )
  )
);

-- Allow users to delete their own uploaded files
DROP POLICY IF EXISTS "delete own escrow files" ON storage.objects;
CREATE POLICY "delete own escrow files" ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'escrow-files' AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "delete own payment proofs" ON storage.objects;
CREATE POLICY "delete own payment proofs" ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'payment-proofs' AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Security permissions on functions
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
