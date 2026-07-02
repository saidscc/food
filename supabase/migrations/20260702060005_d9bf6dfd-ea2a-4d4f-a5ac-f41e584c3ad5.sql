
CREATE TABLE public.telegram_carts (
  chat_id BIGINT NOT NULL PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.telegram_carts TO service_role;
ALTER TABLE public.telegram_carts ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.telegram_users (
  chat_id BIGINT NOT NULL PRIMARY KEY,
  name TEXT,
  phone TEXT,
  address TEXT,
  lang TEXT NOT NULL DEFAULT 'uz',
  state TEXT,
  state_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.telegram_users TO service_role;
ALTER TABLE public.telegram_users ENABLE ROW LEVEL SECURITY;
