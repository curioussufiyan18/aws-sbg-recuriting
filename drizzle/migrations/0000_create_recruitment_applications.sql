CREATE TABLE public.recruitment_applications (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 email text NOT NULL UNIQUE CHECK (char_length(email) <= 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 course text NOT NULL CHECK (char_length(course) BETWEEN 2 AND 100),
 year text NOT NULL CHECK (year IN ('1st year','2nd year','3rd year','4th year','Postgraduate','Research scholar')),
 role text NOT NULL CHECK (role IN ('Community Lead','Technical Lead','Events Lead','Design Lead','Outreach Lead')),
 motivation text NOT NULL CHECK (char_length(motivation) BETWEEN 30 AND 2000),
 consent boolean NOT NULL CHECK (consent = true)
);
GRANT INSERT ON public.recruitment_applications TO anon, authenticated;
GRANT ALL ON public.recruitment_applications TO service_role;
ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit private applications" ON public.recruitment_applications FOR INSERT TO anon, authenticated WITH CHECK (consent = true);
COMMENT ON TABLE public.recruitment_applications IS 'Private core team applications; no public or authenticated read access.';