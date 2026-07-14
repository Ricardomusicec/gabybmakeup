-- GabyBMakeUp — Fase 2: perfiles de usuario
-- Copia y corre esto en Supabase → SQL Editor (una sola vez)

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Cada quien puede ver y actualizar su propio perfil (pero no su rol, ver abajo)
create policy "Los usuarios ven su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Los usuarios actualizan su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Crea automáticamente un perfil cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Cómo hacer admin a Gaby ──────────────────────────────────────────────
-- 1. Regístrate una vez en /registro con ricardomusicec@gmail.com
-- 2. Corre esto en el SQL Editor:
--
--   update public.profiles set role = 'admin'
--   where email = 'ricardomusicec@gmail.com';
