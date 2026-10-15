REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER, MAINTAIN ON public.quote_requests FROM anon, authenticated;
GRANT INSERT ON public.quote_requests TO anon, authenticated;