import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BookingFlow from "@/components/BookingFlow";

export default async function ReservarPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("id, name, description, duration_minutes, price_usd")
    .eq("active", true)
    .order("price_usd", { ascending: true });

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-ink/[0.06] bg-ivory/85 px-6 py-4 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-medium tracking-tight text-wine">
              GabyB
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
              MakeUp
            </span>
          </Link>
          <Link href="/cuenta" className="text-sm text-ink-soft transition-colors hover:text-wine">
            Mi cuenta
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-14 sm:px-8 sm:py-20">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          Precisión
        </span>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Reserva tu sesión
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Elige el servicio, el día y la hora. Confirmamos al instante.
        </p>

        {!services || services.length === 0 ? (
          <p className="mt-10 text-sm text-ink-soft">
            Todavía no hay servicios disponibles para reservar.
          </p>
        ) : (
          <div className="mt-10">
            <BookingFlow services={services} />
          </div>
        )}
      </main>
    </div>
  );
}
