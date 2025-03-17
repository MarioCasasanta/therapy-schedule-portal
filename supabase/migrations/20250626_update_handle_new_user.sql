
-- Update the handle_new_user function to respect the role from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'role', 'cliente')
  )
  ON CONFLICT (id) DO 
  UPDATE SET role = EXCLUDED.role;
  RETURN new;
END;
$$;
