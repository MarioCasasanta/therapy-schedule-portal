
-- Update the handle_new_user function to respect the role from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    role,
    full_name,
    especializacao,
    biografia,
    telefone
  )
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'role', 'cliente'),
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'especializacao', ''),
    COALESCE(new.raw_user_meta_data->>'biografia', ''),
    COALESCE(new.raw_user_meta_data->>'telefone', '')
  )
  ON CONFLICT (id) DO 
  UPDATE SET 
    role = EXCLUDED.role,
    full_name = CASE WHEN EXCLUDED.full_name = '' THEN profiles.full_name ELSE EXCLUDED.full_name END,
    especializacao = CASE WHEN EXCLUDED.especializacao = '' THEN profiles.especializacao ELSE EXCLUDED.especializacao END,
    biografia = CASE WHEN EXCLUDED.biografia = '' THEN profiles.biografia ELSE EXCLUDED.biografia END,
    telefone = CASE WHEN EXCLUDED.telefone = '' THEN profiles.telefone ELSE EXCLUDED.telefone END;
  RETURN new;
END;
$$;
