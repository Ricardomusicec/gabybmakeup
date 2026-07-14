// Horario de atención de GabyBMakeUp.
// Ajusta estos valores si el horario o la zona horaria cambian.
export const BUSINESS_HOURS = {
  // Ecuador (America/Guayaquil) no tiene horario de verano: UTC-5 todo el año.
  utcOffsetHours: -5,
  openHour: 9, // 9:00 a.m.
  closeHour: 18, // 6:00 p.m., última cita debe terminar antes de esta hora
  closedWeekday: 0, // 0 = domingo (Date.getUTCDay, ya ajustado a hora local del negocio)
  slotStepMinutes: 30, // los horarios se ofrecen cada 30 minutos
  daysAhead: 14, // cuántos días hacia adelante se pueden reservar
};

export type Slot = {
  startsAt: string; // ISO
  endsAt: string; // ISO
};

/** Convierte un Date a la fecha/hora local del negocio (como si fuera UTC, ya desplazada). */
function toBusinessLocal(date: Date): Date {
  return new Date(date.getTime() + BUSINESS_HOURS.utcOffsetHours * 60 * 60 * 1000);
}

/** Convierte una fecha/hora local del negocio de vuelta a un Date real (UTC). */
function fromBusinessLocal(localDate: Date): Date {
  return new Date(localDate.getTime() - BUSINESS_HOURS.utcOffsetHours * 60 * 60 * 1000);
}

/** Lista de próximos días hábiles, como strings 'YYYY-MM-DD' en hora local del negocio. */
export function getUpcomingBusinessDays(): { date: string; label: string }[] {
  const days: { date: string; label: string }[] = [];
  const now = toBusinessLocal(new Date());
  now.setUTCHours(0, 0, 0, 0);

  for (let i = 0; days.length < BUSINESS_HOURS.daysAhead; i++) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    if (d.getUTCDay() === BUSINESS_HOURS.closedWeekday) continue;

    const dateStr = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("es-EC", {
      timeZone: "UTC",
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    days.push({ date: dateStr, label });

    if (i > BUSINESS_HOURS.daysAhead * 2) break; // salvavidas contra loops infinitos
  }

  return days;
}

/**
 * Calcula los horarios disponibles para un día y una duración de servicio dados,
 * excluyendo los que se traslapan con reservas ya confirmadas.
 */
export function getAvailableSlots(
  dateStr: string, // 'YYYY-MM-DD', en hora local del negocio
  durationMinutes: number,
  existingBookings: { starts_at: string; ends_at: string }[]
): Slot[] {
  const [year, month, day] = dateStr.split("-").map(Number);
  const dayStartLocal = new Date(Date.UTC(year, month - 1, day, BUSINESS_HOURS.openHour, 0, 0));
  const dayCloseLocal = new Date(Date.UTC(year, month - 1, day, BUSINESS_HOURS.closeHour, 0, 0));

  const busy = existingBookings.map((b) => ({
    start: new Date(b.starts_at).getTime(),
    end: new Date(b.ends_at).getTime(),
  }));

  const slots: Slot[] = [];
  const stepMs = BUSINESS_HOURS.slotStepMinutes * 60 * 1000;
  const durationMs = durationMinutes * 60 * 1000;

  const nowUtc = Date.now();

  for (
    let cursor = dayStartLocal.getTime();
    cursor + durationMs <= dayCloseLocal.getTime();
    cursor += stepMs
  ) {
    const slotStartLocal = new Date(cursor);
    const slotEndLocal = new Date(cursor + durationMs);

    const slotStartUtc = fromBusinessLocal(slotStartLocal);
    const slotEndUtc = fromBusinessLocal(slotEndLocal);

    if (slotStartUtc.getTime() <= nowUtc) continue; // no ofrecer horarios ya pasados

    const overlaps = busy.some(
      (b) => slotStartUtc.getTime() < b.end && slotEndUtc.getTime() > b.start
    );
    if (overlaps) continue;

    slots.push({
      startsAt: slotStartUtc.toISOString(),
      endsAt: slotEndUtc.toISOString(),
    });
  }

  return slots;
}
