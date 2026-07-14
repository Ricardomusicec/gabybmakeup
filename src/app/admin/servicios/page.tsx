import { requireAdmin } from "@/lib/auth";
import { createService } from "@/app/admin/actions";
import AdminShell from "@/components/AdminShell";
import ServiceRow from "@/components/admin/ServiceRow";

async function createServiceAction(formData: FormData) {
  "use server";
  await createService(formData);
}

export default async function AdminServiciosPage() {
  const { supabase } = await requireAdmin();

  const { data: services } = await supabase
    .from("services")
    .select("id, name, description, duration_minutes, price_usd, active")
    .order("created_at", { ascending: true });

  return (
    <AdminShell>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
        Curaduría
      </span>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-ink">Servicios</h1>

      <ul className="mt-8 flex flex-col gap-3">
        {(services ?? []).map((s) => (
          <ServiceRow key={s.id} service={s} />
        ))}
      </ul>

      <div className="mt-10 rounded-lg border border-ink/10 bg-white p-5">
        <h2 className="font-serif text-lg text-ink">Agregar servicio</h2>
        <form action={createServiceAction} className="mt-4 flex flex-col gap-3">
          <input
            name="name"
            required
            placeholder="Nombre"
            className="rounded-md border border-ink/15 px-3.5 py-2.5 text-sm"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            rows={2}
            className="rounded-md border border-ink/15 px-3.5 py-2.5 text-sm"
          />
          <div className="flex gap-3">
            <input
              name="duration_minutes"
              type="number"
              required
              placeholder="Minutos"
              className="w-32 rounded-md border border-ink/15 px-3.5 py-2.5 text-sm"
            />
            <input
              name="price_usd"
              type="number"
              step="0.01"
              required
              placeholder="Precio USD"
              className="w-32 rounded-md border border-ink/15 px-3.5 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-fit rounded-full bg-wine px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep"
          >
            Crear servicio
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
