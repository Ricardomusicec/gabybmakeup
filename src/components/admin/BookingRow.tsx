"use client";

import { useState, useTransition } from "react";
import { cancelBooking } from "@/app/admin/actions";

type Booking = {
  id: string;
  starts_at: string;
  client_email: string;
  service_name: string;
};

export default function BookingRow({ booking }: { booking: Booking }) {
  const [isPending, startTransition] = useTransition();
  const [cancelled, setCancelled] = useState(false);

  function handleCancel() {
    if (!confirm("¿Cancelar esta cita?")) return;
    startTransition(async () => {
      const result = await cancelBooking(booking.id);
      if (!result?.error) setCancelled(true);
    });
  }

  if (cancelled) return null;

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-ink/10 bg-white p-4">
      <div>
        <p className="font-serif text-base text-ink">{booking.service_name}</p>
        <p className="text-sm text-ink-soft">
          {new Date(booking.starts_at).toLocaleString("es-EC", {
            timeZone: "America/Guayaquil",
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <p className="mt-1 font-mono text-xs text-ink-soft">{booking.client_email}</p>
      </div>
      <button
        onClick={handleCancel}
        disabled={isPending}
        className="shrink-0 rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-wine-deep hover:text-wine-deep disabled:opacity-60"
      >
        Cancelar
      </button>
    </li>
  );
}
