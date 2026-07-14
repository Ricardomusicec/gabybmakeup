import { requireAdmin } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";
import BookingRow from "@/components/admin/BookingRow";

export default async function AdminCitasPage() {
  const { supabase } = await requireAdmin();

  const nowIso = new Date().toISOString();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, starts_at, client_id, services(name)")
    .eq("status", "confirmed")
    .gt("starts_at", nowIso)
    .order("starts_at", { ascending: true });

  const clientIds = [...new Set((bookings ?? []).map((b) => b.client_id))];

  const { data: profiles } =
    clientIds.length > 0
      ? await supabase.from("profiles").select("id, email").in("id", clientIds)
      : { data: [] };

  const emailById = new Map((profiles ?? []).map((p) => [p.id, p.email]));

  const rows = (bookings ?? []).map((b) => ({
    id: b.id,
    starts_at: b.starts_at,
    service_name: (b.services as unknown as { name: string })?.name ?? "Servicio",
    client_email: emailById.get(b.client_id) ?? "—",
  }));

  return (
    <AdminShell>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
        Precisión
      </span>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-ink">
        Agenda de citas
      </h1>

      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">No hay citas próximas.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {rows.map((r) => (
            <BookingRow key={r.id} booking={r} />
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
