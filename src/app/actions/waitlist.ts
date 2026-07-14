"use server";

import { createClient } from "@/lib/supabase/server";

export async function joinWaitlist(
  email: string
): Promise<{ success: boolean; alreadyJoined?: boolean; error?: string }> {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed || !trimmed.includes("@")) {
    return { success: false, error: "Escribe un correo válido." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("waitlist").insert({ email: trimmed });

  if (error) {
    if (error.code === "23505") {
      // unique_violation — ya estaba suscrita
      return { success: true, alreadyJoined: true };
    }
    return { success: false, error: "No pudimos guardar tu correo. Intenta de nuevo." };
  }

  return { success: true };
}
