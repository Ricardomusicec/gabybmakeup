-- GabyBMakeUp — Fase 3: servicios y agenda de reservas
-- Copia y corre esto en Supabase → SQL Editor (después de haber corrido schema.sql)

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  duration_minutes int not null,
  price_usd numeric(10, 2) not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users on delete cascade,
  service_id uuid not null references public.services on delete restrict,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_starts_at_idx on public.bookings (starts_at);

alter table public.services enable row level security;
alter table public.bookings enable row level security;

-- Cualquiera puede ver los servicios activos (para mostrarlos en /reservar)
create policy "Servicios activos son públicos"
  on public.services for select
  using (active = true);

-- Cada clienta ve solo sus propias reservas
create policy "Las clientas ven sus propias reservas"
  on public.bookings for select
  using (auth.uid() = client_id);

-- Las admins ven todas las reservas (para la agenda completa)
create policy "Las admins ven todas las reservas"
  on public.bookings for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Solo se puede reservar en nombre propio
create policy "Las clientas crean sus propias reservas"
  on public.bookings for insert
  with check (auth.uid() = client_id);

-- Cancelar (actualizar status) solo la propia reserva
create policy "Las clientas cancelan sus propias reservas"
  on public.bookings for update
  using (auth.uid() = client_id);

-- Servicios de ejemplo — edítalos o bórralos desde el SQL Editor
insert into public.services (name, description, duration_minutes, price_usd)
values
  ('Sesión social', 'Maquillaje para eventos, cumpleaños o salidas especiales.', 60, 35),
  ('Sesión editorial', 'Para fotos, portafolio o contenido de marca.', 90, 55),
  ('Maquillaje de novia', 'Prueba incluida, día del evento y retoque.', 150, 180),
  ('Clase privada 1:1', 'Mentoría personalizada de técnica, a tu ritmo.', 120, 70)
on conflict do nothing;
