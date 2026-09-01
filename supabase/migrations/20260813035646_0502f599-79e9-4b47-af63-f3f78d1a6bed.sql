CREATE TABLE public.room_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  mime_type TEXT NOT NULL DEFAULT 'application/octet-stream',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX room_files_room_id_idx ON public.room_files(room_id);

GRANT SELECT ON public.room_files TO authenticated;
GRANT ALL ON public.room_files TO service_role;

ALTER TABLE public.room_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room participants can view files"
ON public.room_files FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.rooms r
  WHERE r.id = room_files.room_id
    AND (r.seller_id = auth.uid() OR r.buyer_id = auth.uid())
));

CREATE POLICY "Admins can view all room files"
ON public.room_files FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.room_files (room_id, file_path, file_name, file_size, mime_type, created_at)
SELECT id, file_path, file_name, COALESCE(file_size, 0), COALESCE(mime_type, 'application/octet-stream'), created_at
FROM public.rooms
WHERE file_path IS NOT NULL;