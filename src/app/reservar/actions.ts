"use server";

import { createClient } from "@/lib/supabase/server";
import { getAvailableSlots, type Slot } from "@/lib/booking";

export async function fetchAvailableSlots(
  serviceId: string,
  dateStr: string
): Promise<{ slots: Slot[]; error?: string }> {
  const supabase = await createClient();

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("duration_minutes")
    .eq("id", serviceId)
    .single();

  if (serviceError || !service) {
    return { slots: [], error: "No pudimos encontrar ese servicio." };
  }

  const dayStart = `${dateStr}T00:00:00.000Z`;
  const dayEnd = `${dateStr}T23:59:59.999Z`;

  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("starts_at, ends_at")
    .eq("status", "confirmed")
    .gte("starts_at", dayStart)
    .lte("starts_at", dayEnd);

  if (bookingsError) {
    return { slots: [], error: "No pudimos revisar la disponibilidad." };
  }

  const slots = getAvailableSlots(dateStr, service.duration_minutes, bookings ?? []);
  return { slots };
}

export async function createBooking(
  serviceId: string,
  startsAt: string,
  endsAt: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Necesitas iniciar sesión para reservar." };
  }

  // Vuelve a confirmar disponibilidad justo antes de crear la reserva,
  // para evitar que dos personas reserven el mismo horario a la vez.
  const { data: conflicts } = await supabase
    .from("bookings")
    .select("id")
    .eq("status", "confirmed")
    .lt("starts_at", endsAt)
    .gt("ends_at", startsAt);

  if (conflicts && conflicts.length > 0) {
    return { success: false, error: "Ese horario ya no está disponible. Elige otro." };
  }

  const { error } = await supabase.from("bookings").insert({
    client_id: user.id,
    service_id: serviceId,
    starts_at: startsAt,
    ends_at: endsAt,
  });

  if (error) {
    return { success: false, error: "No pudimos crear tu reserva. Intenta de nuevo." };
  }

  return { success: true };
}
