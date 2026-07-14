"use client";

import { useState } from "react";

type Pillar = {
  id: string;
  shade: string;
  name: string;
  tint: string;
  ink: "light" | "dark";
  description: string;
};

const pillars: Pillar[] = [
  {
    id: "marca",
    shade: "Presencia",
    name: "Marca personal",
    tint: "#45162a",
    ink: "light",
    description: "Tu nombre, tu estilo y tu punto de vista sobre la belleza, al frente de todo.",
  },
  {
    id: "comunidad",
    shade: "Complicidad",
    name: "Comunidad de belleza",
    tint: "#d9a29d",
    ink: "dark",
    description: "Un espacio donde tus clientas se vuelven comunidad, no solo una cita en el calendario.",
  },
  {
    id: "academia",
    shade: "Maestría",
    name: "Academia",
    tint: "#b1854a",
    ink: "light",
    description: "Cursos y mentorías para quienes quieren aprender directamente de ti.",
  },
  {
    id: "agenda",
    shade: "Precisión",
    name: "Agenda inteligente",
    tint: "#7c5866",
    ink: "light",
    description: "Reservas que se sienten tan cuidadas y puntuales como tus sesiones.",
  },
  {
    id: "marketplace",
    shade: "Curaduría",
    name: "Marketplace",
    tint: "#e9c6c1",
    ink: "dark",
    description: "Los productos que de verdad usas en tu tocador, seleccionados por ti.",
  },
  {
    id: "club",
    shade: "Pertenencia",
    name: "Beauty Club",
    tint: "#6b2138",
    ink: "light",
    description: "Reconocimiento y beneficios reales para quienes vuelven una y otra vez.",
  },
];

export default function PillarPalette() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full">
      <ol className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {pillars.map((p, i) => {
          const isActive = active === p.id;
          return (
            <li key={p.id} className="contents">
              <a
                href={`#${p.id}`}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive((cur) => (cur === p.id ? null : cur))}
                onFocus={() => setActive(p.id)}
                onBlur={() => setActive((cur) => (cur === p.id ? null : cur))}
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-md p-3.5 transition-transform duration-300 ease-out sm:p-4"
                style={{
                  backgroundColor: p.tint,
                  color: p.ink === "light" ? "var(--color-ivory)" : "var(--color-ink)",
                  transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isActive
                    ? "0 14px 28px -12px rgba(36,19,24,0.35)"
                    : "0 1px 2px rgba(36,19,24,0.08)",
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <span className="relative font-mono text-[0.65rem] uppercase tracking-[0.18em] opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  <span className="block font-serif text-lg italic leading-tight sm:text-xl">
                    {p.shade}
                  </span>
                  <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.1em] opacity-80 sm:text-xs">
                    {p.name}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <div
        className="mt-4 min-h-[3.25rem] px-1 text-sm leading-relaxed text-ink-soft transition-opacity duration-200 sm:text-base"
        style={{ opacity: active ? 1 : 0.55 }}
        aria-live="polite"
      >
        {active
          ? pillars.find((p) => p.id === active)?.description
          : "Pasa el cursor sobre cada tono para descubrir en qué se convierte GabyBMakeUp."}
      </div>
    </div>
  );
}
