-- GabyBMakeUp — Lista de espera (página "próximamente")
-- Corre esto en Supabase → SQL Editor

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Cualquier visitante (con o sin cuenta) puede sumarse a la lista
create policy "Cualquiera puede unirse a la lista de espera"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

-- Solo las admins pueden ver quién se ha suscrito
create policy "Solo admins ven la lista de espera"
  on public.waitlist for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
