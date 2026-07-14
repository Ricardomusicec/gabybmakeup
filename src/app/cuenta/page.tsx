import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function CuentaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  const nowIso = new Date().toISOString();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, starts_at, status, services(name, duration_minutes)")
    .eq("status", "confirmed")
    .gt("starts_at", nowIso)
    .order("starts_at", { ascending: true });

  const upcoming = bookings ?? [];

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-xl font-medium tracking-tight text-wine">
            GabyB
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
            MakeUp
          </span>
        </Link>
        <LogoutButton />
      </div>

      <div className="mt-12">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          {isAdmin ? "Panel de administración" : "Mi cuenta"}
        </span>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Hola, {profile?.full_name ?? user.email}
        </h1>
        <p className="mt-3 text-sm text-ink-soft">{user.email}</p>
      </div>

      <div className="mt-10 border-t border-ink/[0.06] pt-8">
        <h2 className="font-serif text-xl text-ink">
          {isAdmin ? "Próximas citas (todas)" : "Mis próximas sesiones"}
        </h2>

        {upcoming.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">
            {isAdmin
              ? "No hay citas agendadas todavía."
              : "Aún no tienes sesiones reservadas."}
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {upcoming.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-lg border border-ink/10 bg-white px-4 py-3"
              >
                <div>
                  <p className="font-serif text-base text-ink">
                    {(b.services as unknown as { name: string })?.name ?? "Servicio"}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {new Date(b.starts_at).toLocaleString("es-EC", {
                      timeZone: "America/Guayaquil",
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isAdmin ? (
          <Link
            href="/admin"
            className="mt-6 inline-block rounded-full bg-wine px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep"
          >
            Ir al panel de administración
          </Link>
        ) : (
          <Link
            href="/reservar"
            className="mt-6 inline-block rounded-full bg-wine px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep"
          >
            Reservar una sesión
          </Link>
        )}
      </div>
    </div>
  );
}
