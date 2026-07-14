"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function createService(formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration_minutes = Number(formData.get("duration_minutes"));
  const price_usd = Number(formData.get("price_usd"));

  if (!name || !duration_minutes || !price_usd) {
    return { error: "Completa todos los campos." };
  }

  const { error } = await supabase.from("services").insert({
    name,
    description,
    duration_minutes,
    price_usd,
  });

  if (error) return { error: "No se pudo crear el servicio." };

  revalidatePath("/admin/servicios");
  return { success: true };
}

export async function updateService(
  id: string,
  fields: {
    name: string;
    description: string;
    duration_minutes: number;
    price_usd: number;
  }
) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("services").update(fields).eq("id", id);

  if (error) return { error: "No se pudo actualizar el servicio." };

  revalidatePath("/admin/servicios");
  return { success: true };
}

export async function toggleServiceActive(id: string, active: boolean) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("services")
    .update({ active })
    .eq("id", id);

  if (error) return { error: "No se pudo actualizar el servicio." };

  revalidatePath("/admin/servicios");
  return { success: true };
}

export async function cancelBooking(id: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", id);

  if (error) return { error: "No se pudo cancelar la cita." };

  revalidatePath("/admin/citas");
  return { success: true };
}
