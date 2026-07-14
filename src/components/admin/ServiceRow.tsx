"use client";

import { useState, useTransition } from "react";
import { updateService, toggleServiceActive } from "@/app/admin/actions";

type Service = {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price_usd: number;
  active: boolean;
};

export default function ServiceRow({ service }: { service: Service }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: service.name,
    description: service.description,
    duration_minutes: service.duration_minutes,
    price_usd: service.price_usd,
  });
  const [error, setError] = useState<string | null>(null);

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await updateService(service.id, form);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setEditing(false);
    });
  }

  function handleToggleActive() {
    startTransition(async () => {
      await toggleServiceActive(service.id, !service.active);
    });
  }

  if (editing) {
    return (
      <li className="rounded-lg border border-wine/40 bg-white p-4">
        <div className="flex flex-col gap-2.5">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-md border border-ink/15 px-3 py-2 text-sm"
            placeholder="Nombre"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded-md border border-ink/15 px-3 py-2 text-sm"
            placeholder="Descripción"
            rows={2}
          />
          <div className="flex gap-2.5">
            <input
              type="number"
              value={form.duration_minutes}
              onChange={(e) =>
                setForm({ ...form, duration_minutes: Number(e.target.value) })
              }
              className="w-28 rounded-md border border-ink/15 px-3 py-2 text-sm"
              placeholder="Minutos"
            />
            <input
              type="number"
              step="0.01"
              value={form.price_usd}
              onChange={(e) => setForm({ ...form, price_usd: Number(e.target.value) })}
              className="w-28 rounded-md border border-ink/15 px-3 py-2 text-sm"
              placeholder="Precio USD"
            />
          </div>
          {error && <p className="text-sm text-wine-deep">{error}</p>}
          <div className="flex gap-2.5">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="rounded-full bg-wine px-4 py-2 text-xs font-medium text-ivory hover:bg-wine-deep disabled:opacity-60"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink"
            >
              Cancelar
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-ink/10 bg-white p-4">
      <div className={service.active ? "" : "opacity-50"}>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-base text-ink">{service.name}</span>
          <span className="font-mono text-sm text-wine">${service.price_usd}</span>
          <span className="font-mono text-xs text-ink-soft">
            {service.duration_minutes} min
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-soft">{service.description}</p>
        {!service.active && (
          <span className="mt-1 inline-block font-mono text-[0.65rem] uppercase tracking-wide text-ink-soft">
            Inactivo
          </span>
        )}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => setEditing(true)}
          className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-wine hover:text-wine"
        >
          Editar
        </button>
        <button
          onClick={handleToggleActive}
          disabled={isPending}
          className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-wine hover:text-wine disabled:opacity-60"
        >
          {service.active ? "Desactivar" : "Activar"}
        </button>
      </div>
    </li>
  );
}
