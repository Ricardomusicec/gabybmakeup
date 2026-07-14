import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();

  const nowIso = new Date().toISOString();

  const [{ count: upcomingCount }, { count: servicesCount }, { count: waitlistCount }] =
    await Promise.all([
      supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("status", "confirmed")
        .gt("starts_at", nowIso),
      supabase
        .from("services")
        .select("id", { count: "exact", head: true })
        .eq("active", true),
      supabase.from("waitlist").select("id", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Citas próximas", value: upcomingCount ?? 0, href: "/admin/citas" },
    { label: "Servicios activos", value: servicesCount ?? 0, href: "/admin/servicios" },
    { label: "En lista de espera", value: waitlistCount ?? 0, href: "/admin/waitlist" },
  ];

  return (
    <AdminShell>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
        Panel de administración
      </span>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-ink">Resumen</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-ink/10 bg-white p-6 transition-colors hover:border-wine/40"
          >
            <p className="font-mono text-4xl text-wine">{s.value}</p>
            <p className="mt-2 text-sm text-ink-soft">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-ink/10 bg-ivory-deep/60 p-5 text-sm text-ink-soft">
        La vista completa de la marca (Home, comunidad, academia) todavía no
        es pública — puedes revisarla en{" "}
        <Link href="/marca" className="font-medium text-wine underline underline-offset-4">
          /marca
        </Link>{" "}
        mientras gabybmakeup.com muestra la página de &ldquo;próximamente&rdquo;.
      </div>
    </AdminShell>
  );
}
