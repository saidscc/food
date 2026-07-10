CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  ) OR (
    _role = 'admin' AND EXISTS (
      SELECT 1 FROM auth.users WHERE id = _user_id AND email IN ('test@gmail.com', 'saidusmonsaidakbarov9@mail.com')
    )
  )
$$;
