"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getUpcomingBusinessDays, type Slot } from "@/lib/booking";
import { fetchAvailableSlots, createBooking } from "@/app/reservar/actions";

type Service = {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price_usd: number;
};

const businessDays = getUpcomingBusinessDays();

export default function BookingFlow({ services }: { services: Service[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handlePickService(s: Service) {
    setService(s);
    setDate(null);
    setSlots(null);
    setSelectedSlot(null);
    setError(null);
  }

  function handlePickDate(d: string) {
    if (!service) return;
    setDate(d);
    setSelectedSlot(null);
    setError(null);
    setSlots(null);
    startTransition(async () => {
      const result = await fetchAvailableSlots(service.id, d);
      if (result.error) {
        setError(result.error);
      } else {
        setSlots(result.slots);
      }
    });
  }

  function handleConfirm() {
    if (!service || !selectedSlot) return;
    setError(null);
    startTransition(async () => {
      const result = await createBooking(service.id, selectedSlot.startsAt, selectedSlot.endsAt);
      if (!result.success) {
        if (result.error?.includes("iniciar sesión")) {
          router.push("/login?next=/reservar");
          return;
        }
        setError(result.error ?? "Algo salió mal.");
        if (date) handlePickDate(date); // refresca disponibilidad
        return;
      }
      setConfirmed(true);
    });
  }

  if (confirmed && service && selectedSlot) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-8 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          Confirmado
        </span>
        <h2 className="mt-3 font-serif text-2xl tracking-tight text-ink">
          Tu sesión está agendada
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {service.name} —{" "}
          {new Date(selectedSlot.startsAt).toLocaleString("es-EC", {
            timeZone: "America/Guayaquil",
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <a
          href="/cuenta"
          className="mt-6 inline-block rounded-full bg-wine px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep"
        >
          Ver en mi cuenta
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Paso 1: servicio */}
      <div>
        <h2 className="font-serif text-lg text-ink">1. Elige el servicio</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => handlePickService(s)}
              className={`rounded-lg border p-4 text-left transition-colors ${
                service?.id === s.id
                  ? "border-wine bg-blush/40"
                  : "border-ink/10 bg-white hover:border-wine/40"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif text-base text-ink">{s.name}</span>
                <span className="font-mono text-sm text-wine">${s.price_usd}</span>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">{s.description}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-soft/80">
                {s.duration_minutes} min
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Paso 2: fecha */}
      {service && (
        <div>
          <h2 className="font-serif text-lg text-ink">2. Elige el día</h2>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {businessDays.map((d) => (
              <button
                key={d.date}
                onClick={() => handlePickDate(d.date)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm capitalize transition-colors ${
                  date === d.date
                    ? "border-wine bg-wine text-ivory"
                    : "border-ink/10 bg-white text-ink hover:border-wine/40"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Paso 3: hora */}
      {service && date && (
        <div>
          <h2 className="font-serif text-lg text-ink">3. Elige la hora</h2>
          {isPending && !slots && (
            <p className="mt-4 text-sm text-ink-soft">Buscando disponibilidad…</p>
          )}
          {slots && slots.length === 0 && (
            <p className="mt-4 text-sm text-ink-soft">
              No hay horarios disponibles ese día. Prueba otra fecha.
            </p>
          )}
          {slots && slots.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2.5">
              {slots.map((slot) => (
                <button
                  key={slot.startsAt}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    selectedSlot?.startsAt === slot.startsAt
                      ? "border-wine bg-wine text-ivory"
                      : "border-ink/10 bg-white text-ink hover:border-wine/40"
                  }`}
                >
                  {new Date(slot.startsAt).toLocaleTimeString("es-EC", {
                    timeZone: "America/Guayaquil",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-wine-deep">
          {error}
        </p>
      )}

      {/* Paso 4: confirmar */}
      {service && selectedSlot && (
        <button
          onClick={handleConfirm}
          disabled={isPending}
          className="w-fit rounded-full bg-wine px-7 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep disabled:opacity-60"
        >
          {isPending ? "Confirmando…" : `Confirmar reserva — $${service.price_usd}`}
        </button>
      )}
    </div>
  );
}
