CREATE POLICY "upload own escrow files" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'escrow-files' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "upload own payment proofs" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'payment-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);