import { requireAdmin } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";
import CopyEmailsButton from "@/components/admin/CopyEmailsButton";

export default async function AdminWaitlistPage() {
  const { supabase } = await requireAdmin();

  const { data: signups } = await supabase
    .from("waitlist")
    .select("email, created_at")
    .order("created_at", { ascending: false });

  const emails = (signups ?? []).map((s) => s.email);

  return (
    <AdminShell>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
        Pertenencia
      </span>
      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-serif text-3xl tracking-tight text-ink">
          Lista de espera
        </h1>
        {emails.length > 0 && <CopyEmailsButton emails={emails} />}
      </div>
      <p className="mt-2 text-sm text-ink-soft">{emails.length} suscritas</p>

      {emails.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">Todavía no hay suscripciones.</p>
      ) : (
        <ul className="mt-6 flex flex-col divide-y divide-ink/[0.06] rounded-lg border border-ink/10 bg-white">
          {(signups ?? []).map((s) => (
            <li
              key={s.email}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <span className="text-ink">{s.email}</span>
              <span className="font-mono text-xs text-ink-soft">
                {new Date(s.created_at).toLocaleDateString("es-EC", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
